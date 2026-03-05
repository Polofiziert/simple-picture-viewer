# `FolderSidebar.tsx`

**TLDR;**
Sidebar component displaying the folder tree and handling folder/file selection. Supports opening a new directory and toggling folder expansion. Communicates changes back to the parent via callback props.

---

## Props

```ts
interface FolderSidebarProps {
    onFolderSelect: (folderId: string) => void
    onFileSelect: (folderId: string) => void
    onOpenFolder: () => void
    selectedFolder: string
    folderStruk: FolderItem
    setFolderStruk: SetStoreFunction<FolderItem>
}
```

`setFolderStruk` is a SolidJS store setter used to mutate the tree when a folder is expanded. The component locally tracks UI state for creating new folders, though the creation logic is currently commented out.

## Behavior

* Shows an "Open new Folder" button when `folderStruk.name` equals `'initialFolder_0988'` (special placeholder). Otherwise renders a `SidebarFolderList` recursively.
* `toggleExpanded` computes a path to the target item using `findIndexPath` and flips its `folderStats.expanded` flag using the store setter.

## Signals

* `isCreating`, `newFolderName` – local signals for the create-folder form (mostly disabled).

## Notes

* The component mixes UI and folder-manipulation logic; expansion toggling could be extracted to helpers.
* Various pieces of code are commented out, indicating future work (folder creation, deletion).

