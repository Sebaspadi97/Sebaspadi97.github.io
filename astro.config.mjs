// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cuando se conecte el dominio (Fase 6), cambiar `site` a https://sebaspadillalab.com
export default defineConfig({
  site: 'https://sebaspadi97.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
