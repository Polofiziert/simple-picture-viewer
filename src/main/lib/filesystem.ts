import * as fs from 'node:fs'
const isFilename = new RegExp(/.+\..+/)

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

export interface FolderItem {
    id: number
    src: string
    name: string
    type: 'file' | 'folder'
    folderStats?: FolderStats
    fileStats?: FileStats
    childs?: Array<FolderItem>
}

export async function makeFolderStructure(path: string): Promise<FolderItem> {
    const dir = await fs.promises.readdir(path)

    const folderStruk: FolderItem = {
        id: 0,
        src: path,
        name: path,
        type: 'folder',
        folderStats: { dateModifide: new Date(), expanded: false, count: dir.length },
        childs: []
    }

    for (let i = 0; i < dir.length - 1; i++) {
        if (isFilename.test(dir[i])) {
            const stats = fs.promises.stat(path + '/' + dir[i])
            const fileStats: FileStats = {
                thumb: 'string',
                thumBig: 'string',
                size: (await stats).size,
                dimensions: 'string',
                dateModified: (await stats).mtime,
                format: 'string',
                marked: false,
                categorys: []
            }
            const folderItem: FolderItem = {
                id: i,
                src: path + '/' + dir[i],
                name: dir[i],
                type: 'file',
                fileStats: fileStats
            }
            folderStruk.childs?.push(folderItem)
        } else if (!isFilename.test(dir[i]) && dir[i] != '.DS_Store') {
            const dir = await fs.promises.readdir(path) // nicht effizient, evtl in recursivem call so das nur einmal aufgerufen wird?
            const nestedFolder: FolderItem = await makeFolderStructure(path + '/' + dir[i]) // Recursive call for nested Folders

            const folderStats: FolderStats = {
                dateModifide: new Date(),
                expanded: false,
                count: dir.length
            }

            const folderItem: FolderItem = {
                id: i,
                src: path + '/' + dir[i],
                name: dir[i],
                type: 'folder',
                folderStats: folderStats
            }

            folderItem.childs = nestedFolder.childs
            folderStruk.childs?.push(folderItem)
        }
    }

    return folderStruk
}
