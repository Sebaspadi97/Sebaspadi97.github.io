# Sistema de diseño y guía técnica · Sebas Padilla Lab

Referencia para ajustar el sitio, agregar páginas o funciones sin romper la identidad.
Rediseño vigente: **A + C** (cuaderno de laboratorio + historia guiada por el scroll), 28 oct 2026.
Para agregar o editar proyectos y artículos ver [CONTENIDO.md](CONTENIDO.md).

## 1. Identidad (no cambia)

- **Marca:** Sebas Padilla Lab (corto: SP Lab). Eslogan: *De los datos a las decisiones.* / *From data to decisions.*
- **Pilares:** Data · Machine Learning · Market Intelligence. **Público:** reclutadores y clientes potenciales.
- **Tono:** claro, basado en evidencia, orientado al negocio, curioso. Frases cortas, voz activa, "tú" en español,
  "I" en inglés (EE. UU.), cifras con su fuente. Sin promesas de impacto real cuando los datos son sintéticos.
- **Logo:** monograma SP + "SEBAS / PADILLA / LAB". Archivos en `public/brand/` (horizontal, negativo, isotipo).
- **Tipografía:** Montserrat 600/700/800 (títulos, etiquetas, botones) + Open Sans 400/600 (texto), alojadas con @fontsource.
- **Motivo gráfico:** puntos verdes + **un punto dorado = la decisión**.

### Paleta (tokens en `src/styles/global.css`)

| Token | Color | Uso |
| --- | --- | --- |
| `--green` | #245B45 | Principal: botones, enlaces, títulos de acento |
| `--green-deep` | #183D32 | Títulos, fondos oscuros, decisión |
| `--green-night` | #11291F | Zonas de evidencia, "El método", pie |
| `--green-logo` | #2F8665 | Líneas sobre oscuro |
| `--white` | #F8FAF7 | Fondo de página |
| `--paper` | #FFFFFF | Tarjetas y superficies |
| `--gray-light` | #E7EBE7 | Bordes y divisores |
| `--line` | #C9D2CB | Bordes de formularios y figuras |
| `--slate` | #66736C | Texto secundario |
| `--carbon` | #202824 | Texto principal |
| `--on-dark` / `--on-dark-muted` | #CFD8D2 / #A9B5AE | Texto sobre oscuro |
| `--mint` / `--mint-strong` | #8CCFAD / #A3DABE | Acento sobre oscuro (`--mint-strong` para texto sobre #245B45) |
| `--teal` / `--teal-text` | #3E9B91 / #2F7A73 | Serie secundaria / texto sobre claro |
| `--gold` / `--gold-text` | #D6A64F / #8A6420 | Hallazgos y decisión (≈15 %); `--gold-text` para texto sobre claro |
| `--error` | #A3332D | Errores de formulario |

Reglas: nada de colores escritos a mano en componentes (usar tokens); neutros y verdes ≈85 %, acentos ≈15 %;
contraste mínimo 4,5:1 en texto (3:1 en texto grande); el dorado no va como texto pequeño sobre verde.

## 2. Lenguaje visual A + C

- **Papel milimetrado** (`.paper-grid`) en encabezados de página (`.band.paper-grid`), Inicio y Lab.
- **Etiquetas de figura** (`.fig`, variantes `.fig--dark`, `.fig--ink`): "● FIG. 0X · SECCIÓN" con punto dorado.
  Numeradas solo donde hay secuencia real (Inicio: 00 muestra, 01 método, 02 proyectos, 03 manifiesto, 04 Lab).
- **Títulos:** `.sec-title` (secciones) y `.head-title` (encabezados de página) con una palabra subrayada en dorado
  (`.underline-gold` o `.mark` animado en Inicio).
- **Botones:** siempre en píldora (`.pill--primary | --outline | --dark | --mint | --ghost-dark`), con flecha `.arr` que avanza.
- **Hallazgo:** chip dorado `.finding`. **Chips de filtro:** `.chip` con `aria-pressed`.
- **Zonas oscuras** para evidencia (método, galería de proyectos, decisión del caso, pie); **banda dorada** para el dato curioso.
- **Tarjetas:** portada grande (16:10) con el gráfico real, hallazgo encima, elevación y zoom suave al pasar el cursor;
  enlace extendido (`.stretched`) cuando toda la tarjeta lleva a un sitio.

### Movimiento

- Solo `transform` y `opacity`; curva `--ease-out`; 200–700 ms.
- Aparición al hacer scroll: clase `.rv` (+ `style="--i:n"` para escalonar). Solo se activa en lo que está fuera de la
  primera pantalla; la página se ve completa sin JavaScript.
- Una sola sección fija en todo el sitio: "El método" (`MethodScrolly.astro`). No agregar más secciones fijas.
- Todo respeta `prefers-reduced-motion` (queda quieto en su estado final) y tiene respaldo sin JavaScript (SVG estático).
- Contadores: el número final siempre está en el HTML; la animación solo lo presenta.
- Nada que cambie la altura del menú al bajar (provoca saltos de diseño): el logo se reduce con `transform`.

