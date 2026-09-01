# Implementation Plan: Metaobject on Sections

Generated: 2026-09-01
Feature spec: `.claude/features/feature-implement-metaobject-on-the-sections/feature.md`

## Summary

Replaces hardcoded section blocks in two sections with Shopify metaobject references. Three metaobject definitions are created in Shopify Admin (`benefit_item`, `customer_testimonial`, `body_system_tab`), their entries are assigned to sections via `list.metaobject_reference` schema settings, and the Liquid in both sections is updated to read from those references instead of block settings. The testimonial area in CPI also gains name + quote rendering, which requires a small markup restructure and new CSS.

---

## Human-First Breakdown

### Admin Setup (human tasks in Shopify Admin — do these before any code is touched)

#### Create the `benefit_item` metaobject definition
This tells Shopify what fields a "Benefit Item" entry has. Once created, the merchant can add entries from Admin > Content > Custom data.

- [ ] Go to **Settings > Custom data > Metaobjects**
- [ ] Click **Add definition**
- [ ] Name: `Benefit Item` (handle auto-generates to `benefit_item`)
- [ ] Add field: `Icon` — type **File** (allow images only) — key `icon`
- [ ] Add field: `Text` — type **Single-line text** — key `text`
- [ ] Save

#### Create the `customer_testimonial` metaobject definition

- [ ] Add definition: name `Customer Testimonial` (handle: `customer_testimonial`)
- [ ] Add field: `Image` — type **File** (allow images only) — key `image`
- [ ] Add field: `Name` — type **Single-line text** — key `name`
- [ ] Add field: `Quote` — type **Multi-line text** — key `quote`
- [ ] Save

#### Create the `body_system_tab` metaobject definition

- [ ] Add definition: name `Body System Tab` (handle: `body_system_tab`)
- [ ] Add field: `Icon` — type **File** (allow images only) — key `icon`
- [ ] Add field: `Title` — type **Single-line text** — key `title`
- [ ] Add field: `Description` — type **Multi-line text** — key `description`
- [ ] Add field: `Bullets` — type **Multi-line text** — key `bullets`
- [ ] Add field: `CTA Text` — type **Single-line text** — key `cta_text`
- [ ] Add field: `CTA URL` — type **URL** — key `cta_url`
- [ ] Add field: `Category Image` — type **File** (allow images only) — key `category_image`
- [ ] Save

#### Populate entries for all 3 definitions
Go to **Admin > Content > Custom data**, click each definition, and add entries — 6 benefits, ~5 testimonials, 6 body-system tabs. These will be assigned to sections in the Customizer after the code deploys.

- [ ] Create 6 `Benefit Item` entries (icon + text for each)
- [ ] Create ~5 `Customer Testimonial` entries (image + name + quote for each)
- [ ] Create 6 `Body System Tab` entries (all 7 fields for each: Neurological, Musculoskeletal, Cardiovascular, Immune, Hormonal, Specialized)

---

### Code Preparation (before any visitor touches the page)

1. CPI section schema: `benefit` and `customer_photo` block types removed; two `list.metaobject_reference` settings added
2. CPI Liquid: `benefit_blocks` loop replaced with `section.settings.benefits` iteration — field access changes from `block.settings.X` to `item.field.X.value`
3. CPI Liquid: `customer_blocks` loop replaced with `section.settings.testimonials` iteration — avatar markup gains a wrapper element so name + quote can live outside the overflow-hidden circle
4. CPI CSS: `.cpi__avatar-wrapper`, `.cpi__avatar-name`, `.cpi__avatar-quote` styles added
5. IBS section schema: `benefit` block type removed; one `list.metaobject_reference` setting added
6. IBS Liquid: all three loops (pill list, image column, right panel) updated, plus the `has_images` check and arrow visibility condition

---

### Live Behavior (when a user interacts)

**Merchant (after deploy):**
1. Opens Theme Customizer, selects the CPI section
2. Sees two new content pickers: "Benefits" and "Testimonials"
3. Clicks a picker, selects entries from the list of metaobject entries created in Admin
4. Saves — content renders from metaobjects immediately
5. To edit copy/images later, goes to Admin > Content > Custom data — changes reflect everywhere the entry is referenced

