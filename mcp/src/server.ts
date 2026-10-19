#!/usr/bin/env node
/**
 * design-kit MCP server (stdio). Tools:
 *   design_principles   the system's rules (design-system/README.md)
 *   design_tokens       tokens as css (Tailwind v4), vanilla css or json; dark or light
 *   design_parts        the parts catalogue
 *   design_layout       the page frames and layout patterns
 *   design_copy         the copy rules and the two-language mechanism
 *   design_checklist    the PR design checklist (vi or en)
 *   design_rubric       the scorecard, the 9/9.5/10 definition, the newcomer metrics, the AI smells
 *   learnings           search LEARNINGS.md by keyword (or its table of contents)
 *   measure_first_screen  open a URL in an emulated phone and count what a newcomer meets
 *   scaffold            copy gates, skills, governance and CLAUDE.md rules into a repo
 *
 * Node 22.6+ runs this file directly (type stripping). Playwright is optional: set
 * DESIGN_KIT_PLAYWRIGHT to a project's node_modules/playwright/index.mjs, or install it here.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (...p: string[]) => readFileSync(join(ROOT, ...p), 'utf8');
const text = (t: string) => ({ content: [{ type: 'text' as const, text: t }] });

const server = new McpServer({ name: 'design-kit', version: '0.1.0' });

server.registerTool('design_principles', {
  title: 'Design principles',
  description: 'The design system in five sentences, the newcomer rules, and how to use the kit in a new project (design-system/README.md).',
  inputSchema: {},
}, async () => text(read('design-system', 'README.md')));

server.registerTool('design_tokens', {
  title: 'Design tokens',
  description: 'Role-named tokens: colours (dark default, light variant), type scale, radii, breakpoints, motion. `css` is the Tailwind v4 @theme file, `vanilla` plain :root custom properties, `json` the source of truth.',
  inputSchema: { format: z.enum(['css', 'vanilla', 'json']).default('css').describe('css (Tailwind v4 @theme), vanilla (:root), or json') },
}, async ({ format }) => text(read('design-system', format === 'css' ? 'tokens.css' : format === 'vanilla' ? 'tokens.vanilla.css' : 'tokens.json')));

server.registerTool('design_parts', {
  title: 'Parts catalogue',
  description: 'Every part of the system (type, buttons, filters, tags, art, rows, tables, frame, overlays) with its class contract and sizing rules.',
  inputSchema: {},
}, async () => text(read('design-system', 'parts.md')));

server.registerTool('design_layout', {
  title: 'Layout patterns',
  description: 'The page frames (public site on desktop and phone, back office), the list page, the detail page, the wizard, and the CLS rules.',
  inputSchema: {},
}, async () => text(read('design-system', 'layout.md')));

server.registerTool('design_copy', {
  title: 'Copy rules',
  description: 'Lean copy rules, the {en, vi} pair mechanism, extra languages keyed by the English line, common microcopy.',
  inputSchema: {},
}, async () => text(read('design-system', 'copy.md')));

server.registerTool('design_checklist', {
  title: 'PR design checklist',
  description: 'The design checklist to paste into a pull request template; design-checklist.yml refuses a front PR with an unticked box.',
  inputSchema: { lang: z.enum(['vi', 'en', 'both']).default('both') },
}, async ({ lang }) => {
  const md = read('design-system', 'checklist.md');
  const vi = md.slice(md.indexOf('## Thiết kế'), md.indexOf('## Design (English)')).trim();
  const en = md.slice(md.indexOf('## Design (English)')).trim();
  return text(lang === 'vi' ? vi : lang === 'en' ? en : md);
});

server.registerTool('design_rubric', {
  title: 'Scorecard and AI smells',
  description: 'The seven criteria with their evidence, what 5/7/8/9/9.5/10 mean (three columns for a 9), the newcomer metrics with targets, how to pick a colour once, and the sixteen AI-smell patterns with fixes.',
  inputSchema: { part: z.enum(['rubric', 'smells', 'both']).default('both') },
}, async ({ part }) => text([part !== 'smells' && read('design-system', 'rubric.md'), part !== 'rubric' && read('design-system', 'ai-smells.md')].filter(Boolean).join('\n\n---\n\n')));

/** The retrospective, split at its headings so a keyword returns whole sections. */
function sections(md: string): { title: string; body: string }[] {
  const out: { title: string; body: string }[] = [];
  let cur: { title: string; body: string } | null = null;
  for (const line of md.split('\n')) {
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) { cur = { title: h[2], body: '' }; out.push(cur); continue; }
    if (cur) cur.body += line + '\n';
  }
  return out;
}

