# QA: Interactive Benefit Showcase

Feature spec: `.claude/features/feature-interactive-benefit-showcase/feature.md`
Implementation plan: `.claude/features/feature-interactive-benefit-showcase/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 6)

Status: Testing

### Core behavior

- [ ] Page loads — first category pill is highlighted (dark olive, white text, auto-width, icon + text left-aligned)
- [ ] Page loads — first category's image is visible in the centre column, anchored to the section bottom with cream background showing above
- [ ] Page loads — first category's title, description, bullets, and CTA appear in the dark right panel
- [ ] Clicking the second pill — second pill becomes active, first loses active style
- [ ] Clicking the second pill — centre image changes to the second block's image
- [ ] Clicking the second pill — right panel content updates to the second block's content
- [ ] Clicking the right arrow — advances to the next category
- [ ] Clicking the right arrow on the last category — wraps back to the first category
- [ ] Clicking the left arrow — goes back to the previous category
- [ ] Clicking the left arrow on the first category — wraps to the last category
- [ ] CTA link text and URL are correct per block
- [ ] Only one category is active at a time

### Edge cases

- [ ] Block with no CTA URL set — the CTA link element is not rendered
- [ ] Block with no category image — no broken `<img>` element rendered
- [ ] Section with only 1 block — both arrow buttons are not visible
- [ ] Block with empty bullets field — no empty `<ul>` rendered
- [ ] All blocks have no images set — image column collapses, no broken layout

### Mobile (test at 375px viewport width)

- [ ] First category is expanded on page load — detail card visible below first pill, with 8px gap
- [ ] Other categories are collapsed on page load
- [ ] Tapping a collapsed pill — it expands, showing its detail card below
- [ ] Tapping a collapsed pill — the previously open card collapses
- [ ] Only one category can be open at a time on mobile
- [ ] Active pill on mobile is auto-width (fit-content), not full-width
- [ ] Inactive pills on mobile are full-width
- [ ] Detail card: title, description, bullets, and CTA have 35px gap between sections
- [ ] Detail card: 18px padding on all sides
- [ ] Detail card content matches the block's schema settings
- [ ] Mobile detail card uses Recoleta for the title (24px)
- [ ] Heading: centred, max-width ~248px, line-height normal
- [ ] Centre image column is not visible on mobile
- [ ] Arrows are not visible on mobile

### Desktop layout (test at 1440px viewport width — reset image_width to 23%, image_height to 56%)

- [ ] Three columns visible: pill list left, image centre, dark panel right
- [ ] Section background is cream (`#f4f3ee`)
- [ ] Cream background shows above AND to the right of the panel (~67px right gap)
- [ ] Cream background shows above the panel (~81px top gap)
- [ ] Panel has 5px rounded corners on ALL four sides (not just left)
- [ ] Active pill: auto-width (fit-content), dark olive, icon + text left-aligned
- [ ] Inactive pills: full-width, border, icon + text left-aligned
- [ ] Panel: dark olive, white text, title + description + bullets + CTA visible
- [ ] Panel content: 35px gap between title, description, bullets, and CTA sections
- [ ] Both arrow buttons visible — white circle, dark olive icon
- [ ] Prev arrow sits at left edge of image column
- [ ] Next arrow sits at right edge of panel (in the cream gap area)
- [make Section heading and section subtext above category image, looks current result at Section-heading-subtext-and-category-image-now.png and looks expected-result.png on reference folder] Section heading uses Recoleta font
- [ ] Image has 5px rounded corners
- [ ] "Image height" slider (20–90%) controls how tall the image is — higher value = taller image, lower = shorter
- [ ] "Image column width" slider (15–40%) adjusts image column width
- [ ] Padding top / bottom settings work correctly

### Accessibility

- [ ] Keyboard: Tab key reaches each pill
- [ ] Keyboard: Enter/Space on a focused pill activates it
- [ ] Keyboard: Tab key reaches both arrow buttons
- [ ] Keyboard: Enter/Space on arrows navigate categories
- [ ] Active pill has `aria-selected="true"`; all others `aria-selected="false"`
- [ ] Arrow buttons have descriptive `aria-label` attributes

### Shopify customizer

- [ ] Section appears in the "Add section" sidebar
- [ ] Adding/removing a block — pill and panel update correctly
- [ ] Editing block title/description — live preview updates
- [ ] Uploading a category image — image appears in centre column when that block is active
- [ ] Uploading an icon image — icon appears inside the pill
- [ ] "Image height" setting (20–90%) — adjusts image height, anchored to section bottom
- [ ] "Image column width" setting (15–40%) — adjusts image column width
- [ ] Padding top / bottom settings adjust section spacing
- [ ] Preset ("Benefit Showcase") drops in with 6 pre-filled blocks

---

## Previous Rounds

### Round 1

#### [FAIL] Page loads — first category pill is highlighted (dark olive background, white text)
**User feedback:** "width of each category pill should not be same, looks the expected-result.png on reference folder"
**Fix:** Changed `.ibs__pill` from `width: 100%` to `width: auto`. Added `align-items: flex-start` to `.ibs__list` on desktop so pills auto-size to content. Mobile still uses `width: 100%` for the full-width accordion trigger.

