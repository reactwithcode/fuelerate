# Metaobject Sections

## Brief

<!-- Draft below written by AI from our chat discussion — please review, edit, and correct anything before running /scope-feature. -->

Convert repeated content on 3 existing product-page sections from section blocks to Shopify metaobjects, so the same content can be reused across multiple product pages instead of being re-entered per product:

1. **Trust bar** (`sections/section-trust-bar.liquid`) — the `item` block (icon + label) becomes a `trust_signal` metaobject. Site-wide badges like "90-Day Results-Backed Guarantee" and "Designed in USA" are the same on every product page today.
2. **Comparison table** (`sections/section-comparison-table.liquid`) — the `competitor` block (name, icon, how it works, what to consider, cost over time, side effects) becomes a `competitor` metaobject. Competitors like "Sleeping Pills" / "Pain Meds" are generic, not tied to one product.
3. **Interactive benefit showcase** (`sections/section-interactive-benefit-showcase.liquid`) — the `benefit` block (icon, title, description, bullets, CTA, category image) becomes a `benefit_category` metaobject. Categories like "Neurological & Mental Health" are generic grounding-science content, not product-specific.

Reason: confirmed with the orchestrator that Fuelerate will have multiple product pages sharing this same content, so metaobjects (edit once, reflect everywhere) beat section blocks (re-enter per product).

**Explicitly out of scope** — staying as section blocks, no change:
- `section-custom-product-information.liquid`'s `benefit` blocks ("Why you need this" 6-icon grid) and `tab` blocks (Description / Who is it for / Shipping / Care) — these are one-off, per-product copy, not reused.
- `customer_photo` blocks (avatar row) — currently just decorative images with no name/quote data; not a metaobject candidate unless that changes.

**Known dependency:** the 3 metaobject *definitions* need to be created in Shopify Admin → Content → Metaobjects before the section schemas can reference them via `metaobject_reference` / `metaobject_list` settings. This requires store admin access — flag who will do this and when.

---

## Scoping Questions

[Do not write this manually. This section gets filled in by AI via the `/scope-feature` skill.
AI will write questions here for you to answer by checking boxes and adding notes.]

## Extended Brief

[Do not write this manually. This section gets filled in by AI via the `/scope-feature` skill, after you've answered the scoping questions above.]

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# feature.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
