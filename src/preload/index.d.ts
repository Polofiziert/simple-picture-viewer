import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface WindowControll {
        minimize(): void
        maximize(): void
        close(): void
    }

    interface API {
        windowControll: WindowControll
    }

    interface Window {
        electron: ElectronAPI
        api: API
    }
}
