import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { ACCOUNTS, ROUTES, ready, resolve, signIn } from './setup.ts';

/*
 * Accessibility, by axe-core, on every screen of every role (setup.ts ROUTES) at a phone and a desktop
 * width: no serious or critical violation of WCAG 2.1 A/AA. Each test walks its routes and lists every violation with the elements it found,
 * so one run shows them all.
 *
 * Named to run after the flows (files run in name order): opening the pages makes Next prefetch
 * and cache the pages they link to (an artist page from /a/radar), which a flow that changes one
 * of them (artist.spec adds a mix) would then read stale.
 */

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

for (const [role, routes] of Object.entries(ROUTES) as [keyof typeof ROUTES, string[]][]) {
  for (const size of [{ name: 'phone', width: 390, height: 844 }, { name: 'desktop', width: 1440, height: 900 }]) {
    test(`${role} · ${size.name}: no serious or critical accessibility violation`, async ({ page }) => {
      test.setTimeout(300_000);
      await page.setViewportSize({ width: size.width, height: size.height });
      if (role !== 'visitor') await signIn(page, ACCOUNTS[role]);
      const failures: string[] = [];
      for (const route of routes) {
        const path = await resolve(page, route);
        await page.goto(path);
        await ready(page);
        const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        for (const v of violations) {
          if (v.impact !== 'serious' && v.impact !== 'critical') continue;
          const where = v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ');
          failures.push(`${path}: [${v.impact}] ${v.id} ×${v.nodes.length} — ${v.help} (${where})`);
        }
      }
      expect(failures, failures.join('\n')).toEqual([]);
    });
  }
}
