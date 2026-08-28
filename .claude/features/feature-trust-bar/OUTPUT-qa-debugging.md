# QA: Trust Bar

Feature spec: `.claude/features/feature-trust-bar/feature.md`
Implementation plan: `.claude/features/feature-trust-bar/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 4)

Status: Testing

### Core behavior

- [ ] Section appears in the customizer Add Section panel under the name "Trust Bar"
- [ ] Dropping the section onto a page renders a dark olive strip
- [ ] Default preset pre-fills 4 items with the correct label text (no icons by default)
- [ ] All 4 labels display correctly: "90-Day Results-Backed Guarantee", "Designed in USA", "Ships in 2–6 Days", "A Tree Planted per Order"
- [ ] Uploading an icon image to a block renders the icon at the correct size next to the label
- [ ] Icon and label are vertically centered and separated by 8px gap

### Customizer controls

- [ ] Adding a new block adds a new item to the bar
- [ ] Removing a block removes the item from the bar
- [ ] Reordering blocks reorders the items in the bar
- [ ] Changing the background color updates the bar immediately in the preview
- [ ] Changing the label color updates all labels immediately
- [ ] Changing the label size (desktop) updates all labels immediately
- [ ] Changing the icon size updates all icons immediately
- [ ] Adjusting horizontal padding (desktop) changes the left/right spacing inside the bar
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
- [ ] Horizontal padding gives visible breathing room on the left and right sides (default 40px)
- [ ] Icon size matches the customizer setting (default 36×36px)
- [ ] Label color and size match the customizer settings
- [ ] Section is vertically padded (~28px top and bottom by default)
- [ ] Inner content is centered and does not exceed ~1178px

### Mobile layout

- [ ] Items stack vertically, one per row
- [ ] Gap between stacked items is small (~5px)
- [ ] Horizontal padding is ~19px left and right (fixed, from Figma)
- [ ] Vertical padding is ~23px top and bottom
- [make label font become normal] Label font is automatically 4px smaller than the desktop setting (default 16px)
- [ ] Icon size matches the customizer setting on mobile

### Accessibility

- [ ] Icon `<img>` tags have `alt=""` (decorative — correct, no alt text needed)
- [ ] Section renders correctly with images disabled in the browser

---

## Previous Rounds

### Round 3

#### [FAIL] Section appears in the customizer Add Section panel under the name "Trust Bar"
**User feedback:** "add margin/padding left and right on the section. looks trust bar current result.png on reference folder"
**Fix:** Added `padding_horizontal` range setting (0–100px, step 4, default 40px) under the "Spacing" header. Applied via the section-id style block inside `@media screen and (min-width: 750px)` so it only affects desktop/tablet — mobile keeps its fixed 19px from the Figma. Removed hardcoded `padding: 0 1.5rem` from `.trust-bar__inner` in CSS and removed the now-redundant mobile reset.

#### [SKIPPED] Dropping the section onto a page renders a dark olive strip
#### [SKIPPED] Default preset pre-fills 4 items with the correct label text (no icons by default)
#### [SKIPPED] All 4 labels display correctly
#### [SKIPPED] Uploading an icon image to a block renders the icon at the correct size next to the label
#### [SKIPPED] Icon and label are vertically centered and separated by 8px gap
#### [SKIPPED] Adding a new block adds a new item to the bar
#### [SKIPPED] Removing a block removes the item from the bar
#### [SKIPPED] Reordering blocks reorders the items in the bar
#### [SKIPPED] Changing the background color updates the bar immediately in the preview
#### [SKIPPED] Changing the label color updates all labels immediately
#### [SKIPPED] Changing the label size (desktop) updates all labels immediately
#### [SKIPPED] Changing the icon size updates all icons immediately
#### [SKIPPED] Adjusting padding top/bottom changes the vertical spacing correctly
#### [SKIPPED] Setting a block label to empty hides the label (icon only renders)
#### [SKIPPED] Leaving a block icon empty hides the icon (label only renders)
#### [SKIPPED] Removing all blocks leaves the section with no visible output
#### [SKIPPED] A very long label text wraps rather than overflowing or getting clipped
#### [SKIPPED] A block with neither icon nor label renders nothing visible
#### [SKIPPED] All items are in a single horizontal row
#### [SKIPPED] Items are evenly spaced across the full width (justify-between)
#### [SKIPPED] Icon size matches the customizer setting (default 36×36px)
#### [SKIPPED] Label color and size match the customizer settings
#### [SKIPPED] Section is vertically padded (~28px top and bottom by default)
#### [SKIPPED] Inner content is centered and does not exceed ~1178px
#### [SKIPPED] Items stack vertically, one per row
#### [SKIPPED] Gap between stacked items is small (~5px)
#### [SKIPPED] Horizontal padding is ~19px left and right
#### [SKIPPED] Vertical padding is ~23px top and bottom
#### [SKIPPED] Label font is automatically 4px smaller than the desktop setting (default 16px)
#### [SKIPPED] Icon size matches the customizer setting on mobile
#### [SKIPPED] Icon img tags have alt="" (decorative)
#### [SKIPPED] Section renders correctly with images disabled in the browser

---

### Round 2

#### [SKIPPED] Section appears in the customizer Add Section panel under the name "Trust Bar"
#### [SKIPPED] Dropping the section onto a page renders a dark olive strip
#### [SKIPPED] Default preset pre-fills 4 items with the correct label text (no icons by default)
#### [SKIPPED] All 4 labels display correctly
#### [SKIPPED] Uploading an icon image to a block renders the icon at 36×36px next to the label
#### [SKIPPED] Icon and label are vertically centered and separated by 8px gap
#### [SKIPPED] Adding a new block adds a new item to the bar
#### [SKIPPED] Removing a block removes the item from the bar
#### [SKIPPED] Reordering blocks reorders the items in the bar
#### [SKIPPED] Changing the background color updates the bar immediately in the preview
#### [SKIPPED] Changing the label color updates all labels immediately
#### [SKIPPED] Changing the label size (desktop) updates all labels immediately
#### [SKIPPED] Adjusting padding top/bottom changes the vertical spacing correctly
#### [SKIPPED] Setting a block label to empty hides the label (icon only renders)
#### [SKIPPED] Leaving a block icon empty hides the icon (label only renders)
#### [SKIPPED] Removing all blocks leaves the section with no visible output
#### [SKIPPED] A very long label text wraps rather than overflowing or getting clipped
#### [SKIPPED] A block with neither icon nor label renders nothing visible
#### [SKIPPED] All items are in a single horizontal row
#### [SKIPPED] Items are evenly spaced across the full width (justify-between)

#### [FAIL] Icons are 36×36px
**User feedback:** "add setting to change icon size"
**Fix:** Added `icon_size` range setting (16–64px, step 4, default 36px) under a new "Icons" header in the schema. Width and height are now output via the section-id `{%- style -%}` block. The `image_url` fetch width is `icon_size × 2` for crisp retina rendering. Removed hardcoded `width`/`height` from `.trust-bar__icon` in CSS.

#### [SKIPPED] Label color and size match the customizer settings
#### [SKIPPED] Section is vertically padded (~28px top and bottom by default)
#### [SKIPPED] Inner content is centered and does not exceed ~1178px
#### [SKIPPED] Items stack vertically, one per row
#### [SKIPPED] Gap between stacked items is small (~5px)
#### [SKIPPED] Horizontal padding is ~19px left and right
#### [SKIPPED] Vertical padding is ~23px top and bottom
#### [SKIPPED] Label font is automatically 4px smaller than the desktop setting (default 16px)

#### [FAIL] Icons remain 36×36px on mobile
**User feedback:** "add setting to change icon size"
**Fix:** Same as above — icon size is now fully dynamic via section setting, applies to both desktop and mobile.

#### [SKIPPED] Icon img tags have alt="" (decorative)
#### [SKIPPED] Section renders correctly with images disabled in the browser

---

### Round 1

#### [SKIPPED] Section appears in the customizer Add Section panel under the name "Trust Bar"
#### [SKIPPED] Dropping the section onto a page renders a dark olive strip
#### [SKIPPED] Default preset pre-fills 4 items with the correct label text (no icons by default)

#### [FAIL] All 4 labels display correctly
**User feedback:** "add setting to change label size and color"
**Fix:** Added `label_color` (color picker, default `#ffffff`) and `label_size` (range 12–32px, step 2, default 20px) as section-level settings. Color and font-size are now output via the section-id `{%- style -%}` block. Mobile font size is automatically `label_size − 4px`. Removed hardcoded `color` and `font-size` from `.trust-bar__label` in CSS.

