# Algorithm Overview ⚙️

This document collects the self-implemented algorithms found in the source tree. It is intended for maintainers who need to understand or modify core logic.

## Folder Traversal & Thumbnail Generation

The `makeFolderStructure` function in `src/main/lib/filesystem.ts` performs a depth-first traversal of a directory and constructs a `FolderItem` tree. Key characteristics:

* Uses `fs.promises.readdir` to list entries.
* Distinguishes files from folders via filename regex (`/.+\..+/`).
* Emits progress events on each iteration to allow UI feedback.
* Recursively processes subfolders, merging their `childs` into the parent.
* For each file, gathers stats and generates two thumbnails (small and big) using `sharp` via `imageRender`.

A state diagram for recursion appears in the `filesystem.ts` documentation.

### Potential improvements

* Precompute total item count before emitting progress events to provide accurate `items` value.
* Replace regex-based file detection with a call to `fs.stat` and checking `isFile()` to handle edge cases (folders with dots in name, hidden files, etc.).

## Tree Search Helpers

The renderer includes three recursive helpers:

* `findPath` – returns an array of IDs from root to a target node.
* `findIndexPath` – same but returns child indices.
* `getFolder` – follows a provided ID path to retrieve a node.

These implement basic DFS without pruning and are used by UI components for selection/navigation.

## Thumbnail Path Computation

`getThumbnailPath` provides a deterministic mapping from a UUID and size label to a file path in the temp cache. This algorithm is trivial but central to keeping thumbnails organized.

## Miscellaneous

* `cleanTempFolder` deletes the entire cache directory recursively. No additional logic is applied.

Further algorithmic behavior (e.g. UI rendering) is delegated to third-party libraries and therefore not documented here.

