# Project Documentation Overview 📁

Welcome to the documentation for **Simple Picture Viewer**. This directory contains detailed, GitHub-style Markdown documentation covering every source file under `/src`, plus architecture overviews and flow diagrams.

## Structure

```
docs/
├─ architecture/
│  ├─ algorithms.md
│  ├─ ipc-protocols.md
│  └─ signal-flows.md
├─ main/
│  ├─ filesystem.ts.md
│  ├─ imageRender.ts.md
│  ├─ filesystemHandlers.ts.md
│  ├─ windowHandlers.ts.md
│  └─ index.ts.md
├─ preload/
│  ├─ index.ts.md
│  └─ index.d.ts.md
├─ renderer/
│  ├─ App.tsx.md
│  ├─ main.tsx.md
│  ├─ env.d.ts.md
│  ├─ lib/
│  │  ├─ utils.ts.md
│  │  └─ folderStrukHelpers.ts.md
│  └─ components/
│     ├─ CustomWindowBar.tsx.md
│     ├─ DetailsPanel.tsx.md
│     ├─ FolderSidebar.tsx.md
│     ├─ FolderList.tsx.md
│     ├─ FolderItem.tsx.md
│     ├─ ImageCarousel.tsx.md
│     ├─ ImageViewer.tsx.md
│     ├─ Versions.tsx.md
│     └─ ui/
│        ├─ button.tsx.md
│        ├─ label.tsx.md
│        └─ progress.tsx.md
├─ types/
│  └─ filesystem.d.ts.md
└─ overview.md
```

## How to use

* Open the markdown files to read detailed explanations including TLDR summaries, API descriptions, diagrams, and notes.
* The `architecture` folder contains high-level diagrams of algorithms, IPC protocols, and reactive signal flows.
* File-specific docs correspond one-to-one with source files and are intended to be kept in sync with code changes.

Feel free to suggest improvements or request deeper explanations in areas of interest.

