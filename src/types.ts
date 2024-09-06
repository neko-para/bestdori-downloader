export type DataRefer = {
    bundleName: string
    fileName: string
}

// buildData.assets
export type BuildData = {
    Base: {
        model: DataRefer
        physics: DataRefer
        textures: DataRefer[]
        transition: DataRefer
        motions: DataRefer[]
        expressions: DataRefer[]
    }
}
