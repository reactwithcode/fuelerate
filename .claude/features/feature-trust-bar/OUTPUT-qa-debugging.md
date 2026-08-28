# QA: Trust Bar

Feature spec: `.claude/features/feature-trust-bar/feature.md`
Implementation plan: `.claude/features/feature-trust-bar/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 1)

Status: Testing

### Core behavior

- [ ] Section appears in the customizer Add Section panel under the name "Trust Bar"
- [ ] Dropping the section onto a page renders a dark olive strip
- [ ] Default preset pre-fills 4 items with the correct label text (no icons by default)
- [ ] All 4 labels display correctly: "90-Day Results-Backed Guarantee", "Designed in USA", "Ships in 2–6 Days", "A Tree Planted per Order"
- [ ] Uploading an icon image to a block renders the icon at 36×36px next to the label
- [ ] Icon and label are vertically centered and separated by 8px gap

### Customizer controls

- [ ] Adding a new block adds a new item to the bar
- [ ] Removing a block removes the item from the bar
- [ ] Reordering blocks reorders the items in the bar
- [ ] Changing the background color updates the bar immediately in the preview
- [ ] Adjusting padding top/bottom changes the vertical spacing correctly
- [ ] Setting a block label to empty hides the label (icon only renders)
- [ ] Leaving a block icon empty hides the icon (label only renders)

### Edge cases

- [ ] Removing all blocks leaves the section with no visible output (no empty dark strip)
- [ ] A very long label text wraps rather than overflowing or getting clipped
- [ ] A block with neither icon nor label renders nothing visible

### Desktop layout

- [ ] All items are in a single horizontal row
- [ ] Items are evenly spaced across the full width (justify-between)
- [ ] Icons are 36×36px
- [ ] Label font is Figtree, white, 20px
- [ ] Section is vertically padded (~28px top and bottom)
- [ ] Inner content is centered and does not exceed ~1178px

### Mobile layout

- [ ] Items stack vertically, one per row
- [ ] Gap between stacked items is small (~5px)
- [ ] Horizontal padding is ~19px left and right
- [ ] Vertical padding is ~23px top and bottom
- [ ] Label font drops to 16px on mobile
- [ ] Icons remain 36×36px on mobile

### Accessibility

- [ ] Icon `<img>` tags have `alt=""` (decorative — correct, no alt text needed)
- [ ] Section renders correctly with images disabled in the browser

## Previous Rounds

[Empty — no rounds completed yet.]

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# OUTPUT-qa-debugging.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
