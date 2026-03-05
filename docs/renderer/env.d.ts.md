# `env.d.ts`

**TLDR;**
Type declaration file for the renderer, extending global interfaces and providing ambient types for Electron-related objects (`window.api`, `window.electron`).

---

This file ensures that TypeScript understands the shape of APIs injected by the preload script. Typical contents include:

```ts
declare global {
  interface Window {
    api: API
    electron: ElectronAPI
  }
}

export {}
```

(Refer to the actual source in `src/renderer/src/env.d.ts` for the precise declarations.)

Users should reference this file in `tsconfig.web.json` via the `include` option so that the compiler picks up the global augmentation.

