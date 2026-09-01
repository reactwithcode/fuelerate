# QA: Metaobject on Sections

Feature spec: `.claude/features/feature-implement-metaobject-on-the-sections/feature.md`
Implementation plan: `.claude/features/feature-implement-metaobject-on-the-sections/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 1)

Status: Testing

### Admin setup
- [ ] All 3 metaobject definitions exist in Admin > Settings > Custom data > Metaobjects (`benefit_item`, `customer_testimonial`, `body_system_tab`)
- [ ] Each definition has the correct fields with correct keys (lowercase, underscores)
- [ ] All entries are populated (6 benefits, ~5 testimonials, 6 body system tabs)
- [ ] Entries are successfully assigned to sections via the Customizer pickers

### CPI — Benefits
- [ ] Benefits section renders from metaobject entries (not block data)
- [ ] Each benefit shows its icon and text correctly
- [ ] An entry without a custom icon falls back to the default position-based icon (cpi-icon-sleep, cpi-icon-muscle, etc.)
- [ ] Benefits heading still displays from section settings
- [ ] Removing all assigned benefit entries hides the entire benefits area gracefully (no empty div rendered)

### CPI — Testimonials
- [ ] Testimonials section renders from metaobject entries
- [ ] Each testimonial shows the circular avatar image
- [ ] Name appears below the circle (when populated)
- [ ] Quote appears below the name in italics (when populated)
- [ ] An entry with no quote renders without the quote element (no empty quotes showing)
- [ ] An entry with no image shows the placeholder SVG
- [ ] Social proof heading still displays from section settings
- [ ] Removing all assigned testimonial entries hides the entire social proof area gracefully

### CPI — Unchanged areas
- [ ] Gallery images (blocks) still work and are unaffected
- [ ] Tab/accordion blocks (Description, Who is it for, Shipping, Care Instructions) still work and are unaffected
- [ ] Add to cart, variant selector, badges — all unaffected

### IBS — Body system tabs
- [ ] All 6 tabs render as pill buttons in the left column
- [ ] Each pill shows the correct icon and label
- [ ] Clicking a pill activates it (adds `ibs__pill--active` class)
- [ ] The corresponding category image updates in the centre column
- [ ] The corresponding detail panel updates in the right panel
- [ ] Prev/next arrow buttons navigate between tabs
- [ ] The section heading and subtext still display from section settings
- [ ] The `ibs--no-images` class is applied when no entries have a category image

### IBS — Mobile behavior
- [ ] Clicking a pill on mobile expands the inline card below it
- [ ] Only one inline card is open at a time
- [ ] The inline card shows title, description, bullets, and CTA link correctly

### IBS — Panel content
- [ ] Title renders in right panel
- [ ] Description renders in right panel
- [ ] Bullets render as a list (newline-split from multi-line text field)
- [ ] CTA link renders when `cta_url` is set; hidden when blank
- [ ] CTA text falls back to default when `cta_text` is blank

### Edge cases
- [ ] CPI with no benefit entries assigned: benefits area is hidden, page doesn't break
- [ ] CPI with no testimonial entries assigned: social proof area is hidden, page doesn't break
- [ ] IBS with no body_system entries assigned: section renders without pills or panels (no JS errors)
- [ ] IBS with only 1 entry assigned: prev/next arrows are hidden

### Accessibility
- [ ] IBS pill buttons have correct `role="tab"` and `aria-selected` attributes
- [ ] IBS panels have correct `role="tabpanel"` attributes
- [ ] Tab key navigation through IBS pills works as expected
- [ ] CPI testimonial images have correct alt text (from the `name` field)

### Customizer
- [ ] CPI section shows "Benefits" and "Testimonials" metaobject pickers in settings panel
- [ ] IBS section shows "Body systems" metaobject picker in settings panel
- [ ] `benefit`, `customer_photo`, and IBS `benefit` no longer appear in the "Add block" menus
- [ ] `gallery_image` and `tab` block types still appear in CPI's "Add block" menu
- [ ] Customizer live preview updates when entries are added/removed from the pickers

---

## Previous Rounds

[Empty — no rounds completed yet.]

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# OUTPUT-qa-debugging.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
