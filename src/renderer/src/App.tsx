import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
// import Versions from './components/Versions'
import CustomWindowBar from './components/CustomWindowBar'
import FolderSidebar from './components/FolderSidebar'
import DetailsPanel from './components/DetailsPanel'
import ImageViewer from './components/ImageViewer'
import ImageCarousel from './components/ImageCarousel'

// import { Button } from '~/components/ui/button'

// import electronLogo from './assets/electron.svg'
import image1 from './assets/img/DSC_0039.jpg'
import image2 from './assets/img/DSC_0040.jpg'
import image3 from './assets/img/DSC_0041.jpg'
import image4 from './assets/img/DSC_0042.jpg'
import image5 from './assets/img/DSC_0043.jpg'
import image6 from './assets/img/DSC_0044.jpg'
import image7 from './assets/img/DSC_0045.jpg'
import image8 from './assets/img/DSC_0046.jpg'
import image9 from './assets/img/DSC_0047.jpg'
import image10 from './assets/img/DSC_0048.jpg'
import image11 from './assets/img/DSC_0049.jpg'

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
    },
    {
        id: 7,
        src: image7,
        name: 'waterfall-nature.jpg',
        size: '2.9 MB',
        dimensions: '1920 × 1280',
        dateModified: 'Feb 15, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Nature'
    },
    {
        id: 8,
        src: image8,
        name: 'waterfall-nature.jpg',
        size: '2.9 MB',
        dimensions: '1920 × 1280',
        dateModified: 'Feb 15, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Nature'
    },
    {
        id: 9,
        src: image9,
        name: 'waterfall-nature.jpg',
        size: '2.9 MB',
        dimensions: '1920 × 1280',
        dateModified: 'Feb 15, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Nature'
    },
    {
        id: 10,
        src: image10,
        name: 'waterfall-nature.jpg',
        size: '2.9 MB',
        dimensions: '1920 × 1280',
        dateModified: 'Feb 15, 2026',
        format: 'JPEG',
        marked: false,
        category: 'Nature'
    },
    {
        id: 11,
        src: image11,
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
    const [images, setImages] = createSignal<ImageData[]>(sampleImages) // const [images, setImages] = createSignal<ImageData[]>(sampleImages)
    const [currentIndex, setCurrentIndex] = createSignal<number>(5)
    const [showFolderSidebar, setShowFolderSidebar] = createSignal<boolean>(false)

    const [showDetailsSidebar, setShowDetailsSidebar] = createSignal<boolean>(false)
    const [selectedFolder, setSelectedFolder] = createSignal('current')

    /**
     * Navigate to the previous or next image
     * @param direction - 'prev' or 'next'
     */
    const handleNavigate = (direction: 'prev' | 'next'): void => {
        if (direction === 'prev' && currentIndex() > 0) {
            setCurrentIndex((prev) => prev - 1)
        } else if (direction === 'next' && currentIndex() < images().length - 1) {
            setCurrentIndex((prev) => prev + 1)
        }
    }

    /**
     * Select a specific image by index
     * @param index - The index of the image to select
     */
    const handleSelectImage = (index: number): void => {
        setCurrentIndex(index)
    }

    /**
     * Toggle the marked status of the current image
     */
    const handleMarkToggle = (): void => {
        setImages((prevImages) =>
            prevImages.map((img, idx) =>
                idx === currentIndex() ? { ...img, marked: !img.marked } : img
            )
        )
    }
    /**
     * Update the category of the current image
     * @param category - The new category to assign
     */
    const handleCategoryChange = (category: string): void => {
        setImages((prevImages) =>
            prevImages.map((img, idx) => (idx === currentIndex() ? { ...img, category } : img))
        )
    }

    /**
     * Select a folder from the sidebar
     * @param folderId - The ID of the folder to select
     */
    const handleFolderSelect = (folderId: string) => {
        setSelectedFolder(folderId)
        // TODO: Filter images based on the selected folder
        // For marked folder, show only marked images
        // For custom folders, show images in that folder
    }

    /**
     * Keyboard shortcuts handler
     */
    createEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            console.group('KeyPress')
            console.log('KeyPress: ', e)

            // Prevent shortcuts when typing in input fields
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                console.log('Is not in Scope! i.E. User is typing in textfield')
                return
            }

            // Navigation
            if (e.key === 'ArrowRight') {
                console.log('KeyPress ArrowRight')
                e.preventDefault()
                if (currentIndex() < images().length - 1) handleNavigate('next')
            } else if (e.key === 'ArrowLeft') {
                console.log('KeyPress ArrowLeft')
                e.preventDefault()
                if (currentIndex() > 0) handleNavigate('prev')
            }

            // Marking
            else if (e.key === ' ') {
                console.log('KeyPress Space')
                e.preventDefault()
                handleMarkToggle()
            }

            // Sidebar toggles
            else if (e.key === 'f' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
                console.log('KeyPress f')
                e.preventDefault()
                setShowFolderSidebar((prev) => !prev)
            } else if (e.key === 'd' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
                console.log('KeyPress d')
                e.preventDefault()
                setShowDetailsSidebar((prev) => !prev)
            }

            // First/Last image
            else if (e.key === 'Home') {
                console.log('KeyPress Home')

                e.preventDefault()
                setCurrentIndex(0)
            } else if (e.key === 'End') {
                console.log('KeyPress End')

                e.preventDefault()
                setCurrentIndex(images.length - 1)
            }

            console.groupEnd()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentIndex, images.length])

    return (
        <>
            <div
                class="h-screen w-screen flex flex-col overflow-hidden bg-transparent"
                role="application"
                aria-label="Simple Picture Viewer"
            >
                <CustomWindowBar
                    currentImage={{
                        name: images()[currentIndex()].name,
                        marked: images()[currentIndex()].marked,
                        category: images()[currentIndex()].category
                    }}
                    onMarkToggle={handleMarkToggle}
                    onCategoryChange={handleCategoryChange}
                    onNavigate={handleNavigate}
                    hasNext={currentIndex() < images().length - 1}
                    hasPrev={currentIndex() > 0}
                    showFolderSidebar={showFolderSidebar()}
                    showDetailsSidebar={showDetailsSidebar()}
                    onToggleFolderSidebar={() => setShowFolderSidebar(!showFolderSidebar())}
                    onToggleDetailsSidebar={() => setShowDetailsSidebar(!showDetailsSidebar())}
                />

                <div id="main-content" class="flex flex-1 overflow-hidden">
                    {showFolderSidebar() && (
                        <FolderSidebar
                            onFolderSelect={handleFolderSelect}
                            selectedFolder={selectedFolder()}
                        />
                    )}
                    <ImageViewer
                        imageSrc={images()[currentIndex()].src}
                        imageAlt={images()[currentIndex()].name}
                    />
                    {showDetailsSidebar() && (
                        <DetailsPanel
                            image={{
                                name: images()[currentIndex()].name,
                                size: images()[currentIndex()].size,
                                dimensions: images()[currentIndex()].dimensions,
                                dateModified: images()[currentIndex()].dateModified,
                                format: images()[currentIndex()].format,
                                category: images()[currentIndex()].category,
                                marked: images()[currentIndex()].marked
                            }}
                        />
                    )}
                </div>
                <ImageCarousel
                    images={images().map((img) => ({
                        id: img.id,
                        src: img.src,
                        name: img.name,
                        marked: img.marked
                    }))}
                    currentIndex={currentIndex()}
                    onSelect={handleSelectImage}
                    onNavigate={handleNavigate}
                />
            </div>
        </>
    )
}

export default App
