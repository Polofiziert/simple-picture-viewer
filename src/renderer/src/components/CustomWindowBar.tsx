import { type Component, For } from 'solid-js'
import { Star, Tag, Folder, ChevronLeft, ChevronRight, PanelLeft, PanelRight } from 'lucide-solid'

import { Button } from '~/components/ui/button'

interface CustomWindowBarProps {
    currentImage: {
        name: string
        marked: boolean
        category: string[]
    }
    onMarkToggle: () => void
    onCategoryChange: (category: string) => void
    onNavigate: (direction: 'prev' | 'next') => void
    hasNext: boolean
    hasPrev: boolean
    showFolderSidebar: boolean
    showDetailsSidebar: boolean
    onToggleFolderSidebar: () => void
    onToggleDetailsSidebar: () => void
}

/**
 * CustomWindowBar component - macOS-style window bar with traffic lights and controls
 * Provides navigation, marking, categorization, and view toggle functionality
 */
const CustomWindowBar: Component<CustomWindowBarProps> = (props) => {
    const categories = ['Nature', 'Landscape', 'Urban', 'Travel', 'Favorites']

    return (
        <header
            class="h-14 bg-white/40 dark:bg-black/40 backdrop-blur-xl border-b border-white/20 dark:border-black/20 flex items-center justify-between px-4 select-none"
            role="banner"
            style={{ '-webkit-app-region': 'drag' }}
        >
            {/* macOS Traffic Lights */}
            <div style={{ '-webkit-app-region': 'no-drag' }} class="flex items-center gap-2">
                <div class="flex gap-2" role="group" aria-label="Window controls">
                    <button
                        class="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 cursor-pointer"
                        aria-label="Close window"
                        title="Close"
                        onClick={() => window.api.windowControll.close()}
                    />
                    <button
                        class="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 cursor-pointer"
                        aria-label="Minimize window"
                        title="Minimize"
                        onClick={() => window.api.windowControll.minimize()}
                    />
                    <button
                        class="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 cursor-pointer"
                        aria-label="Maximize window"
                        title="Maximize"
                        onClick={() => window.api.windowControll.maximize()}
                    />
                </div>

                <div class="flex items-center gap-1 ml-4" role="toolbar" aria-label="View controls">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={props.onToggleFolderSidebar}
                        class={`h-8 px-2 transition-all ${
                            props.showFolderSidebar
                                ? 'bg-blue-500/80 text-white hover:bg-blue-600/80'
                                : 'bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 text-gray-700 dark:text-gray-200'
                        }`}
                        aria-label={`${props.showFolderSidebar ? 'Hide' : 'Show'} folder sidebar (Cmd + Shift + F)`}
                        title={`${props.showFolderSidebar ? 'Hide' : 'Show'} Folders (⌘⇧F)`}
                        aria-pressed={props.showFolderSidebar}
                    >
                        <PanelLeft class="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={props.onToggleDetailsSidebar}
                        class={`h-8 px-2 transition-all ${
                            props.showDetailsSidebar
                                ? 'bg-blue-500/80 text-white hover:bg-blue-600/80'
                                : 'bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 text-gray-700 dark:text-gray-200'
                        }`}
                        aria-label={`${props.showDetailsSidebar ? 'Hide' : 'Show'} details sidebar (Cmd + Shift + D)`}
                        title={`${props.showDetailsSidebar ? 'Hide' : 'Show'} Details (⌘⇧D)`}
                        aria-pressed={props.showDetailsSidebar}
                    >
                        <PanelRight class="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Center Controls */}
            <div
                style={{ '-webkit-app-region': 'no-drag' }}
                class="flex items-center gap-4"
                role="toolbar"
                aria-label="Image controls"
            >
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => props.onNavigate('prev')}
                    disabled={!props.hasPrev}
                    class="h-8 px-2 bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 text-gray-700 dark:text-gray-200 disabled:opacity-40"
                    aria-label="Previous image (Left arrow)"
                    title="Previous (←)"
                >
                    <ChevronLeft class="w-4 h-4" />
                </Button>

                <div class="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={props.onMarkToggle}
                        class={`h-8 px-3 ${
                            props.currentImage.marked
                                ? 'bg-blue-500/80 text-white hover:bg-blue-600/80'
                                : 'bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 text-gray-700 dark:text-gray-200'
                        }`}
                        aria-label={`${props.currentImage.marked ? 'Unmark' : 'Mark'} image (Space)`}
                        title={`${props.currentImage.marked ? 'Unmark' : 'Mark'} (Space)`}
                        aria-pressed={props.currentImage.marked}
                    >
                        <Star
                            class={`w-4 h-4 mr-2 ${props.currentImage.marked ? 'fill-current' : ''}`}
                            aria-hidden="true"
                        />
                        Mark
                    </Button>

                    <div class="relative group">
                        <Button
                            variant="ghost"
                            size="sm"
                            class="h-8 px-3 bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 text-gray-700 dark:text-gray-200"
                            aria-label={`Category: ${props.currentImage.category || 'None'} (C)`}
                            aria-haspopup="menu"
                            title={`Category (C)`}
                        >
                            <Tag class="w-4 h-4 mr-2" aria-hidden="true" />
                            {props.currentImage.category || 'Category'}
                            Category
                        </Button>
                        <ul
                            class="absolute top-full left-0 mt-1 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-md shadow-lg border border-white/20 dark:border-black/20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[140px]"
                            role="menu"
                            aria-label="Category menu"
                        >
                            <For each={categories}>
                                {(item, index) => (
                                    <li role="none">
                                        <button
                                            onClick={() => props.onCategoryChange(item)}
                                            class="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-blue-500/80 hover:text-white transition-colors"
                                            role="menuitem"
                                        >
                                            {index() + ' ' + item}
                                        </button>
                                    </li>
                                )}
                            </For>
                        </ul>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => props.onNavigate('next')}
                    disabled={!props.hasNext}
                    class="h-8 px-2 bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70 text-gray-700 dark:text-gray-200 disabled:opacity-40"
                    aria-label="Next image (Right arrow)"
                    title="Next (→)"
                >
                    <ChevronRight class="w-4 h-4" />
                </Button>
            </div>

            {/* Right Side */}
            <div style={{ '-webkit-app-region': 'no-drag' }} class="flex items-center gap-2">
                <Folder class="w-4 h-4 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                <span class="text-sm text-gray-700 dark:text-gray-200">
                    {props.currentImage.name}
                </span>
            </div>
        </header>
    )
}

export default CustomWindowBar
