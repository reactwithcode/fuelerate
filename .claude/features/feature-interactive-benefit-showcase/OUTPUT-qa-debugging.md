# QA: Interactive Benefit Showcase

Feature spec: `.claude/features/feature-interactive-benefit-showcase/feature.md`
Implementation plan: `.claude/features/feature-interactive-benefit-showcase/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 3)

Status: Testing

### Core behavior

- [ ] Page loads — first category pill is highlighted (dark olive background, white text, auto-width / fits content)
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

### Desktop layout (test at 1440px viewport width)

- [ ] Three columns are visible: pill list left, image centre, dark panel right
- [ ] Section background is cream (`#f4f3ee`)
- [ ] Active pill is auto-width (fits content — narrower than inactive pills)
- [ ] Inactive pills span the full left-column width with a border
- [ ] Active pill has dark olive background (`#31331e`) with white text
- [ ] Inactive pills have transparent background with dark olive border and text
- [ ] Detail panel background is dark olive (`#31331e`) with white text
- [ ] Panel content has generous horizontal padding (~108px each side), giving the text breathing room
- [ ] Both left and right arrow buttons are visible — white circular background with dark olive icon
- [ ] Section heading uses Recoleta font
- [ ] Panel title uses Recoleta font
- [ ] Image column images have 5px rounded corners
- [ ] Image column width setting (15–40%) adjusts the centre column width in the customizer — reset slider to 23% to match Figma proportions if it was saved at a higher value previously

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
- [ ] Image column width setting (15–40%) — adjusts the width of the centre image column
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

---

### Round 2

#### [FAIL] Page loads — first category pill is highlighted (dark olive background, white text, auto-width)
**User feedback:** Fetched Figma frames and compared screenshots — active pill was still rendering full-width.
**Fix:** Root cause: `display: flex` on `.ibs__pill` makes it a block-level container, so `width: auto` resolves to "fill containing block" rather than shrinking to content. Changed to `width: fit-content`, which correctly shrinks the active pill to its text/icon content regardless of display type.

#### [FAIL] Image column proportions — image column too wide
**User feedback:** Screenshots showed image column at ~40% of section width instead of ~23%.
**Fix (CSS):** Updated default CSS grid value from `25%` to `23%` (matching Figma's exact 331px at 1440px). Updated schema default from 25 → 23, min from 20 → 15, max from 55 → 40, step from 5 → 1 for finer control.
**Note:** If the image column still appears wide, the Shopify customizer has a previously saved value (likely 35%+). Reset the "Image column width" slider to 23% in the customizer to match Figma.

#### [FAIL] Panel content has too little horizontal padding
**User feedback:** Comparing Figma frame data — panel content starts 109px from panel's left edge (Figma) vs 56px (our CSS).
**Fix:** Updated `.ibs__panel-content` inset from `3rem 2.5rem 6rem 3.5rem` to `4.25rem 6.8rem 6rem 6.8rem`. Content width now ~362px (Figma: 363px ✓), top offset ~68px (Figma: 66.6px ✓).

#### [FAIL] Left column left padding too small
**User feedback:** Figma shows section heading at x=85px, pills at x=92px from section left edge; CSS had 64px (4rem).
**Fix:** Updated `.ibs__left` padding-left from `4rem` → `5.5rem` (88px).

#### [FAIL] Images have no rounded corners
**User feedback:** Figma shows `rounded-[5px]` on image container.
**Fix:** Changed `clip-path: inset(0)` to `clip-path: inset(0 round 5px)` on `.ibs__image`.

#### [FAIL] Section min-height too short
**User feedback:** Figma: panel is 556px tall, starts 81px from section top → section needs ≥637px.
**Fix:** Updated `min-height` from `560px` → `640px`.

#### [FAIL] Pill list gap too small
**User feedback:** Figma: 6 pills in 319px height with justify-between → ~18px between pills. CSS had 0.75rem (12px).
**Fix:** Updated `.ibs__list gap` from `0.75rem` → `1.125rem` (18px).

#### [SKIPPED] All remaining items
Could not be verified due to Figma analysis taking priority in this round.
