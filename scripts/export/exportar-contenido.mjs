// Exporta el contenido del sitio (proyectos, Lab y textos de páginas) en Markdown,
// para respaldo en OneDrive o revisión fuera del código.
// Uso: node scripts/export/exportar-contenido.mjs <carpeta-salida>
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cpSync } from 'node:fs';
import { home } from '../../src/data/home.js';
import { about } from '../../src/data/about.js';
import { privacy, terms, legalUpdated } from '../../src/data/legal.js';
import { site } from '../../src/data/site.js';

const OUT = process.argv[2] || 'export';
const BASE = 'https://sebaspadi97.github.io';
const fecha = new Date().toISOString().slice(0, 10);
const w = (path, text) => { mkdirSync(join(OUT, ...path.split('/').slice(0, -1)), { recursive: true }); writeFileSync(join(OUT, path), text.replace(/\n{3,}/g, '\n\n').trim() + '\n'); };

// ---------- proyectos y artículos: ya son Markdown, se copian tal cual ----------
cpSync('src/content/proyectos', join(OUT, 'proyectos'), { recursive: true });
cpSync('src/content/lab', join(OUT, 'lab'), { recursive: true });
cpSync('src/content/datos-curiosos.json', join(OUT, 'datos-curiosos.json'));

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

console.log('Exportado en', OUT);
