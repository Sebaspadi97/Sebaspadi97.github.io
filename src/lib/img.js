// Imágenes adaptables de los casos: cada gráfico tiene su versión de 1400 px y una de 700 px.
import sizes from '../data/image-sizes.json';

export const dims = (src) => sizes[src] || [1400, 933];

/** srcset con la versión de 700 px y la original. */
export function srcset(src) {
  if (!src || !src.startsWith('/img/casos/')) return undefined;
  const w = dims(src)[0];
  return `${src.replace('.webp', '-700.webp')} 700w, ${src} ${w}w`;
}
