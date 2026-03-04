import { type Component, createEffect, createSignal } from 'solid-js'
import { ZoomOut, RotateCw, Palette, ZoomIn } from 'lucide-solid'
import { Button } from './ui/button'

interface ImageViewerProps {
    imageSrc: string
    imageAlt: string
}

/**
 * ImageViewer component - Displays Current Image with some options
 * Allows users to see the current picture
 */
const ImageViewer: Component<ImageViewerProps> = (props) => {
    const [zoom, setZoom] = createSignal(1)
    const [rotation, setRotation] = createSignal(0)
    const [grayscale, setGrayscale] = createSignal(false)
    const [isMouseMoving, setIsMouseMoving] = createSignal(false)
    const [controlsVisible, setControlsVisible] = createSignal(true)
    let containerRef!: HTMLDivElement
    let imageRef!: HTMLImageElement
    let mouseTimeoutRef!: NodeJS.Timeout

    /**
     * Handle zoom in/out
     * @param delta - Positive for zoom in, negative for zoom out
     */
    const handleZoomMouse = (delta: number): void => {
        setZoom((prev) => Math.min(Math.max(prev + delta, 0.1), 5))
    }
    const handleZoomTouch = (delta: number): void => {
        const computeNew = (prev: number): number => {
            const littleDelta = delta * 0.0001
            const newRatio = prev + littleDelta

            console.log(littleDelta)
            return Math.min(Math.max(newRatio, 0.005), 5.000000000000001)
        }
        setZoom((prev) => computeNew(prev))
    }

    const handleZoomIn = (): void => handleZoomMouse(0.1)
    const handleZoomOut = (): void => handleZoomMouse(-0.1)
    const handleZoomReset = (): number => setZoom(1)

    const handleRotate = (): number => setRotation((prev) => (prev + 90) % 360) // TODO: Pass to image obj and give keyboard controlls
    const handleGrayscale = (): boolean => setGrayscale((prev) => !prev) // TODO: Pass to image obj and give keyboard controlls

    /**
     * Handle mouse wheel zoom
     */
    createEffect(() => {
        const container = containerRef
        if (!container) return

        const handleWheel = (e: WheelEvent): void => {
            console.log(e)
            // Check if user is using pinch gesture (ctrlKey) or just scrolling
            if (!e.ctrlKey || !e.metaKey) {
                // Simple Scrolling with mouse (no ctrlKey)
                e.preventDefault()
                const delta = e.deltaY > 0 ? -0.1 : 0.1
                handleZoomMouse(delta)
            } else if (e.ctrlKey || e.metaKey) {
                // When zoomed with touchpad (pinch gesture (has allways ctrlKey true))
                e.preventDefault()
                const delta = e.deltaY > 0 ? -0.1 : 0.1
                handleZoomTouch(delta)
            }
        }

        container.addEventListener('wheel', handleWheel, { passive: false })
        return () => container.removeEventListener('wheel', handleWheel)
    })

    /**
     * Handle mouse movement for showing/hiding controls
     */
    createEffect(() => {
        const container = containerRef
        if (!container) return

        const handleMouseMove = (): void => {
            setIsMouseMoving(true)

            // Clear existing timeout
            if (mouseTimeoutRef) {
                clearTimeout(mouseTimeoutRef)
            }

            // Set new timeout to hide controls after 2 seconds of inactivity
            mouseTimeoutRef = setTimeout(() => {
                setIsMouseMoving(false)
            }, 5000)
        }

        const handleMouseLeave = (): void => {
            setIsMouseMoving(false)
            if (mouseTimeoutRef) {
                clearTimeout(mouseTimeoutRef)
            }
        }

        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
            if (mouseTimeoutRef) {
                clearTimeout(mouseTimeoutRef)
            }
        }
    })

    /**
     * Check if controls would overlap with the image
     */
    createEffect(() => {
        const checkOverlap = (): void => {
            if (!imageRef || !containerRef) return

            const imageRect = imageRef.getBoundingClientRect()
            const containerRect = containerRef.getBoundingClientRect()

            // Controls are in top-right corner, check if image extends there
            const controlsArea = {
                top: containerRect.top,
                right: containerRect.right,
                bottom: containerRect.top + 100,
                left: containerRect.right - 300
            }

            const overlaps = !(
                imageRect.right < controlsArea.left ||
                imageRect.left > controlsArea.right ||
                imageRect.bottom < controlsArea.top ||
                imageRect.top > controlsArea.bottom
            )

            setControlsVisible(!overlaps || isMouseMoving())
        }

        checkOverlap()
        window.addEventListener('resize', checkOverlap)

        return () => window.removeEventListener('resize', checkOverlap)
    })

    return (
        <div
            ref={containerRef}
            class="relative flex-1 bg-transparent overflow-hidden flex items-center justify-center"
            role="main"
            aria-label="Image viewer"
        >
            {/* Zoom and Filter Controls */}
            <div
                class={`absolute top-4 right-4 flex gap-2 z-10 transition-opacity duration-300 ${
                    controlsVisible() ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                role="toolbar"
                aria-label="Image controls"
            >
                <Button
                    variant="ghost"
                    onClick={handleZoomOut}
                    size="sm"
                    class="bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black backdrop-blur-xl shadow-sm text-gray-700 dark:text-gray-200"
                    aria-label="Zoom out (Ctrl + -)"
                    title="Zoom out (Ctrl + -)"
                >
                    <ZoomOut class="w-4 h-4" />
                </Button>
                <div
                    class="bg-white/90 dark:bg-black/90 backdrop-blur-xl px-3 py-1.5 rounded-md text-sm shadow-sm min-w-[60px] text-center text-gray-900 dark:text-white select-none cursor-pointer"
                    role="status"
                    onClick={handleZoomReset}
                    aria-live="polite"
                    aria-label={`Zoom level 12% percent`}
                >
                    {zoom() * 100}%
                </div>
                <Button
                    variant="ghost"
                    onClick={handleZoomIn}
                    size="sm"
                    class="bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black backdrop-blur-xl shadow-sm text-gray-700 dark:text-gray-200"
                    aria-label="Zoom in (Ctrl + +)"
                    title="Zoom in (Ctrl + +)"
                >
                    <ZoomIn class="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    onClick={handleRotate}
                    size="sm"
                    class="bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black backdrop-blur-xl shadow-sm text-gray-700 dark:text-gray-200"
                    aria-label="Rotate 90 degrees (R)"
                    title="Rotate 90° (R)"
                >
                    <RotateCw class="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGrayscale}
                    class={`backdrop-blur-xl shadow-sm ${
                        grayscale()
                            ? 'bg-blue-500/90 text-white hover:bg-blue-600/90'
                            : 'bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black text-gray-700 dark:text-gray-200'
                    }`}
                    aria-label={`${grayscale() ? 'Disable' : 'Enable'} black and white filter (B)`}
                    title={`Black & White (B)`}
                >
                    <Palette class="w-4 h-4" />
                </Button>
            </div>

            {/* Image Display */}
            <div class="w-full h-full flex items-center justify-center p-8">
                <img
                    ref={imageRef}
                    src={`spv-resource://${props.imageSrc}`}
                    alt={props.imageSrc}
                    class="max-w-full max-h-full object-contain shadow-2xl"
                    style={{
                        transform: `scale(${zoom()}) rotate(${rotation()}deg)`, // Zoom / 100 is the ki Original scaling
                        filter: grayscale() ? 'grayscale(100%)' : 'none',
                        transition: 'transform 0.1s ease, filter 1s ease'
                    }}
                    draggable={false}
                />
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                Use Ctrl+Scroll to zoom • B for B&W • R to rotate
            </div>
        </div>
    )
}

export default ImageViewer
