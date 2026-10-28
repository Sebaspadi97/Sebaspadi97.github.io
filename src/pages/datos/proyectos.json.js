// Lista pública de proyectos y artículos en JSON (/datos/proyectos.json).
// La usa el generador del CV y sirve para revisar de un vistazo qué está publicado.
import { cases, posts, pillars, categories } from '../../lib/contenido.js';
import { routes } from '../../i18n/index.js';

export function GET({ site }) {
  const abs = (p) => (p ? new URL(p, site).href : null);
  const data = {
    proyectos: cases.map((c) => ({
      url: c.key,
      pilar: c.pillar,
      pilarNombre: pillars[c.pillar],
      herramientas: c.tools,
      repo: c.repo,
      equipo: c.team,
      portada: abs(c.thumb),
      es: { titulo: c.es.title, pregunta: c.es.question, hallazgo: c.es.finding, lineaEquipo: c.es.teamLine, enlace: abs(routes[c.key].es) },
      en: c.enCard ? { titulo: c.enCard.title, pregunta: c.enCard.question, hallazgo: c.enCard.finding, lineaEquipo: c.en?.teamLine, enlace: abs(routes[c.key].en) } : null,
    })),
    lab: posts.map((p) => ({ url: p.key, categoria: categories[p.category].label, titulo: p.title, bajada: p.sub, fecha: p.date, enlace: abs(routes[p.key].es) })),
  };
  return new Response(JSON.stringify(data, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
