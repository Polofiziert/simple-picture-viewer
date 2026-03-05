# `ImageCarousel.tsx`

**TLDR;**
Horizontal scrollable list of image thumbnails with previous/next buttons. Automatically centers the currently selected thumbnail and notifies parent of selection/navigations.

---

## Props

```ts
interface ImageCarouselProps {
    images: Array<{ index:number; id:string; src:string; name:string; marked:boolean }>
    currentIndex: number
    onSelect: (index: number) => void
    onNavigate: (direction: 'prev'|'next') => void
}
```

## Behavior

* Maintains refs to the scroll container and each thumbnail.
* A `createEffect` tracks `currentIndex` and scrolls the container to center that thumbnail.
* `handlePrev`/`handleNext` call `onNavigate` if within bounds.
* Clicking a thumbnail invokes `onSelect`.

## Styling

* Uses Tailwind for layout and transition effects.
* Current thumbnail gets a ring and scale transform.
* Prev/Next buttons overlay the carousel edges and display arrow hints on hover.