server.registerTool('learnings', {
  title: 'Learnings from the FeestFinder redesign',
  description: 'Search the retrospective (LEARNINGS.md) by keyword: timeline, reasoning, process, the error table, style and layout, the twelve lessons, the shortened process. Without a query, the table of contents and the twelve lessons.',
  inputSchema: { query: z.string().optional().describe('keyword(s), case-insensitive; e.g. "CLS", "timezone", "màu", "tab bar"') },
}, async ({ query }) => {
  const md = read('LEARNINGS.md');
  const secs = sections(md);
  if (!query) {
    const toc = secs.filter((s) => !s.title.startsWith('Sai') && !s.title.startsWith('Đúng')).map((s) => `- ${s.title}`).join('\n');
    const lessons = secs.find((s) => s.title.startsWith('6.'));
    return text(`# LEARNINGS.md\n\n${toc}\n\n## ${lessons?.title}\n${lessons?.body ?? ''}`);
  }
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = secs.filter((s) => words.some((w) => (s.title + s.body).toLowerCase().includes(w)));
  // A table row that matches is more useful than the whole table: return matching lines of long sections.
  const out = hits.map((s) => {
    const lines = s.body.split('\n');
    const matching = lines.filter((l) => words.some((w) => l.toLowerCase().includes(w)));
    return `## ${s.title}\n${lines.length > 40 ? matching.join('\n') : s.body.trim()}`;
  });
  return text(out.length ? out.join('\n\n') : `Nothing in LEARNINGS.md mentions "${query}".`);
});

/** Playwright from this package, or from the path in DESIGN_KIT_PLAYWRIGHT. */
async function playwright(): Promise<any> {
  const env = process.env.DESIGN_KIT_PLAYWRIGHT;
  if (env && existsSync(env)) return import(pathToFileURL(env).href);
  try { return await import('playwright'); } catch {
    throw new Error('Playwright is not installed: `npm i playwright && npx playwright install chromium` in design-kit/mcp, or set DESIGN_KIT_PLAYWRIGHT to a project\'s node_modules/playwright/index.mjs.');
  }
}

server.registerTool('measure_first_screen', {
  title: 'Measure a first screen',
  description: 'Open a URL in an emulated phone (390×844, touch, signed out, UTC) and count what a newcomer meets before scrolling: links/buttons/fields in sight with their names, tags, headings, screens tall, filters named "Mọi X / All X", and page errors. The counts of artboard 25; compare with the targets in design_rubric.',
  inputSchema: {
    url: z.string().url(),
    width: z.number().int().min(320).max(1920).default(390),
    height: z.number().int().min(480).max(1200).default(844),
    waitFor: z.string().optional().describe('a CSS selector to wait for before counting (the hydration marker or the first card)'),
    settleMs: z.number().int().min(0).max(10000).default(800),
    timezoneId: z.string().default('UTC'),
    locale: z.string().default('vi-VN'),
  },
}, async ({ url, width, height, waitFor, settleMs, timezoneId, locale }) => {
  const pw = await playwright();
  const browser = await pw.chromium.launch();
  try {
    const ctx = await browser.newContext({ viewport: { width, height }, isMobile: width < 768, hasTouch: width < 768, deviceScaleFactor: 2, timezoneId, locale });
    const page = await ctx.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e: Error) => errors.push(String(e)));
    await page.goto(url, { waitUntil: 'load', timeout: 45_000 });
    if (waitFor) await page.locator(waitFor).first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {});
    await page.waitForTimeout(settleMs);
    const r = await page.evaluate(() => {
      const seen = (el: Element) => {
        const b = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return b.width > 1 && b.height > 1 && b.top < innerHeight && b.bottom > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[aria-hidden="true"]');
      };
      const name = (el: Element) => (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
      const controls = [...document.querySelectorAll('a[href],button,[role=button],input,select,textarea,summary')].filter(seen);
      const tabs = [...document.querySelectorAll('nav a, [role=tablist] [role=tab]')].filter(seen).map(name);
      const headings = [...document.querySelectorAll('h1, h2')].map((h) => `${h.tagName.toLowerCase()}: ${name(h)}`).slice(0, 20);
      const caps = [...document.querySelectorAll('*')].filter((el) => seen(el) && el.children.length === 0 && (el.textContent ?? '').trim().length > 1 && getComputedStyle(el).textTransform === 'uppercase').length;
      const every = controls.map(name).filter((n) => /^(mọi|tất cả|all|any)\b/i.test(n)).length;
      const uniqueHrefs = new Set([...document.querySelectorAll('a[href]')].filter(seen).map((a) => (a as HTMLAnchorElement).href));
      return {
        controlsInSight: controls.length,
        names: controls.map(name),
        distinctLinks: uniqueHrefs.size,
        tabBar: tabs,
        headings,
        uppercaseLabelsInSight: caps,
        filtersNamedEvery: every,
        screensTall: +(document.documentElement.scrollHeight / innerHeight).toFixed(1),
        title: document.title,
      };
    });
    return text(JSON.stringify({ url, viewport: `${width}×${height}`, ...r, pageErrors: errors }, null, 2));
  } finally { await browser.close(); }
});