**Visitor:**
- Benefit grid: identical to current
- Testimonials: same circular avatars, now with name and quote text below each circle
- Body-system tabs: identical to current (same pills, images, panel content — different data source only)

---

## Files

### New Files
None — this feature modifies two existing sections and one CSS file.

### Modified Files
- `sections/section-custom-product-information.liquid` — schema: remove `benefit` + `customer_photo` block types, add two `list.metaobject_reference` settings; Liquid: update both loops + add name/quote markup
- `sections/section-interactive-benefit-showcase.liquid` — schema: remove `benefit` block type, add one `list.metaobject_reference` setting; Liquid: update all three loops + `has_images` check + arrow condition
- `assets/section-custom-product-information.css` — add `.cpi__avatar-wrapper`, `.cpi__avatar-name`, `.cpi__avatar-quote` styles; update `.cpi__avatars` alignment

### Theme Components Reused
- `cpi__*` BEM prefix — all existing class names for benefits and testimonials are preserved; new classes follow the same pattern
- Default icons fallback (`default_icons[forloop.index0]`) — existing pattern in CPI benefits, kept as-is since `forloop.index0` still works with the new loop source

---

## Build Steps

### Step 1: Admin — Create all 3 metaobject definitions

**Do:** Follow the Admin Setup checklist above to create `benefit_item`, `customer_testimonial`, and `body_system_tab` definitions in Shopify Admin > Settings > Custom data > Metaobjects.

**Files:** None (Shopify Admin only)

**Details:**
- Field keys must be exact (lowercase, underscores) — they're referenced directly in Liquid as `item.field.key.value`
- Field type for all images: **File**, with the "Allow only images" toggle enabled
- Handles auto-generate from the definition name — confirm they match `benefit_item`, `customer_testimonial`, `body_system_tab` exactly

**Verify:** All 3 definitions appear in Admin > Content > Custom data with correct fields listed

---

### Step 2: Admin — Populate metaobject entries

**Do:** Add real content entries for each definition in Admin > Content > Custom data.

**Files:** None (Shopify Admin only)

**Details:**
- 6 `Benefit Item` entries — copy text from the existing CPI preset blocks; upload icons
- ~5 `Customer Testimonial` entries — upload customer photos; add name and quote
- 6 `Body System Tab` entries: Neurological, Musculoskeletal, Cardiovascular, Immune, Hormonal, Specialized — copy content from existing IBS preset blocks; upload icons and category images

**Verify:** Each definition shows the correct number of entries in the Custom data list

---

### Step 3: CPI schema — Swap block types for metaobject reference settings

**Do:** In `sections/section-custom-product-information.liquid`, remove the `benefit` and `customer_photo` block type objects from the `blocks` array. Add two new settings to the `settings` array:

```json
{
  "type": "list.metaobject_reference",
  "id": "benefits",
  "label": "Benefits",
  "metaobject_type": "benefit_item"
},
{
  "type": "list.metaobject_reference",
  "id": "testimonials",
  "label": "Testimonials",
  "metaobject_type": "customer_testimonial"
}
```

Also remove the top-of-file liquid assignments:
```liquid
assign benefit_blocks  = section.blocks | where: 'type', 'benefit'
assign customer_blocks = section.blocks | where: 'type', 'customer_photo'
```

**Files:** `sections/section-custom-product-information.liquid`

**Details:**
- `gallery_image` and `tab` block types stay in the `blocks` array — do not touch them
- The `tab_blocks` assignment stays too (`assign tab_blocks = section.blocks | where: 'type', 'tab'`)
- Place the two new settings after the existing "Benefits" header setting

**Verify:** Section loads in Customizer without error. "Benefits" and "Testimonials" pickers appear in the section settings panel. `benefit` and `customer_photo` no longer appear in the "Add block" menu.

---

### Step 4: CPI Liquid — Update benefits loop

**Do:** Replace the `for block in benefit_blocks` loop body with `for item in section.settings.benefits`. Update all field references inside the loop.

**Files:** `sections/section-custom-product-information.liquid`

