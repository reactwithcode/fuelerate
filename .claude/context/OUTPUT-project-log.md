[Do not write this manually. AI maintains this file automatically after every meaningful action.]

This is the project's persistent memory. AI reads it at the start of every session to restore context. It will contain:

- **Timestamped entries** — What was done and when
- **Decisions made** — What was decided and why, including alternatives that were considered
- **Architectural choices** — Technical decisions that affect the project long-term
- **Risks & open questions** — Things to watch out for in future development

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
