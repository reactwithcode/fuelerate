[Do not write this manually. AI maintains this file automatically after every meaningful action.]

This is the project's persistent memory. AI reads it at the start of every session to restore context. It will contain:

- **Timestamped entries** — What was done and when
- **Decisions made** — What was decided and why, including alternatives that were considered
- **Architectural choices** — Technical decisions that affect the project long-term
- **Risks & open questions** — Things to watch out for in future development

## 2026-08-29 — Comparison Table: fixed desktop column-divider misalignment on the Terra Therapy row

User sent a screenshot showing the background-image fix from the previous entry actually worked (confirmed the gradient graphic renders correctly), but the row's internal vertical divider lines (between Solution/How it works/etc.) didn't line up with the header row's dividers above it.
- **Root cause**: `.ct__row--ours` used `margin: 0 -20px` to bleed 20px past the white card on each side. Every row shares the same `.ct__row { grid-template-columns: 190px repeat(4, 1fr); }` definition, but that -20px margin makes *this row's own box* 40px wider than sibling rows — so the fixed `190px` Solution column lands correctly, but the `1fr` tracks after it compute to different absolute pixel positions than in the header/competitor rows, which stay at the card's normal width. Hence the visible divider misalignment.
- **Fix**: stopped resizing the row itself. `.ct__row--ours` no longer has any margin/width override — it's exactly the same box size as every sibling row, so its grid (and thus its dividers) line up perfectly. The ~20px bleed + background image is now painted on a `.ct__row--ours::before` pseudo-element (`position: absolute; left: -20px; right: -20px`) sitting behind the row's content. Moved the Liquid `{% style %}` block's background-image rule from `.ct__row--ours` to `.ct__row--ours::before` to match.
- **Confirmed live**: this session has an active `shopify theme dev --store developmet-test.myshopify.com` process (port 9292) — verified the compiled CSS served at `/cdn/shop/t/1/assets/section-comparison-table.css` already reflects the new `::before` rule.
- **Note**: this section isn't placed in any committed template/JSON in this repo — it's only reachable via a live Theme Editor/customizer session. Screenshots from the user are the only way to visually verify changes; can't fetch the rendered page directly.

## 2026-08-29 — Comparison Table: fixed background-image cropping on desktop (cover → stretch)

User reported the desktop Terra Therapy row still didn't match Figma after the previous change. Root cause: `background-size: cover` preserves aspect ratio and crops to fill — since the live row's actual width:height ratio won't exactly match the Figma-exported `ct-row-bg-desktop.png` (1313×116, sized off Figma's fixed 1440px canvas), it was cropping part of the gradient off the edges (likely losing some of the light-green start and/or dark-green end), leaving a narrower/duller-looking band than intended.
- **Fix**: changed `background-size: cover` → `background-size: 100% 100%` (+ `background-repeat: no-repeat`) on `.ct__row--ours` (desktop) and both mobile split cells (`.ct__cell--solution`, `.ct__col-viewport`). Since the image is a smooth two-tone gradient with no shape/detail to protect, non-uniform stretching is visually safe and guarantees the gradient's start/end always land exactly at the row's edges regardless of its actual rendered size.
- **Watch for**: if a merchant uploads their own `our_row_bg` with real photographic content (not a smooth gradient), this same `100% 100%` stretch would visibly distort it. Worth reconsidering (e.g. `cover` + wider export margins) if that setting sees real use.

**Not yet verified in a live theme preview** — no dev server available in this session.

## 2026-08-29 — Comparison Table: Terra Therapy row now uses Figma's actual background image; default competitor icons added

User asked for the Terra Therapy row to use an **image** background (matching Figma nodes 1-2405/1-4012), not a computed CSS gradient, plus a default icon for the competitor "Icon / product image" setting.
- Downloaded the actual rendered graphics via the Figma MCP (`download_assets`, not screenshots) for: the desktop row bar (node 1:2416, 1313×116), the mobile attribute chip (node 1:4021, 246×51), and the mobile solution chip (node 1:4034, 120×79). Saved as `assets/ct-row-bg-desktop.png`, `assets/ct-row-bg-mobile-attribute.png`, `assets/ct-row-bg-mobile-solution.png`.
- Wired these into `sections/section-comparison-table.liquid`'s `{% style %}` block as the default `background-image`, with the existing `our_row_bg` merchant-upload setting still taking priority when set (`{% if %}` inside the `url(...)`). `assets/section-comparison-table.css` now just sets `background-color: #41643a` (solid fallback) + `background-size: cover` on `.ct__row--ours` and its mobile-split cells, instead of a `linear-gradient(...)`.
- **Found and fixed a stale bug while in there**: `assets/ct-icon-pain-meds.png` (from an earlier round) was a completely blank/transparent 1024×1024 PNG — re-downloaded the real "Pain Meds" bottle photo from Figma node 1:2455 to replace it.
- Added a default-icon fallback in the competitor block markup: when `block.settings.icon` is blank, a `{% case block.settings.name %}` matches the 4 shipped presets (Sleeping Pills / Pain Meds / Chiropractor / Supplements) to their existing `ct-icon-*.png` assets; any other/custom competitor name still falls back to the empty placeholder div (a merchant adding a new competitor is expected to upload their own icon — no generic catch-all icon was introduced).
- **Trade-off to flag**: the icon fallback matches on the block's exact `name` text. If a merchant renames one of the 4 preset blocks (e.g. "Sleeping Pills" → "Ambien"), it loses its default icon and falls back to the empty placeholder. Kept simple per the "CMS settings, not pixel-perfect" philosophy — not worth a more robust keyed-lookup for 4 presets.

