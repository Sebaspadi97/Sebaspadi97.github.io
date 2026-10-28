# Sebas Padilla Lab — sitio web

**De los datos a las decisiones.**

Código del sitio de Sebas Padilla Lab (SP Lab): casos de Data, Machine Learning y Market Intelligence contados desde la pregunta de negocio hasta la decisión.

- Sitio: https://sebaspadi97.github.io (dominio propio pendiente: sebaspadillalab.com)
- Construido con [Astro](https://astro.build) como sitio estático y publicado con GitHub Pages.
- Rutas en español (`/es/`) e inglés (`/en/`).

## Estructura

| Carpeta | Qué contiene |
|---|---|
| `src/content/proyectos/es/`, `en/` | Un archivo Markdown por proyecto (español e inglés) |
| `src/content/lab/` | Un archivo Markdown por artículo del Lab |
| `src/content/datos-curiosos.json` | Franja de datos curiosos del Lab |
| `src/data/` | Textos de Inicio, Sobre mí, páginas legales y datos generales |
| `src/components/`, `src/pages/`, `src/layouts/` | Plantillas y páginas (Inicio con `LiveSample` y `MethodScrolly`) |
| `src/lib/` | Lectura del contenido, complementos del Markdown, imágenes |
| `public/img/` | Imágenes (`casos/` a mano, `proyectos/` traídas por la sincronización) |
| `plantillas/proyecto/` | Estructura estándar para el repositorio de un proyecto nuevo |
| `reviews/` | Auditorías del sitio |
| `DISENO.md`, `CONTENIDO.md` | Sistema de diseño y guía de contenido |
| `.pages.yml` | Configuración del editor web (Pages CMS) |

## Diseño y desarrollo

Ver **[DISENO.md](DISENO.md)**: identidad, paleta, lenguaje visual A + C, estructura del código,
cómo agregar páginas y cómo probar antes de publicar. Las dependencias tienen versiones fijas
(`package-lock.json`); los flujos instalan con `npm ci`.

## Actualizar el contenido

Ver **[CONTENIDO.md](CONTENIDO.md)**: editor web (Pages CMS), edición en GitHub y publicación
automática de proyectos desde su propio repositorio.

## Flujos de GitHub Actions

| Flujo | Cuándo corre | Qué hace |
|---|---|---|
| Publicar en GitHub Pages (`deploy.yml`) | Cada cambio en `main` | Compila y publica |
| Sincronizar proyectos (`sincronizar-proyectos.yml`) | Cada día 6:17 a. m., a mano o por aviso | Trae proyectos con el tema `sp-lab` |
| Prueba de compilación (`prueba.yml`) | Cambios en otras ramas | Compila sin publicar y prueba la sincronización |
| Revisión de calidad (`qa.yml`) | Después de cada publicación, a mano o envío a la rama `qa` | axe, Lighthouse y capturas; reportes en `qa-reports` |
