import { shell, ipcMain, BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

/**
 * registerWindowHandlers helper function - registers the ipc for the window controlls
 * Provides functionality for window.api.windowControl in the renderer
 */
export function registerWindowHandlers(): void {
    // Fenster minimieren
    ipcMain.on('window-minimize', (event) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win?.minimize()
    })

    // Fenster schließen
    ipcMain.on('window-close', (event) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win?.close()
    })

    // Optional: Maximieren / Wiederherstellen (Toggle)
    ipcMain.on('window-toggle-maximize', (event) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        if (win?.isMaximized()) {
            win.unmaximize()
        } else {
            win?.maximize()
        }
    })
}

/**
 * createWindow - creates the Browser window for the application
 * Basic window creation for the Application
 */
export function createWindow(): void {
    console.log('Main/app/whenReady/createWindow(): ...')
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 760,
        frame: false, // Entfernt den Standard-Rahmen
        show: false, // Whether window should be shown when created. Default is true.
        titleBarStyle: 'hidden', // Behält auf macOS die "Ampel"-Buttons, versteckt aber die Bar
        trafficLightPosition: { x: 15, y: 20 }, // Set a custom position for the traffic light buttons in frameless windows. On MacOS
        autoHideMenuBar: true, // Auto hide the menu bar unless the Alt key is pressed. Default is false.
        ...(process.platform === 'linux' ? { icon } : {}),
        vibrancy: 'fullscreen-ui',
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })

    mainWindow.on('ready-to-show', () => {
        console.log('Main/app/whenReady/createWindow()/mainWindow-on/ready-to-show: ...')
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}
