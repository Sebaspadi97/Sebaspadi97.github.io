// Sincroniza proyectos que viven en su propio repositorio de GitHub.
//
// Un repositorio entra al sitio si:
//   1. tiene el tema (topic) "sp-lab" en GitHub, y
//   2. tiene el archivo sp-lab/caso.md con "publicar: true".
// Opcional: sp-lab/caso.en.md con la versión en inglés.
// Las imágenes que el caso usa (rutas relativas a sp-lab/ o desde la raíz con "/") se
// copian al sitio en WebP, en public/img/proyectos/<url>/, con una versión de 700 px.
//
// Los archivos que crea llevan "origen: <repo>"; solo esos se actualizan o se borran.
// Un proyecto escrito a mano en el sitio (sin "origen") nunca se toca.
//
// Uso (lo corre .github/workflows/sincronizar-proyectos.yml):
//   GITHUB_TOKEN=… OWNER=Sebaspadi97 node scripts/sync/sincronizar-proyectos.mjs
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { posix } from 'node:path';
import yaml from 'js-yaml';
import sharp from 'sharp';

const OWNER = process.env.OWNER || process.env.GITHUB_REPOSITORY_OWNER || 'Sebaspadi97';
const TOPIC = process.env.TOPIC || 'sp-lab';
const TOKEN = process.env.GITHUB_TOKEN;
// Solo para la prueba automática: leer la plantilla de este mismo repositorio como si fuera un proyecto.
const PRUEBA = process.env.PRUEBA_PLANTILLA === '1';
const BASE_DIR = PRUEBA ? 'plantillas/proyecto/sp-lab' : 'sp-lab';
const API = 'https://api.github.com';
const DIRS = { es: 'src/content/proyectos/es', en: 'src/content/proyectos/en' };
const IMG = 'public/img/proyectos';
const MONTHS = { es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'], en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] };

const report = { agregados: [], actualizados: [], retirados: [], omitidos: [] };
const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) };

