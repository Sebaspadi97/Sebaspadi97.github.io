// Colecciones de contenido: cada proyecto y cada artículo es un archivo Markdown
// (datos arriba entre ---, texto abajo). Si a un archivo le falta un dato obligatorio,
// la compilación se detiene y dice cuál, así nunca se publica una página rota.
//
//   src/content/proyectos/es/<url>.md   proyecto en español (el nombre del archivo es la dirección)
//   src/content/proyectos/en/<url>.md   versión en inglés (opcional; "es:" dice de qué proyecto es)
//   src/content/lab/<url>.md            artículo del Lab
//   src/content/datos-curiosos.json     franja dorada del Lab (se lee en src/lib/contenido.js)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const proyecto = z.object({
  titulo: z.string(),
  pregunta: z.string(),
  hallazgo: z.string(),
  descripcion: z.string(),
  pilar: z.enum(['data', 'ml', 'mi']),
  herramientas: z.array(z.string()).min(1),
  fecha: z.string(),
  repo: z.string().url(),
  portada: z.string(),
  destacado: z.boolean().default(false),
  orden: z.number().default(99),
  publicar: z.boolean().default(true),
  etiquetaDatos: z.string().optional(),
  lineaEquipo: z.string().optional(),
  simulador: z.boolean().default(false),
  ficha: z.array(z.object({ dato: z.string(), valor: z.string() })).default([]),
  sobreLosDatos: z.string(),
  // Título, pregunta y hallazgo en inglés para tarjetas y CV, si el caso aún no tiene versión completa en inglés.
  ingles: z.object({ titulo: z.string(), pregunta: z.string(), hallazgo: z.string() }).optional(),
  licencia: z.string(),
  // Lo llena la sincronización cuando el proyecto viene de su propio repositorio.
  origen: z.string().optional(),
});

const articulo = z.object({
  titulo: z.string(),
  categoria: z.enum(['analisis', 'curioso', 'experimento', 'nota']),
  destacado: z.boolean().default(false),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha va como AAAA-MM-DD').optional(),
  minutos: z.number().int().positive(),
  bajada: z.string(),
  portada: z.object({
    imagen: z.string().optional(),
    alt: z.string().optional(),
    pie: z.string().optional(),
    cifra: z.string().optional(),
    texto: z.string().optional(),
    fuente: z.string().optional(),
  }),
  resumen: z.array(z.string()).optional(),
  dato: z.object({ cifra: z.string(), texto: z.string(), fuente: z.string().optional() }).optional(),
  decision: z.string(),
  preguntaAlLector: z.string().optional(),
  fuentes: z.array(z.string()).default([]),
  repo: z.object({ url: z.string().url(), nota: z.string().optional() }).optional(),
  casoRelacionado: z.string().optional(),
  publicar: z.boolean().default(true),
});

export const collections = {
  proyectos: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/proyectos/es' }), schema: proyecto }),
  projects: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/proyectos/en' }), schema: proyecto.extend({ es: z.string() }) }),
  lab: defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/lab' }), schema: articulo }),
};
