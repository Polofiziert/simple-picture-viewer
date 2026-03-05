# `label.tsx` (UI component)

**TLDR;**
Simple wrapper for the HTML `<label>` element adding common Tailwind styling for form labels. It accepts all standard label props.

---

The component splits props to allow passing a custom `class` and merges it with default styles via `cn`.

## Example

```tsx
<Label for="username">Username</Label>
```