// Sinh design-system/tokens.css (Tailwind v4 @theme) và tokens.vanilla.css (:root) từ tokens.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, '..', 'design-system');
const t = JSON.parse(readFileSync(join(dir, 'tokens.json'), 'utf8'));
const pad = (s, n) => s + ' '.repeat(Math.max(1, n - s.length));

const colorLines = (theme) => Object.entries(t.color[theme]).map(([k, [hex, note]]) => `  ${pad(`--color-${k}: ${hex};`, 30)}${note ? `/* ${note} */` : ''}`).join('\n');
const textLines = Object.entries(t.text).flatMap(([k, v]) => [
  `  --text-${k}: ${v.size};${v.use ? ` /* ${v.use} */` : ''}`,
  v.lineHeight && `  --text-${k}--line-height: ${v.lineHeight};`,
  v.letterSpacing && `  --text-${k}--letter-spacing: ${v.letterSpacing};`,
  v.weight && `  --text-${k}--font-weight: ${v.weight};`,
].filter(Boolean)).join('\n');
const simple = (prefix, obj) => Object.entries(obj).map(([k, v]) => `  --${prefix}-${k}: ${v};`).join('\n');
const motion = Object.entries(t.motion).map(([k, v]) => `  --${k}: ${v};`).join('\n');

const head = `/*
 * Token của hệ thống thiết kế, sinh từ tokens.json (${t.decidedOn}): KHÔNG sửa tay, sửa JSON rồi chạy
 * node scripts/build-tokens.mjs. Đây là tệp duy nhất được viết hex (gates/check-tokens.ts giữ phần còn lại).
 * Màu nói một câu: info là thông tin, dải info → lime là hành động duy nhất của màn hình, trạng thái là chấm kèm chữ.
 */`;

const tailwind = `${head}

@theme {
  --color-*: initial;
${colorLines('dark')}

  --font-*: initial;
  --font-sans: ${t.font.sans};

${textLines}

${simple('radius', t.radius)}

${simple('breakpoint', t.breakpoint)}
${simple('container', t.container)}

${motion}
  --animate-kd-glow: kd-glow 2.4s ease-in-out infinite;
}

@keyframes kd-glow {
  0%, 100% { box-shadow: 0 0 0 0 transparent; }
  50% { box-shadow: 0 0 22px 2px color-mix(in srgb, var(--color-lime) 50%, transparent); }
}

@layer base {
  :root {
    --gradient-accent: ${t.gradient.accent};
    --kd-gutter: ${t.gutter.base};
  }
  @media (min-width: ${t.breakpoint.tab}) { :root { --kd-gutter: ${t.gutter.tab}; } }
  @media (min-width: ${t.breakpoint.desk}) { :root { --kd-gutter: ${t.gutter.desk}; } }
  html { background: var(--color-surface-0); color-scheme: dark; }
  body { font-family: var(--font-sans); font-size: 15px; line-height: 1.5; letter-spacing: -0.01em; color: var(--color-fg-2); background: var(--color-surface-0); -webkit-font-smoothing: antialiased; }
  ::selection { background: var(--color-info); color: var(--color-on-accent); }
  :focus-visible { outline: 2px solid var(--color-lime); outline-offset: 2px; }
  code, kbd, samp, pre { font-family: inherit; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }

  /* Biến thể sáng: cùng vai trò, giá trị khác; lime đơn sắc không dùng trên nền sáng (focus = info). */
  :root[data-theme="light"] {
${colorLines('light').replace(/^  --color-/gm, '    --color-')}
    color-scheme: light;
  }
  :root[data-theme="light"] :focus-visible { outline-color: var(--color-info); }
}
`;

const vanilla = `${head}

:root {
${colorLines('dark')}
  --font-sans: ${t.font.sans};
${textLines}
${simple('radius', t.radius)}
${simple('breakpoint', t.breakpoint)}
${simple('container', t.container)}
${motion}
  --gradient-accent: ${t.gradient.accent};
  --kd-gutter: ${t.gutter.base};
}
@media (min-width: ${t.breakpoint.tab}) { :root { --kd-gutter: ${t.gutter.tab}; } }
@media (min-width: ${t.breakpoint.desk}) { :root { --kd-gutter: ${t.gutter.desk}; } }
:root[data-theme="light"] {
${colorLines('light')}
}
`;

writeFileSync(join(dir, 'tokens.css'), tailwind);
writeFileSync(join(dir, 'tokens.vanilla.css'), vanilla);
console.log('wrote design-system/tokens.css and tokens.vanilla.css');
