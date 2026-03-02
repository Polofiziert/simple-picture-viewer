import { type Component } from 'solid-js' // import { type Component, createSignal } from 'solid-js'
import { Folder, Star, ChevronDown, ChevronRight } from 'lucide-solid' // import { Folder, FolderPlus, Star, Trash2, ChevronRight, ChevronDown } from 'lucide-solid'
import { FolderItem } from './FolderSidebar'

interface SidebarFolderItemProps {
    child: FolderItem
    onFolderSelect: (folderId: string) => void
    toggleExpanded: (folderId: string) => void
    selectedFolder: string
}

const SidebarFolderItem: Component<SidebarFolderItemProps> = (props) => {
    return (
        <button
            onClick={() => props.onFolderSelect(props.child.id)}
            class={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group ${
                props.selectedFolder === props.child.id
                    ? 'bg-blue-500/80 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-black/40'
            }`}
            aria-label={`${props.child.name} items`}
            aria-current={props.selectedFolder === props.child.id ? 'page' : undefined}
        >
            <div class="flex items-center gap-2 flex-1 min-w-0">
                {props.child.type === 'file' ? (
                    <Star class="w-4 h-4 flex-shrink-0 fill-current" aria-hidden="true" />
                ) : (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                props.toggleExpanded(props.child.id)
                            }}
                            class="flex-shrink-0"
                            aria-label={
                                props.child.folderStats?.expanded
                                    ? 'Collapse folder'
                                    : 'Expand folder'
                            }
                            aria-expanded={props.child.folderStats?.expanded}
                        >
                            {props.child.folderStats?.expanded ? (
                                <ChevronDown class="w-3 h-3" aria-hidden="true" />
                            ) : (
                                <ChevronRight class="w-3 h-3" aria-hidden="true" />
                            )}
                        </button>
                        <Folder class="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    </>
                )}
                <span class="truncate">{props.child.name}</span>
            </div>
            <div class="flex items-center gap-2">
                {props.child.folderStats?.count !== undefined && (
                    <span
                        class="text-xs opacity-70"
                        aria-label={`${props.child.folderStats?.count} items`}
                    >
                        {props.child.folderStats?.count}
                    </span>
                )}
                {/* {child.type === 'folder' && child.id !== 'current' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDeleteFolder(child.id)
                                                    }}
                                                    class="opacity-0 group-hover:opacity-100 transition-opacity"
                                                    aria-label={`Delete ${child.name} folder (Delete)`}
                                                    title="Delete folder (Delete)"
                                                >
                                                    <Trash2 class="w-3 h-3" aria-hidden="true" />
                                                </button>
                                            )} */}
            </div>
        </button>
    )
}

export default SidebarFolderItem
