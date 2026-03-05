import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
    windowControll: {
        minimize: () => ipcRenderer.send('window-minimize'),
        maximize: () => ipcRenderer.send('window-maximize'),
        close: () => ipcRenderer.send('window-close'),
        darkMode: {
            // Not working
            toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
            system: () => ipcRenderer.invoke('dark-mode:system'),
            state: () => ipcRenderer.invoke('dark-mode:state')
        }
    },
    fsControll: {
        openFolder: () => ipcRenderer.invoke('dialog:openFolder')
    },
    pictureRender: {
        progressState: (callback) =>
            ipcRenderer.on('picRender:progress-state', (_event, value) => callback(value))
    }
}

ipcRenderer.on('port', (e, msg) => {
    const [port] = e.ports
    console.log('Renderer/ipcRenderer/on port ', port, e, msg)
})

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
}
