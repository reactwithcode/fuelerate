# Body System Tab — content recovered from old IBS blocks

Source: the 6 `benefit`-type blocks that lived on the "Interactive Benefit Showcase" section
in `templates/product.json` before the metaobject migration. These blocks are no longer valid
(the section schema's `blocks` array is now empty — content comes from the `body_systems`
`list.metaobject_reference` setting instead), and were removed from `templates/product.json`
on 2026-09-01 to fix a theme upload error ("Invalid value for type in block... Type must be
defined in schema").

Use this as the copy source when creating the 6 `Body System Tab` metaobject entries in
Admin > Content > Custom data (Step 2 of `OUTPUT-implementation-plan.md`). Only the first two
entries had real content filled in — the rest are still placeholder text and need real copy.

---

## 1. Neurological & Mental Health — real content

- **Icon**: `shopify://shop_images/showcase_benefit_icon_1_7057de19-2e14-46a6-afa9-53278c884ee0.png`
- **Title**: Neurological & Mental Health
- **Description**: Grounding helps calm and stabilize the nervous system, supporting those dealing with:
- **Bullets**:
  - Migraines & headaches
  - Neuropathy & brain fog
  - Anxiety, depression & mood swings
  - ADHD & focus issues
  - Insomnia & disrupted sleep
- **CTA Text**: Explore the science behind these benefits
- **CTA URL**: https://lonestarneurology.net/others/the-link-between-mental-health-and-neurology/
- **Category Image**: `shopify://shop_images/showcase_benefit_category_1.png`

## 2. Musculoskeletal Pain & Inflammation — real content

- **Icon**: `shopify://shop_images/showcase_benefit_icon_2_46acdb4c-53fd-4a82-9d00-5206d7ea8464.png`
- **Title**: Musculoskeletal Pain & Inflammation
- **Description**: By reducing chronic inflammation, grounding can offer relief from:
- **Bullets**:
  - Arthritis (RA & OA)
  - Fibromyalgia
  - Joint, back & neck pain
  - Chronic fatigue syndrome
  - Post-exercise soreness
- **CTA Text**: Explore the science behind these benefits
- **CTA URL**: https://my.clevelandclinic.org/health/symptoms/musculoskeletal-pain
- **Category Image**: `shopify://shop_images/showcase_benefit_category_2.png`

## 3. Cardiovascular & Circulatory Health — placeholder, needs real copy

- **Icon**: none set
- **Title**: Cardiovascular & Circulatory Health
- **Description**: Describe the benefit category here.
- **Bullets**: Key benefit one / Key benefit two / Key benefit three
- **CTA Text**: Explore the science behind these benefits
- **CTA URL**: (blank)
- **Category Image**: none set

## 4. Immune & Inflammatory Conditions — placeholder, needs real copy

- **Icon**: none set
- **Title**: Immune & Inflammatory Conditions
- **Description**: Describe the benefit category here.
- **Bullets**: Key benefit one / Key benefit two / Key benefit three
- **CTA Text**: Explore the science behind these benefits
- **CTA URL**: (blank)
- **Category Image**: none set

## 5. Hormonal & Metabolic Balance — placeholder, needs real copy

- **Icon**: none set
- **Title**: Hormonal & Metabolic Balance
- **Description**: Describe the benefit category here.
- **Bullets**: Key benefit one / Key benefit two / Key benefit three
- **CTA Text**: Explore the science behind these benefits
- **CTA URL**: (blank)
- **Category Image**: none set

## 6. Specialized Support — placeholder, needs real copy

- **Icon**: none set
- **Title**: Specialized Support
- **Description**: Describe the benefit category here.
- **Bullets**: Key benefit one / Key benefit two / Key benefit three
- **CTA Text**: Explore the science behind these benefits
- **CTA URL**: (blank)
- **Category Image**: none set

---

## CPI benefit / customer_photo blocks — not included above

`templates/product.json` also had 6 `benefit` blocks and 5 `customer_photo` blocks on the
"Custom Product Information" section (same fix applied there). Not documented here because
none had real content: all 6 benefits were the unedited placeholder text
"Describe one product benefit here", and all 5 customer photos used the same two generic
stock images (`Ellipse_Photo_1.png` / `Ellipse_Photo_2.png`) with alt text "Happy customer" —
nothing worth preserving as a copy source for the `benefit_item` / `customer_testimonial`
metaobject entries.
