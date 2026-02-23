import type { Component } from 'solid-js'
// import Versions from './components/Versions'
import CustomWindowBar from './components/CustomWindowBar'
import FolderSidebar from './components/FolderSidebar'
import DetailsPanel from './components/DetailsPanel'
import ImageViewer from './components/ImageViewer'
import ImageCarousel from './components/ImageCarousel'

// import { Button } from '~/components/ui/button'

// import electronLogo from './assets/electron.svg'

const App: Component = () => {
    //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

    return (
        <>
            <div
                class="h-screen w-screen flex flex-col overflow-hidden bg-transparent"
                role="application"
                aria-label="Simple Picture Viewer"
            >
                <CustomWindowBar />

                <div id="main-content" class="flex flex-1 overflow-hidden">
                    <FolderSidebar />
                    <ImageViewer />
                    <DetailsPanel />
                </div>
                <ImageCarousel />
            </div>
        </>
    )
}

export default App
