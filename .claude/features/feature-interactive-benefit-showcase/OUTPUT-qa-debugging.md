# QA: Interactive Benefit Showcase

Feature spec: `.claude/features/feature-interactive-benefit-showcase/feature.md`
Implementation plan: `.claude/features/feature-interactive-benefit-showcase/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 2)

Status: Testing

### Core behavior

- [ ] Page loads — first category pill is highlighted (dark olive background, white text)
- [ ] Page loads — first category's image is visible in the centre column
- [ ] Page loads — first category's title, description, bullets, and CTA appear in the dark right panel
- [ ] Clicking the second pill — second pill becomes active, first loses active style
- [ ] Clicking the second pill — centre image changes to the second block's image
- [ ] Clicking the second pill — right panel content updates to the second block's content
- [ ] Clicking the right arrow — advances to the next category (same result as clicking the next pill)
- [ ] Clicking the right arrow on the last category — wraps back to the first category
- [ ] Clicking the left arrow — goes back to the previous category
- [ ] Clicking the left arrow on the first category — wraps to the last category
- [ ] Clicking the right arrow repeatedly — cycles through all categories in sequence and loops correctly
- [ ] CTA link text and URL are correct per block
- [ ] Only one category is active at a time (no two pills highlighted simultaneously)

### Edge cases

- [ ] Block with no CTA URL set — the CTA link element is not rendered (no empty `<a>` tag)
- [ ] Block with no category image — centre column image for that block does not render a broken `<img>` element
- [ ] Section with only 1 block — both arrow buttons are not visible
- [ ] Block with empty bullets field — no empty `<ul>` rendered in the panel
- [ ] All blocks have no images set — centre image column collapses or is hidden, no broken layout

### Mobile (test at 375px viewport width)

- [ ] First category is expanded on page load — detail card visible below first pill
- [ ] Other categories are collapsed on page load
- [ ] Tapping a collapsed pill — it expands, showing its detail card inline below the pill
- [ ] Tapping a collapsed pill — the previously open card collapses
- [ ] Only one category can be open at a time on mobile
- [ ] Centre image column is not visible on mobile
- [ ] Right and left arrows are not visible on mobile
- [ ] Detail card content (title, description, bullets, CTA) matches the block's schema settings
- [ ] Mobile detail card uses Recoleta for the title

### Desktop layout (test at 1200px viewport width)

- [ ] Three columns are visible: pill list left, image centre, dark panel right
- [ ] Section background is cream (`#f4f3ee`)
- [ ] Pills are auto-sized to content width (not stretched full-width)
- [ ] Active pill has dark olive background (`#31331e`) with white text
- [ ] Inactive pills have transparent background with dark olive border and text
- [ ] Detail panel background is dark olive (`#31331e`) with white text
- [ ] Both left and right arrow buttons are visible in the panel — white circular background with dark olive icon
- [ ] Section heading uses Recoleta font
- [ ] Panel title uses Recoleta font
- [ ] Image column width setting adjusts the centre column width in the customizer

### Accessibility

- [ ] Keyboard: Tab key reaches each pill
- [ ] Keyboard: pressing Enter or Space on a focused pill activates it
- [ ] Keyboard: Tab key reaches both arrow buttons
- [ ] Keyboard: pressing Enter or Space on the next arrow advances to the next category
- [ ] Keyboard: pressing Enter or Space on the prev arrow goes to the previous category
- [ ] Active pill has `aria-selected="true"`; all others have `aria-selected="false"`
- [ ] Arrow buttons have descriptive `aria-label` attributes ("Previous benefit" / "Next benefit")

### Shopify customizer

- [ ] Section appears in the customizer "Add section" sidebar
- [ ] Adding a new block — a new pill appears in the list and a new panel is available
- [ ] Removing a block — the pill and its panel are removed
- [ ] Editing a block's title — pill label and panel heading update in the live preview
- [ ] Editing a block's description — panel description updates in the live preview
- [ ] Uploading a category image — image appears in the centre column when that block is active
- [ ] Image column width setting (20–55%) — adjusts the width of the centre image column
- [ ] Uploading an icon image — icon appears inside the pill alongside the title
- [ ] Padding top / padding bottom settings — section spacing adjusts correctly
- [ ] Preset ("Interactive Benefit Showcase") available when adding the section — drops in with 6 pre-filled blocks

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
**User feedback:** "add left arrow too, give #fff background color. looks the expected-result.png on reference folder"
**Fix:** Replaced the single `ibs__arrow` button with an `ibs__arrows` container holding both `.ibs__arrow--prev` and `.ibs__arrow--next` buttons. Changed arrow button background from `transparent + border` to solid `#ffffff` with `color: #31331e`. Updated JS to wire separate prev/next handlers (prev wraps to last, next wraps to first).

#### [FAIL] Uploading a category image — image appears in the centre column when that block is active
**User feedback:** "Make size smaller and add setting to change the width. looks the expected-result.png on reference folder"
**Fix:** Added `image_width` range setting (20–55%, default 35%) to the schema. Wired it via a `--ibs-image-col-width` CSS custom property set in the section's `{%- style -%}` block. The grid template now uses `var(--ibs-image-col-width, 35%)` for the centre column width.

#### [FAIL] Detail card content (title, description, bullets, CTA) matches the block's schema settings — mobile
**User feedback:** "category title, description, bullet points and link icon on Benefit category doesn't look like on expected-result.png"
**Fix:** Applied Recoleta to mobile card title. Made description bold (Figtree 700). Improved mobile card padding and spacing to better match the reference.

#### [SKIPPED] All remaining items
Could not be verified due to the above visual issues taking priority.
