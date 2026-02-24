import { type Component, For } from 'solid-js'
import { Star, ChevronLeft, ChevronRight } from 'lucide-solid'

import { Button } from './ui/button'

interface ImageCarouselProps {
    images: Array<{
        id: number
        src: string
        name: string
        marked: boolean
    }>
    currentIndex: number
}

/**
 * ImageCarousel component - Displays images in current set in a horizontal list.
 * Allows users chose the current image
 */
const ImageCarousel: Component<ImageCarouselProps> = (props) => {
    let scrollContainerRef!: HTMLDivElement
    let currentThumbnailRef!: HTMLButtonElement

    return (
        <div
            class="h-32 bg-white/40 dark:bg-black/40 backdrop-blur-xl border-t border-white/20 dark:border-black/20 relative"
            role="region"
            aria-label="Image carousel"
        >
            {/* Previous Button */}
            <div class="absolute left-0 top-0 bottom-0 flex items-center z-10 pl-2">
                <Button
                    variant="ghost"
                    size="sm"
                    class="h-20 w-10 bg-white/90 dark:bg-black/90 backdrop-blur-xl hover:bg-white dark:hover:bg-black shadow-lg disabled:opacity-40 group"
                    aria-label="Previous image"
                    title="Previous (←)"
                >
                    <ChevronLeft class="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <span class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        ←
                    </span>
                </Button>
            </div>

            {/* Carousel Container */}
            <div
                class="h-full overflow-x-auto overflow-y-hidden scroll-smooth"
                style={{ 'scrollbar-width': 'none' }}
            >
                <div class="flex items-center gap-3 p-4 h-full justify-start min-w-max px-16">
                    <For each={props.images}>
                        {(item, index) => (
                            <button
                                ref={
                                    index() === props.currentIndex ? currentThumbnailRef : undefined
                                }
                                class={`relative flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden transition-all ${
                                    props.currentIndex === index()
                                        ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent scale-110'
                                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                                }`}
                                aria-label={`${item.name}${item.marked ? ' (marked)' : ''}`}
                                aria-current={props.currentIndex === index() ? 'true' : 'false'}
                                tabIndex={props.currentIndex === index() ? 0 : -1}
                            >
                                <img
                                    src={item.src}
                                    alt={item.name}
                                    class="w-full h-full object-cover"
                                />
                                {item.marked && (
                                    <div
                                        class="absolute top-1 right-1 bg-blue-500 rounded-full p-0.5"
                                        aria-label="Marked"
                                    >
                                        <Star class="w-3 h-3 text-white fill-current" />
                                    </div>
                                )}
                            </button>
                        )}
                    </For>
                </div>
            </div>

            {/* Next Button */}
            <div class="absolute right-0 top-0 bottom-0 flex items-center z-10 pr-2">
                <Button
                    variant="ghost"
                    size="sm"
                    class="h-20 w-10 bg-white/90 dark:bg-black/90 backdrop-blur-xl hover:bg-white dark:hover:bg-black shadow-lg disabled:opacity-40 group"
                    aria-label="Next image"
                    title="Next (→)"
                >
                    <ChevronRight class="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    <span class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        →
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default ImageCarousel