#### [SKIPPED] Uploading an icon image to a block renders the icon at 36×36px next to the label
#### [SKIPPED] Icon and label are vertically centered and separated by 8px gap
#### [SKIPPED] Adding a new block adds a new item to the bar
#### [SKIPPED] Removing a block removes the item from the bar
#### [SKIPPED] Reordering blocks reorders the items in the bar
#### [SKIPPED] Changing the background color updates the bar immediately in the preview
#### [SKIPPED] Adjusting padding top/bottom changes the vertical spacing correctly
#### [SKIPPED] Setting a block label to empty hides the label (icon only renders)
#### [SKIPPED] Leaving a block icon empty hides the icon (label only renders)
#### [SKIPPED] Removing all blocks leaves the section with no visible output
#### [SKIPPED] A very long label text wraps rather than overflowing or getting clipped
#### [SKIPPED] A block with neither icon nor label renders nothing visible
#### [SKIPPED] All items are in a single horizontal row
#### [SKIPPED] Items are evenly spaced across the full width (justify-between)
#### [SKIPPED] Icons are 36×36px
#### [SKIPPED] Label font is Figtree, white, 20px
#### [SKIPPED] Section is vertically padded (~28px top and bottom)
#### [SKIPPED] Inner content is centered and does not exceed ~1178px
#### [SKIPPED] Items stack vertically, one per row
#### [SKIPPED] Gap between stacked items is small (~5px)
#### [SKIPPED] Horizontal padding is ~19px left and right
#### [SKIPPED] Vertical padding is ~23px top and bottom
#### [SKIPPED] Label font drops to 16px on mobile
#### [SKIPPED] Icons remain 36×36px on mobile
#### [SKIPPED] Icon img tags have alt="" (decorative)
#### [SKIPPED] Section renders correctly with images disabled in the browser

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# OUTPUT-qa-debugging.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
