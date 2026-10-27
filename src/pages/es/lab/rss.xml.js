// RSS del Lab (/es/lab/rss.xml). Se genera al compilar, sin dependencias.
import { posts, categories } from '../../../data/lab.js';
import { routes } from '../../../i18n/index.js';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET({ site }) {
  const base = site || new URL('https://sebaspadi97.github.io');
  const abs = (path) => new URL(path, base).href;

  // Primero las publicaciones con fecha (más recientes arriba); las que aún no tienen fecha, al final.
  const sorted = [...posts].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const items = sorted
    .map((p) => {
      const link = abs(routes[p.key].es);
      const pub = p.date ? `\n      <pubDate>${new Date(`${p.date}T12:00:00-05:00`).toUTCString()}</pubDate>` : '';
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${esc(p.sub)}</description>
      <category>${esc(categories[p.category].plural)}</category>${pub}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lab · Sebas Padilla Lab</title>
    <link>${abs('/es/lab/')}</link>
    <atom:link href="${abs('/es/lab/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>Análisis cortos, datos curiosos y experimentos con modelos, con datos abiertos de Colombia.</description>
    <language>es-co</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
