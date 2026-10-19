---
name: design-review
description: Audit a product's screens the way FeestFinder design v2 was audited (artboards 01, 19, 22, 24, 25): shots at 390 and 1440, a seven-criterion scorecard with evidence, the AI-smell scan, measured first-screen counts, and a plan with owner questions. Use when asked to review, score or re-score a design, or to plan a redesign.
---

# Design review

One review = one artboard (or one Markdown page) that a product owner reads in five minutes: a one-sentence verdict, a scorecard with evidence, the measurements, the five biggest problems, what to keep, the phases, and the questions only the owner can answer. Vietnamese when the owner writes Vietnamese.

## 1. Measure before judging (30 min)

1. Shots of every main screen at 390×844 (iPhone 13 emulation, touch, signed out) and 1440×900, on **production or a production-like build with real data** (demo data hides missing prices, coordinates, covers and foreign-language text).
2. Counts, with the kit's MCP tool `measure_first_screen` (or `gates/first-screen.spec.ts`): controls in sight on the list page and on a detail page, screens tall, headings, tags per card, ways to filter or search, taps from open to "something near me", taps from a card to the main action.
3. The automatic gates if they exist (layout, axe, targets, CLS, JS). Read them as "correct", never as "understood".

## 2. Score (the rubric in `design-system/rubric.md`)

Seven criteria out of 10 (form and pictures, layout, aesthetics, UX/UI, navigation, flow, mobile), each with one line of evidence (a shot number or a count). Add content, engineering and operations once the product runs. Two scales from day one: the gates' score and the newcomer's score; say which one you give.

## 3. The AI-smell scan (`design-system/ai-smells.md`)

Walk the 16 patterns; for each one found, name where and the fix. Patterns 11–16 are the newcomer ones (every card tagged, internal names on the first screen, "Post" in the consumer's corner, sign-in at the first action, empty blocks that keep their space, one action in three places).

## 4. Write the artboard (`templates/artboard.html`)

Header: number · title · who scores · date. One-sentence verdict. Scorecard. "Measured on …" table with before / now / target. Evidence shots. Keep (what already works). Five biggest problems with severity. Phases: each one thing people can see and one thing measurable, ≤ 1 day of work each (split into P0/P1/P2 if larger). "The owner decides": 2–4 concrete options per question, each with its consequence, one marked recommended.

## 5. Ask the owner, then record

Ask with the options (never open questions). Write every answer with its date into CLAUDE.md and the roadmap ("owner 2026-10-18: …"). Colour is decided **once**, from three candidates on real backgrounds in one artboard (FeestFinder changed its accent four times in a day because candidates came one at a time).

## 6. Re-score the same table after each phase, with real numbers

After the phase reaches production: run the same measurements on production, write the new column on the same artboard. A score that drops when a new measurement arrives (8.5 → 7 at FeestFinder) is information, not regression.

Gotchas: `WEB_SKIP_BUILD`-style cached builds give stale ids; pin the browser's `timezoneId` when a page guesses from the device; count on real data.
