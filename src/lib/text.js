// Utilidades de texto para los contenidos escritos en src/data.

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Convierte **negrita** y *cursiva* en HTML, escapando todo lo demás. */
export function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
}

/** Quita las marcas de formato (para contar palabras o usar en metadatos). */
export function plain(s) {
  return String(s).replace(/\*+/g, '');
}

/** Minutos de lectura aproximados (200 palabras por minuto). */
export function readingMinutes(texts) {
  const words = texts.join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
