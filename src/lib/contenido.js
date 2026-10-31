// Lee los proyectos y artículos de src/content/ y los entrega a las páginas.
// También registra sus direcciones para que link('<url-del-caso>') funcione en todo el sitio.
import { getCollection } from 'astro:content';
import curiososJson from '../content/datos-curiosos.json';
import { registerRoute } from '../i18n/index.js';
import { sectionsOf } from './secciones.js';
import { plain, readingMinutes } from './text.js';
import { industries } from './industrias.js';

export { industries };

export const pillars = {
  data: { es: 'Data', en: 'Data', tone: 'mint' },
  ml: { es: 'Machine Learning', en: 'Machine Learning', tone: 'mint' },
  mi: { es: 'Market Intelligence', en: 'Market Intelligence', tone: 'gold' },
};

export const categories = {
  analisis: { label: 'Análisis', plural: 'Análisis', tone: 'green', reading: '6–10 min', what: 'Una pregunta con datos abiertos, de la cifra a la decisión.' },
  curioso: { label: 'Dato curioso', plural: 'Datos curiosos', tone: 'gold', reading: '1 min', what: 'Una cifra, una frase y su fuente.' },
  experimento: { label: 'Experimento', plural: 'Experimentos', tone: 'teal', reading: '5–8 min', what: 'Un modelo o una técnica puestos a prueba, con lo que salió bien y mal.' },
  nota: { label: 'Nota', plural: 'Notas', tone: 'slate', reading: '2–4 min', what: 'Aprendizajes cortos de la maestría y del oficio.' },
};

const words = (md) => plain(String(md).replace(/```[\s\S]*?```/g, ' ').replace(/[#>|!\[\]()-]/g, ' '));

function caseText(entry, lang) {
  const d = entry.data;
  return {
    title: d.titulo,
    question: d.pregunta,
    finding: d.hallazgo,
    description: d.descripcion,
    dataTag: d.etiquetaDatos,
    teamLine: d.lineaEquipo,
    facts: d.ficha.map((f) => [f.dato, f.valor]),
    about: d.sobreLosDatos,
    license: d.licencia,
    date: d.fecha,
    html: entry.rendered?.html || '',
    sections: sectionsOf(entry.body, lang),
    minutes: readingMinutes([words(entry.body)]),
  };
}

const visibles = (e) => e.data.publicar !== false;

const esEntries = (await getCollection('proyectos', visibles)).sort((a, b) => a.data.orden - b.data.orden || a.id.localeCompare(b.id));
const enEntries = await getCollection('projects', visibles);

/** Proyectos, en el orden del campo "orden". La clave de cada uno es su dirección en español. */
export const cases = esEntries.map((e) => {
  const en = enEntries.find((x) => x.data.es === e.id);
  const item = {
    key: e.id,
    enSlug: en?.id,
    pillar: e.data.pilar,
    industry: e.data.industria,
    featured: e.data.destacado,
    tools: e.data.herramientas,
    date: { es: e.data.fecha, en: en?.data.fecha || e.data.fecha },
    repo: e.data.repo,
    thumb: e.data.portada,
    team: Boolean(e.data.lineaEquipo),
    simulator: e.data.simulador,
    origin: e.data.origen,
    es: caseText(e, 'es'),
    en: en ? caseText(en, 'en') : undefined,
    // Solo para tarjetas y CV cuando no hay versión completa en inglés
    enCard: en ? { title: en.data.titulo, question: en.data.pregunta, finding: en.data.hallazgo } : e.data.ingles && { title: e.data.ingles.titulo, question: e.data.ingles.pregunta, finding: e.data.ingles.hallazgo },
  };
  registerRoute(e.id, { es: `/es/proyectos/${e.id}/`, ...(en ? { en: `/en/projects/${en.id}/` } : {}) });
  return item;
});

for (const en of enEntries) {
  if (!esEntries.some((e) => e.id === en.data.es)) {
    throw new Error(`El proyecto en inglés "${en.id}" dice es: "${en.data.es}", pero no existe src/content/proyectos/es/${en.data.es}.md`);
  }
}

/** Herramientas que se ofrecen como filtro: las que usan al menos dos proyectos. */
export const toolFilters = (() => {
  const count = new Map();
  cases.forEach((c) => c.tools.forEach((t) => count.set(t, (count.get(t) || 0) + 1)));
  return [...count].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).map(([t]) => t);
})();

/** Industrias que se ofrecen como filtro: las que tiene al menos un proyecto, en el orden de src/lib/industrias.js. */
export const industryFilters = Object.keys(industries).filter((k) => cases.some((c) => c.industry === k));

/** Artículos del Lab: primero los que tienen fecha (más recientes arriba). */
export const posts = (await getCollection('lab', visibles))
  .sort((a, b) => (b.data.fecha || '').localeCompare(a.data.fecha || '') || a.id.localeCompare(b.id))
  .map((e) => {
    const d = e.data;
    registerRoute(e.id, { es: `/es/lab/${e.id}/` });
    return {
      key: e.id,
      category: d.categoria,
      featured: d.destacado,
      date: d.fecha || null,
      minutes: d.minutos,
      title: d.titulo,
      sub: d.bajada,
      cover: d.portada.imagen
        ? { src: d.portada.imagen, alt: d.portada.alt || '', caption: d.portada.pie }
        : { figure: d.portada.cifra, text: d.portada.texto, source: d.portada.fuente },
      summary: d.resumen || null,
      html: e.rendered?.html || '',
      fact: d.dato ? { n: d.dato.cifra, text: d.dato.texto, source: d.dato.fuente } : null,
      decision: d.decision,
      askReader: d.preguntaAlLector,
      sources: d.fuentes,
      repo: d.repo ? { url: d.repo.url, note: d.repo.nota } : null,
      relatedCase: d.casoRelacionado,
    };
  });

for (const p of posts) {
  if (p.relatedCase && !cases.some((c) => c.key === p.relatedCase)) {
    throw new Error(`El artículo "${p.key}" tiene casoRelacionado: "${p.relatedCase}", pero ese proyecto no existe.`);
  }
}

/** Datos curiosos de la franja dorada del Lab. */
export const curiosities = curiososJson
  .filter((c) => posts.some((p) => p.key === c.articulo))
  .map((c) => ({ n: c.cifra, text: c.texto, source: c.fuente, key: c.articulo }));

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** "26 oct 2026" a partir de 'AAAA-MM-DD'; null si no hay fecha. */
export function formatDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "26 oct 2026 · 6 min de lectura" o solo "6 min de lectura" si aún no hay fecha. */
export function postMeta(p) {
  const d = formatDate(p.date);
  return d ? `${d} · ${p.minutes} min de lectura` : `${p.minutes} min de lectura`;
}
