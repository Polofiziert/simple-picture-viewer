import { type Component } from 'solid-js'
import { ImageIcon, HardDrive, Ruler, Calendar } from 'lucide-solid'

interface DetailsPanelProps {
    image: {
        name: string
        size: string
        dimensions: string
        dateModified: string
        format: string
        category: string
        marked: boolean
    }
}

/**
 * DetailsPanel component - Displays metadata and information about the current image
 * Shows file properties, dimensions, modification date, and categorization status
 */
const DetailsPanel: Component<DetailsPanelProps> = (props) => {
    return (
        <aside
            class="w-80 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-l border-white/20 dark:border-black/20 overflow-y-auto"
            aria-label="Image details"
            role="complementary"
        >
            <div class="p-6">
                <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Details</h3>

                <div class="space-y-4">
                    {/* File Info */}
                    <section class="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <h4 class="sr-only">File Information</h4>

                        <div class="flex items-start gap-3 mb-3">
                            <ImageIcon
                                class="w-5 h-5 text-gray-600 dark:text-gray-300 mt-0.5"
                                aria-hidden="true"
                            />
                            <div class="flex-1 min-w-0">
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Name</p>
                                <p class="text-sm text-gray-900 dark:text-white break-words">
                                    {props.image.name}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3 mb-3">
                            <HardDrive
                                class="w-5 h-5 text-gray-600 dark:text-gray-300 mt-0.5"
                                aria-hidden="true"
                            />
                            <div class="flex-1">
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Size</p>
                                <p class="text-sm text-gray-900 dark:text-white">
                                    {props.image.size}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3 mb-3">
                            <Ruler
                                class="w-5 h-5 text-gray-600 dark:text-gray-300 mt-0.5"
                                aria-hidden="true"
                            />
                            <div class="flex-1">
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Dimensions
                                </p>
                                <p class="text-sm text-gray-900 dark:text-white">
                                    {props.image.dimensions}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-start gap-3">
                            <Calendar
                                class="w-5 h-5 text-gray-600 dark:text-gray-300 mt-0.5"
                                aria-hidden="true"
                            />
                            <div class="flex-1">
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Modified
                                </p>
                                <p class="text-sm text-gray-900 dark:text-white">
                                    {props.image.dateModified}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Format */}
                    <section class="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Format</p>
                        <p class="text-sm text-gray-900 dark:text-white"> {props.image.format}</p>
                    </section>

                    {/* Category */}
                    <section class="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Category</p>
                        <p class="text-sm text-gray-900 dark:text-white"> {props.image.category}</p>
                    </section>

                    {/* Marked Status */}
                    <section class="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                        <div class="flex items-center gap-2">
                            <div
                                class={`w-2 h-2 rounded-full ${'bg-gray-300 dark:bg-gray-600'}`}
                                role="status"
                                aria-label="iamge Marked"
                            />
                            <p class="text-sm text-gray-900 dark:text-white">
                                {' '}
                                {props.image.marked}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </aside>
    )
}

export default DetailsPanel
