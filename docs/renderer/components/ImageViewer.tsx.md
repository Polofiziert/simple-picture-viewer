# `ImageViewer.tsx`

**TLDR;**
Main image display area with interactive controls for zoom, rotation, and filters. Controls auto-hide when the mouse is idle or overlaps the image. Supports mouse wheel zoom and touchpad pinch.

---

## Props

```ts
interface ImageViewerProps {
    imageSrc: string
    imageAlt: string
}
```

## Local state (signals)

* `zoom` – scale factor (0.1–5).
* `rotation` – degrees (0, 90, 180, 270).
* `grayscale` – boolean filter flag.
* `isMouseMoving` and `controlsVisible` – manage control toolbar visibility.

## Event handling

* `wheel` events on container for zooming (differentiates ctrl/meta key for touchpad pinch).
* Mouse move and leave events to show/hide controls after inactivity.
* `resize` listener to check if controls overlap the image and hide if necessary.

## API methods

* `handleZoomMouse`, `handleZoomTouch` – update zoom.
* `handleRotate`, `handleGrayscale` – toggle properties.
* `handleZoomIn/Out/Reset` – button handlers.

## Rendering

* Container with `ref` to track events.
* Absolute positioned toolbar with Buttons for zoom, reset, rotate, grayscale; visibility controlled with `controlsVisible`.
* Image element using `props.imageSrc` as `src`.

## Notes

* The rotation and grayscale state are not yet applied to the image element—TODO comments exist.
* Touch zoom math is experimental and logs to console.

