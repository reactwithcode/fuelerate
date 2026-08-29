# QA: Comparison Table

Feature spec: `.claude/features/feature-comparison-table/feature.md`
Implementation plan: `.claude/features/feature-comparison-table/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 4)

Status: Testing

### Core desktop behavior

- [ ] Section renders without errors on a Shopify page
- [ ] Heading "Why We Are Really Different" is visible and styled correctly
- [align center and gradient color should lighter looks the figma https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-2405&t=4jOoUmIxKiys88Dy-0 and desktop.png on reference folder] Terra Therapy row is wider than the white card (~20px per side), with a left-to-dark gradient and rounded corners
- [ ] Terra Therapy row has no vertical gap from the header row above or the competitor rows below
- [ ] All 4 competitor rows render below the brand row
- [ ] White card corners still appear rounded (top-left, top-right, bottom-left, bottom-right)
- [ ] All 5 columns visible at once on desktop
- [ ] Column header labels match the settings values
- [ ] Cell text for both the brand row and competitor rows displays correctly
- [ ] Brand logo and product photo render in the Solution column
- [ ] Competitor icons render
- [ ] No horizontal scroll on desktop

### Cart button

- [ ] Clicking ADD TO CART adds the product to the cart
- [ ] Cart drawer opens and shows the correct product after clicking
- [ ] Cart icon bubble count updates after add
- [ ] Button shows disabled state while the request is in progress
- [ ] Button re-enables after the request completes
- [ ] An error message appears near the button if the cart request fails
- [ ] Error message disappears after ~4 seconds
- [ ] Button does NOT render when no product is selected in settings

### Mobile carousel

- [Terra Therapy row should wider than the solution column. looks https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-4012&t=4jOoUmIxKiys88Dy-0 and mobile.png on reference folder] Terra Therapy row has no horizontal overflow or scroll on mobile
- [solution column and how it works column should be sperated with a space. looks https://www.figma.com/design/yw8bxwzgE1IPEiORri0rjD/Dev-Assessment--Copy-?node-id=1-4012&t=4jOoUmIxKiys88Dy-0 and mobile.png on reference folder] On mobile (< 750px), only the Solution column + one attribute column are visible at a time
- [ ] First attribute column ("How it works") is visible by default on load
- [ ] 4 pagination dots visible below the table, first dot active
- [ ] Swiping left slides to the next attribute column
- [ ] Swiping right slides back to the previous column
- [ ] Dot indicator updates to match the active column
- [ ] Tapping a dot jumps directly to that column
- [ ] ALL rows slide in sync

### Tablet behavior (750px–989px)

- [ ] Full 5-column table is visible
- [ ] No horizontal overflow

### Schema & customizer

- [ ] All brand row settings are editable (name, logo, product image, background image, 4 cell texts)
- [ ] Competitor blocks can be added, removed, and reordered
- [ ] Column header settings update correctly
- [ ] Product picker setting controls which product is added to cart
- [ ] Section appears in the "Add section" panel

### Edge cases

- [ ] Competitor block with no image: renders gracefully
- [ ] No product in product picker: button hidden

---

## Previous Rounds

### Round 3 — Archived

#### [FAIL] Terra Therapy row gradient and width
**User feedback:** "make Terra Therapy row gradient color like on figma design and wider than the rows and table" — row was inset (margin: 8px, smaller than card) with a diagonal CSS gradient; Figma shows the row protruding ~20px beyond the white card on both sides, with a horizontal left-to-dark gradient.
**Fix:** (1) Removed `overflow: hidden` from `.ct__card` and added `border-top/bottom-radius` to the four corner cells to maintain the card's rounded-corner appearance without clipping. (2) Changed `.ct__row--ours` margin from `8px` to `0 -20px` (extends 20px beyond card, flush vertically). (3) Swapped diagonal gradient for `linear-gradient(90deg, #5a7a50 0%, #31331e 60%)` (left-to-dark, matching the Figma screenshot more closely). (4) Added `margin: 0` override inside `@media (max-width: 749px)` to prevent horizontal overflow on mobile.

#### [FAIL] Cart button — doesn't add product to cart
**User feedback:** "doesn't add the product to the drawer cart" — button clicked but cart drawer never opened.
**Fix:** Replaced the `publish(PUB_SUB_EVENTS.cartUpdate, ...)` call with the correct Dawn pattern: POST to `/cart/add.js` with `sections: ['cart-drawer', 'cart-icon-bubble']` in the body, then call `cartDrawer.renderContents(cartData)` directly on the `<cart-drawer>` element. The `renderContents` method fetches section HTML from the POST response and opens the drawer — `publish` alone does not trigger this in this theme.

#### [SKIPPED] All remaining items (mobile carousel, tablet, schema, edge cases — not yet tested)

---

### Round 2 — Archived

#### [FAIL] Terra Therapy row is now correctly dark olive (no background image washing it out)
**User feedback:** Shared `expected-result.png` (target) vs `current-result.png` (actual) — the row should have a sage-green-to-olive gradient background, rounded corners with a visible inset margin from the card edges (floating "chip" look), and the icon above the logo should be small and un-rotated — not the flat solid `#31331e` color, square edges flush to the card, and large rotated/cropped photo that were shipped.
**Fix:** In `assets/section-comparison-table.css`: (1) `.ct__row--ours` now uses `background-image: linear-gradient(135deg, #7aa66f 0%, #31331e 100%)` (reusing the theme's existing sage-green and dark-olive tokens) instead of a flat `background-color`, plus `margin: 8px` and `border-radius: 12px` for the inset rounded look. (2) `.ct__ours-photo-wrap`/`.ct__ours-photo` no longer crop the image into an 80×80 box with `rotate(17deg) scale(1.4)` — turns out `ct-product-photo.png` *is* the wing/fabric icon shown small in the mockup, not a separate square photo, so it's now shown at its natural aspect ratio via `object-fit: contain` at 90px wide (70px tablet, 60px mobile).

#### [SKIPPED] Remaining Round 2 items (not yet tested — feedback came in before a full pass)

---

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
**Fix:** Added `border: none` and `cursor: pointer` to `.ct__btn` in the CSS.

#### [SKIPPED] Remaining cart and carousel items
