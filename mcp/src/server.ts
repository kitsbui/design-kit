#!/usr/bin/env node
/**
 * design-kit MCP server (stdio). Tools:
 *   design_principles   the system's rules (design-system/README.md)
 *   design_tokens       tokens as css (Tailwind v4), vanilla css or json; dark or light
 *   design_parts        the parts catalogue
 *   design_layout       the page frames and layout patterns
 *   design_patterns     page patterns proven after the redesign: one column, the music-service profile,
 *                       the waveform playlist, the centred article, the flag switch, the immersive phone
 *   design_copy         the copy rules and the two-language mechanism
 *   design_checklist    the PR design checklist (vi or en)
 *   design_rubric       the scorecard, the 9/9.5/10 definition, the newcomer metrics, the AI smells
 *   learnings           search LEARNINGS.md by keyword (or its table of contents)
 *   measure_first_screen  open a URL in an emulated phone and count what a newcomer meets
 *   scaffold            copy gates, skills, governance and CLAUDE.md rules into a repo
 *   blog_guide          how to write, present, optimise (SEO/AIO) and research a blog post (blog-kit/)
 *   blog_template       the skeleton of a post in two languages
 *   blog_check          score a post's words against the blog-kit rules (lengths, definition, sections, FAQ, sources…)
 *   blog_jsonld         build a post's JSON-LD graph (BlogPosting with citation, DefinedTerm, FAQPage, ItemList, BreadcrumbList)
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

const server = new McpServer({ name: 'design-kit', version: '0.2.0' });

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

server.registerTool('design_patterns', {
  title: 'Page patterns',
  description: 'Patterns proven after the FeestFinder redesign (2026-10-20): one column and no side rail on public pages, the music-service profile page (hero cover fading out, huge name, Play, highlights, about, music, moments), the server-measured waveform playlist with wavesurfer.js, the event page with tickets after the hero, the centred article, the two-flag language switch read before render, the immersive phone frame, real counters and sharing, keeping JS and px budgets.',
  inputSchema: {},
}, async () => text(read('design-system', 'patterns.md')));

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
  skills: { from: 'skills', to: '.claude/skills', note: 'eight skills: design-review, design-system-setup, design-gates, design-phase, newcomer-flow, user-test, page-patterns, blog-writing' },
  'blog-kit': { from: 'blog-kit', to: 'docs/blog-kit', note: 'the blog rules and the research scripts (python3 docs/blog-kit/scripts/*.py); set BLOG_KIT_UA before calling Wikimedia' },
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
  description: 'Copy pieces of the kit into a project: gates (e2e specs, token lint, GitHub workflows), skills (.claude/skills), governance doc, tokens, CLAUDE.md rules, artboard template, blog-kit (rules and research scripts). Never overwrites an existing file. dryRun lists what would be written.',
  inputSchema: {
    target: z.string().describe('absolute path of the project root'),
    what: z.array(z.enum(['gates', 'skills', 'governance', 'tokens', 'claude-md', 'artboard', 'blog-kit'])).default(['gates', 'skills', 'governance', 'claude-md']),
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


// ---- blog-kit -----------------------------------------------------------------------------

const BLOG_PARTS = { overview: 'README.md', writing: 'writing.md', presentation: 'presentation.md', seo: 'seo-aio.md', research: 'research.md' } as const;

server.registerTool('blog_guide', {
  title: 'Blog guide',
  description: 'How to turn a document into blog posts and show them: writing (pillar and clusters, the guide structure with lengths, bilingual voice, trade terms in English, never invent), presentation (centred article page, body marks, credited figures, tables as cards, embeds that load on tap, the VI/EN editor, review flow), SEO/AIO (meta, canonical, hreflang only for real translations, the JSON-LD graph, sitemap, llms.txt, the checklist) and research (sources checked for 200, Wikimedia Commons free licences and credits, official YouTube channels validated through oEmbed).',
  inputSchema: { part: z.enum(['overview', 'writing', 'presentation', 'seo', 'research', 'all']).default('all') },
}, async ({ part }) => text((part === 'all' ? Object.values(BLOG_PARTS) : [BLOG_PARTS[part]]).map((f) => read('blog-kit', f)).join('\n\n---\n\n')));

server.registerTool('blog_template', {
  title: 'Blog post template',
  description: 'The skeleton of a guide post: its fields (key, slug, category, parent, styles, credited cover, title, excerpt, facts, FAQ, sources, tracks) and its body in Markdown with every section in order.',
  inputSchema: {},
}, async () => text(read('blog-kit', 'template.md')));

/** Words of a Markdown text (marks, links' addresses and pictures out). Vietnamese counts syllables. */
const plain = (md: string) => md.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/https?:\/\/\S+/g, ' ').replace(/[#>*_|`-]/g, ' ');
const words = (md: string) => plain(md).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

export function checkPost(p: {
  title: string; excerpt: string; body: string; lang?: string; kind?: 'guide' | 'news' | 'playlist' | 'skills' | 'review'; pillar?: boolean;
  faq?: { q: string; a: string }[]; sources?: (string | { url: string })[]; facts?: unknown[];
}) {
  const kind = p.kind ?? 'guide';
  const guide = kind === 'guide';
  const vi = (p.lang ?? 'vi') === 'vi';
  const out: { ok: boolean | 'warn'; rule: string; got: string }[] = [];
  const add = (ok: boolean | 'warn', rule: string, got: string | number) => out.push({ ok, rule, got: String(got) });
  const len = (t: string) => [...t.trim()].length;
  add(len(p.title) > 0 && len(p.title) <= 60, 'title ≤ 60 characters', len(p.title));
  add(len(p.excerpt) >= 140 && len(p.excerpt) <= 170, 'excerpt 140–170 characters (the meta description)', len(p.excerpt));
  const body = p.body.replace(/\r/g, '');
  const paras = body.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
  const first = paras[0] ?? '';
  // The whole paragraph in bold, or the term in bold at its start ("**Techno** is …").
  const def = /^\*\*[\s\S]+\*\*$/.test(first) || /^\*\*[^*\n]{1,60}\*\*[\s,:;(—–-]/.test(first);
  const dw = words(first);
  const [lo, hi] = vi ? [40, 90] : [40, 60];
  add(guide ? def && dw >= lo && dw <= hi : def ? true : 'warn', `opens with a definition of ${lo}–${hi} ${vi ? 'syllables' : 'words'}, the term in bold`, def ? dw : 'not bold');
  const total = words(body);
  const min = p.pillar ? 1200 : guide ? 800 : kind === 'playlist' ? 250 : 500;
  add(total >= min, `body ≥ ${min} ${vi ? 'syllables' : 'words'}${p.pillar ? ' (pillar)' : ''}`, total);
  const h2 = (body.match(/^## /gm) ?? []).length;
  add(h2 >= (guide ? 4 : 2), `≥ ${guide ? 4 : 2} sections (##)`, h2);
  const tables = (body.match(/^\|[^\n]*\|\s*\n\|\s*:?-{3,}/gm) ?? []).length;
  if (guide) add(tables >= 2, '≥ 2 tables (people or works, branches, a comparison)', tables);
  const ol = (body.match(/^1\. /gm) ?? []).length;
  if (guide || kind === 'skills') add(ol >= 1, 'a numbered list ("how to recognise it" / the steps)', ol);
  const html = body.match(/<\/?[a-z][^>]*>/gi) ?? [];
  add(html.length === 0, 'no HTML in the body', html.length ? html.slice(0, 3).join(' ') : 0);
  const links = [...body.matchAll(/(?<!!)\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g)].map((m) => m[2]);
  const insecure = links.filter((u) => /^http:/.test(u));
  add(insecure.length === 0, 'links are https or on the site', insecure.length ? insecure.join(' ') : 'ok');
  const internal = links.filter((u) => u.startsWith('/')).length;
  if (guide) add(internal >= 3, '≥ 3 internal links (read next, the product)', internal);
  const pics = [...body.matchAll(/!\[([^\]]*)\]\((\S+)(?:\s+"([^"]*)")?\)/g)];
  if (guide) add(pics.length >= 1 ? true : 'warn', 'at least one picture in the body', pics.length);
  for (const m of pics) {
    const [, alt, url, cap] = m;
    add(!!alt.trim() && url.startsWith('https://') && /(CC[ -]?(BY|0)|public domain|PD|©|courtesy|Wikimedia)/i.test(cap ?? ''), `picture has alt, https and a credit with its licence: ${url.slice(0, 60)}`, cap ? 'caption ok?' : 'no caption');
  }
  if (p.faq) {
    add(p.faq.length === 5 ? true : p.faq.length >= 3 ? 'warn' : false, '5 questions', p.faq.length);
    p.faq.forEach((f, i) => {
      const n = words(f.a);
      const [alo, ahi] = vi ? [30, 120] : [25, 80];
      const asks = /[?？]\s*$/.test(f.q.trim());
      // Short answers still stand alone; under the range is a warning, a bare phrase is a failure.
      add(asks && n >= alo && n <= ahi ? true : asks && n >= 12 && n < alo ? 'warn' : false, `question ${i + 1}: ends with "?", answer ${alo}–${ahi} ${vi ? 'syllables' : 'words'}`, n);
    });
  } else if (guide) add(false, '5 questions (faq)', 'none');
  if (p.sources) {
    const urls = p.sources.map((x) => (typeof x === 'string' ? x : x.url));
    // A publisher is a registrable domain: en.wikipedia.org and vi.wikipedia.org are one (Wikipedia).
    const site = (u: string) => {
      try {
        const labels = new URL(u).hostname.split('.');
        const n = /^(co|com|org|net|ac|gov|edu)$/.test(labels.at(-2) ?? '') && labels.length > 2 ? 3 : 2;
        return labels.slice(-n).join('.');
      } catch { return u; }
    };
    const hosts = new Set(urls.map(site));
    add(urls.length >= 4 && urls.length <= 6 && urls.every((u) => u.startsWith('https://')), '4–5 sources, all https (then check_urls.py for 200)', urls.length);
    add(hosts.size >= 3, '≥ 3 different publishers', hosts.size);
  } else if (guide) add(false, '4–5 sources', 'none');
  if (p.facts) add(p.facts.length >= 5 && p.facts.length <= 6, '5–6 quick facts', p.facts.length);
  const scored = out.filter((x) => x.ok !== 'warn');
  const passed = scored.filter((x) => x.ok === true).length;
  return { score: `${passed}/${scored.length}`, passed: passed === scored.length, checks: out };
}

server.registerTool('blog_check', {
  title: 'Check a blog post',
  description: 'Score one language of a post against the blog-kit rules: title ≤ 60, excerpt 140–170, a 40–60-word definition first with the term in bold (Vietnamese counts syllables: 40–90), length (guide 800, pillar 1200), sections, tables, a numbered list, no HTML, https links, ≥ 3 internal links, credited pictures, 5 FAQ with standalone answers, 4–5 sources from ≥ 3 publishers, 5–6 facts. Returns every check with what it found; fix until `passed` is true.',
  inputSchema: {
    title: z.string(), excerpt: z.string(), body: z.string().describe('the Markdown body'),
    lang: z.string().default('vi'),
    kind: z.enum(['guide', 'news', 'playlist', 'skills', 'review']).default('guide'),
    pillar: z.boolean().default(false),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    sources: z.array(z.union([z.string(), z.object({ url: z.string() }).passthrough()])).optional(),
    facts: z.array(z.unknown()).optional(),
  },
}, async (p) => {
  const r = checkPost(p);
  const lines = r.checks.map((c) => `${c.ok === true ? '✓' : c.ok === 'warn' ? '!' : '✗'} ${c.rule} — ${c.got}`);
  return text([`blog_check ${r.passed ? 'passed' : 'not yet'}: ${r.score}`, ...lines].join('\n'));
});

server.registerTool('blog_jsonld', {
  title: 'JSON-LD for a blog post',
  description: 'Build the post\'s JSON-LD graph: BlogPosting (headline, description, image, dates, author, publisher, inLanguage, wordCount, keywords, citation of each source, about), a DefinedTerm for a "What is X?" post, FAQPage from the questions, an ItemList of MusicRecording for its tracks, and a BreadcrumbList. Paste it into a <script type="application/ld+json">.',
  inputSchema: {
    url: z.string().url(), title: z.string(), description: z.string(), lang: z.string().default('vi'),
    image: z.string().url().optional(), datePublished: z.string(), dateModified: z.string().optional(),
    author: z.object({ name: z.string(), url: z.string().url().optional(), type: z.enum(['Person', 'Organization']).default('Person') }),
    publisher: z.object({ name: z.string(), url: z.string().url(), logo: z.string().url().optional() }),
    keywords: z.array(z.string()).optional(), wordCount: z.number().int().optional(),
    term: z.object({ name: z.string(), description: z.string(), setName: z.string().optional() }).optional(),
    sources: z.array(z.object({ url: z.string().url(), title: z.string(), publisher: z.string().optional() })).optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    tracks: z.array(z.object({ name: z.string(), url: z.string().url().optional(), artist: z.string().optional(), year: z.number().int().optional() })).optional(),
    crumbs: z.array(z.object({ name: z.string(), url: z.string().url() })).optional(),
  },
}, async (p) => {
  const id = (k: string) => `${p.url}#${k}`;
  const graph: Record<string, unknown>[] = [{
    '@type': 'BlogPosting', '@id': id('post'), mainEntityOfPage: p.url, url: p.url, headline: p.title, description: p.description,
    inLanguage: p.lang, image: p.image ? [p.image] : undefined, datePublished: p.datePublished, dateModified: p.dateModified ?? p.datePublished,
    author: { '@type': p.author.type, name: p.author.name, url: p.author.url },
    publisher: { '@type': 'Organization', name: p.publisher.name, url: p.publisher.url, logo: p.publisher.logo ? { '@type': 'ImageObject', url: p.publisher.logo } : undefined },
    keywords: p.keywords?.join(', '), wordCount: p.wordCount,
    about: p.term ? { '@id': id('term') } : undefined,
    citation: p.sources?.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url, publisher: s.publisher ? { '@type': 'Organization', name: s.publisher } : undefined })),
  }];
  if (p.term) graph.push({ '@type': 'DefinedTerm', '@id': id('term'), name: p.term.name, description: p.term.description, inDefinedTermSet: p.term.setName ? { '@type': 'DefinedTermSet', name: p.term.setName } : undefined });
  if (p.faq?.length) graph.push({ '@type': 'FAQPage', '@id': id('faq'), mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
  if (p.tracks?.length) graph.push({ '@type': 'ItemList', '@id': id('tracks'), itemListElement: p.tracks.map((t, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'MusicRecording', name: t.name, url: t.url, datePublished: t.year ? String(t.year) : undefined, byArtist: t.artist ? { '@type': 'MusicGroup', name: t.artist } : undefined } })) });
  if (p.crumbs?.length) graph.push({ '@type': 'BreadcrumbList', '@id': id('crumbs'), itemListElement: p.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) });
  return text(JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2));
});

await server.connect(new StdioServerTransport());
