# Sebas Padilla Lab — sitio web

**De los datos a las decisiones.**

Código del sitio de Sebas Padilla Lab (SP Lab): casos de Data, Machine Learning y Market Intelligence contados desde la pregunta de negocio hasta la decisión.

- Sitio: https://sebaspadi97.github.io (dominio propio pendiente: sebaspadillalab.com)
- Construido con [Astro](https://astro.build) como sitio estático y publicado con GitHub Pages.
- Rutas en español (`/es/`) e inglés (`/en/`).

## Estructura

| Carpeta | Qué contiene |
|---|---|
| `src/pages/` | Páginas: `/es/`, `/en/`, `404` y rutas temporales "en construcción" |
| `src/components/` | Menú, pie, Inicio, figura de puntos SP |
| `src/data/` | Textos de las páginas, datos generales y lista de páginas pendientes |
| `src/i18n/` | Rutas por idioma y textos comunes |
| `src/styles/global.css` | Paleta, tipografía y botones de la marca |
| `.github/workflows/deploy.yml` | Compila y publica en GitHub Pages en cada envío a `main` |

## Correr en local

Requiere Node.js 20.3 o superior.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Licencia

© 2026 Sebastián Padilla Castaño. Todos los derechos reservados. Ver [LICENSE](LICENSE) y los Términos de uso del sitio.

---

### English summary

Source code for the Sebas Padilla Lab website (*From data to decisions*), a static Astro site published on GitHub Pages with Spanish (`/es/`) and English (`/en/`) routes. All rights reserved; see LICENSE.
