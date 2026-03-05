# `progress.tsx` (UI component)

**TLDR;**
Custom progress bar components built on `@kobalte/core/progress` primitives. Includes wrappers for root, label, and value label with our branding styles.

---

* `<Progress>` – root container accepting `value`, `minValue`, `maxValue`, and children.
* `<ProgressLabel>` – styled label for the progress component.
* `<ProgressValueLabel>` – styled value label showing current/total.

Used by `CustomWindowBar` to display rendering progress.

