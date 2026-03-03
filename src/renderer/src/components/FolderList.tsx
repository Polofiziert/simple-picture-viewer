import { type Component, For, Show } from 'solid-js' // import { type Component, createSignal } from 'solid-js'
import SidebarFolderItem from './FolderItem'

interface SidebarFolderListProps {
    onFolderSelect: (folderId: string) => void
    onFileSelect: (folderId: string) => void
    onToggleExpanded: (folderId: string) => void
    folderItem: FolderItem
    selectedFolder: string
    depth?: number
}

const SidebarFolderList: Component<SidebarFolderListProps> = (props) => {
    const depth = props.depth ?? 0

    return (
        <>
            <For each={props.folderItem?.childs}>
                {/* property id is removed for ts, (folder, id) or (item, index) */}
                {(child) => (
                    <>
                        <li id={`${child.id}`} style={{ 'padding-left': `${depth * 12}px` }}>
                            <SidebarFolderItem
                                child={child}
                                onItemSelect={
                                    child.type === 'folder'
                                        ? props.onFolderSelect
                                        : props.onFileSelect
                                }
                                selectedFolder={props.selectedFolder}
                                toggleExpanded={props.onToggleExpanded}
                            />
                        </li>
                        {/* Recursively render nested items if folder is expanded and has children */}
                        <Show
                            when={
                                child.type === 'folder' &&
                                child.folderStats?.expanded &&
                                child.childs?.length
                            }
                        >
                            <SidebarFolderList
                                folderItem={child}
                                onFolderSelect={props.onFolderSelect}
                                onFileSelect={props.onFileSelect}
                                onToggleExpanded={props.onToggleExpanded}
                                selectedFolder={props.selectedFolder}
                                depth={depth + 1}
                            />
                        </Show>
                    </>
                )}
            </For>
        </>
    )
}

export default SidebarFolderList
