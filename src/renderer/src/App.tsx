import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
// import Versions from './components/Versions'
import CustomWindowBar from './components/CustomWindowBar'
import FolderSidebar from './components/FolderSidebar'
import DetailsPanel from './components/DetailsPanel'
import ImageViewer from './components/ImageViewer'
import ImageCarousel from './components/ImageCarousel'

// import { Button } from '~/components/ui/button'

// import electronLogo from './assets/electron.svg'

interface ImageData {
    id: number
    src: string
    name: string
    size: string
    dimensions: string
    dateModified: string
    format: string
    marked: boolean
    category: string
}

const sampleImages: ImageData[] = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzE2NDc0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        name: 'mountain-landscape.jpg',
        size: '2.4 MB',
        dimensions: '1920 × 1280',
        dateModified: 'Feb 20, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Nature'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHN1bnNldHxlbnwxfHx8fDE3NzE2ODcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        name: 'ocean-sunset.jpg',
        size: '3.1 MB',
        dimensions: '2048 × 1365',
        dateModified: 'Feb 19, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Landscape'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1590273466070-40c466b4432d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlc3xlbnwxfHx8fDE3NzE3MjEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        name: 'forest-trees.jpg',
        size: '1.8 MB',
        dimensions: '1600 × 1067',
        dateModified: 'Feb 18, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Nature'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBkdW5lc3xlbnwxfHx8fDE3NzE3MjEzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        name: 'desert-dunes.jpg',
        size: '2.7 MB',
        dimensions: '2200 × 1467',
        dateModified: 'Feb 17, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Landscape'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1617381519460-d87050ddeb92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MTc0ODg2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        name: 'city-architecture.jpg',
        size: '3.5 MB',
        dimensions: '2400 × 1600',
        dateModified: 'Feb 16, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Urban'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1610044847457-f6aabcbb67d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBuYXR1cmV8ZW58MXx8fHwxNzcxNjg1NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        name: 'waterfall-nature.jpg',
        size: '2.9 MB',
        dimensions: '1920 × 1280',
        dateModified: 'Feb 15, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Nature'
    }
]

/**
 * SimplePictureViewer - Main application component
 * A macOS-style image viewer with marking, categorization, and folder organization
 * @returns {JSX.Element} The main application
 */
const App: Component = () => {
    //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
    const [versions] = createSignal(window.electron.process.versions)

    const [images, setImages] = createSignal<ImageData[]>(sampleImages)
    const [currentIndex, setCurrentIndex] = createSignal(0)
    const [showFolderSidebar, setShowFolderSidebar] = createSignal(true)
    const [showDetailsSidebar, setShowDetailsSidebar] = createSignal(true)
    const [selectedFolder, setSelectedFolder] = createSignal('current')

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
