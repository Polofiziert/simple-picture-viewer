import { type Component } from 'solid-js'
import { ZoomOut, RotateCw, Palette, ZoomIn } from 'lucide-solid'
import { Button } from './ui/button'

/**
 * ImageViewer component - Displays Current Image with some options
 * Allows users to see the current picture
 */
const ImageViewer: Component = () => {
    return (
        <div
            class="relative flex-1 bg-transparent overflow-hidden flex items-center justify-center"
            role="main"
            aria-label="Image viewer"
        >
            {/* Zoom and Filter Controls */}
            <div
                class={`absolute top-4 right-4 flex gap-2 z-10 transition-opacity duration-300`}
                role="toolbar"
                aria-label="Image controls"
            >
                <Button
                    variant="ghost"
                    size="sm"
                    class="bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black backdrop-blur-xl shadow-sm text-gray-700 dark:text-gray-200"
                    aria-label="Zoom out (Ctrl + -)"
                    title="Zoom out (Ctrl + -)"
                >
                    <ZoomOut class="w-4 h-4" />
                </Button>
                <div
                    class="bg-white/90 dark:bg-black/90 backdrop-blur-xl px-3 py-1.5 rounded-md text-sm shadow-sm min-w-[60px] text-center text-gray-900 dark:text-white"
                    role="status"
                    aria-live="polite"
                    aria-label={`Zoom level 12% percent`}
                >
                    12%
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    class="bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black backdrop-blur-xl shadow-sm text-gray-700 dark:text-gray-200"
                    aria-label="Zoom in (Ctrl + +)"
                    title="Zoom in (Ctrl + +)"
                >
                    <ZoomIn class="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
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
                    class={`backdrop-blur-xl shadow-sm bg-blue-500/90 text-white hover:bg-blue-600/90`}
                    aria-label={`Disable black and white filter (B)`}
                    title={`Black & White (B)`}
                >
                    <Palette class="w-4 h-4" />
                </Button>
            </div>

            {/* Image Display */}
            <div class="w-full h-full flex items-center justify-center p-8">
                <img
                    src="https://fastly.picsum.photos/id/112/200/300.jpg"
                    alt="https://fastly.picsum.photos/id/112/200/300.jpg"
                    class="max-w-full max-h-full object-contain shadow-2xl"
                    style={{
                        transform: `scale(100) rotate(0deg)`,
                        filter: 'none',
                        transition: 'transform 0.2s ease, filter 0.2s ease'
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
