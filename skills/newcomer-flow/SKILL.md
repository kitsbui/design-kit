---
name: newcomer-flow
description: Make a product's main flow lean for a newcomer on a phone, the "tinh gọn" method of FeestFinder phases 11-12 - three steps, three concepts first, one way to do each thing, fold don't delete, with first-screen counts as the budget. Use when an owner says the flow is convoluted, cluttered, hard for new users, or "not simple enough".
---

# A lean flow for a newcomer

## Diagnose with counts, not opinions (20 min)

On production, iPhone 13 emulation, signed out, real data. Count and write down:

- controls in sight on the list page and on a detail page (`measure_first_screen`);
- concepts a newcomer meets on the detail page (words that need explaining);
- the whole product's concepts for the main persona;
- bottom tabs; different ways to filter or search;
- taps from open to "nights near me"; taps from a card to the main action;
- screens tall of the detail page.

FeestFinder, 2026-10-18: 22 · 15 · 15 · ≈30 · 5 · 5 · 3 · 3–4 · 13. Targets: ≤ 12 · ≤ 7 · 5 · 3 first · 4 · 2 · 1 · 2 · ≤ 5.

## The four principles

1. **One screen, one job.** List to choose; detail to decide and go; "Me" to manage. Exactly one primary action per screen.
2. **Three concepts first.** For a going-out app: city, date, price. Everything else (data sources, scores, collections, passports, group plans, resale, Q&A) appears when needed or already used.
3. **One way to do each thing.** Filter in one place, search in one place, save with one icon. Remove second and third paths.
4. **Fold, don't delete.** Secondary features go under one "More" on the detail page or into "Me". No data removed, no API changed, earlier owner decisions kept (FeestFinder kept the word "Hype").

## The moves that worked

| Where | Move |
| --- | --- |
| Tab bar | 5 → 4 places; search becomes an icon on top; secondary destinations into the search sheet and "Me" |
| List filters (phone) | four time choices in one tap in the sticky bar; the city and the top-6 groups as chips above the list; no filter sheet, no table on phones; power filters stay on desktop |
| Cards | at most one tag, and only tags that change the go/no-go (few tickets, sold out, cancelled); the source as a small sign, not a word |
| Detail page | cover → four facts that are **only facts** → line-up → about → venue with the way-there actions → "More" (friends, guide, calendar, Q&A, hype, folded); one fixed primary at the bottom; each action appears once |
| Empty blocks | a quiet Q&A is one "Ask" button; a count of 0 is hidden |
| First action | save on the device before sign-in; sign in only to buy, post, comment |
| Wrong data | an unknown price says "not given yet", never "free"; an importer's default is not shown as the source's word |

## Ask the owner with options

Each structural change (tab bar, filters, the detail page's order) as a question with 2–4 options, consequences, one recommended. Then copy the chosen option's text into a checklist and build all of it.

## Gate it

`gates/first-screen.spec.ts` with the measured numbers as budgets; a newcomer journey spec on ugly data (unknown price, no cover, no coordinates, English text); re-measure on production after the merge and write the new column on the artboard.
