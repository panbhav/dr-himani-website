import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PAGE_METADATA, SITE_URL, pageUrl } from '../src/data/site.js';

const output = resolve('dist');
const policy = [
  "default-src 'self'", "script-src 'self'", "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com", "img-src 'self' data:",
  "connect-src 'self' https://formsubmit.co", "form-action https://formsubmit.co",
  "base-uri 'none'", "object-src 'none'", "frame-src 'none'",
].join('; ');
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const template = await readFile(resolve(output, 'index.html'), 'utf8');
const paths = [];

for (const [path, metadata] of Object.entries(PAGE_METADATA)) {
  let html = template.replace(/<meta charset="UTF-8"\s*\/>/, match => `${match}\n    <meta http-equiv="Content-Security-Policy" content="${escape(policy)}" />`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(metadata.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/>)/, `$1${escape(metadata.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/>)/, `$1${escape(metadata.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/>)/, `$1${escape(metadata.description)}$2`)
    .replace('</head>', `    <link rel="canonical" href="${pageUrl(path)}" />\n    <meta property="og:url" content="${pageUrl(path)}" />\n  </head>`);
  const directory = path === '/' ? output : resolve(output, path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
  paths.push(pageUrl(path));
  if (/<script(?![^>]*type="application\/ld\+json")[^>]*>\s*[^<\s]/.test(html)) throw new Error('Executable inline script found');
  const assetUrls = [...html.matchAll(/(?:src|href)="(\/(?:assets\/|favicon\.svg)[^"#?]*)"/g)].map(match => match[1]);
  for (const asset of assetUrls) await access(resolve(output, asset.slice(1)));
  if (!html.includes('http-equiv="Content-Security-Policy"')) throw new Error('Production CSP missing');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
const publicSitemap = await readFile('public/sitemap.xml', 'utf8');
const publicUrls = [...publicSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
if (JSON.stringify(publicUrls) !== JSON.stringify(paths)) throw new Error('Source sitemap does not match public page routes');
await writeFile(resolve(output, 'sitemap.xml'), sitemap);
const robots = await readFile(resolve(output, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_URL}sitemap.xml`)) throw new Error('robots.txt sitemap URL does not match site configuration');
if (!template.includes('drhimanigynae@gmail.com') || template.includes('himanibhan04@gmail.com')) throw new Error('Structured data email is stale');
const fallback = await readFile(resolve(output, '404.html'), 'utf8');
if (!fallback.includes('name="robots" content="noindex, follow"') || !fallback.includes('Content-Security-Policy')) throw new Error('404 protections missing');
await access(resolve(output, 'redirect-path.js'));
await access(resolve(output, 'CNAME'));
console.log(`Verified ${paths.length} page entry files, route metadata, CSP, referenced HTML assets, sitemap and robots.txt.`);
