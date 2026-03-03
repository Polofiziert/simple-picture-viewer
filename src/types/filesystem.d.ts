interface FileStats {
    thumb: string
    thumBig: string
    size: number
    dimensions: string
    dateModified: Date
    format: string
    marked: boolean
    categorys: Array<string>
}

interface FolderStats {
    dateModifide: Date
    expanded: boolean
    count: number
}

interface FolderItem {
    id: string
    src: string
    name: string
    type: 'file' | 'folder'
    folderStats?: FolderStats
    fileStats?: FileStats
    childs?: Array<FolderItem>
}
