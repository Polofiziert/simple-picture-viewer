import { createSignal, type Component, For } from 'solid-js' // import { type Component, createSignal } from 'solid-js'
import { Folder, FolderPlus, Star, ChevronDown, ChevronRight, Trash2 } from 'lucide-solid' // import { Folder, FolderPlus, Star, Trash2, ChevronRight, ChevronDown } from 'lucide-solid'
import { Button } from './ui/button'

interface FolderItem {
    id: string
    name: string
    type: 'folder' | 'special'
    count?: number
    expanded?: boolean
}

interface FolderSidebarProps {
    onFolderSelect: (folderId: string) => void
    selectedFolder: string
}

/**
 * FolderSidebar component - Displays folder structure and special collections
 * Allows users to create, delete, and organize custom folders
 */
const FolderSidebar: Component<FolderSidebarProps> = (props) => {
    const [isCreating, setIsCreating] = createSignal<boolean>(false)
    const [newFolderName, setNewFolderName] = createSignal<string>('')
    const [folders, setFolders] = createSignal<FolderItem[]>([
        { id: 'current', name: 'Current Folder', type: 'folder', count: 6, expanded: true },
        { id: 'marked', name: 'Marked', type: 'special', count: 0, expanded: false }
    ])

    const handleCreateFolder = () => {
        if (newFolderName().trim()) {
            const newFolder: FolderItem = {
                id: `folder-${Date.now()}`,
                name: newFolderName(),
                type: 'folder',
                count: 0,
                expanded: false
            }
            setFolders((prev) => [...prev, newFolder])
            setNewFolderName('')
            setIsCreating(false)
        }
    }

    const toggleExpanded = (id: string) => {
        setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, expanded: !f.expanded } : f)))
    }

    const handleDeleteFolder = (id: string) => {
        if (id !== 'current' && id !== 'marked') {
            setFolders((prev) => prev.filter((f) => f.id !== id))
        }
    }

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
                        onClick={() => setIsCreating(!isCreating())}
                        class="h-7 w-7 p-0 hover:bg-white/40 dark:hover:bg-black/40"
                        aria-label="Create new folder (Cmd + N)"
                        title="New Folder (Cmd + N)"
                    >
                        <FolderPlus class="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </Button>
                </div>

                {isCreating() && (
                    <div
                        class="mb-3 p-2 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg"
                        role="form"
                    >
                        <label for="new-folder-name" class="sr-only">
                            New folder name
                        </label>
                        <input
                            id="new-folder-name"
                            type="text"
                            value={newFolderName()}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleCreateFolder()
                                if (e.key === 'Escape') {
                                    setIsCreating(false)
                                    setNewFolderName('')
                                }
                            }}
                            placeholder="Folder name"
                            class="w-full px-2 py-1 text-sm bg-white/70 dark:bg-black/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded border border-white/30 dark:border-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            autofocus
                            aria-label="New folder name"
                        />
                        <div class="flex gap-1 mt-2">
                            <Button
                                size="sm"
                                onClick={handleCreateFolder}
                                class="flex-1 h-7 text-xs bg-blue-500 hover:bg-blue-600 text-white"
                                aria-label="Create folder"
                            >
                                Create
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                    setIsCreating(false)
                                    setNewFolderName('')
                                }}
                                class="flex-1 h-7 text-xs hover:bg-white/40 dark:hover:bg-black/40 text-gray-700 dark:text-gray-200"
                                aria-label="Cancel"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                <ul class="space-y-1" role="list">
                    <li>
                        <For each={folders()}>
                            {/* property id is removed for ts, (folder, id) or (item, index) */}
                            {(folder) => (
                                <li id={folder.id}>
                                    <button
                                        onClick={() => props.onFolderSelect(folder.id)}
                                        class={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group ${
                                            props.selectedFolder === folder.id
                                                ? 'bg-blue-500/80 text-white shadow-sm'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-black/40'
                                        }`}
                                        aria-label={`${folder.name}, ${folder.count} items`}
                                        aria-current={
                                            props.selectedFolder === folder.id ? 'page' : undefined
                                        }
                                    >
                                        <div class="flex items-center gap-2 flex-1 min-w-0">
                                            {folder.type === 'special' ? (
                                                <Star
                                                    class="w-4 h-4 flex-shrink-0 fill-current"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            toggleExpanded(folder.id)
                                                        }}
                                                        class="flex-shrink-0"
                                                        aria-label={
                                                            folder.expanded
                                                                ? 'Collapse folder'
                                                                : 'Expand folder'
                                                        }
                                                        aria-expanded={folder.expanded}
                                                    >
                                                        {folder.expanded ? (
                                                            <ChevronDown
                                                                class="w-3 h-3"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <ChevronRight
                                                                class="w-3 h-3"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </button>
                                                    <Folder
                                                        class="w-4 h-4 flex-shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                            <span class="truncate">{folder.name}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            {folder.count !== undefined && (
                                                <span
                                                    class="text-xs opacity-70"
                                                    aria-label={`${folder.count} items`}
                                                >
                                                    {folder.count}
                                                </span>
                                            )}
                                            {folder.type === 'folder' &&
                                                folder.id !== 'current' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleDeleteFolder(folder.id)
                                                        }}
                                                        class="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        aria-label={`Delete ${folder.name} folder (Delete)`}
                                                        title="Delete folder (Delete)"
                                                    >
                                                        <Trash2
                                                            class="w-3 h-3"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                )}
                                        </div>
                                    </button>
                                </li>
                            )}
                        </For>
                    </li>
                </ul>
                {folders.length === 2 && (
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-4 px-3">
                        Create custom folders to organize your images
                    </p>
                )}
            </div>
        </nav>
    )
}

export default FolderSidebar
