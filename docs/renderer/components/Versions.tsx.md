# `Versions.tsx`

**TLDR;**
Debug component showing Electron/Chromium/Node versions and simple dark mode toggles. Used for development/testing and not part of the production UI.

---

## Features

* Reads `window.electron.process.versions` via preload and displays them in a list.
* Tracks dark mode state with `window.api.windowControll.darkMode.state()` and provides buttons to toggle or reset system theme.

## Signals

* `versions` – single‑use signal storing the version collection.
* `isDarkMode` – signal holding the current theme source string.

## Notes

This component is commented out in `App.tsx` but retained for debugging quick environment checks. It demonstrates usage of the preload-exposed APIs.

