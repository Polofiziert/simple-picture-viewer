# `FolderList.tsx`

**TLDR;**
Recursive component that renders a list of `FolderItem` objects. Delegates individual rendering to `SidebarFolderItem` and recurses when folders are expanded.

---

## Props

```ts
interface SidebarFolderListProps {
    onFolderSelect: (folderId: string) => void
    onFileSelect: (folderId: string) => void
    onToggleExpanded: (folderId: string) => void
    folderItem: FolderItem
    selectedFolder: string
    depth?: number
}
```

* `depth` controls indentation for nested levels (default 0).

## Behavior

* Iterates over `folderItem.childs` using `<For>`.
* For each child, renders a `<SidebarFolderItem>` inside an `<li>` with left padding based on depth.
* If a child is a folder and expanded, recursively renders another `SidebarFolderList` with `depth + 1`.

## Notes

This component is entirely presentational. All logic for expanding, selecting, and clicking is provided by the callbacks.

