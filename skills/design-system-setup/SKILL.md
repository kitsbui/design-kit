---
name: design-system-setup
description: Set up the kit's design system in a new web project in half a day - role-named tokens (dark default, light variant), the parts catalogue as kd-* classes, the /kit page, the token lint, the copy mechanism, and the CLAUDE.md rules. Use when starting a front end, or when asked to "make it consistent", "add a design system" or "remove the AI look".
---

# Design system setup

## 1. Tokens (30 min)

- Copy `design-system/tokens.css` to the project's one token file (`src/kd/theme.css` with Tailwind v4, or `tokens.vanilla.css` without). Keep the role names; change the values only through `design-system/tokens.json` + `scripts/build-tokens.mjs`.
- Pick the brand's accent **once**: three candidates on real dark and light backgrounds in one artboard (`design-system/rubric.md`, "chọn màu trong một buổi"); check contrast of text on the button (≥ 4.5:1) and of `info` on each surface; write the decision date into the token file.
- Add `scripts/check-tokens.ts` to `npm run lint`: no hex outside the token file, transitions only with `--dur-1/2/3`, a `[Npx]` budget that only goes down. If the project already has colours, do one codemod to the role names (FeestFinder: 117 files in one script), never a gradual rename.

## 2. Parts (2–3 h)

Build the catalogue of `design-system/parts.md` as `kd-*` classes plus thin React components: type scale, four button tones, chip, picker, segmented, switch, field, tag, status dot, art text tile (CSS draws the words from data attributes), avatar, row, lrow, card, table that folds, accordion, sheet (`useId()`), drawer, menu, rail, tab bar, dock, toast, skip link, overlay scrollbars. Every part ≥ 44px to tap (`kd-hit`, `kd-tap` for text and small controls).

Put every part on a `/kit` page at 390 and 1440 (behind a flag in production). New parts go there first.

## 3. Frame (2 h)

From `design-system/layout.md`: the public frame (desktop bar; phone logo + search icon + four-place solid tab bar; "Me" as one list), the list page (sticky command bar, by-day list, first item in the first screen), the detail page (cover, four facts, primary dock, "More" fold), the back-office frame (rail ≤ 7, tables that fold, drawers), the wizard (named steps, late sign-in).

## 4. Copy

`{en, vi}` pairs with `pick()` / `tx()` / `fill()`; extra languages keyed by the English line; a missing-lines script; the rules in `design-system/copy.md`. No explaining lines, no counts in status lines, titles as nouns with data, buttons as verb + object.

## 5. Rules for agents

Paste `templates/CLAUDE.design.md` into the project's CLAUDE.md and fix the paths. Then install the gates (`design-gates` skill) so every rule has a check.

## 6. Avoid the AI look from day one

Run `design-system/ai-smells.md` against the first three screens before building the rest: real photos or text tiles, labels in caps only in table heads and tags, glass only over photos, filters named "Field: value", no explaining sentences, 32px titles with data, radii 4/8/16, FAQ on the about page, no gamification vocabulary, solid edge-to-edge bars, one tag per card, no internal names on the first screen.