#### [FAIL] Page loads — first category's title, description, bullets, and CTA appear in the dark right panel
**User feedback:** "use Recoleta as the font for all text"
**Fix:** Added Recoleta `@font-face` declarations (same CDN as CPI section) to the CSS. Applied `font-family: 'Recoleta', Georgia, serif` to `.ibs__heading` and `.ibs__panel-title`. Description and body text remain Figtree (sans-serif) to match the reference design.

#### [FAIL] Right arrow is visible in the panel
**User feedback:** "add left arrow too, give #fff background color."
**Fix:** Added both `.ibs__arrow--prev` and `.ibs__arrow--next` buttons. Changed background from transparent to `#ffffff` with dark olive icon color.

#### [FAIL] Uploading a category image
**User feedback:** "Make size smaller and add setting to change the width."
**Fix:** Added `image_width` range setting (15–40%, default 23%). Wired via `--ibs-image-col-width` CSS custom property.

#### [FAIL] Detail card content — mobile
**User feedback:** "category title, description, bullet points and link icon doesn't look like on expected-result.png"
**Fix:** Applied Recoleta to mobile card title. Made description bold (Figtree 700). Improved mobile card padding and spacing.

#### [SKIPPED] All remaining items

---

### Round 2

#### [FAIL] Active pill is full-width (should be auto-width)
**User feedback:** Pill widths still equal; compared to Figma.
**Fix:** Root cause: `display: flex` on `.ibs__pill` makes it a block-level container, so `width: auto` resolves to "fill containing block." Changed to `width: fit-content`.

#### [FAIL] Image column too wide
**User feedback:** Image column appearing at ~40% of section width instead of ~23%.
**Fix:** Grid default changed from 25% to 23%. Schema default: 25 → 23, min: 20 → 15, max: 55 → 40, step: 5 → 1.
**Note:** Saved customizer value still needs to be reset to 23%.

#### [FAIL] Panel content horizontal padding too small
**User feedback:** Figma shows content offset 109px from panel left edge; CSS had 56px.
**Fix:** Updated `ibs__panel-content` inset to `4.25rem 6.8rem 6rem 6.8rem`.

#### [FAIL] Left column left padding too small
**Fix:** Updated `.ibs__left` padding-left from `4rem` → `5.5rem` (88px).

#### [FAIL] Images have no rounded corners
**Fix:** `clip-path: inset(0)` → `clip-path: inset(0 round 5px)`.

#### [FAIL] Section min-height too short / pill gap too small
**Fix:** `min-height: 560px` → `640px`. `gap: 0.75rem` → `gap: 1.125rem`.

---

### Round 3

#### [FAIL] Icon and text inside pill centered (should be left-aligned)
**User feedback:** "icon and text inside category pill shouldn't in the middle"
**Fix:** `justify-content: center` → `justify-content: flex-start` on `.ibs__pill`.

#### [FAIL] Image starts at top of section (should start at pill level)
**User feedback:** "Section subtext and Section heading should above 'Category image'"
**Fix:** Changed `.ibs__image` from `top: 0; height: 100%` to `top: var(--ibs-image-top, 44%); bottom: 0`. Added `object-position: center center`.

#### [FAIL] No image start position setting
**User feedback:** "add Image column height setting"
**Fix:** Added `image_top_offset` range setting (0–70%, default 44%). Wired via `--ibs-image-top`.

#### [FAIL] Mobile card — title and description need more spacing
**User feedback:** "category title and description should have margin/padding"
**Fix:** Increased top padding: 18px → 24px. Reduced internal gap: 2rem → 1rem. Added 8px gap between pill and card.

---

### Round 4

#### [FAIL] "Image start position" setting — change to control height, not top offset
**User feedback:** "change this to edit height not Image start position, looks expected-result.png and current-results.png"
**Fix:** Changed approach from controlling where the image starts (top offset) to controlling the image height. Image is now anchored to the section bottom (`bottom: 0; height: var(--ibs-image-height, 56%)`). Higher % = taller image (fills more of the section from the bottom up). Default 56% = image fills bottom 56% of section, leaving cream background visible in the top 44%. Renamed schema setting from `image_top_offset` → `image_height`, label "Image height", default 56%, range 20–90%.

---

### Round 5

#### [SKIPPED] All items — user proceeded to Figma design accuracy pass instead of testing
**Design update applied (Figma nodes 1:1744 desktop, 1:3543 mobile):**
- Grid: added 4th column (`4.2rem` ≈ 67px) as panel right gap — left column now ~462px matching Figma
- Panel: added `margin-top: 5.1rem` (81px top offset); changed `border-radius: 5px 0 0 5px` → `5px` (all corners)
- Panel content: top inset `4.25rem` → `4.75rem` (accounts for panel's top margin); gap `2rem` → `2.1875rem` (35px)
- Mobile heading: added `line-height: normal; max-width: 248px`
- Mobile pills: inactive stays `width: 100%`; active no longer overridden to full-width (keeps `fit-content` from desktop rule)
- Mobile card: `padding: 18px` (was `24px 18px 18px`); `gap: 2.1875rem` (was `1rem`)
