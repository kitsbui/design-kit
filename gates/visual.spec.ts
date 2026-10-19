import { expect, test } from '@playwright/test';
import { SCREENS, ready } from './setup.ts';

/*
 * Visual baselines of the main screens at a phone, a tablet and a desktop width.
 * Opt-in: fonts and image decoding differ between machines, so the baselines here are for the
 * machine that made them. CI does not use them: on every pull request that touches the front it
 * shoots these screens on the base branch and on the PR, on the same runner, and compares
 * (github/visual.yml); the "visual-ok" label accepts a change.
 *
 *   npm run test:visual                       compare with the baselines
 *   npm run test:visual -- --update-snapshots make new baselines after an intended change (fresh build)
 *
 * A diff is reviewed in the PR like code: the report shows the expected, actual and diff images.
 */
test.skip(!process.env.FF_VISUAL, 'set FF_VISUAL=1 (npm run test:visual)');

const screens = SCREENS.visual;
const SIZES = [{ name: 'phone', width: 390, height: 844 }, { name: 'tablet', width: 768, height: 1024 }, { name: 'desktop', width: 1440, height: 900 }];

for (const size of SIZES) {
  for (const path of screens) {
    test(`${path} · ${size.name}`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto(path);
      await ready(page);
      await page.evaluate(() => document.fonts.ready);
      const name = `${path === '/' ? 'home' : path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}-${size.name}.png`;
      await expect(page).toHaveScreenshot(name, { fullPage: true, animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0.01 });
    });
  }
}
