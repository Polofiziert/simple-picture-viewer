import { ipcMain, dialog } from 'electron'
import { makeFolderStructure } from './lib/filesystem'
import { HandleFolderOpenResponse } from '../preload/index.d'

export function registerFilesystemHandler(): void {
    ipcMain.handle('dialog:openFolder', (e) => handleFolderOpen(e))
}

export async function handleFolderOpen(event): Promise<HandleFolderOpenResponse> {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory', 'multiSelections']
    })

    if (!canceled) {
        const folderStruk = await makeFolderStructure(event, filePaths[0])
        event.sender.send('picRender:progress-state', {
            isProgress: false,
            items: 10,
            itemsDone: 10
        })
        // console.log('folderStruk: ', JSON.stringify(folderStruk))
        return {
            canceled: false,
            folderStruk: folderStruk
        }
    }

    return { canceled: true }
}