**Not yet verified in a live theme preview** — no dev server available in this session.

## 2026-08-29 — Comparison Table: Terra Therapy row was too dark (gradient end color fixed)

User flagged the row as "too dark" vs. `.claude/features/feature-comparison-table/reference/desktop.png` / `mobile.png`. Rather than eyeball it, sampled actual pixel RGB values from those reference PNGs (Python/Pillow, temporarily installed then removed). Result: the row's dark end is a **dark forest green** (~`#41643a`, sampled consistently at the row's right edge on desktop), not the near-black `#31331e` (the theme's primary text/brand color) that had been reused for it since Round 2.
- Replaced `#31331e` with `#41643a` as the gradient end-color / background-color fallback in all 3 places: desktop `.ct__row--ours`, and mobile `.ct__row--ours .ct__cell--solution` / `.ct__row--ours .ct__col-viewport`.
- Also adjusted the desktop gradient stop from `60%` to `100%` — sampled data showed the color still gradually darkening past the 60% mark, not plateauing there.
- **Note for future rounds**: `#31331e` is the theme's brand/text color and looks tempting to reuse for "dark olive," but the actual design wants a distinct, greener dark tone (`#41643a`) for this specific gradient — don't default back to `#31331e` here.

**Not yet verified in a live theme preview** — no dev server available in this session.

## 2026-08-29 — Comparison Table: Terra Therapy row mobile chip fix (matched against live Figma node data)

Compared `assets/section-comparison-table.css` against the actual Figma layer data (via `get_design_context`, not just screenshots) for node 1-2405 (desktop) and 1-4012 (mobile):
- **Desktop**: Figma's highlight is one continuous rounded bar (single 5px radius, ~20px bleed past the card each side, single green→dark gradient) spanning all 5 columns. Current CSS (`margin: 0 -20px`, `border-radius: 5px`, `linear-gradient(90deg, #7aa66f 0%, #31331e 60%)`) already matches this — left unchanged.
- **Mobile**: Figma shows the Solution cell and "How it works" cell as two *independently* fully-rounded floating chips (both corners rounded on each, not a shared flat seam), both pulling from the same gradient texture. The shipped CSS had a bug: it rounded only the outer corners of each cell (`5px 0 0 5px` / `0 5px 5px 0`) to force a flush square seam in the middle, and the viewport cell used a flat `#31331e` instead of a gradient. Fixed both cells to `border-radius: 5px` (all corners) and gave the viewport cell a short gradient (`linear-gradient(90deg, #7aa66f 0%, #31331e 30%)`) reusing the existing sage-green/olive tokens instead of introducing new colors.

**Not yet verified in a live theme preview** — no dev server available in this session. Visual confirmation is pending the user's next look/QA round.

## 2026-08-29 — Comparison Table: Terra Therapy row visual fix (Round 2 QA feedback)

Fixed the highlighted "Terra Therapy" row in `sections/section-comparison-table.liquid` / `assets/section-comparison-table.css` to match the client's updated reference (`.claude/features/feature-comparison-table/reference/expected-result.png`):
- Background: flat `#31331e` → `linear-gradient(135deg, #7aa66f 0%, #31331e 100%)`, reusing existing theme tokens rather than inventing new colors.
- Row shape: now inset with `margin: 8px` + `border-radius: 12px` (floating rounded "chip" look) instead of flush/square against the card edges.
- Icon: discovered `ct-product-photo.png` is actually the small wing/fabric icon shown in the mockup, not a distinct square photo — the old CSS was cropping it into an 80×80 box and rotating it 17°/1.4×, producing an unrecognizable grey blob. Now rendered at natural aspect ratio via `object-fit: contain`, ~90px wide (scaled down at tablet/mobile).

**Not yet verified in a live theme preview** — no dev server available in this session; visual confirmation is pending the next QA round. See Round 3 in `OUTPUT-qa-debugging.md`.

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# OUTPUT-project-log.md — v1.0

# AI Shopify Developer Bootcamp

# by Coding with Jan

# https://codingwithjan.com

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
