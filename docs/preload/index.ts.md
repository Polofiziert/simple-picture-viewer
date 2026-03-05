# `preload/index.ts`

**TLDR;**
Builds a safe bridge between the Electron main process and the renderer process by exposing a curated API via `contextBridge`. Defines window controls, filesystem opening, and progress event subscriptions. Handles both context-isolated and non-isolated environments.

---

## Description

This script runs in the preload context. It imports `ipcRenderer` and the helper `electronAPI` from the official toolkit. Custom APIs are defined in the `api` object, which is exposed globally under `window.api` when context isolation is enabled (via `contextBridge.exposeInMainWorld`), or directly attached to `window` otherwise.

### API surface

* `windowControll` – methods `minimize`, `maximize`, `close`, and nested `darkMode` helpers (`toggle`, `system`, `state`) that invoke IPC channels.
* `fsControll.openFolder()` – invokes `dialog:openFolder` to open a directory.
* `pictureRender.progressState(callback)` – registers a listener on `'picRender:progress-state'` and forwards values to the provided callback.

An additional `'port'` listener demonstrates handling of `MessagePort` objects but is unused.

## IPC Events Courtesy of Preload

| Channel                  | Direction      | Payload                              | Description                                    |
|--------------------------|----------------|--------------------------------------|------------------------------------------------|
| `window-minimize`        | renderer→main  | none                                 | Ask main to minimize window                    |
| `dialog:openFolder`      | renderer→main  | none                                 | Request folder dialog; returns `HandleFolderOpenResponse` |
| `picRender:progress-state` | main→renderer | `{isProgress, items, itemsDone}`     | Sent by main to update thumbnail generation progress |
| `dark-mode:*`            | renderer→main  | none / returns string                | Dark mode controls                              |

(See `ipc-protocols.md` for full diagram.)

## Signal Flow

`pictureRender.progressState` is the only subscription interface in the preload; it wires the main's progress messages into renderer callbacks. This function is a key piece of the IPC protocol described in `docs/architecture/ipc-protocols.md`.

## TypeScript declarations

The preload directory also contains `index.d.ts` which exports shared types (`HandleFolderOpenResponse`, `ProgressState`) and augments the global `Window` interface. See `docs/preload/index.d.ts.md` for details.

