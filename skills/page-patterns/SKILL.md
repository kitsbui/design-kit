---
name: page-patterns
description: Compose public pages the way FeestFinder settled them on 2026-10-20 - one column and no side rail anywhere, a profile page like a music service's (hero cover fading into the night, photo, huge name, one Play action, highlights, about with key facts next to the intro, music, moments), a waveform playlist measured on the server, the event page with tickets right after the hero, an article centred at reading width, a two-flag language switch remembered before render, an immersive phone frame. Use when building or reworking a detail, profile, article or landing page, or when the owner says a page feels lopsided, cluttered or not "premium" enough.
---

# Page patterns

Read `design-system/patterns.md` (MCP `design_patterns`) first; this is the procedure.

## 1. Inventory before moving anything

List every block on the page with: what it answers, who needs it, how often. Then list **every other page that shares the pattern you are about to change** (a rail, an aside, a sticky panel). A removal asked for on one page is usually a rule for all of them: apply it everywhere in the same change, or ask once with the list.

## 2. Order by decision, one column

1. What the person came for (the hero and its one action).
2. What makes them act (upcoming shows / tickets / the main fact).
3. Everything about it, with the key facts **next to the intro**, the rest folded.
4. The rich media (music, video).
5. The social proof and memories (moments, photos) last.

Centre the column when the page is about one thing (profile `max-w-page`, article and forms `max-w-read`); keep lists full width. Line the breadcrumbs up with the column.

## 3. Make it feel premium without clutter

- A hero image across the page fading into the background (`linear-gradient(to bottom, transparent 35%, var(--surface-0))`); the photo overlapping its lower edge; the name set large (`clamp(2.5rem, 7vw, 5.5rem)`, 800, tight tracking); one accent pill ("Play") with the glow.
- No cover → no banner and no name twice.
- Remove recommendations without evidence (e.g. "similar artists" scored by the system).

## 4. Keep the budgets

Sizes the token scale lacks go in CSS classes, not arbitrary `[Npx]` utilities; lower the px budget when old values go. Heavy players load near the screen or on tap; rarely opened sheets are dynamic; decorative pictures are CSS.

## 5. Prove it

- e2e: `getByRole('complementary')` has count 0; the level-2 headings come in the decided order; the main action points where it should (`/go/<slug>?src=…`).
- Waveform player: route the media host to a fixture (`page.route(...).fulfill`), press the hero's Play, see Pause, go to the next track (`aria-current`).
- Layout at 390 / 768 / 1440, axe, 44 px targets, CLS and JS budgets green; a full-page shot at 1440 looked at by you before the owner sees it.
