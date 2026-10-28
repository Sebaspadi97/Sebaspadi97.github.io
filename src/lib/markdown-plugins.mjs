// Complementos del Markdown del sitio (sin dependencias externas).
//
// Lo que se puede escribir en un caso o artículo, además del Markdown normal:
//   > Frase                      → frase destacada (al inicio de una sección)
//   ![texto alternativo](/img/… "Pie de figura")   → figura con pie, adaptable
//   ```cifras                     → fila de cifras grandes, una por línea: "20.000 | clientes"
//   ```simulador                  → lugar del simulador interactivo (caso de abandono)
//   | tablas |                    → tabla con desplazamiento en móvil
// En los casos (archivos con "pilar"), cada "## Título" se vuelve una sección numerada
// del índice; la de la decisión se pinta en fondo oscuro.
import { dims, srcset } from './img.js';
import { sectionsOf, sectionInfo } from './secciones.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const SIM_SLOT = '<div data-sim-slot></div>';
export const SIM_SLOT_RE = /<div data-sim-slot(?:="")?><\/div>/;

// ---------- remark: bloques de código especiales ----------
export function remarkBloques() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((c) => {
        if (c.type === 'code' && c.lang === 'cifras') {
          const items = String(c.value)
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean)
            .map((l) => {
              const [n, ...label] = l.split('|');
              return `<div><dt>${esc(label.join('|').trim())}</dt><dd>${esc(n.trim())}</dd></div>`;
            });
          return { type: 'html', value: `<dl class="b-stats">${items.join('')}</dl>` };
        }
        if (c.type === 'code' && c.lang === 'simulador') return { type: 'html', value: SIM_SLOT };
        walk(c);
        return c;
      });
    };
    walk(tree);
  };
}

// ---------- rehype: figuras, tablas, frases destacadas y secciones ----------
const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));
const isWs = (n) => n.type === 'text' && !n.value.trim();
const cls = (n, c) => {
  n.properties = n.properties || {};
  const cur = n.properties.className || [];
  n.properties.className = [...(Array.isArray(cur) ? cur : [cur]), c];
};

function figure(p) {
  const imgs = (p.children || []).filter((c) => !isWs(c));
  if (imgs.length !== 1 || imgs[0].tagName !== 'img') return null;
  const img = imgs[0];
  const src = img.properties.src;
  const caption = img.properties.title;
  const [w, h] = dims(src);
  const props = { src, alt: img.properties.alt || '', loading: 'lazy', decoding: 'async', width: w, height: h };
  const set = srcset(src);
  if (set) Object.assign(props, { srcSet: set, sizes: '(max-width: 900px) calc(100vw - 32px), 820px' });
  const kids = [el('a', { href: src, className: ['b-fig-link'] }, [el('img', props)])];
  if (caption) kids.push(el('figcaption', {}, [{ type: 'text', value: caption }]));
  return el('figure', { className: ['b-fig'] }, kids);
}

function table(t) {
  const firstTh = (function find(n) {
    if (n.tagName === 'th') return text(n);
    for (const c of n.children || []) {
      const r = find(c);
      if (r) return r;
    }
    return '';
  })(t);
  const walk = (n, inBody) => {
    (n.children || []).forEach((c) => {
      if (c.type !== 'element') return;
      if (c.tagName === 'th') c.properties.scope = 'col';
      if (c.tagName === 'tr' && inBody) {
        const first = c.children.find((x) => x.type === 'element');
        if (first && first.tagName === 'td') {
          first.tagName = 'th';
          first.properties.scope = 'row';
        }
      }
      walk(c, inBody || c.tagName === 'tbody');
    });
  };
  walk(t, false);
  return el('div', { className: ['b-table'], tabIndex: 0, role: 'region', ariaLabel: firstTh || 'Tabla' }, [t]);
}

function transform(children, { leadClass = 'b-lead' } = {}) {
  let first = true;
  return children.map((c) => {
    if (c.type !== 'element') return c;
    if (c.tagName === 'p') {
      const f = figure(c);
      if (f) return f;
    }
    if (c.tagName === 'table') return table(c);
    if (c.tagName === 'ul' || c.tagName === 'ol') cls(c, 'b-list');
    if (c.tagName === 'blockquote') {
      const ps = c.children.filter((x) => !isWs(x));
      if (ps.length === 1 && ps[0].tagName === 'p') {
        cls(ps[0], first ? leadClass : 'b-lead');
        first = false;
        return ps[0];
      }
    }
    first = false;
    return c;
  });
}

export function rehypeContenido() {
  return (tree, file) => {
    const fm = file?.data?.astro?.frontmatter || {};
    const path = String(file?.path || file?.history?.[0] || '').replace(/\\/g, '/');
    const isCase = typeof fm.pilar === 'string' || path.includes('/content/proyectos/');
    if (!isCase) {
      tree.children = transform(tree.children);
      return;
    }
    // Caso: agrupa por "## Título"
    const lang = typeof fm.es === 'string' || path.includes('/proyectos/en/') ? 'en' : 'es';
    const out = [];
    let sec = null;
    let n = 0;
    const seen = new Set();
    const close = () => {
      if (!sec) return;
      const isDecision = sec.id === 'decision';
      const body = transform(sec.kids, { leadClass: isDecision ? 'decision-lead' : 'b-lead' });
      sec.node.children.push(el('div', { className: ['blocks', isDecision ? 'blocks--dark' : 'blocks--light'] }, body));
      out.push(sec.node);
      sec = null;
    };
    for (const c of tree.children) {
      if (c.type === 'element' && c.tagName === 'h2') {
        close();
        n += 1;
        const info = sectionInfo(text(c), lang);
        let id = info.id;
        for (let i = 2; seen.has(id); i++) id = `${info.id}-${i}`;
        seen.add(id);
        const isDecision = id === 'decision';
        c.properties = { id: `h-${id}` };
        const num = el('span', { className: ['sec-n', ...(isDecision ? ['sec-n--gold'] : [])] }, [{ type: 'text', value: String(n).padStart(2, '0') }]);
        sec = { id, kids: [], node: el('section', { id, className: ['sec', ...(isDecision ? ['sec--decision'] : [])], ariaLabelledby: `h-${id}` }, [num, c]) };
        continue;
      }
      if (sec) sec.kids.push(c);
      else if (!isWs(c)) out.push(...transform([c]));
    }
    close();
    tree.children = out;
  };
}

export { sectionsOf };
