---
name: design-phase
description: Run one design phase end to end the way FeestFinder's twelve phases ran - branch in a worktree, build with tests and docs, run the gates, open a PR with the design checklist, review the visual diff and label it, merge on the owner's word, verify production on an emulated phone, update the artboard and memory. Use when asked to implement a phase, a P0/P1/P2 slice, or to ship a front-end change.
---

# One design phase

## Before writing code

1. Read the owner's decision **verbatim** (the option text they picked) and turn it into a checklist. FeestFinder phase 12 shipped half a decision because this step was skipped.
2. Check that anything you will ask a human to do actually exists (a Console function, a setting). Build it if it does not.
3. Branch from main in the project's worktree: `git checkout -b design/<phase>`; stacked phases branch from the previous one and the PR targets it.

## Build

- Code, its tests and its docs in the same commit: the spec next to similar ones; CLAUDE.md when a rule changes (with the owner's date); the roadmap entry.
- Every new public string in every language file; run the missing-lines check (`design-system/copy.md`).
- A new screen goes into `e2e/setup.ts` ROUTES, and into the perf list with a measured budget.
- Three states for every screen before the happy path: loading (final size), empty (with an action), error (retry).

## Check, in this order, reading exit codes

```bash
npm run typecheck
npm run lint; echo "lint $?"        # never `| tail` inside an && chain; --quiet lints print nothing on failure
node --test test/<area>.test.ts     # or the project's unit runner
npx playwright test e2e/<area>.spec.ts e2e/first-screen.spec.ts
npm run test:screens                # the whole suite: specs leave data for each other (targets, perf)
```

Rerun anything that failed on a cached build with a fresh build before believing it. Pinned `timezoneId: 'UTC'` in the Playwright config.

## Pull request

Body from `.github/pull_request_template.md`: what changed and why (for the owner, in their language, with before/after numbers), the checks run with counts, the design checklist ticked **truthfully**, the "visual" box left empty. Open with `gh pr create`, then turn the app's Auto-fix on for the PR and stop polling CI.

When `Visual (PR vs base)` fails: `gh run download <run-id>` of the `visual-diff` artifact, look at expected / actual / diff for every screen, write what changed in one line each; if intended, `gh pr edit N --add-label visual-ok` and tick the box. A new push removes the label; look again.

## Merge and verify

- Only on the owner's word ("merge"). Stacked PRs: merge the base, `gh pr edit N --base main`, wait for the checklist rerun, merge. A push to main deploys.
- Wait for the deploy by polling a marker of the change on production (an element, a JSON field), not by time.
- Run the production check on an emulated phone: tab bar, first-screen counts, the feature just shipped, map pins or equivalents, `pageerror` count 0. Keep the script in the scratchpad and reuse it.
- Write the real numbers on the artboard's "now" column; update memory with the PR numbers, what shipped and new gotchas.

## Report to the owner

In their language: what changed (for a user, not a developer), the numbers before → after, what still misses its target and why, what only they can do (secrets, accounts, a real-user test), with click-by-click steps. Never ask them to paste a secret into the chat.
