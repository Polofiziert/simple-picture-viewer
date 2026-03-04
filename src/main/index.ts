import { app, BrowserWindow, ipcMain, protocol, net } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

// const workingDir = "~/"

import { registerWindowHandlers, createWindow } from './windowHandlers'
import { registerFilesystemHandler } from './filesystemHandlers'
import { cleanTempFolder } from './lib/filesystem'

protocol.registerSchemesAsPrivileged([{ scheme: 'spv-resource', privileges: { bypassCSP: true } }])

// const { port1 } = new MessageChannelMain()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    console.log('Main/app/whenReady: ...')
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    protocol.handle('spv-resource', (request) => {
        const filePath = request.url.replace('spv-resource://', 'file://')
        console.log('Main/app/WhenReady/protocolHandle() spv-resource path: ', filePath)
        return net.fetch(filePath)
    })

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // const mainWindow = createWindow()
    createWindow()

    // IPC hanlders
    ipcMain.on('ping', () => console.log('pong'))
    registerWindowHandlers()
    registerFilesystemHandler()

    console.log('Main/app/whenReady: createWindow()')

    // mainWindow.webContents.postMessage('port', { progress: true, items: 10, done: 1 }, [port1])

    app.on('activate', function () {
        console.log('Main/appOn-activate: createWindow()')
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('Main/appOn-window-all-closed: app.quit()')
        cleanTempFolder()
        app.quit()
    }
})

app.on('quit', () => {
    console.log('Main/appOn-quit: cleanTempFolder')
    cleanTempFolder()
})
