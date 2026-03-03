import type { Component } from 'solid-js'
import { createEffect, createSignal, createMemo, onCleanup } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { findPath, getFolder } from './lib/folderStrukHelpers'

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

// interface ImageModifications {
//     rotation: number
//     greyscale: boolean
// }

interface ImageData {
    index: number
    id: string
    src: string
    name: string
    size: number
    dimensions: string
    dateModified: Date
    format: string
    marked: boolean
    category: Array<string>
}

const sampleImages: ImageData[] = [
    {
        index: 0,
        id: '1',
        src: image1,
        name: 'mountain-landscape.jpg',
        size: 2000400,
        dimensions: '1920 × 1280',
        dateModified: new Date(),
        format: 'JPEG',
        marked: false,
        category: ['Nature']
    },
    {
        index: 1,
        id: '2',
        src: image2,
        name: 'ocean-sunset.jpg',
        size: 3003000,
        dimensions: '2048 × 1365',
        dateModified: new Date(),
        format: 'JPEG',
        marked: false,
        category: ['Landscape']
    }
]

const emptyFolderStruk: FolderItem = {
    id: '0',
    src: '',
    name: 'initialFolder_0988',
    type: 'folder',
    folderStats: {
        dateModifide: new Date(),
        expanded: false,
        count: 0
    },
    childs: []
}

/**
 * SimplePictureViewer - Main application component
 * A macOS-style image viewer with marking, categorization, and folder organization
 * @returns {JSX.Element} The main application
 */
