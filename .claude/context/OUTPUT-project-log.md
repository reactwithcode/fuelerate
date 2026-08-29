[Do not write this manually. AI maintains this file automatically after every meaningful action.]

This is the project's persistent memory. AI reads it at the start of every session to restore context. It will contain:

- **Timestamped entries** — What was done and when
- **Decisions made** — What was decided and why, including alternatives that were considered
- **Architectural choices** — Technical decisions that affect the project long-term
- **Risks & open questions** — Things to watch out for in future development

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
