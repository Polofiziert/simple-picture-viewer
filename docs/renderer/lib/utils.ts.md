# `utils.ts` (renderer lib)

**TLDR;**
Small utility that merges Tailwind CSS class names using `clsx` and `tailwind-merge`. Exposed as `cn` for convenient class composition in JSX.

---

## Function

```ts
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
```

* `ClassValue` is imported from `clsx` and can be strings, objects, arrays, etc.
* `clsx` concatenates conditional class names; `twMerge` eliminates Tailwind CSS conflicts (e.g. `p-2 p-4` → `p-4`).

## Usage

This helper is used throughout the renderer components when classes need to be computed dynamically (e.g. toggling active states).

## Notes

The function is intentionally lightweight and without side effects. If additional helpers become necessary (e.g. theming), they can be added to this module.