const App: Component = () => {
    //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
    const [showFolderSidebar, setShowFolderSidebar] = createSignal<boolean>(false)
    const [showDetailsSidebar, setShowDetailsSidebar] = createSignal<boolean>(false)

    const [currentIndex, setCurrentIndex] = createSignal<number>(0)
    const [images, setImages] = createSignal<ImageData[]>(sampleImages) // const [images, setImages] = createSignal<ImageData[]>(sampleImages)
    const [selectedFolder, setSelectedFolder] = createSignal<string>('0')
    const [folderStruk, setFolderStruk] = createStore<FolderItem>(emptyFolderStruk)

    const [currentPath, setCurrentPath] = createSignal<string[]>([])
    const currentFolder = createMemo<FolderItem>(() => {
        // use helper to traverse store; keeps access within tracked memo
        return getFolder(folderStruk, currentPath())
    })

    async function handleOpenFolder(): Promise<void> {
        console.log('renderer/app/handleOpenFolder()')
        const struk = await window.api.fsControll.openFolder()

        console.log('renderer/app/handleOpenFolder() struk: ', struk)
        if (struk.canceled === false) {
            setFolderStruk(reconcile(struk.folderStruk))
            setSelectedFolder(folderStruk.id)
            setCurrentIndex(0)
            handleFolderSelect(selectedFolder())
        }

        console.log('renderer/app/handleOpenFolder() folderStruk signal: ', folderStruk)
    }

    /**
     * Navigate to the previous or next image
     * @param direction - 'prev' or 'next'
     */
    const handleNavigate = (direction: 'prev' | 'next'): void => {
        console.log('renderer/app/handleNavigate()')

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
        console.log('renderer/app/handleSelectImage()')

        setCurrentIndex(index)
    }

    /**
     * Toggle the marked status of the current image
     */
    const handleMarkToggle = (): void => {
        console.log('renderer/app/handleMarkToggle()')

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
        console.log('renderer/app/handleCategoryChange: ', category)
        // setImages((prevImages) =>
        //    prevImages.map((img, idx) => (idx === currentIndex() ? { ...img, category } : img))
        //)
    }

    /**
     * Select a folder from the sidebar
     * @param folderId - The ID of the folder to select
     */
    const handleFolderSelect = (folderId: string): void => {
        console.log('renderer/app/handleFolderSelect() folderID: ', folderId)

        const path = findPath(folderStruk, folderId)
        console.log('renderer/app/handleFolderSelect() path: ', path)
        if (!path) return

        if (path == currentPath()) return

        if (getFolder(folderStruk, path).type === 'file') path.pop()

        setCurrentPath(path)
        setSelectedFolder(path[path.length - 1])

        const folder = currentFolder()
        console.log('renderer/app/handleFolderSelect() folder: ', folder)

        const files = folder.childs?.filter((f) => f.type === 'file') ?? []
        console.log('renderer/app/handleFolderSelect() files: ', files)
        if (files.length == 0) return

        setImages(
            files.map((f, index) => ({
                index: index,
                id: f.id ?? 0,
                src: f.src ?? '',
                name: f.name ?? 'empty',
                size: f.fileStats?.size ?? 0,
                dimensions: f.fileStats?.dimensions ?? '',
                dateModified: f.fileStats?.dateModified ?? new Date(),
                format: f.fileStats?.format ?? '',
                marked: f.fileStats?.marked ?? false,
                category: f.fileStats?.categorys ?? []
            }))
        )
        console.log('renderer/app/handleFolderSelect() images: ', images())

        setCurrentIndex(0)
    }

    /**
     * Select a file from the sidebar
     * @param fileId - The ID of the folder to select
     */
    const handleFileSelect = (fileId: string): void => {
        console.log('renderer/app/handleFileSelect fileId: ', fileId)
        const image = images().find((c) => c.id === fileId) || undefined
        if (image === undefined) {
            // When image file not in images() of current folder, change folder and look again
            console.log('renderer/app/handleFileSelect file in other Folder')
            handleFolderSelect(fileId)
            handleFileSelect(fileId)
        } else {
            // When image file in images() simply change to its index
            console.log('renderer/app/handleFileSelect image: ', image)
            handleSelectImage(image.index)
        }
    }

    /**
     * Handle folder structure updates
     * Creates a new reference to trigger Solid.js reactivity
     */

    /**
     * Keyboard shortcuts handler
     */
    createEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            // console.group('KeyPress')
            // console.log('KeyPress: ', e)

            // Prevent shortcuts when typing in input fields
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                console.log('Is not in Scope! i.E. User is typing in textfield')
                return
            }

            // Navigation
            if (e.key === 'ArrowRight') {
                // console.log('KeyPress ArrowRight')
                e.preventDefault()
                if (currentIndex() < images().length - 1) handleNavigate('next')
            } else if (e.key === 'ArrowLeft') {
                // console.log('KeyPress ArrowLeft')
                e.preventDefault()
                if (currentIndex() > 0) handleNavigate('prev')
            }

            // Marking
            else if (e.key === ' ') {
                // console.log('KeyPress Space')
                e.preventDefault()
                handleMarkToggle()
            }

            // Sidebar toggles
            else if (e.key === 'f' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
                // console.log('KeyPress f')
                e.preventDefault()
                setShowFolderSidebar((prev) => !prev)
            } else if (e.key === 'd' && (e.metaKey || e.ctrlKey) && e.shiftKey) {
                // console.log('KeyPress d')
                e.preventDefault()
                setShowDetailsSidebar((prev) => !prev)
            }

            // First/Last image
            else if (e.key === 'Home') {
                // console.log('KeyPress Home')

                e.preventDefault()
                setCurrentIndex(0)
            } else if (e.key === 'End') {
                // console.log('KeyPress End')

                e.preventDefault()
                setCurrentIndex(images.length - 1)
            }

            // console.groupEnd()
        }

        window.addEventListener('keydown', handleKeyDown)
        onCleanup(() => window.removeEventListener('keydown', handleKeyDown))
    })

    return (
        <>
            <div
                class="h-screen w-screen flex flex-col overflow-hidden bg-transparent"
                role="application"
                aria-label="Simple Picture Viewer"
            >
                <CustomWindowBar
                    currentImage={{
                        name: images()[currentIndex()].name ?? 'empty',
                        marked: images()[currentIndex()].marked ?? false,
                        category: images()[currentIndex()].category ?? []
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
                            onOpenFolder={handleOpenFolder}
                            onFolderSelect={handleFolderSelect}
                            onFileSelect={handleFileSelect}
                            folderStruk={folderStruk}
                            setFolderStruk={setFolderStruk}
                            selectedFolder={selectedFolder()}
                        />
                    )}
                    <ImageViewer
                        // imageSrc={images()[currentIndex()].src}
                        // imageAlt={images()[currentIndex()].name}
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
                        index: img.index,
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
