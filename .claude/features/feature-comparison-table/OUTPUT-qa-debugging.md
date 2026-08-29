# QA: Comparison Table

Feature spec: `.claude/features/feature-comparison-table/feature.md`
Implementation plan: `.claude/features/feature-comparison-table/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 1)

Status: Testing

### Core desktop behavior

- [ ] Section renders without errors on a Shopify page
- [ ] Heading "Why We Are Really Different" is visible and styled correctly
- [it doesn't looks like on desktop.png. looks current result on reference folder] Terra Therapy row is highlighted (dark olive background, white text, background image)
- [ ] All 4 competitor rows render below the brand row
- [ ] All 5 columns visible at once on desktop (Solution + How it works + What to consider + Cost over time + Side effects)
- [ ] Column header labels match the settings values
- [ ] Cell text for both the brand row and each competitor row displays correctly
- [ ] Brand logo and product photo render in the Solution column (or fallbacks appear if no image uploaded)
- [ ] Competitor icons render (or placeholder area shows if no image uploaded)
- [ ] No horizontal scroll on desktop (table fits within page width)

### Cart button

- [remove border color] ADD TO CART button renders when a product is selected in section settings
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

[Empty — no rounds completed yet]
