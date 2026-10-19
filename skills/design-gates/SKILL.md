---
name: design-gates
description: Install the design kit's automatic gates into a repo - layout (no sideways scroll at 390/768/1440), axe on every role's screens, 44px touch targets, CLS and JS budgets, the newcomer's first-screen budget, visual diff of PR vs base with the visual-ok label, the design checklist in the PR template, and the token lint. Use when setting up a new front-end project or when asked to add design QA to CI.
---

# Install the gates

Copy from `gates/` (the MCP tool `scaffold` with `what: ["gates"]` does the copying and prints this list).

1. **Playwright** in the package that holds the e2e tests: `npm i -D @playwright/test @axe-core/playwright && npx playwright install chromium`. Config: a `webServer` that builds the app for production and seeds a database that contains **ugly records** (missing price, coordinates, cover, foreign-language text, a test profile), `timezoneId: 'UTC'`, `fullyParallel: false` where specs share data.
2. **`e2e/setup.ts`**: fill `ACCOUNTS` (seed users per role), `ROUTES` (every screen by role), `SCREENS` (the list page, a detail page, the visual set), `signIn` (the API login), `ready` (the hydration marker), `resolve` (`:first` ids).
3. **Specs**: `layout.spec.ts`, `wcag.spec.ts`, `targets.spec.ts`, `perf.spec.ts`, `first-screen.spec.ts`, `visual.spec.ts`. Run `perf` and `first-screen` once with their 999 budgets, read the tables they print, write the measured numbers in; from then on they only go down. Visual baselines are local and opt-in (`FF_VISUAL=1`); CI compares PR with base instead.
4. **Token lint**: `scripts/check-tokens.ts` (edit `THEME`, `IN_SCOPE`, measure `PX_BUDGET`), run from `npm run lint` with `node scripts/check-tokens.ts`.
5. **GitHub**: `.github/workflows/visual.yml` and `design-checklist.yml` (fill `FRONT_PATHS`, `E2E_DIR`, `WEB_DIR`), `.github/scripts/design-checklist.mjs`, `.github/pull_request_template.md` (the checklist from `design-system/checklist.md`). Create the `visual-ok` label (`gh label create visual-ok`). Protect main with the checks required (Settings → Branches); auto-merge may be refused by the environment's policy, so a green PR still waits for the owner's word.
6. **Governance doc**: `templates/DESIGN_GOVERNANCE.md` into `docs/`, edited: the three columns of a 9, the five-person test, the fortnightly numbers.

## What each gate catches (from FeestFinder)

| Gate | Caught |
| --- | --- |
| axe on every role | a crash of the door-scanner screen after the first scan (API sent `{en,vi}` as a string) |
| targets 44px | 498 small targets on the first run; later a link that shrank beside a new tag |
| perf JS budget | +10 KB from twelve icon components (replaced by an SVG sprite) |
| perf CLS | 0.26–0.47 on four screens: footers on short loading pages, margins on the first box, choices made in effects |
| layout | tables with min-width, chip rows that scrolled sideways |
| visual + label | every intended change reviewed as images; unintended ones blocked |
| first-screen | 22 → 19 controls on the home, 15 → 10 on the detail page, and no way back up |

## When a gate blocks a good change

Fix the gate in the same PR with the reason in its description: a new WCAG exception in `targets.spec.ts` names the rule; a budget never goes up.
