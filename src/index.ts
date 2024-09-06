import * as fs from 'fs/promises'
import path from 'path'

import { BuildData, DataRefer } from './types'

const host = 'https://bestdori.com'
const server = 'jp'

function assetUrl(path: string) {
    return `${host}/assets/${server}/${path}`
}

function fetch_data(bundle: string, file: string) {
    const url = assetUrl(`${bundle}_rip/${file}`)
    console.log(url)
    return fetch(url)
}

async function download_refer(ref: DataRefer, dir: string) {
    const file = ref.fileName.replace(/\.bytes$/, '')
    const data = await (await fetch_data(ref.bundleName, file)).arrayBuffer()
    await fs.writeFile(path.join(dir, file), Buffer.from(data))
}

async function fetch_live2d_data(chara: string, dir: string) {
    const assets = (
        (await (await fetch_data(`live2d/chara/${chara}`, 'buildData.asset')).json()) as BuildData
    ).Base
    for (const ref of [
        assets.model,
        assets.physics,
        ...assets.textures,
        assets.transition,
        ...assets.motions,
        ...assets.expressions
    ]) {
        await download_refer(ref, dir)
    }
}

async function main() {
    await fs.mkdir('output', { recursive: true })
    await fetch_live2d_data('038_live_default', 'output')
}

main()
