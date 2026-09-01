# [Feature Name]

## Brief

several sections are prime candidates for metaobjects — basically anywhere there's repeating structured content that a non-dev should be able to edit without touching Liquid/theme code:

here is Strong metaobject candidates and implement it on section-custom-product-information.liquid and section-interactive-benefit-showcase.liquid:

"Why you need this" benefit grid (6 items) — icon + title/description pairs, clearly placeholder content right now ("Describe one product benefit here"). Perfect metaobject: fields for icon, heading, description, sort order.
"Real People. Real Healing." avatar row — reviewer photo + probably name/quote tied to it. A testimonial metaobject (photo, name, quote, rating) referenced as a list on the product.
"One Natural Solution" body-system tabs (Neurological, Musculoskeletal, Cardiovascular, Immune, Hormonal, Specialized) — each has an icon/label for the pill selector, a heading, an image, a bullet list of symptoms, and a CTA link. This is a great fit for a metaobject list with an image field, rich text/list field for bullets, and a reference field if the CTA links elsewhere.

---

## Scoping Questions

Generated: 2026-09-01
Chosen approach: Option B — Section-level metaobject references (`list.metaobject_reference` settings in section schema, entries managed in Shopify Admin > Content > Custom Data)

---

### Q1: Which content areas are we converting?

The brief mentions all three. But the benefit grid (icon + text) is already the simplest data shape and works fine as blocks. Consider whether metaobject overhead is worth it for a 6-item list the merchant rarely changes.

- [x] a) All three: benefit grid (CPI), customer photos/testimonials (CPI), body-system tabs (IBS)
- [ ] b) Testimonials + body-system tabs only — leave the benefit grid as blocks
- [ ] c) Body-system tabs only — it's the most complex structured content and the clearest win

**Notes:**  


---

### Q2: What fields should the Customer Testimonial metaobject include?

Currently the `customer_photo` block only stores an image and alt text. The section markup only renders the photo — no name or quote is shown anywhere in the UI. If we add name/quote to the metaobject, the Liquid and CSS will also need updating to actually display them.

- [x] a) Image + name + quote (recommended — common testimonial pattern, still simple)
- [ ] b) Image + name + quote + star rating (1–5)
- [ ] c) Image only — same as current blocks, just moved to metaobject

**Notes:**  


---

### Q3: What fields should the Benefit Item metaobject include?

Currently: icon (image_picker) + text (single line). The brief mentions "icon, heading, description, sort order." Splitting into heading + description is a meaningful UI change — currently benefits show as a single-line text.

- [x] a) Keep as-is: icon + single text line (matches current blocks exactly)
- [ ] b) Icon + heading + description (richer — would need a CSS/markup change in CPI to render both)
- [ ] c) Icon + heading + description + sort_order field

**Notes:**  


---

### Q4: Should the existing section blocks be kept or removed?

Once we switch to metaobject reference settings, the old block types (`benefit`, `customer_photo`, `tab`) become redundant. Keeping both adds confusion for the merchant — two ways to add content that only one of them will render.

- [x] a) Remove the old block types cleanly — metaobjects replace them entirely (recommended)
- [ ] b) Keep blocks as fallback — if no metaobject entries are assigned, fall back to blocks
- [ ] c) Discuss further (add notes below)

**Notes:**  


---

### Q5: Who creates the metaobject entries, and when?

**Important:** Metaobject definitions (the schema) must be created manually in Shopify Admin > Settings > Custom data > Metaobjects, or via the Admin API. This cannot be done via theme code. The Liquid can only read definitions that already exist.

This means: before the Liquid code will work, someone needs to:
1. Create the metaobject definition(s) in Admin
2. Create the actual entries (populate the content)
3. Then assign them in the Theme Customizer

- [ ] a) I'll create the definitions and entries in Shopify Admin myself before testing
- [x] b) Can you walk me through creating the definitions in Admin as part of this feature?
- [ ] c) Let's use the Shopify Admin API / shopify-custom-data skill to create definitions programmatically

**Notes:**  


---

### Q6: Should body-system tab bullets stay as a textarea (one bullet per line)?

Currently the IBS section splits a textarea on newlines to render a `<ul>`. In a metaobject, the equivalent would be a `multi_line_text_field`. This works but is less user-friendly than a proper list — there's no way to enforce "one line per bullet" at the data level.

- [x] a) Keep as multi-line text field (same behaviour, easiest to migrate)
- [ ] b) Use a `rich_text` field instead so the merchant gets a proper editor (bullets are handled natively)
- [ ] c) Discuss (add notes)

**Notes:**  


---

### Recommendations

1. **Start with metaobject definitions first, code second.** The section Liquid can't be tested until the Admin definitions exist. If you're on the store right now, create the definitions before I write a single line of Liquid — otherwise we're writing blind.

2. **Testimonials are the clearest win for Q2.** Adding name + quote to the metaobject and rendering them in the section UI is a genuine feature improvement, not just a data migration. Even if you go with image-only for now, the field is there for later.

3. **Clean block removal (Q4 option A) is the right call.** Don't keep two content-entry systems for the same thing. The migration path: create entries in metaobjects, assign them in the Customizer, then delete the old block content. Old block preset data in the theme JSON will just become dead keys — harmless.

4. **Body-system tabs: `rich_text` for bullets (Q6 option B).** The textarea/newline workaround in Liquid is a hack we inherited. A metaobject `rich_text` field gives the merchant a real editor, and Liquid renders it with `{{ field.value }}` without any splitting logic.

