import { app } from 'electron'
import * as fs from 'node:fs'
import path from 'path'
import crypto from 'crypto'
import { getThumbnailPath, generateThumbnail } from './imageRender'

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
            const uuid = crypto.randomUUID()
            const fileStats: FileStats = {
                thumb: getThumbnailPath(uuid, 'small'),
                thumBig: getThumbnailPath(uuid, 'big'),
                size: (await stats).size,
                dimensions: '1920 × 1280',
                dateModified: (await stats).mtime,
                format: 'JPEG',
                marked: false,
                categorys: []
            }
            const folderItem: FolderItem = {
                id: uuid,
                src: path + '/' + dir[i],
                name: dir[i],
                type: 'file',
                fileStats: fileStats
            }
            folderStruk.childs?.push(folderItem)
            await generateThumbnail(folderItem.src, fileStats.thumb, 300, 80)
            await generateThumbnail(folderItem.src, fileStats.thumBig, 1200, 85)
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

export function cleanTempFolder(): number {
    const tempDir = path.join(app.getPath('temp'), 'spv-cache')
    fs.rmSync(tempDir, { recursive: true, force: true })
    return 0
}
