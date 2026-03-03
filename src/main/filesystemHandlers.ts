import { ipcMain, dialog } from 'electron'
import { makeFolderStructure } from './lib/filesystem'
import { HandleFolderOpenResponse } from '../preload/index.d'

export function registerFilesystemHandler(): void {
    ipcMain.handle('dialog:openFolder', handleFolderOpen)
}

export async function handleFolderOpen(): Promise<HandleFolderOpenResponse> {
    console.log('Main/app/whenReady: handleFolderOpen')

    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory', 'multiSelections']
    })

    if (!canceled) {
        // console.log('Main/app/whenReady: ', filePaths)
        const folderStruk = await makeFolderStructure(filePaths[0])
        // console.log('folderStruk: ', JSON.stringify(folderStruk))
        return {
            canceled: false,
            folderStruk: folderStruk
        }
    }

    return { canceled: true }
}