5. **Scope risk to flag:** Three metaobject definitions + three section schema changes + three sets of Liquid + CSS updates for any new fields rendered = meaningful scope. If you want to ship something sooner, consider doing one content area first (body-system tabs on IBS is the best candidate — most structured, most to gain) and treating it as the template for the other two.

## Extended Brief

Generated: 2026-09-01

### Chosen Approach

Section-level metaobject references — three new metaobject definitions created in Shopify Admin, assigned to sections via `list.metaobject_reference` schema settings, replacing the relevant block types in both sections.

### Requirements

- Create 3 metaobject definitions in Shopify Admin (Step 1, before any Liquid work):
  - `benefit_item` — fields: `icon` (image), `text` (single-line text)
  - `customer_testimonial` — fields: `image` (image), `name` (single-line text), `quote` (multi-line text)
  - `body_system_tab` — fields: `icon` (image), `title` (single-line text), `description` (multi-line text), `bullets` (multi-line text), `cta_text` (single-line text), `cta_url` (url), `category_image` (image)
- Populate entries for each definition in Admin (6 benefits, ~5 testimonials, 6 body-system tabs)
- Update `section-custom-product-information.liquid`:
  - Remove `benefit` and `customer_photo` block types from schema
  - Add two `list.metaobject_reference` settings (`benefit_item`, `customer_testimonial`)
  - Update Liquid iteration to loop over metaobject entries instead of filtered blocks
  - Update testimonial markup to render name + quote (currently only avatar image is shown)
  - Add small CSS for name + quote display in the testimonials area
- Update `section-interactive-benefit-showcase.liquid`:
  - Remove `benefit` block type from schema (its only block type)
  - Add one `list.metaobject_reference` setting (`body_system_tab`)
  - Update all Liquid field access from `block.settings.key` to `item.field.key.value`
  - Keep bullet rendering via newline-split (`| newline_to_br | split: '<br />'`) — same logic, different source

### Where It Lives

- `sections/section-custom-product-information.liquid` — benefits and testimonials areas
- `sections/section-interactive-benefit-showcase.liquid` — body-system tab list
- Metaobject entries managed in Shopify Admin > Content > Custom data

### Data Sources

After migration:
- Benefits: `section.settings.benefits` — list of `benefit_item` metaobject references
- Testimonials: `section.settings.testimonials` — list of `customer_testimonial` references
- Body systems: `section.settings.body_systems` — list of `body_system_tab` references

Field access pattern: `item.field.key.value` (e.g. `item.field.title.value`, `item.field.icon.value`)

### User Interaction

No change to end-user interaction. The sections render identically from a visitor's perspective, with the addition of name + quote text appearing below testimonial avatars in the CPI section.

Merchant workflow (post-migration):
1. Shopify Admin > Content > Custom data — create/edit/reorder metaobject entries
2. Theme Customizer — assign the list to each section via the new picker settings

### Customizer Settings

Each section gets a new list picker setting per content area:
- CPI: "Benefits" (`list.metaobject_reference` → `benefit_item`), "Testimonials" (`list.metaobject_reference` → `customer_testimonial`)
- IBS: "Body systems" (`list.metaobject_reference` → `body_system_tab`)

What should NOT be configurable: the fields inside each metaobject entry — those are managed in Admin, not the Customizer.

### Decisions Made

- **All three content areas** converted (Q1-a) — consistent approach across both sections
- **Testimonial metaobject** includes image + name + quote (Q2-a) — rendered in UI, requires markup + CSS addition
- **Benefit item** keeps icon + single text line (Q3-a) — matches existing block data shape exactly, no markup changes
- **Old block types removed cleanly** (Q4-a) — no fallback, no dual-system confusion
- **Merchant guided through Admin setup** (Q5-b) — definitions and entries created in Admin as Step 1
- **Bullets stay as multi-line text** (Q6-a) — newline-split pattern inherited from existing IBS Liquid

### Edge Cases to Handle

- Empty metaobject list (nothing assigned in Customizer) → hide the entire content area using `if` check, same pattern as existing `if benefit_blocks.size > 0`
- Optional fields (quote, CTA URL, icon) → `!= blank` guard before rendering
- Missing image on testimonial → fall back to existing placeholder SVG pattern

### Out of Scope

- CPI `gallery_image` blocks — unchanged
- CPI `tab` blocks (Description / Who is it for / Shipping / Care Instructions accordion) — unchanged
- Star ratings on testimonials — not selected, can be added as a metaobject field update later
- Rich text for body-system bullets — staying as multi-line text + Liquid split
- Any changes to CSS for benefits or body-system tabs (markup structure is identical, no visual change)

### Dependencies

- Metaobject definitions must exist in Shopify Admin **before** the Liquid code can be tested. This is a hard prerequisite — the implementation plan will begin with the Admin setup walkthrough.
- No third-party apps or libraries required.

### Notes

- The IBS section will have no block types after this change — its `blocks` array in the schema can be emptied or removed entirely.
- CPI retains `gallery_image` and `tab` block types — only `benefit` and `customer_photo` are removed.
- Existing preset block data in both sections becomes inert after migration (won't render, won't error). Can be cleaned up at any time.
- Reordering: metaobject entry order is controlled by drag-and-drop in the Customizer's list picker — same UX as reordering blocks.

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# feature.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
