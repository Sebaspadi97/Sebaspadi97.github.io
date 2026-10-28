// Exporta el contenido del sitio (casos, Lab, textos de páginas) a archivos Markdown legibles,
// para respaldo en OneDrive o revisión fuera del código.
// Uso: node scripts/export/exportar-contenido.mjs <carpeta-salida>
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cases, pillars } from '../../src/data/cases.js';
import { posts, categories } from '../../src/data/lab.js';
import { home } from '../../src/data/home.js';
import { about } from '../../src/data/about.js';
import { privacy, terms, legalUpdated } from '../../src/data/legal.js';
import { site } from '../../src/data/site.js';
import { routes } from '../../src/i18n/index.js';

const OUT = process.argv[2] || 'export';
const BASE = 'https://sebaspadi97.github.io';
const fecha = new Date().toISOString().slice(0, 10);
const w = (path, text) => { mkdirSync(join(OUT, ...path.split('/').slice(0, -1)), { recursive: true }); writeFileSync(join(OUT, path), text.replace(/\n{3,}/g, '\n\n').trim() + '\n'); };
const abs = (src) => (src && src.startsWith('/') ? BASE + src : src);

// ---------- bloques de contenido → Markdown ----------
const block = (b) => {
  if (b.lead) return `**${b.lead}**`;
  if (b.p) return b.p;
  if (b.ul) return b.ul.map((x) => `- ${x}`).join('\n');
  if (b.ol) return b.ol.map((x, i) => `${i + 1}. ${x}`).join('\n');
  if (b.stats) return b.stats.map((s) => `- **${s.n}** ${s.label}`).join('\n');
  if (b.table) {
    const { head, rows } = b.table;
    return [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');
  }
  if (b.fig) return `![${b.fig.alt}](${abs(b.fig.src)})\n\n*${b.fig.caption || ''}*`;
  if (b.sim) return '> Aquí va el simulador interactivo del caso (solo en la web).';
  return '```json\n' + JSON.stringify(b, null, 2) + '\n```';
};
const blocks = (arr) => (arr || []).map(block).join('\n\n');

const SECTION = {
  es: { question: 'La pregunta de negocio', data: 'Los datos', approach: 'El enfoque', findings: 'Hallazgos', decision: 'Decisión recomendada', limits: 'Limitaciones', team: 'Equipo y mi rol' },
  en: { question: 'The business question', data: 'The data', approach: 'The approach', findings: 'Findings', decision: 'Recommended decision', limits: 'Limitations', team: 'Team and my role' },
};

// ---------- casos ----------
for (const c of cases) {
  for (const lang of ['es', 'en']) {
    const t = c[lang];
    if (!t) continue;
    const url = routes[c.key]?.[lang];
    const S = SECTION[lang];
    const meta = [
      `# ${t.title}`,
      '',
      `> ${t.question}`,
      '',
      `- **${lang === 'es' ? 'Pilar' : 'Pillar'}:** ${pillars?.[c.pillar]?.[lang] || pillars?.[c.pillar]?.label || c.pillar}`,
      `- **${lang === 'es' ? 'Hallazgo' : 'Finding'}:** ${t.finding}`,
      `- **${lang === 'es' ? 'Herramientas' : 'Tools'}:** ${c.tools.join(' · ')}`,
      `- **${lang === 'es' ? 'Fecha' : 'Date'}:** ${c.date?.[lang] || ''}`,
      `- **${lang === 'es' ? 'Repositorio' : 'Repository'}:** ${c.repo}`,
      url ? `- **${lang === 'es' ? 'En la web' : 'On the site'}:** ${BASE}${url}` : '',
      '',
      t.description,
      '',
      ...(t.facts || []).map(([k, v]) => `- **${k}:** ${v}`),
      '',
      `## ${lang === 'es' ? 'Sobre los datos' : 'About the data'}`,
      '',
      t.about,
    ];
    const body = Object.entries(t.sections || {}).map(([k, v]) => {
      const title = `## ${S[k] || k}`;
      if (Array.isArray(v)) return `${title}\n\n${blocks(v)}`;
      return `${title}\n\n${v.lead ? `**${v.lead}**\n\n` : ''}${blocks(v.blocks)}`;
    });
    const tail = [t.teamLine ? `*${t.teamLine}*` : '', t.license ? `---\n\n${t.license}` : ''];
    const name = lang === 'es' ? 'ficha_del_caso_es.md' : 'ficha_del_caso_en.md';
    w(`casos/${c.key}/${name}`, [...meta, '', ...body, '', ...tail].join('\n'));
  }
}

// ---------- Lab ----------
for (const p of posts) {
  const cat = categories[p.category]?.label || p.category;
  const lines = [
    `# ${p.title}`,
    '',
    `*${cat} · ${p.minutes} min${p.date ? ' · ' + p.date : ' · fecha por definir'}*`,
    '',
    p.sub ? `> ${p.sub}` : '',
    routes[p.key]?.es ? `En la web: ${BASE}${routes[p.key].es}` : '',
    '',
    p.cover?.src ? `![${p.cover.alt}](${abs(p.cover.src)})\n\n*${p.cover.caption || ''}*` : '',
    p.summary ? `## En 30 segundos\n\n${p.summary.map((s) => `- ${s}`).join('\n')}` : '',
    p.body ? p.body.join('\n\n') : '',
    p.fact ? `## Dato curioso\n\n**${p.fact.n}** ${p.fact.text}\n\n*${p.fact.source || ''}*` : '',
    p.decision ? `## ¿Y qué decisión tomaría?\n\n${p.decision}${p.askReader ? `\n\n${p.askReader}` : ''}` : '',
    p.sources ? `## Fuentes y método\n\n${p.sources.map((s) => `- ${s}`).join('\n')}` : '',
    p.repo ? `Repositorio: ${p.repo.url}${p.repo.note ? ` (${p.repo.note})` : ''}` : '',
  ];
  const known = new Set(['key', 'category', 'featured', 'date', 'minutes', 'title', 'sub', 'cover', 'summary', 'body', 'fact', 'decision', 'askReader', 'sources', 'repo', 'relatedCase']);
  const extra = Object.fromEntries(Object.entries(p).filter(([k]) => !known.has(k)));
  if (Object.keys(extra).length) lines.push('## Otros campos', '```json\n' + JSON.stringify(extra, null, 2) + '\n```');
  w(`lab/${p.key}.md`, lines.join('\n\n'));
}

// ---------- textos de páginas (esquema general) ----------
const outline = (v, depth = 2, key = '') => {
  if (v == null || v === '') return '';
  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return key ? `**${key}:** ${v}` : String(v);
  if (Array.isArray(v)) {
    if (v.every((x) => typeof x === 'string')) return (key ? `**${key}:**\n\n` : '') + v.map((x) => `- ${x}`).join('\n');
    return (key ? `${'#'.repeat(Math.min(depth, 6))} ${key}\n\n` : '') + v.map((x) => outline(x, depth + 1)).join('\n\n---\n\n');
  }
  return (key ? `${'#'.repeat(Math.min(depth, 6))} ${key}\n\n` : '') + Object.entries(v).map(([k, x]) => outline(x, depth + 1, k)).join('\n\n');
};
w('textos/Inicio_es.md', `# Inicio (español)\n\n${BASE}/es/\n\n${outline(home.es)}`);
w('textos/Inicio_en.md', `# Home (English)\n\n${BASE}/en/\n\n${outline(home.en)}`);
w('textos/Sobre_mi_es.md', `# Sobre mí (español)\n\n${BASE}/es/sobre-mi/\n\n${outline(about.es)}`);
if (about.en) w('textos/Sobre_mi_en.md', `# About (English)\n\n${BASE}/en/about/\n\n${outline(about.en)}`);
w('textos/Politica_de_privacidad.md', `# Política de privacidad\n\nÚltima actualización: ${legalUpdated}\n\n${outline(privacy)}`);
w('textos/Terminos_de_uso.md', `# Términos de uso\n\nÚltima actualización: ${legalUpdated}\n\n${outline(terms)}`);
w('textos/Datos_generales.md', `# Datos generales del sitio\n\n${outline({ ...site, form: { ...site.form, accessKey: '(en el código)' } })}`);

// ---------- mapa del sitio ----------
const rows = Object.entries(routes).map(([k, r]) => `| ${k} | ${r.es ? BASE + r.es : '—'} | ${r.en ? BASE + r.en : '—'} |`);
w('mapa_del_sitio.md', [`# Mapa del sitio (${fecha})`, '', '| Página | Español | Inglés |', '| --- | --- | --- |', ...rows, '', `Además: ${BASE}/es/lab/rss/ (suscripción), ${BASE}/es/lab/rss.xml (RSS), 404 y redirección por idioma en ${BASE}/.`].join('\n'));

console.log('Exportado en', OUT);
