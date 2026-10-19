---
name: user-test
description: Prepare, run and act on a five-person usability test on the people's own phones, with the design-kit's usertest/index.html (timed script, note sheet, SUS, a Markdown table for the roadmap). Use when an owner wants the "real people" column of the 9 / 10 score, or asks how to test with users.
---

# A five-person test

The second column of a 9 (`design-system/rubric.md`): five real newcomers do the main task without a hint. Automated gates cannot stand in for it.

## Prepare (you)

1. Write five tasks per persona, one sentence each, as the owner will read them aloud; the first task of the main persona is the product's reason to exist, with a time target (FeestFinder: "a night you could go to tonight or this weekend", 10 s). Put them in `usertest/index.html`'s template or hand the owner a JSON to import.
2. Make sure the product's test data is as rough as production (no demo covers, real prices missing where they are missing).
3. Tell the owner the rules in `usertest/README.md`: strangers to the product, their own phone, think aloud, no hint for 60 s, one hesitation per stop or wrong tap.

## Run (the owner, 30 min a person)

The page keeps the clock, the outcome (done unaided / with a hint / failed), hesitations and notes per task, and the SUS score per person, on the owner's machine.

## Act (you, within two days)

1. Paste the Markdown table into the roadmap with the day.
2. Every spot where two or more people hesitated is a fix: name it, change it, add the test that measures it (first-screen counts, a nav.spec step, an e2e flow).
3. Re-score: 9 needs ≥ 4/5 unaided on the main task; 10 needs 5/5 and SUS ≥ 80, then the two-week numbers (≥ 60 % open a detail page, ≥ 15 % save something).
4. Record what the test taught in `LEARNINGS.md` if it changed a rule.
