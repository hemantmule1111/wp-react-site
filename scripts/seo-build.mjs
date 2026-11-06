// Runs after `vite build` (see package.json "build"). For each route it writes a copy of dist/index.html with that
// page's own <title>, description, canonical URL, Open Graph/Twitter tags, JSON-LD and crawlable links, so Google,
// Bing and social-media bots see correct data without running JavaScript. It also writes sitemap.xml and robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { createServer, loadEnv } from 'vite';

const root = process.cwd();
const dist = path.join(root, 'dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) throw new Error('dist/index.html not found. Run vite build first.');

const env = loadEnv('production', root, '');
const vite = await createServer({ root, appType: 'custom', logLevel: 'error', server: { middlewareMode: true } });
const seo = await vite.ssrLoadModule('/src/data/seo.js');
const { services } = await vite.ssrLoadModule('/src/data/services.js');
await vite.close();

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ld = (o) => JSON.stringify(o).replace(/</g, '\u003c');
const { SITE } = seo;

// ---- pages ----------------------------------------------------------------
const pages = Object.entries(seo.pageSeo).map(([p, m]) => ({ path: p, ...m, file: p === '/' ? 'index.html' : `${p.slice(1)}.html` }));
pages.find((p) => p.path === '/').jsonLd = undefined;
pages.find((p) => p.path === '/contact').jsonLd = {
  '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact WPArt', url: seo.canonical('/contact'),
};
for (const s of services) {
  pages.push({ path: `/services/${s.slug}`, ...seo.serviceMeta(s), jsonLd: seo.serviceJsonLd(s), file: `services/${s.slug}.html`, priority: '0.8' });
}

const links = [
  ['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Projects', '/projects'],
  ['YouTube Gallery', '/youtube'], ['Latest News', '/blog'], ['Contact', '/contact'],
];
const noscript = (p) => {
  const h1 = p.path === '/' ? 'WPArt: Website, App & Custom Software Development' : p.title.split(' | ')[0];
  return `<noscript><div style="max-width:720px;margin:40px auto;padding:0 16px;font-family:sans-serif">
<h1>${esc(h1)}</h1><p>${esc(p.description)}</p>
<nav><ul>${links.map(([n, h]) => `<li><a href="${seo.canonical(h)}">${esc(n)}</a></li>`).join('')}</ul>
<h2>Our services</h2><ul>${services.map((s) => `<li><a href="${seo.canonical('/services/' + s.slug)}">${esc(s.title)}</a></li>`).join('')}</ul></nav>
<p>Please enable JavaScript to view this site. Call 8097 370 227 or email info@wpart.co.in.</p></div></noscript>`;
};

function render(p) {
  const url = seo.canonical(p.path);
  const type = 'website';
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE.image}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${SITE.image}" />`,
    `<script type="application/ld+json">${ld(seo.orgJsonLd())}</script>`,
    p.jsonLd ? `<script type="application/ld+json" id="page-jsonld">${ld(p.jsonLd)}</script>` : '',
  ].filter(Boolean).join('\n    ');
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(p.description)}" />`)
    .replace('</head>', `    ${tags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript(p)}`);
}

for (const p of pages) {
  const out = path.join(dist, p.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, render(p));
}

// ---- blog posts for the sitemap (from WordPress, best effort) ---------------
let posts = [];
const wp = (env.VITE_WP_URL || '').replace(/\/$/, '');
if (wp) {
  try {
    const res = await fetch(`${wp}/wp-json/wp/v2/posts?per_page=100&_fields=slug,modified`, { signal: AbortSignal.timeout(10000) });
    if (res.ok) posts = await res.json();
  } catch { /* WordPress unreachable: sitemap just skips posts */ }
}

// ---- sitemap.xml + robots.txt --------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...pages.map((p) => ({ loc: seo.canonical(p.path), lastmod: today, priority: p.priority || '0.7' })),
  ...posts.map((x) => ({ loc: seo.canonical(`/blog/${x.slug}`), lastmod: (x.modified || today).slice(0, 10), priority: '0.6' })),
];
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /en/contact.php\nDisallow: /en/visitors.php\n\nSitemap: ${SITE.url}/sitemap.xml\n`
);

console.log(`SEO build: ${pages.length} pages, ${posts.length} blog posts, sitemap.xml and robots.txt written.`);
