import { createSignal, type Component, For } from 'solid-js' // import { type Component, createSignal } from 'solid-js'
import { Button } from './ui/button'
import SidebarFolderItem from './FolderItem'

interface FolderSidebarProps {
    onFolderSelect: (folderId: string) => void
    onOpenFolder: () => void
    selectedFolder: string
    folderStruk: FolderItem | undefined
}

interface FileStats {
    thumb: string
    thumBig: string
    size: number
    dimensions: string
    dateModified: Date
    format: string
    marked: boolean
    categorys: Array<string>
}

interface FolderStats {
    dateModifide: Date
    expanded: boolean
    count: number
}

export interface FolderItem {
    id: string
    src: string
    name: string
    type: 'file' | 'folder'
    folderStats?: FolderStats
    fileStats?: FileStats
    childs?: Array<FolderItem>
}

/**
 * FolderSidebar component - Displays folder structure and special collections
 * Allows users to create, delete, and organize custom folders
 */
const FolderSidebar: Component<FolderSidebarProps> = (props) => {
    // const folderStrukJson = JSON.parse(
    //     '{"id":0,"src":"/Users/polo/Pictures/TestBilder","name":"/Users/polo/Pictures/TestBilder","type":"folder","folderStats":{"dateModifide":"2026-02-27T20:23:08.806Z","expanded":false,"count":16},"childs":[{"id":1,"src":"/Users/polo/Pictures/TestBilder/AndererOrdner","name":"AndererOrdner","type":"folder","folderStats":{"dateModifide":"2026-02-27T20:23:08.808Z","expanded":false,"count":16},"childs":[{"id":1,"src":"/Users/polo/Pictures/TestBilder/AndererOrdner/AndrerO22","name":"AndrerO22","type":"folder","folderStats":{"dateModifide":"2026-02-27T20:23:08.807Z","expanded":false,"count":16},"childs":[{"id":0,"src":"/Users/polo/Pictures/TestBilder/AndererOrdner/AndrerO22/DSC_0116.JPG","name":"DSC_0116.JPG","type":"file","fileStats":{"thumb":"string","thumBig":"string","size":3863673,"dimensions":"string","dateModified":"2021-06-13T20:26:48.000Z","format":"string","marked":false,"categorys":[]}}]},{"id":2,"src":"/Users/polo/Pictures/TestBilder/AndererOrdner/DSC_0106.JPG","name":"DSC_0106.JPG","type":"file","fileStats":{"thumb":"string","thumBig":"string","size":11430071,"dimensions":"string","dateModified":"2021-06-13T19:24:22.000Z","format":"string","marked":false,"categorys":[]}}]},{"id":2,"src":"/Users/polo/Pictures/TestBilder/DSC_0106.JPG","name":"DSC_0106Fest.JPG","type":"file","fileStats":{"thumb":"string","thumBig":"string","size":11430071,"dimensions":"string","dateModified":"2021-06-13T19:24:22.000Z","format":"string","marked":false,"categorys":[]}},{"id":3,"src":"/Users/polo/Pictures/TestBilder/DSC_0107.JPG","name":"DSC_0107.JPG","type":"file","fileStats":{"thumb":"string","thumBig":"string","size":11073450,"dimensions":"string","dateModified":"2021-06-13T19:24:28.000Z","format":"string","marked":false,"categorys":[]}}]}'
    // )
    const [isCreating, setIsCreating] = createSignal<boolean>(false)
    const [newFolderName, setNewFolderName] = createSignal<string>('')
    // const [folderStruk, setFolderStruk] = createSignal<FolderItem>(folderStrukJson)
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

    const toggleExpanded = (id: string): void => {
        console.log('renderer/app/FolderSidebar: ', id)
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
                    {props.folderStruk?.childs?.length === 1 || props.folderStruk === undefined ? (
                        <li>
                            <button
                                class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group bg-blue-500/80 text-white shadow-sm"
                                onClick={handleOpenFolder}
                            >
                                Open new Folder
                            </button>
                        </li>
                    ) : (
                        <li>
                            <For each={props.folderStruk?.childs}>
                                {/* property id is removed for ts, (folder, id) or (item, index) */}
                                {(child) => (
                                    <li id={`${child.id}`}>
                                        <SidebarFolderItem
                                            child={child}
                                            onFolderSelect={props.onFolderSelect}
                                            selectedFolder={props.selectedFolder}
                                            toggleExpanded={toggleExpanded}
                                        />
                                    </li>
                                )}
                            </For>
                        </li>
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
