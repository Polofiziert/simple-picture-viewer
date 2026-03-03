import * as fs from 'node:fs'
import crypto from 'crypto'

const isFilename = new RegExp(/.+\..+/)

export async function makeFolderStructure(path: string): Promise<FolderItem> {
    const dir = await fs.promises.readdir(path)

    const folderStruk: FolderItem = {
        id: crypto.randomUUID(),
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
                id: crypto.randomUUID(),
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
                id: crypto.randomUUID(),
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
