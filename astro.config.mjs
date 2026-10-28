// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkBloques, rehypeContenido } from './src/lib/markdown-plugins.mjs';

// Cuando se conecte el dominio (Fase 6), cambiar `site` a https://sebaspadillalab.com
export default defineConfig({
  site: 'https://sebaspadi97.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Markdown de proyectos y artículos (ver src/lib/markdown-plugins.mjs)
  markdown: {
    remarkPlugins: [remarkBloques],
    rehypePlugins: [rehypeContenido],
  },
  build: {
    format: 'directory',
    // CSS en línea: evita una petición que bloquea el primer pintado.
    inlineStylesheets: 'always',
  },
});