**Details:**
- `benefit_blocks.size > 0` → `section.settings.benefits != blank`
- `for block in benefit_blocks` → `for item in section.settings.benefits`
- `block.settings.icon != blank` → `item.field.icon.value != blank`
- `block.settings.icon | image_url: width: 48 | image_tag: ...` → `item.field.icon.value | image_url: width: 48 | image_tag: ...`
- `block.settings.text` → `item.field.text.value`
- `{{ block.shopify_attributes }}` — remove entirely (metaobject items don't have block attributes)
- The `default_icons[forloop.index0]` fallback pattern stays unchanged

**Verify:** After assigning benefit entries in the Customizer, the benefit grid renders correctly. Default icons appear for entries without a custom icon.

---

### Step 5: CPI Liquid — Update testimonials loop + add name/quote markup

**Do:** Replace the `for block in customer_blocks` loop. Wrap the avatar circle in a new `<div class="cpi__avatar-wrapper">` so name + quote can sit below the `overflow: hidden` circle without being clipped.

**Files:** `sections/section-custom-product-information.liquid`

**Details:**
- `customer_blocks.size > 0` → `section.settings.testimonials != blank`
- `for block in customer_blocks` → `for item in section.settings.testimonials`
- Replace `<div class="cpi__avatar" {{ block.shopify_attributes }}>` with `<div class="cpi__avatar-wrapper"><div class="cpi__avatar">`
- Image: `block.settings.image` → `item.field.image.value`; `alt: block.settings.alt` → `alt: item.field.name.value`
- After the closing `</div>` of `.cpi__avatar`, add:
  ```liquid
  {%- if item.field.name.value != blank -%}
    <p class="cpi__avatar-name">{{ item.field.name.value }}</p>
  {%- endif -%}
  {%- if item.field.quote.value != blank -%}
    <p class="cpi__avatar-quote">"{{ item.field.quote.value }}"</p>
  {%- endif -%}
  </div>
  ```
- Placeholder SVG stays: `{{ 'customer' | placeholder_svg_tag: 'cpi__avatar-placeholder' }}`

**Verify:** Testimonials render after assigning entries. Name and quote may be unstyled until Step 6 — that's fine.

---

### Step 6: CPI CSS — Style testimonial name + quote

**Do:** Read `assets/section-custom-product-information.css` around the `.cpi__avatar` block (lines ~427–455). Add new rules for the wrapper and text elements; update `.cpi__avatars` alignment.

**Files:** `assets/section-custom-product-information.css`

**Details:**
- `.cpi__avatars`: add `align-items: flex-start` (prevents flex-stretch from forcing equal height on wrappers with varying quote lengths)
- `.cpi__avatar-wrapper`: `display: flex; flex-direction: column; align-items: center; gap: 0.6rem; width: 9.4rem;`
- `.cpi__avatar-name`: small label, `font-family: 'Recoleta', Georgia, serif; font-size: 1.2rem; color: #31331e; text-align: center; margin: 0;`
- `.cpi__avatar-quote`: `font-family: Figtree, sans-serif; font-size: 1.1rem; font-style: italic; color: #5a5c48; text-align: center; margin: 0; line-height: 1.4;`
- The `.cpi__avatar` circle rules stay exactly as-is (`9.4rem × 9.4rem; border-radius: 50%; overflow: hidden`)

**Verify:** Testimonials display with circular avatar, name centred below, quote in italic below the name. Layout doesn't break when some entries have no quote.

---

### Step 7: IBS schema — Swap block type for metaobject reference setting

**Do:** In `sections/section-interactive-benefit-showcase.liquid`, remove the `benefit` block type from the `blocks` array. The `blocks` array becomes empty — it can be left as `"blocks": []` or removed entirely. Add one new setting:

```json
{
  "type": "list.metaobject_reference",
  "id": "body_systems",
  "label": "Body systems",
  "metaobject_type": "body_system_tab"
}
```

**Files:** `sections/section-interactive-benefit-showcase.liquid`

**Details:**
- Place the new setting after the existing "Image column" header group in settings, under a new `{ "type": "header", "content": "Content" }` header
- The preset's `blocks` array in the schema presets also becomes empty or is removed
- Remove the preset's block entries (the 6 benefit blocks with hardcoded titles) — the preset can remain as a plain `{ "name": "Benefit Showcase" }` with no blocks

**Verify:** IBS section loads in Customizer without error. "Body systems" picker appears in settings.

---

### Step 8: IBS Liquid — Update all loops

**Do:** Update four places in `sections/section-interactive-benefit-showcase.liquid`.

**Files:** `sections/section-interactive-benefit-showcase.liquid`

**Details:**

**1 — `has_images` check** (top liquid block):
```liquid
for item in section.settings.body_systems
  if item.field.category_image.value != blank
    assign has_images = true
    break
  endif
endfor
```

**2 — Pill list loop** (`ibs__left` div):
- `for block in section.blocks` → `for item in section.settings.body_systems`
- `{{ block.shopify_attributes }}` → remove
- `block.settings.icon != blank` → `item.field.icon.value != blank`
- `block.settings.icon | image_url: width: 48` → `item.field.icon.value | image_url: width: 48`
- `block.settings.title | default: 'Benefit'` → `item.field.title.value | default: 'Benefit'`
- Same substitutions in the mobile card: description, bullets, cta_url, cta_text
- Bullets newline split: `item.field.bullets.value | newline_to_br | split: '<br />'`
- CTA: `block.settings.cta_url != blank` → `item.field.cta_url.value != blank`

**3 — Image column loop** (`ibs__image-col` div):
- `for block in section.blocks` → `for item in section.settings.body_systems`
- `block.settings.category_image != blank` → `item.field.category_image.value != blank`
- `block.settings.category_image | image_url: width: 800` → `item.field.category_image.value | image_url: width: 800`
- Same for `srcset` image_url calls
- `alt: block.settings.title` → `alt: item.field.title.value`
- Image dimensions: `block.settings.category_image.width/height` → `item.field.category_image.value.width` and `.height`
- Arrow visibility: `section.blocks.size > 1` → `section.settings.body_systems.size > 1`

**4 — Right panel loop** (`ibs__panel` div):
- Same field substitutions as the mobile card in the pill loop
- Arrow visibility: `section.blocks.size > 1` → `section.settings.body_systems.size > 1`

**Verify:** IBS renders the tab pills and panel. Clicking a pill switches the active image and panel content. Mobile inline cards expand correctly.

---

### Step 9: Customizer — Assign entries and end-to-end verify

**Do:** Open Theme Customizer > navigate to a page with each section > assign the metaobject entries via the new pickers > save > preview.

**Files:** None (Customizer only)

**Details:**
- CPI: assign 6 benefit entries to "Benefits" picker; assign ~5 testimonial entries to "Testimonials" picker
- IBS: assign 6 body-system tab entries to "Body systems" picker
- Preview both sections on the storefront (not just Customizer preview)

**Verify:** All content renders correctly from metaobject data. See QA checklist.

---

## Risks & Considerations

- **`list.metaobject_reference` setting type** — Supported in Online Store 2.0 themes. Dawn qualifies. If the setting doesn't appear as a picker in the Customizer after Step 3, check the Shopify version and confirm the `metaobject_type` handle matches the definition exactly (case-sensitive, underscores).
- **Metaobject image field in Liquid** — `item.field.icon.value` returns a Shopify file object for `file_reference` fields. Piping directly to `image_url` should work. If it doesn't, check whether the field was created as "File" type (not "URL" or "Text"). Test during Step 4.
- **Reordering UX difference** — With blocks, merchants drag to reorder in the Customizer sidebar. With `list.metaobject_reference`, they remove and re-add entries via the picker to change order. Less intuitive — flag this for the client.
- **IBS JavaScript** — `benefit-showcase.js` uses `data-index` attributes set via `forloop.index0`. Since the new loops also use `forloop`, no JS changes are needed. Verify switching works during Step 9.
- **Existing preset data becomes inert** — The hardcoded block entries in both section presets won't render after migration. No errors, just dead JSON. Can be cleaned up anytime.

## Open Questions

None — all scoping decisions confirmed.

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# OUTPUT-implementation-plan.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
