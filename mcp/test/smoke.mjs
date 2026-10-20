// Starts the server over stdio, lists the tools and calls the cheap ones.
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const client = new Client({ name: 'smoke', version: '0' });
await client.connect(new StdioClientTransport({ command: 'node', args: [join(here, '..', 'src', 'server.ts')], env: process.env }));
const { tools } = await client.listTools();
console.log('tools:', tools.map((t) => t.name).join(', '));
const first = async (name, args = {}) => { const r = await client.callTool({ name, arguments: args }); return r.content[0].text; };
console.log('tokens(json) ok:', JSON.parse(await first('design_tokens', { format: 'json' })).decidedOn);
console.log('checklist(vi) lines:', (await first('design_checklist', { lang: 'vi' })).split('\n').length);
console.log('learnings("timezone"):', (await first('learnings', { query: 'timezone' })).slice(0, 160).replace(/\n/g, ' '));
console.log('patterns lines:', (await first('design_patterns')).split('\n').length);
console.log('blog_guide(writing) starts:', (await first('blog_guide', { part: 'writing' })).split('\n')[0]);
console.log('blog_template has body:', (await first('blog_template')).includes('## Đọc tiếp'));
const thin = await first('blog_check', { title: 'What is techno?', excerpt: 'Short.', body: '**Techno** is music.', lang: 'en' });
if (!thin.startsWith('blog_check not yet')) throw new Error('blog_check passed a thin post');
console.log('blog_check(thin):', thin.split('\n')[0]);
const ld = JSON.parse(await first('blog_jsonld', { url: 'https://example.com/blog/techno', title: 'What is techno?', description: 'd', datePublished: '2026-10-20', author: { name: 'Editors', type: 'Organization' }, publisher: { name: 'Example', url: 'https://example.com' }, term: { name: 'Techno', description: 'Electronic music born in Detroit.' }, faq: [{ q: 'Q?', a: 'A.' }], sources: [{ url: 'https://en.wikipedia.org/wiki/Techno', title: 'Techno' }] }));
console.log('blog_jsonld types:', ld['@graph'].map((n) => n['@type']).join(', '));
console.log('scaffold(dryRun):', (await first('scaffold', { target: process.env.TMPDIR || '/tmp', what: ['skills'], dryRun: true })).split('\n')[0]);
if (process.env.MEASURE_URL) console.log('measure:', (await first('measure_first_screen', { url: process.env.MEASURE_URL })).slice(0, 600));
await client.close();