const PIECES = {
  gates: { from: 'gates', to: 'e2e', note: 'fill e2e/setup.ts (accounts, routes, signIn, ready); run perf and first-screen once with their 999 budgets and write the measured numbers in; move check-tokens.ts to scripts/ and wire it into npm run lint; move github/* to .github/' },
  skills: { from: 'skills', to: '.claude/skills', note: 'five skills: design-review, design-system-setup, design-gates, design-phase, newcomer-flow' },
  governance: { from: 'templates/DESIGN_GOVERNANCE.md', to: 'docs/DESIGN_GOVERNANCE.md', note: 'edit the five-person test for your personas and the fortnightly numbers for your analytics' },
  tokens: { from: 'design-system/tokens.css', to: 'src/kd/theme.css', note: 'the one file with hex colours; pick the accent once (design_rubric, "chọn màu trong một buổi")' },
  'claude-md': { from: 'templates/CLAUDE.design.md', to: 'CLAUDE.design.md', note: 'paste its section into CLAUDE.md and fix the paths' },
  artboard: { from: 'templates/artboard.html', to: 'docs/design/artboard-template.html', note: 'one artboard per review: verdict, scorecard with evidence, measured table, phases, owner questions' },
} as const;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
}

server.registerTool('scaffold', {
  title: 'Scaffold the kit into a repo',
  description: 'Copy pieces of the kit into a project: gates (e2e specs, token lint, GitHub workflows), skills (.claude/skills), governance doc, tokens, CLAUDE.md rules, artboard template. Never overwrites an existing file. dryRun lists what would be written.',
  inputSchema: {
    target: z.string().describe('absolute path of the project root'),
    what: z.array(z.enum(['gates', 'skills', 'governance', 'tokens', 'claude-md', 'artboard'])).default(['gates', 'skills', 'governance', 'claude-md']),
    dryRun: z.boolean().default(false),
  },
}, async ({ target, what, dryRun }) => {
  if (!existsSync(target) || !statSync(target).isDirectory()) throw new Error(`${target} is not a directory`);
  const written: string[] = [], kept: string[] = [], notes: string[] = [];
  for (const key of what) {
    const piece = PIECES[key];
    const from = join(ROOT, piece.from);
    const files = statSync(from).isDirectory() ? walk(from).map((f) => [f, join(target, piece.to, relative(from, f))]) : [[from, join(target, piece.to)]];
    for (const [src, dst] of files) {
      if (existsSync(dst)) { kept.push(relative(target, dst)); continue; }
      if (!dryRun) { mkdirSync(dirname(dst), { recursive: true }); cpSync(src, dst); }
      written.push(relative(target, dst));
    }
    notes.push(`${key}: ${piece.note}`);
  }
  return text([`${dryRun ? 'Would write' : 'Wrote'} ${written.length} file(s) into ${target}:`, ...written.map((f) => '  ' + f), kept.length ? `Kept (already there): ${kept.join(', ')}` : '', 'Next:', ...notes.map((n) => '  - ' + n)].filter(Boolean).join('\n'));
});

await server.connect(new StdioServerTransport());
