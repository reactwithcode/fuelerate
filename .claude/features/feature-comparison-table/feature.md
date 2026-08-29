# Comparison Table

## Brief

Build a custom Shopify section that displays a side-by-side product comparison table, matching the Figma designs for desktop and mobile:

- Desktop: https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-2405&t=4jOoUmIxKiys88Dy-0
- Mobile: https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-4012&t=4jOoUmIxKiys88Dy-0

### Section Header

The table is introduced by a headline and optional subtext that sets the context — for example, "How we stack up" or "Why choose Fuelerate?". These are fully editable via schema settings so the client can update the copy without touching code.

### Product Columns

The table has multiple columns — one per product being compared. Each column includes a product name and a visual indicator (logo or label) to distinguish Fuelerate from competitors. The number of columns is controlled by blocks in the schema, allowing the client to add or remove products from the customizer.

### Feature Rows

Each row represents a specific feature or attribute (e.g. "No artificial sweeteners", "Informed Sport certified", "Zero sugar"). Rows are defined as schema blocks so the client can manage them from the theme customizer. Each cell in a row displays either a checkmark (feature present), a cross (feature absent), or a custom text value — depending on what best represents the comparison.

### Visual Differentiation for the Brand Column

The Fuelerate column is visually highlighted to draw attention — for example with a distinct background color, border, or label like "Best choice". This is a static design treatment, not a dynamic toggle, to keep the implementation clean and predictable.

### Call-to-Action

The Fuelerate column includes a prominent CTA button (e.g. "Shop Now" or "Add to Cart") positioned at the top or bottom of the column. The button label and link are editable via schema settings.

### Mobile Layout

On small screens the table collapses to a horizontally scrollable layout so all columns remain visible without wrapping. The feature row labels are pinned to the left so the user always knows what each row refers to while scrolling sideways.

### Schema & Content Management

All visible text — headline, subtext, product names, feature row labels, button label, and button link — is managed through Shopify schema settings and blocks. Nothing is hardcoded. The section is available on any template via a preset so the client can add it wherever needed.

---

## Scoping Questions

[Do not write this manually. This section gets filled in by AI via the `/scope-feature` skill.
AI will write questions here for you to answer by checking boxes and adding notes.]

## Extended Brief

[Do not write this manually. This section gets filled in by AI via the `/scope-feature` skill, after you've answered the scoping questions above.]

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# feature.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
