import { type Component, createSignal } from 'solid-js'
import { Folder, FolderPlus, Star, Trash2, ChevronRight, ChevronDown } from 'lucide-solid'
import { Button } from './ui/button'

/*
interface FolderItem {
    id: string
    name: string
    type: 'folder' | 'special'
    count?: number
    expanded?: boolean
}

interface FolderSidebarProps {
  onFolderSelect: (folderId: string) => void;
  selectedFolder: string;
}
*/

/**
 * FolderSidebar component - Displays folder structure and special collections
 * Allows users to create, delete, and organize custom folders
 */
const FolderSidebar: Component = () => {
    return (
        <nav
            class="w-64 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-r border-white/20 dark:border-black/20 overflow-y-auto"
            aria-label="Folder navigation"
            role="navigation"
        >
            <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Folders</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        class="h-7 w-7 p-0 hover:bg-white/40 dark:hover:bg-black/40"
                        aria-label="Create new folder (Cmd + N)"
                        title="New Folder (Cmd + N)"
                    >
                        <FolderPlus class="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </Button>
                </div>

                <ul class="space-y-1" role="list">
                    <li>
                        <button
                            // Line From KI Orig missing
                            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-black/40"
                            aria-label="folderName, folderCount items"
                            aria-current="page"
                        >
                            <div class="flex items-center gap-2 flex-1 min-w-0">
                                <Folder class="w-4 h-4 flex-shrink-0" />
                                <span class="truncate">folderName</span>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default FolderSidebar
