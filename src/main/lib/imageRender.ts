import sharp from 'sharp'
import path from 'path'
import { app } from 'electron'
import * as fs from 'node:fs'

/**
 * Generates Thumbnails in webp format from image at inputPath and saves them to outputPath with quality and size
 * @param inputPath the src image for thumbnail generation
 * @param outputPath the path with filename where the thumbnail should be saved
 * @param size the new size of the image
 * @param quality the compression quality
 * @returns returns 0 when done sucessfull
 */
export async function generateThumbnail(
    inputPath: string,
    outputPath: string,
    size: number,
    quality: number
): Promise<number> {
    // Pipeline: Einmal lesen, zwei Formate schreiben
    const image = sharp(inputPath)

    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath))
        console.log(
            'Main/handleFolderOpen/makeFolderStructure/generateThumbnail made directory: ',
            path.dirname(outputPath)
        )
    }
    if (fs.existsSync(path.dirname(outputPath))) {
        await image.clone().resize(size).webp({ quality: quality }).toFile(outputPath)
        console.log(
            'Main/handleFolderOpen/makeFolderStructure/generateThumbnail directory: ',
            path.dirname(outputPath)
        )
        console.log(
            'Main/handleFolderOpen/makeFolderStructure/generateThumbnail generated sucessful: ',
            outputPath
        )
        return 0
    }
    return 1
}

/**
 * Generates the path from uuid and type for tmp directory of os
 * @param fileId the uuid of the file
 * @param type the type of the file big and small
 * @returns the path for the file
 *
 * This Funtion is for genrating paths where media can be stored by workers
 */
export function getThumbnailPath(fileId: string, type: 'big' | 'small'): string {
    const tempDir = path.join(app.getPath('temp'), 'spv-cache')

    if (type === 'small') return path.join(tempDir, `${fileId}_thumb_small.webp`)
    if (type === 'big') return path.join(tempDir, `${fileId}_thumb_big.webp`)

    return tempDir
}
