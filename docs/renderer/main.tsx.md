# `main.tsx` (renderer entry point)

**TLDR;**
Bootstrap file for the SolidJS renderer. Renders the `<App />` component into the DOM and applies global styles. Also initializes drag-and-drop prevention and theme detection.

---

## Responsibilities

* Import and inject CSS (Tailwind and custom).
* Prevent default drag-and-drop behavior on the `document` to avoid unwanted file loads.
* Render the `App` component into the element with id `root`.
* (Optionally) initialize theme detection or other global listeners.

```ts
import { render } from 'solid-js/web'
import App from './App'
import './index.css'

render(() => <App />, document.getElementById('root') as HTMLElement)
```

## Notes

* This file is intentionally minimal; global event handlers should be added here rather than inside components when they affect the whole application.
* The `env.d.ts` declaration file provides types for `window.api` and other globals.

