# `CustomWindowBar.tsx`

**TLDR;**
Custom title bar component styled like macOS with traffic light buttons, navigation controls, marking and categorization, and a progress indicator. Uses SolidJS signals for progress and props for everything else.

---

## Props

```ts
interface CustomWindowBarProps {
    currentImage: { id:string; name:string; marked:boolean; category:string[] }
    onMarkToggle: (id:string) => void
    onCategoryChange: (category:string) => void
    onNavigate: (direction:'prev'|'next') => void
    hasNext: boolean
    hasPrev: boolean
    showFolderSidebar: boolean
    showDetailsSidebar: boolean
    onToggleFolderSidebar: () => void
    onToggleDetailsSidebar: () => void
}
```

All interactions (opening sidebars, navigation, marking) are delegated to callbacks provided by the parent component, keeping this bar stateless except for progress.

## Internal state

* `const [progress, setProgress] = createSignal({isProgress:false, items:0, itemsDone:0})` – updated via IPC from preload.

## UI structure

* Left: traffic lights and view toggle buttons (folder/details).
* Center: previous/next navigation, mark toggle, category dropdown.
* Right: progress bar (`<Progress>` component), current folder icon, image filename.

TailwindCSS classes with dark mode and dynamic styles based on props.

## IPC / Signal flow

During component initialization, `window.api.pictureRender.progressState` is called with a callback that logs and updates the `progress` signal. This ties the UI to backend thumbnail rendering progress.

## Accessibility

* `role` attributes on containers (`banner`, `toolbar`, `group`).
* `aria-label`, `title`, and `aria-pressed` on interactive elements.

## Notes

* The category dropdown uses pure CSS hover to show the menu; this might not work on touch devices.
* The progress signal is never cleaned up (no unsubscribe); the listener lives for the lifetime of the page which is acceptable in this app.

