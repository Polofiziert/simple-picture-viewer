# `button.tsx` (UI component)

**TLDR;**
Wrapper around `@kobalte/core`'s button primitive providing Tailwind-based styling variants (`default`, `destructive`, `outline`, etc.) and sizes. Exports a polymorphic `Button` component for consistent buttons across the app.

---

## Key concepts

* Uses `class-variance-authority` (`cva`) to define `buttonVariants` with variant/size options.
* `cn` utility merges computed classes with `props.class`.
* Component is polymorphic (`PolymorphicProps`) allowing it to render as different HTML elements.

## Usage

Used by almost every interactive element in the renderer. Examples:

```tsx
<Button variant="ghost" size="sm" onClick={...}>Next</Button>
```

---
