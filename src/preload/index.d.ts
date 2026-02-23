import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface WindowControll {
        /**
         * minimize() - minimizes the window
         */
        minimize(): void
        /**
         * minimize() - minimizes the window
         */
        maximize(): void
        /**
         * minimize() - minimizes the window
         */
        close(): void
    }

    interface API {
        /**
         * contextBridge.api.windowControll - windowControll helper functions
         */
        windowControll: WindowControll
    }

    interface Window {
        electron: ElectronAPI
        /**
         * contextBridge.api - mounting point for ipc hanlers of user
         */
        api: API
    }
}
