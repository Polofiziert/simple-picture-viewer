# `index.d.ts` (preload type declarations)

**TLDR;**
Contains shared TypeScript types and global interface augmentations used by both the main and renderer processes. Defines the shape of IPC responses and the API exposed via `window.api`.

---

## Exports

* `HandleFolderOpenResponse` – union type for the result of the open-folder dialog (`{canceled:true}` or `{canceled:false, folderStruk: FolderItem}`).
* `ProgressState` – `{ isProgress: boolean; items: number; itemsDone: number }` describing thumbnail generation progress.

## Global Augmentations

```ts
declare global {
    interface WindowControll { ... }
    interface fsControll { ... }
    interface pictureRender { progressState(callback: (state: ProgressState) => void): void }
    interface API { windowControll: WindowControll; fsControll: fsControll; pictureRender: pictureRender }
}
```

These interfaces match the object shape created in `preload/index.ts` and allow the renderer code to import the types and use `window.api` safely.

## Notes

* The file also re‑exports types from renderer (e.g. `FolderItem`) via reference to `types/filesystem.d.ts` if needed; ensure that path is resolvable by TypeScript.
* Keeping these declarations in preload ensures both sides of the IPC channel agree on the contract without circular dependencies.

