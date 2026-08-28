# QA: Interactive Benefit Showcase

Feature spec: `.claude/features/feature-interactive-benefit-showcase/feature.md`
Implementation plan: `.claude/features/feature-interactive-benefit-showcase/OUTPUT-implementation-plan.md`

## How to Use This File

1. Run through the checklist after implementation — check items that pass, add notes on items that fail
2. Tell AI to read this file — it will fix the issues and reset the checklist for another round
3. Repeat until everything passes
4. Previous rounds are kept as a log below the current round

---

## Current Round (Round 1)

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
- [ ] Clicking the right arrow repeatedly — cycles through all categories in sequence and loops correctly
- [ ] CTA link text and URL are correct per block
- [ ] Only one category is active at a time (no two pills highlighted simultaneously)

### Edge cases

- [ ] Block with no CTA URL set — the CTA link element is not rendered (no empty `<a>` tag)
- [ ] Block with no category image — centre column image for that block does not render a broken `<img>` element
- [ ] Section with only 1 block — right arrow is not visible
- [ ] Block with empty bullets field — no empty `<ul>` rendered in the panel
- [ ] All blocks have no images set — centre image column collapses or is hidden, no broken layout

### Mobile (test at 375px viewport width)

- [ ] First category is expanded on page load — detail card visible below first pill
- [ ] Other categories are collapsed on page load
- [ ] Tapping a collapsed pill — it expands, showing its detail card inline below the pill
- [ ] Tapping a collapsed pill — the previously open card collapses
- [ ] Only one category can be open at a time on mobile
- [ ] Centre image column is not visible on mobile
- [ ] Right arrow is not visible on mobile
- [ ] Detail card content (title, description, bullets, CTA) matches the block's schema settings

### Desktop layout (test at 1200px viewport width)

- [ ] Three columns are visible: pill list left, image centre, dark panel right
- [ ] Section background is cream (`#f4f3ee`)
- [ ] Active pill has dark olive background (`#31331e`) with white text
- [ ] Inactive pills have transparent background with dark olive border and text
- [ ] Detail panel background is dark olive (`#31331e`) with white text
- [ ] Right arrow is visible in the panel

### Accessibility

- [ ] Keyboard: Tab key reaches each pill
- [ ] Keyboard: pressing Enter or Space on a focused pill activates it
- [ ] Keyboard: Tab key reaches the right arrow button
- [ ] Keyboard: pressing Enter or Space on the arrow button advances to the next category
- [ ] Active pill has `aria-selected="true"`; all others have `aria-selected="false"`
- [ ] Arrow button has a descriptive `aria-label` (e.g. "Next benefit")

### Shopify customizer

- [ ] Section appears in the customizer "Add section" sidebar
- [ ] Adding a new block — a new pill appears in the list and a new panel is available
- [ ] Removing a block — the pill and its panel are removed
- [ ] Editing a block's title — pill label and panel heading update in the live preview
- [ ] Editing a block's description — panel description updates in the live preview
- [ ] Uploading a category image — image appears in the centre column when that block is active
- [ ] Uploading an icon image — icon appears inside the pill alongside the title
- [ ] Padding top / padding bottom settings — section spacing adjusts correctly
- [ ] Preset ("Interactive Benefit Showcase") available when adding the section — drops in with 6 pre-filled blocks

---

## Previous Rounds

[Empty — no previous rounds yet.]
