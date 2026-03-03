import { createSignal, type Component } from 'solid-js' // import { type Component, createSignal } from 'solid-js'
import type { SetStoreFunction } from 'solid-js/store'
import { Button } from './ui/button'
import SidebarFolderList from './FolderList'
import { findIndexPath } from '../lib/folderStrukHelpers'

interface FolderSidebarProps {
    onFolderSelect: (folderId: string) => void
    onFileSelect: (folderId: string) => void
    onOpenFolder: () => void
    selectedFolder: string
    folderStruk: FolderItem
    setFolderStruk: SetStoreFunction<FolderItem>
}

/**
 * FolderSidebar component - Displays folder structure and special collections
 * Allows users to create, delete, and organize custom folders
 */
const FolderSidebar: Component<FolderSidebarProps> = (props) => {
    const [isCreating, setIsCreating] = createSignal<boolean>(false)
    const [newFolderName, setNewFolderName] = createSignal<string>('')
    const [folders] = createSignal([
        { id: 'marked', name: 'Marked', type: 'special', count: 0, expanded: false }
    ])

    const handleOpenFolder = (): void => {
        console.log('renderer/app/folderSidebar/handleOpenFolder()')
        props.onOpenFolder()
    }

    // const handleCreateFolder = (): void => {
    //     if (newFolderName().trim()) {
    //         const newFolder = {
    //             id: `folder-${Date.now()}`,
    //             name: newFolderName(),
    //             type: 'folder',
    //             count: 0,
    //             expanded: false
    //         }
    //         setFolders((prev) => [...prev, newFolder])
    //         setNewFolderName('')
    //         setIsCreating(false)
    //     }
    // }

    const toggleExpanded = (folderId: string): void => {
        // locate the index path into the store
        const idxPath = findIndexPath(props.folderStruk, folderId)
        if (idxPath === null) return

        // build the setter path ['childs', i, 'childs', j, ..., 'folderStats', 'expanded']
        const setPath: Array<string | number> = []
        idxPath.forEach((i) => {
            setPath.push('childs', i)
        })
        setPath.push('folderStats', 'expanded')

        // spread an any tuple since SetStoreFunction has overloads
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(props.setFolderStruk as any)(...setPath, (v: boolean) => !v)
    }

    // const handleDeleteFolder = (id: string): void => {
    //     if (id !== 'current' && id !== 'marked') {
    //         setFolderStruk((prev) => prev.filter((f) => f.id !== id))
    //     }
    // }

    return (
        <nav
            class="w-64 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-r border-white/20 dark:border-black/20 overflow-y-auto"
            aria-label="Folder navigation"
            role="navigation"
        >
            <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Folders</h3>
                    {/* <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCreating(!isCreating())}
                        class="h-7 w-7 p-0 hover:bg-white/40 dark:hover:bg-black/40"
                        aria-label="Create new folder (Cmd + N)"
                        title="New Folder (Cmd + N)"
                    >
                        <FolderPlus class="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </Button> */}
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
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter') handleCreateFolder()
                            //     if (e.key === 'Escape') {
                            //         setIsCreating(false)
                            //         setNewFolderName('')
                            //     }
                            // }}
                            placeholder="Folder name"
                            class="w-full px-2 py-1 text-sm bg-white/70 dark:bg-black/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded border border-white/30 dark:border-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            autofocus
                            aria-label="New folder name"
                        />
                        <div class="flex gap-1 mt-2">
                            <Button
                                size="sm"
                                // onClick={handleCreateFolder}
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
                    {/* Handle empty FolderStruk, not chosen Working Directory */}
                    {props.folderStruk.name === 'initialFolder_0988' ? (
                        <li>
                            <button
                                class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group bg-blue-500/80 text-white shadow-sm"
                                onClick={handleOpenFolder}
                            >
                                Open new Folder
                            </button>
                        </li>
                    ) : (
                        /* Handle filled FolderStruk, chosen Working Directory */
                        <SidebarFolderList
                            onFolderSelect={props.onFolderSelect}
                            onFileSelect={props.onFileSelect}
                            onToggleExpanded={toggleExpanded}
                            folderItem={props.folderStruk}
                            selectedFolder={props.selectedFolder}
                        />
                    )}
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
