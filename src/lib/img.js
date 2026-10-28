// Imágenes adaptables. Lee el ancho y alto directo del archivo en public/ (WebP, PNG o JPG),
// así cualquier imagen nueva que se suba funciona sin registrar sus medidas a mano.
// Si existe una versión "-700" junto a la original, se ofrece en srcset.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const cache = new Map();
const pub = (src) => join(process.cwd(), 'public', decodeURI(src.split('?')[0]));

function readDims(buf) {
  // PNG
  if (buf.readUInt32BE(0) === 0x89504e47) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  // WebP
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16);
    if (kind === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
    if (kind === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
    }
    if (kind === 'VP8X') return [buf.readUIntLE(24, 3) + 1, buf.readUIntLE(27, 3) + 1];
  }
  // JPEG: busca el marcador SOF
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      i += 2 + len;
    }
  }
  return null;
}

/** [ancho, alto] de una imagen de public/ (por ejemplo "/img/casos/x.webp"). */
export function dims(src) {
  if (!src || !src.startsWith('/')) return [1400, 933];
  if (!cache.has(src)) {
    let d = null;
    try {
      d = readDims(readFileSync(pub(src)));
    } catch {}
    cache.set(src, d || [1400, 933]);
  }
  return cache.get(src);
}

/** srcset con la versión de 700 px (si existe) y la original. */
export function srcset(src) {
  if (!src || !src.startsWith('/')) return undefined;
  const small = src.replace(/\.(webp|png|jpe?g)$/i, '-700.$1');
  if (small === src || !existsSync(pub(small))) return undefined;
  return `${small} 700w, ${src} ${dims(src)[0]}w`;
}
