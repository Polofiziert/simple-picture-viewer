import { ElectronAPI } from '@electron-toolkit/preload'

type HandleFolderOpenResponse = { canceled: true } | { canceled: false; folderStruk: FolderItem }

declare global {
    interface WindowControll {
        /**
         * minimize() - minimizes the window
         */
        minimize(): void
        /**
         * maximize() - maximizes the window
         */
        maximize(): void
        /**
         * close() - close the window
         */
        close(): void
        /**
         * darkMode - set the darkmode mode, toggle() light and dark, or system()
         */
        darkMode: {
            /**
             * darkMode.toggle() - toggle the darkMode mode, from prev to next, light to dark and dark to light
             */
            toggle(): Promise
            /**
             * darkMode.system() - set the darkmode mode from systems prefrences, just go along
             */
            system(): Promise
            /**
             * darkMode.system() - set the darkmode mode from systems prefrences, just go along
             */
            state(): Promise
        }
    }
    interface fsControll {
        openFolder(): Promise<HandleFolderOpenResponse>
    }

    interface API {
        /**
         * contextBridge.api.windowControll - windowControll helper functions
         */
        windowControll: WindowControll
        fsControll: fsControll
    }

    interface Window {
        electron: ElectronAPI
        /**
         * contextBridge.api - mounting point for ipc hanlers of user
         */
        api: API
    }
}
