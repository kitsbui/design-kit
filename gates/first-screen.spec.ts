import { expect, test, type Page } from '@playwright/test';
import { SCREENS, ready } from './setup.ts';

/*
 * The newcomer's first screen (the design kit's "tinh gọn" gate, from FeestFinder artboard 25):
 * on a phone, signed out, how much a list page and a detail page ask of someone before they scroll.
 * The counts include the site's frame (logo, search, tab bar). Like the JS budgets they only go
 * down: measure once (the test prints the names), write the numbers into BUDGET, lower them when a
 * change removes something. Targets to aim at: a list ≤ 12, a detail page ≤ 7 plus the frame.
 */

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

/** Links, buttons, fields and summaries in sight before any scroll, with their names. */
export async function controlsInSight(page: Page) {
  return page.evaluate(() => {
    const seen = (el: Element) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 1 && r.height > 1 && r.top < innerHeight && r.bottom > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[aria-hidden="true"]');
    };
    const all = [...document.querySelectorAll('a[href],button,[role=button],input,select,summary')].filter(seen);
    return { n: all.length, names: all.map((el) => (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30)) };
  });
}

/** Measure once, then write the numbers here. */
const BUDGET = { list: 99, detail: 99 };

test('the first screens ask little: the list and a detail page stay within their budgets', async ({ page }) => {
  await page.goto(SCREENS.list);
  await ready(page);
  const list = await controlsInSight(page);
  console.log(`list ${list.n}: ${list.names.join(' | ')}`);
  expect(list.n, list.names.join(' | ')).toBeLessThanOrEqual(BUDGET.list);

  await page.goto(SCREENS.detail);
  await ready(page);
  const detail = await controlsInSight(page);
  console.log(`detail ${detail.n}: ${detail.names.join(' | ')}`);
  expect(detail.n, detail.names.join(' | ')).toBeLessThanOrEqual(BUDGET.detail);
  // A detail page reads in a few screens, not thirteen.
  expect(await page.evaluate(() => document.documentElement.scrollHeight / innerHeight)).toBeLessThanOrEqual(6);
});
