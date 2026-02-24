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
import image1 from './assets/img/DSC_0039.JPG'
import image2 from './assets/img/DSC_0040.JPG'
import image3 from './assets/img/DSC_0041.JPG'
import image4 from './assets/img/DSC_0042.JPG'
import image5 from './assets/img/DSC_0043.JPG'
import image6 from './assets/img/DSC_0044.JPG'

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
        src: image1,
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
        src: image2,
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
        src: image3,
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
        src: image4,
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
        src: image5,
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
        src: image6,
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
                <ImageCarousel
                    images={images().map((img) => ({
                        id: img.id,
                        src: img.src,
                        name: img.name,
                        marked: img.marked
                    }))}
                    currentIndex={currentIndex()}
                />
            </div>
        </>
    )
}

export default App