async function api(path) {
  const r = await fetch(API + path, { headers });
  if (!r.ok) throw new Error(`${r.status} ${path}`);
  return r.json();
}
async function raw(repo, path, ref) {
  const r = await fetch(`${API}/repos/${OWNER}/${repo}/contents/${encodeURI(path)}?ref=${ref}`, { headers: { ...headers, Accept: 'application/vnd.github.raw' } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`${r.status} ${repo}/${path}`);
  return Buffer.from(await r.arrayBuffer());
}

const slugify = (s) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function parse(text) {
  const m = String(text).match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('falta el bloque de datos entre --- al inicio del archivo');
  return { data: yaml.load(m[1]) || {}, body: m[2].trim() };
}

function readLocal(file) {
  try {
    return parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

/** Copia una imagen del repo al sitio en WebP (original ≤1400 px y versión de 700 px). */
async function copyImage(repo, ref, ref_path, slug, done) {
  if (/^https?:/.test(ref_path) || [...done.values()].includes(ref_path)) return ref_path; // externa o ya copiada
  const clean = ref_path.split(/[?#]/)[0];
  const repoPath = clean.startsWith('/') ? clean.slice(1) : posix.normalize(posix.join(BASE_DIR, clean));
  if (done.has(repoPath)) return done.get(repoPath);
  const buf = await raw(repo, repoPath, ref);
  if (!buf) throw new Error(`no encontré la imagen ${repoPath}`);
  const name = slugify(posix.basename(repoPath).replace(/\.[^.]+$/, '')) || 'imagen';
  mkdirSync(`${IMG}/${slug}`, { recursive: true });
  const out = `${IMG}/${slug}/${name}.webp`;
  await sharp(buf).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  await sharp(buf).resize({ width: 700, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${IMG}/${slug}/${name}-700.webp`);
  const url = `/img/proyectos/${slug}/${name}.webp`;
  done.set(repoPath, url);
  return url;
}

async function withImages(doc, repo, ref, slug, done) {
  if (doc.data.portada) doc.data.portada = await copyImage(repo, ref, doc.data.portada, slug, done);
  const refs = [...doc.body.matchAll(/!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g)].map((m) => m[1]);
  for (const r of new Set(refs)) {
    const url = await copyImage(repo, ref, r, slug, done);
    doc.body = doc.body.split(`](${r}`).join(`](${url}`);
  }
  return doc;
}

const write = (file, data, body) => writeFileSync(file, `---\n${yaml.dump(data, { lineWidth: -1, quotingType: '"' })}---\n\n${body}\n`);

// ---------- 1. repositorios con el tema ----------
const repos = [];
for (let page = 1; ; page++) {
  const list = await api(`/users/${OWNER}/repos?per_page=100&page=${page}&sort=updated`);
  repos.push(...list.filter((r) => !r.archived && (PRUEBA ? r.name === process.env.PRUEBA_REPO : (r.topics || []).includes(TOPIC))));
  if (list.length < 100) break;
}
console.log(`Repositorios con el tema "${TOPIC}": ${repos.map((r) => r.name).join(', ') || 'ninguno'}`);

// ---------- 2. leer y escribir cada caso ----------
const keep = { es: new Set(), en: new Set() };
const failed = new Set(); // repos con error: se deja la última versión buena
for (const repo of repos) {
  const ref = PRUEBA ? process.env.PRUEBA_REF || repo.default_branch : repo.default_branch;
  try {
    const esRaw = await raw(repo.name, `${BASE_DIR}/caso.md`, ref);
    if (!esRaw) {
      report.omitidos.push(`${repo.name}: no tiene sp-lab/caso.md`);
      continue;
    }
    const es = parse(esRaw.toString('utf8'));
    if (PRUEBA) es.data.publicar = true;
    if (es.data.publicar !== true) {
      report.omitidos.push(`${repo.name}: "publicar" no está en true`);
      continue;
    }
    const slug = slugify(es.data.url || repo.name);
    delete es.data.url;
    const file = `${DIRS.es}/${slug}.md`;
    const prev = readLocal(file);
    if (existsSync(file) && !prev?.data?.origen) {
      report.omitidos.push(`${repo.name}: ya existe un proyecto escrito a mano con la dirección "${slug}"`);
      continue;
    }
    const d = new Date(repo.created_at);
    es.data.repo ??= repo.html_url;
    es.data.fecha ??= `${MONTHS.es[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    es.data.origen = repo.html_url;

    const done = new Map();
    await withImages(es, repo.name, ref, slug, done);
    write(file, es.data, es.body);
    keep.es.add(slug);
    (prev ? report.actualizados : report.agregados).push(`${slug} ← ${repo.name}`);

    const enRaw = await raw(repo.name, `${BASE_DIR}/caso.en.md`, ref);
    if (enRaw) {
      const en = parse(enRaw.toString('utf8'));
      if (en.data.publicar !== false) {
        const enSlug = slugify(en.data.url || slug);
        delete en.data.url;
        const enFile = `${DIRS.en}/${enSlug}.md`;
        if (existsSync(enFile) && !readLocal(enFile)?.data?.origen) {
          report.omitidos.push(`${repo.name}: ya existe una versión en inglés escrita a mano en "${enSlug}"`);
        } else {
          en.data = { ...es.data, ...en.data, es: slug, origen: repo.html_url };
          delete en.data.destacado;
          en.data.fecha = en.data.fecha && en.data.fecha !== es.data.fecha ? en.data.fecha : `${MONTHS.en[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
          await withImages(en, repo.name, ref, slug, done);
          write(enFile, en.data, en.body);
          keep.en.add(enSlug);
        }
      }
    }
  } catch (e) {
    failed.add(repo.html_url);
    report.omitidos.push(`${repo.name}: ${e.message}`);
  }
}

// ---------- 3. retirar lo que ya no se publica ----------
for (const lang of ['es', 'en']) {
  if (!existsSync(DIRS[lang])) continue;
  for (const f of readdirSync(DIRS[lang]).filter((x) => x.endsWith('.md'))) {
    const doc = readLocal(`${DIRS[lang]}/${f}`);
    const slug = f.replace(/\.md$/, '');
    if (!doc?.data?.origen || keep[lang].has(slug)) continue;
    if (failed.has(doc.data.origen)) continue;
    rmSync(`${DIRS[lang]}/${f}`);
    if (lang === 'es') rmSync(`${IMG}/${slug}`, { recursive: true, force: true });
    report.retirados.push(`${lang}/${slug}`);
  }
}

// ---------- 4. resumen ----------
const lines = [
  '## Sincronización de proyectos',
  '',
  `- Agregados: ${report.agregados.join('; ') || 'ninguno'}`,
  `- Actualizados: ${report.actualizados.join('; ') || 'ninguno'}`,
  `- Retirados: ${report.retirados.join('; ') || 'ninguno'}`,
  `- Omitidos: ${report.omitidos.join('; ') || 'ninguno'}`,
];
console.log(lines.join('\n'));
if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n', { flag: 'a' });
