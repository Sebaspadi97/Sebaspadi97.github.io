// Secciones de un caso de estudio: cada "## Título" del Markdown es una sección.
// Los títulos de la plantilla se reconocen para darles su dirección (#datos, #decision…)
// y su nombre corto en el índice; cualquier otro título también funciona.

const norm = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export const slugify = (s) =>
  norm(s)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const KNOWN = [
  { id: 'pregunta', test: /pregunta|question/, es: 'Pregunta', en: 'Question' },
  { id: 'decision', test: /decisi/, es: 'Decisión', en: 'Decision' },
  { id: 'hallazgos', test: /hallazgo|finding/, es: 'Hallazgos', en: 'Findings' },
  { id: 'enfoque', test: /enfoque|approach|metodo|method/, es: 'Enfoque', en: 'Approach' },
  { id: 'limitaciones', test: /limitacion|limitation/, es: 'Limitaciones', en: 'Limitations' },
  { id: 'equipo', test: /equipo|team/, es: 'Equipo', en: 'Team' },
  { id: 'datos', test: /\bdatos\b|\bdata\b/, es: 'Datos', en: 'Data' },
];

/** { id, short } para el título de una sección. */
export function sectionInfo(title, lang = 'es') {
  const n = norm(title);
  const k = KNOWN.find((x) => x.test.test(n));
  return k ? { id: k.id, short: k[lang] || k.es } : { id: slugify(title) || 'seccion', short: title };
}

/** Índice del caso a partir del Markdown: [{ id, short, title }]. */
export function sectionsOf(markdown, lang = 'es') {
  const seen = new Set();
  return [...String(markdown).matchAll(/^##\s+(.+?)\s*#*\s*$/gm)].map((m) => {
    const info = sectionInfo(m[1], lang);
    let id = info.id;
    for (let i = 2; seen.has(id); i++) id = `${info.id}-${i}`;
    seen.add(id);
    return { ...info, id, title: m[1] };
  });
}
