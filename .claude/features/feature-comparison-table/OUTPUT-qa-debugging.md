# QA: Comparison Table

Feature spec: `.claude/features/feature-comparison-table/feature.md`
Implementation plan: `.claude/features/feature-comparison-table/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 3)

Status: Testing

### Core desktop behavior

- [ ] Section renders without errors on a Shopify page
- [ ] Heading "Why We Are Really Different" is visible and styled correctly
- [ ] Terra Therapy row shows the sage-to-olive gradient, rounded corners, and inset margin from the card edges (matching `reference/expected-result.png`)
- [ ] Terra Therapy row icon (wing/fabric graphic) displays small and un-rotated above the logo, not cropped/rotated into a square
- [ ] All 4 competitor rows render below the brand row
- [ ] All 5 columns visible at once on desktop (Solution + How it works + What to consider + Cost over time + Side effects)
- [ ] Column header labels match the settings values
- [ ] Cell text for both the brand row and each competitor row displays correctly
- [ ] Brand logo and product photo render in the Solution column (or fallbacks appear if no image uploaded)
- [ ] Competitor icons render (or placeholder area shows if no image uploaded)
- [ ] No horizontal scroll on desktop (table fits within page width)

### Cart button

- [ ] ADD TO CART button renders with no visible border (border: none applied)
- [ ] Button does NOT render when no product is selected
- [ ] Clicking the button adds the product to the cart
- [ ] Cart drawer opens after a successful add
- [ ] Button shows a disabled/loading state while the request is in progress
- [ ] An error message appears near the button if the cart request fails
- [ ] Error message disappears after ~4 seconds

### Mobile carousel

- [ ] On mobile (< 750px), only the Solution column + one attribute column are visible at a time
- [ ] First attribute column ("How it works") is visible by default on load
- [ ] 4 pagination dots visible below the table, first dot active
- [ ] Swiping left on the table slides to the next attribute column
- [ ] Swiping right slides back to the previous column
- [ ] Dot indicator updates to match the active column after each swipe
- [ ] Tapping a dot directly jumps to that column
- [ ] Swiping left on the last column (Side effects) does nothing — no wraparound
- [ ] Swiping right on the first column (How it works) does nothing — no wraparound
- [ ] ALL rows slide in sync (brand row + all competitor rows move together)
- [ ] Dots disappear on desktop, pagination panel is hidden

### Tablet behavior (750px–989px)

- [ ] Full 5-column table is visible (same as desktop)
- [ ] Text and cell padding is slightly tighter but still readable
- [ ] No mobile carousel on tablet
- [ ] No horizontal overflow

### Schema & customizer

- [ ] Heading is editable in the customizer and updates the section preview
- [ ] Brand row settings (name, logo, product image, background image, all 4 cell texts) are editable
- [ ] Competitor blocks can be added, removed, and reordered from the customizer
- [ ] Each competitor block's image, name, and 4 cell text fields work correctly
- [ ] Column header settings update the header row labels
- [ ] Button label setting updates the button text
- [ ] Product picker setting controls which product is added to cart
- [ ] Padding top/bottom settings adjust spacing
- [ ] Section appears in the "Add section" panel (preset exists)

### Edge cases

- [ ] Competitor block with no image: renders gracefully (no broken layout)
- [ ] Competitor block with very long cell text: cell grows, no overflow or text clipping
- [ ] No product configured in the product picker: button is hidden entirely
- [ ] Product is fully sold out (no available variant): button is hidden

### Accessibility

- [ ] ADD TO CART button is keyboard-focusable and activates on Enter/Space
- [ ] Pagination dots are keyboard-focusable
- [ ] Images have appropriate alt text (empty alt for decorative images)

---

## Previous Rounds

### Round 2 — Archived

#### [FAIL] Terra Therapy row is now correctly dark olive (no background image washing it out)
**User feedback:** Shared `expected-result.png` (target) vs `current-result.png` (actual) — the row should have a sage-green-to-olive gradient background, rounded corners with a visible inset margin from the card edges (floating "chip" look), and the icon above the logo should be small and un-rotated — not the flat solid `#31331e` color, square edges flush to the card, and large rotated/cropped photo that were shipped.
**Fix:** In `assets/section-comparison-table.css`: (1) `.ct__row--ours` now uses `background-image: linear-gradient(135deg, #7aa66f 0%, #31331e 100%)` (reusing the theme's existing sage-green and dark-olive tokens) instead of a flat `background-color`, plus `margin: 8px` and `border-radius: 12px` for the inset rounded look. (2) `.ct__ours-photo-wrap`/`.ct__ours-photo` no longer crop the image into an 80×80 box with `rotate(17deg) scale(1.4)` — turns out `ct-product-photo.png` *is* the wing/fabric icon shown small in the mockup, not a separate square photo, so it's now shown at its natural aspect ratio via `object-fit: contain` at 90px wide (70px tablet, 60px mobile). Not visually verified in a running theme preview (no dev server available in this session) — please confirm in the customizer/theme preview.

#### [SKIPPED] Remaining Round 2 items (not yet tested — feedback came in before a full pass)

### Round 1 — Archived

#### [PASS] Section renders without errors on a Shopify page

#### [PASS] Heading "Why We Are Really Different" is visible and styled correctly

#### [FAIL] Terra Therapy row is highlighted (dark olive background, white text, background image)
**User feedback:** "it doesn't looks like on desktop.png. looks current result on reference folder" — row background was too light/green, not matching the Figma dark olive.
**Fix:** Removed the auto-fallback `ct-bg-ours.png` background image from the Liquid style block. The fallback was washing out the CSS `background-color: #31331e`. Now the dark olive color shows by default; the background image setting is only applied when the merchant explicitly uploads one.

#### [PASS] All 4 competitor rows render below the brand row

#### [PASS] All 5 columns visible at once on desktop

#### [PASS] Column header labels match the settings values

#### [PASS] Cell text for both the brand row and each competitor row displays correctly

#### [PASS] Brand logo and product photo render in the Solution column

#### [PASS] Competitor icons render

#### [PASS] No horizontal scroll on desktop

#### [FAIL] ADD TO CART button renders when a product is selected in section settings
**User feedback:** "remove border color" — browser default border was visible on the button element.
**Fix:** Added `border: none` and `cursor: pointer` to `.ct__btn` in the CSS. (Border appeared because the element was changed from `<a>` to `<button>` — browsers apply a default border to buttons.)

#### [SKIPPED] Button does NOT render when no product is selected
#### [SKIPPED] Clicking the button adds the product to the cart
#### [SKIPPED] Cart drawer opens after a successful add
#### [SKIPPED] Button shows a disabled/loading state while the request is in progress
#### [SKIPPED] An error message appears near the button if the cart request fails
#### [SKIPPED] Error message disappears after ~4 seconds

#### [SKIPPED] Mobile carousel items (not yet tested)

#### [SKIPPED] Tablet behavior (not yet tested)

#### [SKIPPED] Schema & customizer (not yet tested)

#### [SKIPPED] Edge cases (not yet tested)

#### [SKIPPED] Accessibility (not yet tested)
