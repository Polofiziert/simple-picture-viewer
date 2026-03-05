# `DetailsPanel.tsx`

**TLDR;**
Pane showing metadata for the currently selected image: name, size, dimensions, modified date, format, category, and marked status. Rendered in the right sidebar.

---

## Props

```ts
interface DetailsPanelProps {
    name: string
    size: number
    dimensions: string
    dateModified: Date
    format: string
    category: string[]
    marked: boolean
}
```

## Layout

* Sections for file info, format, category, and status.
* Uses Lucide icons for each property.
* Size is displayed in both MiB and MB with helper math.

## Accessibility

* Each section uses semantic markup (`<section>` with headings and labels).
* `aria-label` and `role` attributes ensure screen-reader compatibility.