## 3. Estructura del código

```
src/
  layouts/Base.astro          <head>, menú, aviso de idioma, pie y script de aparición (.rv)
  components/
    Header.astro              menú fijo, avance de lectura, menú móvil
    Footer.astro              eslogan grande + CTA, columnas, derechos (variante compacta en la 404)
    HomePage.astro            Inicio ES/EN (textos en src/data/home.js)
    LiveSample.astro          "Fig. 00 · Muestra en vivo" (lienzo + SVG de respaldo)
    MethodScrolly.astro       "El método" guiado por el scroll
    ChurnSimulator.astro      simulador del caso de abandono (variant card | full)
    CaseStudy.astro           plantilla de caso (contenido desde Markdown)
    AboutPage.astro, LegalPage.astro, LabCover.astro
  pages/                      /es/…, /en/…, 404, /datos/proyectos.json, RSS
  content/                    proyectos (es/en), lab, datos-curiosos.json  ← contenido editable
  content.config.mjs          esquema de cada proyecto y artículo (validación)
  data/                       home.js, about.js, legal.js, site.js (textos fijos y datos generales)
  i18n/index.js               rutas, link(), textos comunes ES/EN
  lib/
    contenido.js              lee las colecciones, registra rutas, pilares y categorías
    markdown-plugins.mjs      secciones numeradas, figuras, cifras, tablas, simulador
    secciones.js, img.js, text.js
  styles/global.css           tokens y piezas compartidas; contenido.css para Markdown
public/                       img/, brand/, cv/, data/ (datos del simulador)
plantillas/proyecto/          estructura estándar de un repositorio de proyecto
scripts/                      qa/, cv/, sync/, export/, simulador/
```

### Idiomas y rutas

- Español completo en `/es/`; inglés en Inicio, About y los casos con archivo en `src/content/proyectos/en/`.
- Usar siempre `link(clave, lang)`: si la página no existe en inglés lleva a la española con `?from=en`, que muestra el aviso.
- Páginas fijas: claves en `routes` de `src/i18n/index.js`. Proyectos y artículos se registran solos (clave = dirección en español).
- Toda página nueva necesita: `title` y `description` en `Base`, `pageKey` para hreflang, un solo `h1`.

## 4. Cómo agregar una página o función

1. Crear la página en `src/pages/es/<ruta>/index.astro` (y `/en/` si aplica) usando `Base`.
2. Registrar la clave en `routes` (y en `ui.*.nav` si va en el menú y en el pie).
3. Encabezado: `<div class="band paper-grid"><section class="container head">` con `.head-meta`, `.head-title`, `.head-sub`.
4. Secciones con `.fig` + `.sec-title`; colores solo con tokens; botones `.pill`; tarjetas con portada grande.
5. Textos en un archivo de `src/data/` (no sueltos en el marcado) para poder traducir y editar.
6. Interacción: script dentro del componente, un solo manejador de scroll con `requestAnimationFrame`, respetar movimiento reducido.
7. Probar (sección 6) y documentar la decisión en `estado-proyecto.md` del proyecto.

## 5. Reglas que no se rompen

- Sin dirección ni celular en el sitio ni en el CV: solo correo y LinkedIn.
- Nunca datos confidenciales del empleador; solo datos abiertos, sintéticos o resultados agregados con autorización.
- Accesibilidad: foco dorado visible, áreas táctiles ≥ 24 px (ideal 44), `aria-pressed` en filtros, `aria-live` en resultados,
  textos alternativos en gráficos, un `h1` por página.
- Rendimiento: imágenes WebP con versión `-700` y `srcset` (`src/lib/img.js`), fuentes precargadas, CSS en línea, CLS 0.
- No afirmar disponibilidad de dominios sin verificar.

## 6. Publicar y verificar

- **Publicar:** cada envío a `main` compila y publica (`deploy.yml`, `npm ci` con versiones fijas en `package-lock.json`).
- **Probar sin publicar:** enviar a cualquier otra rama → `prueba.yml` compila, prueba la sincronización y deja el sitio
  compilado en la rama `prueba-dist` para revisarlo con capturas.
- **Calidad:** corre sola después de cada publicación (o `git push -f origin main:qa`) → `qa.yml` corre axe, Lighthouse, desbordes y capturas; reportes en la rama
  `qa-reports` (`latest/summary.json`, `latest/screens/`). Meta: axe 0, Lighthouse 100 en las 8 páginas clave, CLS 0.
- **Sincronización de proyectos:** `sincronizar-proyectos.yml` (diaria 6:17 a. m., manual o por aviso).
- **CV:** `node scripts/cv/generate-cv.mjs` (toma los 4 primeros proyectos de `/datos/proyectos.json`).
- **Respaldo:** `node scripts/export/exportar-contenido.mjs <carpeta>` y copia en OneDrive › Sebas Padilla Lab.
