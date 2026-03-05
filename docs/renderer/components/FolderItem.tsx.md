# `FolderItem.tsx` (sidebar entry)

**TLDR;**
Represents a single folder or file entry in the sidebar. Displays icons, name, count, and handles selection/expansion toggles.

---

## Props

```ts
interface SidebarFolderItemProps {
    child: FolderItem
    onItemSelect: (itemId: string) => void
    toggleExpanded: (folderId: string) => void
    selectedFolder: string
}
```

* `onItemSelect` is called when the item itself is clicked.
* `toggleExpanded` is called when the expansion chevron is clicked (for folders).

## Features

* Shows a `Star` icon for files and marked items.
* Displays a `ChevronDown` / `ChevronRight` toggle for expandable folders.
* Applies styling when the item is the current selection.
* Displays folder count and optionally a delete button (commented out).

## Accessibility

* `aria-current` indicates the selected item.
* Buttons have `aria-label` and `aria-expanded` attributes.

