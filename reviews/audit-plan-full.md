# Auditoría de espectro completo: sitio Sebas Padilla Lab (previa al rediseño)

**Fecha**: 28 de octubre de 2026
**Modo**: Salud general del repositorio (repo health), con foco en rediseño visual y de interacción
**Fuente**: rama `main` (commit a0b4bb6) y sitio publicado https://sebaspadi97.github.io
**Evidencia**: código fuente, capturas de página completa (escritorio 1440 px y móvil 390 px, 12 páginas) y el último reporte de calidad (axe + Lighthouse, 28-oct-2026)
**Lentes ejecutados**: 8/10
**Lentes omitidos**: Backend Engineer (no hay backend: sitio estático; el formulario usa Web3Forms) · DX Engineer (no es una herramienta para desarrolladores; sus usuarios son reclutadores y clientes)

**Restricción del rediseño**: no cambian colores, identidad (logo, tipografías, tono), contenido ni alcance (21 páginas, ES/EN).

---

## Veredicto maestro: APROBAR CON CAMBIOS

Técnicamente el sitio está sano: 0 violaciones de axe, Lighthouse 98–100 en las 8 páginas clave, sin desbordes, formularios con estados completos y movimiento reducido respetado. El problema es de **experiencia y forma**, no de calidad: las páginas son una pila de bandas a ancho completo con la misma estructura (título grande a la izquierda, vacío a la derecha), los proyectos no se *ven* en el listado, y no hay movimiento ni ritmo al hacer scroll. Además, los estilos viven dentro de cada página (chips, tarjetas y héroes duplicados con 22 breakpoints distintos), lo que hará el rediseño más costoso si no se consolida primero.

## Veredicto por lente

| # | Lente | Veredicto | Críticos | Recomendaciones |
|---|-------|-----------|----------|-----------------|
| 1 | Design Engineer | APROBAR CON CAMBIOS | 2 | 6 |
| 2 | UX Engineer | APROBAR CON CAMBIOS | 2 | 6 |
| 3 | Frontend Engineer | APROBAR | 0 | 4 |
| 4 | Backend Engineer | Omitido | — | — |
| 5 | Structural Engineer | APROBAR CON CAMBIOS | 1 | 3 |
| 6 | Repo Maintainer | APROBAR CON CAMBIOS | 1 | 4 |
| 7 | Production Readiness | APROBAR CON CAMBIOS | 1 | 3 |
| 8 | DX Engineer | Omitido | — | — |
| 9 | Performance Engineer | APROBAR | 0 | 3 |
| 10 | Accessibility Engineer | APROBAR | 0 | 4 |

## Todos los problemas críticos (deben resolverse en el rediseño)

| # | Problema | Lente(s) | Archivo(s) | Impacto | Solución |
|---|----------|----------|------------|---------|----------|
| C1 | Los héroes de Inicio, Proyectos y Contacto tienen la mitad derecha vacía o con una ilustración diminuta; no hay ancla visual ni prueba de trabajo en el primer pantallazo | Design, UX | `HomePage.astro`, `es/proyectos/index.astro`, `es/contacto/index.astro` | Un reclutador decide en 5–8 s si sigue; hoy ve solo texto | Héroe asimétrico con una pieza viva (los puntos de AnalyticsMotion o una vista previa real de un caso) ocupando la columna derecha |
| C2 | Las tarjetas de proyectos y del Lab no muestran el gráfico del caso a un tamaño legible (miniaturas de ~300 px con texto ilegible o tarjetas sin imagen) | Design, UX | `HomePage.astro`, `es/proyectos/index.astro`, `LabCover.astro` | El portafolio se *lee* pero no se *ve*; no hay gancho visual para hacer clic | Tarjetas con portada grande del gráfico principal recortado al hallazgo, cifra clave superpuesta y efecto de revelado |
| C3 | El simulador de abandono vive dentro de la tarjeta destacada del Inicio, comprimido; en móvil ocupa más de una pantalla antes del título del caso | UX | `HomePage.astro`, `ChurnSimulator.astro` | Interacción densa antes de saber de qué se trata; el título queda debajo | Título y hallazgo primero; simulador como "pruébalo" desplegable o sección propia con un solo control visible |
| C4 | Estilos de componentes repetidos página por página (`.chip` en 3 archivos, `.card` en 2, héroes en 2) y 22 puntos de quiebre distintos | Structural, Repo Maintainer, Design | `es/contacto`, `es/lab`, `es/proyectos`, `HomePage`, `AboutPage` | Cada cambio visual se hace 3 veces y diverge | Extraer primitivas (`Chip`, `Card`, `PageHero`, `SectionHead`, `Reveal`) y una escala de 3 breakpoints (640 / 900 / 1200) |
| C5 | Dependencias con rango `^` y sin archivo de bloqueo; el despliegue instala la última versión disponible | Production Readiness | `package.json`, `.github/workflows/deploy.yml` | Una versión nueva de Astro puede romper el sitio sin cambios en el código | Generar `package-lock.json` en una Action y usar `npm ci` |

## Preocupaciones transversales

| Preocupación | Señalada por | Causa raíz | Solución unificada |
|--------------|-------------|------------|--------------------|
| Monotonía estructural: todas las páginas son "banda de color + título grande + rejilla de 3" | Design, UX | No existe un sistema de secciones con variantes; cada página repite el mismo patrón | Biblioteca de secciones con variantes (héroe partido, bento, carrusel horizontal, línea de tiempo, banda de cifras) |
| Sin movimiento al hacer scroll; la única animación es AnalyticsMotion | Design, UX, Performance | No hay una utilidad de revelado | Un componente `Reveal` con IntersectionObserver + CSS (transform/opacity), respetando movimiento reducido; sin librerías |
| Color "suelto": 34 hex escritos a mano en páginas (incluido `#A3332D` para errores y `#C9D2CB` para bordes, fuera de la paleta declarada) | Design, Repo Maintainer | Tokens incompletos en `global.css` | Añadir `--error` y `--line` como tokens y reemplazar todos los hex por variables |
| Páginas-monolito de 290–415 líneas con marcado, estilos y scripts juntos | Structural, Repo Maintainer, Frontend | Las páginas crecieron sin extraer componentes | Partir en secciones/componentes al rediseñar cada página |

## Todas las recomendaciones

| # | Recomendación | Lente | Archivo(s) | Solución |
|---|---------------|-------|------------|----------|
| R1 | Menú fijo (sticky) que se compacta al bajar y muestra la sección activa | UX, Design | `Header.astro` | `position: sticky` + clase al pasar 80 px; fondo con desenfoque |
| R2 | Indicador de progreso de lectura en casos y artículos | UX | `CaseStudy.astro`, `lab/[post].astro` | Barra dorada de 3 px con `scroll-timeline` o JS ligero |
| R3 | Pie de página con navegación, CTA "Hablemos" y eslogan grande | UX, Design | `Footer.astro` | Pie de 3 columnas: marca + CTA, navegación, redes |
| R4 | "Servicios" no es accionable | UX | `HomePage.astro` | Cada servicio enlaza a un caso de ejemplo o a Contacto con el motivo preseleccionado |
| R5 | Cifras (Sobre mí, Lab) sin animación de conteo ni jerarquía | Design | `AboutPage.astro`, `es/lab/index.astro` | Contadores al entrar en pantalla (solo si no hay movimiento reducido) |
| R6 | El botón "Volver a los supuestos del caso" tiene bajo contraste visual (borde tenue) | Design | `ChurnSimulator.astro` | Variante `pill--outline` estándar |
| R7 | Trayectoria (Sobre mí) en lista plana; buena candidata a línea de tiempo visual | Design | `AboutPage.astro` | Línea vertical con nodos que se encienden al hacer scroll |
| R8 | Casos largos: el índice lateral no indica en qué sección vas | UX | `CaseStudy.astro` | Resaltar el ítem activo del índice (scrollspy) |
| R9 | El simulador recalcula y reordena 5.000 clientes en cada evento `input` | Frontend, Performance | `ChurnSimulator.astro` | Agrupar en `requestAnimationFrame` (hoy ~1 ms: no urgente) |
| R10 | Página `/es/` con CLS 0,067 (único 98 en rendimiento) | Performance | `HomePage.astro`, `AnalyticsMotion.astro` | Reservar alto fijo del lienzo de la animación |
| R11 | README desactualizado (menciona páginas "en construcción" y la "figura de puntos SP") | Repo Maintainer | `README.md` | Actualizar estructura y comandos de QA |
| R12 | Enlace "Avísame" de la 404 mide 58×20 px | A11y | `404.astro` | Padding vertical para llegar a 24 px mínimo (ideal 44 px) |
| R13 | El menú móvil no devuelve el foco ni lo atrapa al abrir; Escape sí funciona | A11y | `Header.astro` | Mover foco al primer enlace al abrir; cerrar al salir con Tab |
| R14 | Al agregar animaciones nuevas, mantener la regla actual: solo `transform`/`opacity`, ≤ 600 ms para revelados, y todo desactivado con `prefers-reduced-motion` | A11y, Performance | global | Centralizar en `Reveal` y en tokens `--ease-out`, `--dur-*` |
| R15 | Monitoreo: no hay alerta si el formulario de Web3Forms empieza a fallar | Production Readiness | `es/contacto/index.astro` | Revisión mensual en el panel de Web3Forms; el mensaje de error ya ofrece el correo como respaldo |
| R16 | El flujo de QA solo corre a mano | Production Readiness | `.github/workflows/qa.yml` | Ejecutarlo también tras cada despliegue (`workflow_run`) |

---

# Reportes por lente

---

## 1. Design Engineer

**Veredicto**: APROBAR CON CAMBIOS

**Resumen**: sitio coherente con la marca (tipografía, verde profundo, acento dorado) pero visualmente plano: jerarquía correcta dentro de cada sección y poca jerarquía *entre* secciones.

### Archivos revisados
| Archivo | Rol visual | Riesgo |
|---|---|---|
| `src/styles/global.css` | Tokens, botones, chips, foco | Bajo |
| `src/components/HomePage.astro` | Héroe, método, proyectos, dato curioso, servicios, Lab | Alto |
| `src/components/AnalyticsMotion.astro` | Única animación del sitio | Bajo |
| `src/components/ChurnSimulator.astro` | Simulador (tarjeta y completo) | Medio |
| `src/pages/es/proyectos/index.astro` | Listado de casos | Alto |
| `src/pages/es/lab/index.astro` | Cuaderno del Lab | Medio |
| `src/components/AboutPage.astro` | Sobre mí | Medio |
| `src/pages/es/contacto/index.astro` | Contacto | Medio |
| `src/components/Header.astro`, `Footer.astro` | Marco | Medio |

### Problemas críticos
| # | Problema | Archivo(s) | Impacto | Solución |
|---|---|---|---|---|
| D1 | Héroes con columna derecha vacía o ilustraciones de ~140 px (Inicio, Proyectos, Lab, Contacto) | Héroes de cada página | El primer pantallazo no muestra trabajo ni personalidad | Composición asimétrica 7/5 con pieza visual viva a la derecha |
| D2 | Portadas de casos y del Lab a tamaño ilegible; tarjetas secundarias del Inicio sin imagen y con mucho espacio vacío | `HomePage.astro`, `proyectos/index.astro`, `LabCover.astro` | El portafolio no "se ve" | Portadas grandes (relación 16:10), recorte del gráfico al hallazgo, cifra superpuesta |

### Recomendaciones
| # | Problema | Archivo(s) | Por qué | Solución |
|---|---|---|---|---|
| D3 | Ritmo vertical uniforme: todas las secciones con el mismo padding y el mismo esquema | Todas | Fatiga visual; nada destaca | Alternar densidades: secciones a sangre, rejillas bento, bandas cortas de cifras |
| D4 | Sin movimiento de entrada | Todas | Sitio "estático" frente a la promesa de laboratorio | Revelados escalonados (stagger 60–80 ms), conteo de cifras, dibujo de líneas en gráficos SVG |
| D5 | Hex fuera de tokens (`#A3332D`, `#C9D2CB` y repetición de la paleta) | contacto, lab, proyectos | Fragmenta el sistema | Tokens `--error`, `--line`; reemplazar todos |
| D6 | Pie de página pobre | `Footer.astro` | Cierre débil; ningún CTA final | Pie con eslogan gigante, CTA y navegación |
| D7 | Botón de reinicio del simulador casi invisible | `ChurnSimulator.astro` | Estado de acción poco claro | Variante estándar de botón contorno |
| D8 | Estados hover limitados a cambio de color en tarjetas del listado | proyectos, lab | Poco feedback | Elevación + zoom sutil de portada (scale 1.03) + flecha que se desplaza |

### Cumplimiento del sistema de diseño
La paleta se respeta en lo visible, pero no en el código: 34 valores hex escritos a mano. Los radios (20/12) y los botones pill son consistentes. Tipografía consistente (Montserrat 600–800, Open Sans 400/600). No hay modo oscuro; no es requisito de marca, por lo que se marca N/A.

### Cobertura de estados visuales
| Componente | Hover | Focus | Active | Disabled | Carga | Vacío | Error | Modo oscuro |
|---|---|---|---|---|---|---|---|---|
| Botones pill | Sí | Sí (dorado) | Parcial | N/A | Sí (formulario) | N/A | N/A | N/A |
| Tarjetas de proyecto | Parcial | Sí | No | N/A | N/A | N/A | N/A | N/A |
| Chips de filtro (Lab, Proyectos) | Sí | Sí | Sí (aria-pressed) | N/A | N/A | Sí | N/A | N/A |
| Simulador | Sí | Sí | Sí | N/A | Sí | N/A | Sí | N/A |
| Formulario de contacto | Sí | Sí | Sí | Sí (enviando) | Sí | N/A | Sí | N/A |
| Menú móvil | Sí | Sí | Sí | N/A | N/A | N/A | N/A | N/A |

### Detalle del veredicto
- Fidelidad a tokens: CONCERNS (hex sueltos)
- Cobertura de estados: PASS
- Paridad modo oscuro: N/A
- Calidad de animación: PASS en lo existente; CONCERNS por ausencia de movimiento
- Consistencia visual: CONCERNS (patrón repetido sin variación)

---

## 2. UX Engineer

**Veredicto**: APROBAR CON CAMBIOS

**Resumen**: los recorridos funcionan y no hay callejones sin salida; el problema es el tiempo hasta el valor (time-to-proof) y la orientación en páginas largas.

### Mapa del recorrido del usuario
**Reclutador (público principal)**
1. Llega a `/es/` desde LinkedIn → OK (redirige por idioma)
2. Lee el héroe → WARN (solo texto; ninguna prueba de trabajo visible)
3. Baja al método → OK (animación clara)
4. Llega a proyectos → WARN (simulador antes del título; tarjetas secundarias sin imagen)
5. Entra a un caso → OK (índice lateral, ficha técnica)
6. Lee el caso largo → WARN (sin progreso ni sección activa)
7. Quiere contactar → WARN (menú no fijo: debe volver arriba o llegar al pie, que no tiene CTA)
8. Descarga el CV → OK (en héroe y en Sobre mí)

**Cliente potencial**
1. Llega a Inicio → OK
2. Busca "qué puede hacer por mí" → WARN (Servicios es una lista no accionable)
3. Contacto → OK (perfiles de visitante, motivo preseleccionable, validación y confirmación)
4. Envía → OK (estado "Enviando…", confirmación con foco, error con correo alternativo)

### Problemas críticos
| # | Problema | Paso | Impacto | Solución |
|---|---|---|---|---|
| U1 | Sin prueba de trabajo en el primer pantallazo | Reclutador 2 | Rebote antes de ver proyectos | Mostrar 1 caso/hallazgo o la pieza visual en el héroe y un CTA directo |
| U2 | Simulador comprimido antes del título del caso destacado | Reclutador 4 | Carga cognitiva alta; en móvil la interacción tapa el contexto | Contexto primero (pregunta → hallazgo), simulador después o desplegable |

### Recomendaciones
| # | Problema | Impacto | Solución |
|---|---|---|---|
| U3 | Menú no fijo | Más pasos para contactar | Menú sticky compacto con "Hablemos" siempre visible |
| U4 | Sin progreso ni scrollspy en casos y artículos | Desorientación en páginas de 3–7 pantallas | Barra de progreso y sección activa en el índice |
| U5 | Servicios no accionables | Cliente no sabe el siguiente paso | Cada servicio con enlace a caso o a Contacto con motivo |
| U6 | Pie sin CTA ni navegación | Fin de página sin salida | Pie con CTA final |
| U7 | Proyectos sin indicar formato del caso (tiempo de lectura, si tiene simulador) | Expectativa incierta | Metadatos visibles en tarjeta: minutos, "interactivo" |
| U8 | En móvil, botones del héroe apilados al 50 % de ancho | Inconsistencia táctil | Botones a ancho completo |

### Consistencia de interacción
Los patrones son consistentes (pills para acciones, chips con `aria-pressed` para filtros, flecha "→" para enlaces). Desviación: el Inicio usa tarjeta `<article>` con varios enlaces internos, mientras que en Proyectos toda la tarjeta es un enlace; conviene unificar (tarjeta completa clicable con enlace principal y área de clic extendida).

### Detalle del veredicto
- Descubribilidad: CONCERNS (trabajo poco visible arriba)
- Completitud de flujos: PASS
- Recuperación de errores: PASS (formulario y simulador)
- Feedback y estado: PASS
- Consistencia: CONCERNS menores

---

## 3. Frontend Engineer

**Veredicto**: APROBAR

**Resumen**: Astro estático con islas de JavaScript sin framework. No aplica React/Zustand; se evaluó el equivalente: scripts por componente, tipado, limpieza y peso.

### Archivos revisados
| Archivo | Rol | Riesgo |
|---|---|---|
| `ChurnSimulator.astro` | Script TS tipado, caché de datos, cálculo y SVG | Bajo |
| `AnalyticsMotion.astro` | Temporizador, IntersectionObserver, visibilidad | Bajo |
| `Header.astro` | Menú móvil | Bajo |
| `es/contacto/index.astro` | Validación y envío | Bajo |
| `es/lab/index.astro`, `es/proyectos/index.astro` | Filtros | Bajo |

### Problemas críticos
Ninguno.

### Recomendaciones
| # | Problema | Archivo(s) | Por qué | Solución |
|---|---|---|---|---|
| F1 | Cálculo + ordenamiento en cada `input` del slider | `ChurnSimulator.astro` | Hoy es barato; con más datos no | Agrupar con `requestAnimationFrame` |
| F2 | Scripts de página en JS sin tipos (Header, filtros, contacto) mientras el simulador usa TS | varios | Inconsistencia | Usar `<script>` TS en todos (Astro lo compila) |
| F3 | Lógica de filtros duplicada entre Lab y Proyectos | lab, proyectos | Duplicación | Utilidad compartida `src/lib/filters.ts` |
| F4 | Al añadir revelados, no crear un observer por elemento | futuro `Reveal` | Coste innecesario | Un único IntersectionObserver compartido |

### Análisis de la ruta de render
No hay re-renderizado: HTML estático. El único trabajo de cliente es: (a) el ciclo de AnalyticsMotion (un `setTimeout` cada 3,4 s, pausado fuera de pantalla y con pestaña oculta), (b) el recálculo del simulador por evento, (c) el envío del formulario. No hay trabajo en scroll.

### Seguridad de tipos
Datos en `src/data/*.js` sin tipos ni validación; un campo faltante falla en compilación solo si se usa. Recomendable migrar a colecciones de contenido de Astro con esquema (Zod) cuando se agreguen casos.

### Detalle del veredicto
- Arquitectura de componentes: PASS
- Gestión de estado: PASS
- Seguridad de tipos: CONCERNS menores
- Rendimiento de render: PASS
- Impacto en el paquete: PASS (~106–206 KiB por página)

---

## 4. Backend Engineer

**Omitido** — sitio estático sin servidor propio; el formulario delega en Web3Forms.

---

## 5. Structural Engineer

**Veredicto**: APROBAR CON CAMBIOS

### Archivos revisados
| Archivo | Rol estructural | Capa | Riesgo |
|---|---|---|---|
| `src/data/*.js` | Contenido | Datos | Bajo |
| `src/i18n/index.js` | Rutas e idioma | Transversal | Bajo |
| `src/components/*Page.astro` | Plantillas de página | Presentación | Medio |
| `src/pages/es/{proyectos,lab,contacto}/index.astro` | Páginas con estilos y scripts propios | Presentación | Alto |

### Problemas críticos
| # | Problema | Archivos | Impacto | Solución |
|---|---|---|---|---|
| S1 | No existe capa de primitivas visuales: chips, tarjetas, héroes y encabezados de sección se redefinen por página | contacto, lab, proyectos, HomePage, AboutPage | Un cambio de diseño se propaga a 3–5 archivos | Carpeta `src/components/ui/` con primitivas y estilos únicos |

### Recomendaciones
| # | Problema | Por qué | Solución |
|---|---|---|---|
| S2 | Algunas páginas (Proyectos, Lab, Contacto) no tienen componente de plantilla y solo existen en ES, mientras Inicio/Sobre mí sí | Patrón mixto | Mover cada página a `components/pages/` como el resto |
| S3 | HomePage de 415 líneas | Monolito | Partir en secciones (`HomeHero`, `HomeMethod`, `HomeProjects`, …) |
| S4 | 22 breakpoints ad hoc | Comportamiento responsivo impredecible | 3 breakpoints con nombre documentados en `global.css` |

### Mapa de dependencias
```
pages/es|en/*  ──►  components/*Page.astro  ──►  components/(Header, Footer, CaseBlocks, ChurnSimulator, AnalyticsMotion, LabCover)
      │                     │                              │
      └──────────► data/*.js ◄──────────┘                   └──► lib/(img, text)
      └──────────► i18n/index.js
pages/es/{proyectos,lab,contacto}  ──►  estilos y scripts propios  (⚠ sin capa ui/ compartida)
```
Sin ciclos. La dirección es correcta (páginas → componentes → datos/utilidades).

### Cruces de frontera
| Cruce | De → A | ¿Limpio? | Notas |
|---|---|---|---|
| Contenido | data → componentes | Sí | Textos fuera del marcado |
| Idioma | i18n → Header/Base | Sí | |
| Datos del simulador | public/data → ChurnSimulator (fetch) | Sí | Con error manejado |
| Formulario | contacto → Web3Forms | Sí | Clave pública, por diseño del servicio |
| Estilos | páginas → global.css | Parcial | Duplicación local |

### Detalle del veredicto
- Dirección de dependencias: PASS
- Acoplamiento: PASS
- Cohesión: CONCERNS
- Fronteras de capas: PASS
- Propagación de cambios: CONCERNS

---

## 6. Repo Maintainer

**Veredicto**: APROBAR CON CAMBIOS

### Problemas críticos
| # | Problema | Archivo(s) | Convención violada | Solución |
|---|---|---|---|---|
| M1 | Colores escritos a mano en lugar de tokens | contacto (10), lab (9), proyectos (10), otros | "Paleta solo por tokens" | Reemplazo por variables; añadir tokens faltantes |

### Recomendaciones
| # | Problema | Por qué | Solución |
|---|---|---|---|
| M2 | README desactualizado | Confunde al volver al proyecto | Actualizar estructura, scripts de QA y flujo de despliegue |
| M3 | Estilos duplicados (`.chip`, `.card`) | Deriva | Primitivas compartidas |
| M4 | Mezcla JS/TS en scripts de cliente | Convención doble | TS en todos |
| M5 | Carpeta `reviews/` nueva sin explicación | Orientación | Mencionarla en el README |

### Lista de convenciones
| Convención | Estado | Notas |
|---|---|---|
| Ubicación de archivos | Parcial | Páginas con lógica propia fuera de `components/` |
| Nombres | OK | PascalCase componentes, kebab-case rutas |
| Exportaciones barril | N/A | Astro no lo usa |
| Orden de imports | OK | |
| Imports de tipos separados | N/A | |
| Alias de rutas | No | Rutas relativas `../../`; opcional alias `@/` |
| Sin código muerto | OK | Las rutas "en construcción" ya se eliminaron |
| Registro estructurado | N/A | Sin `console.log` en producción |
| Sin supresiones de lint | OK | |
| Documentación | Parcial | README desactualizado |

### Oportunidades de reutilización
`global.css` ya tiene `.pill`, `.finding`, `.tag`, `.eyebrow`, `.underline-gold`: las páginas deberían apoyarse en ellas y en nuevas primitivas `Chip`, `Card`, `SectionHead`.

### Detalle del veredicto
- Organización de archivos: CONCERNS
- Consistencia de nombres: PASS
- Higiene de imports: PASS
- Reutilización: CONCERNS
- Cumplimiento de lint: PASS (no hay linter configurado; recomendable `astro check`)

---

## 7. Production Readiness

**Veredicto**: APROBAR CON CAMBIOS

### Problemas críticos
| # | Problema | Archivo(s) | Modo de falla | Solución |
|---|---|---|---|---|
| P1 | Sin lockfile y con rangos `^` | `package.json`, `deploy.yml` | Un despliegue sin cambios puede romperse por una versión nueva | Lockfile generado en CI y `npm ci` |

### Recomendaciones
| # | Problema | Por qué | Solución |
|---|---|---|---|
| P2 | QA solo manual | Regresiones visuales del rediseño pasarían sin aviso | Disparar QA tras cada despliegue |
| P3 | Sin monitoreo del formulario | Mensajes perdidos sin saberlo | Revisión periódica del panel; ya hay correo alternativo en el error |
| P4 | Dominio propio pendiente | Cambio de URL canónica | Configurar `site` y CNAME en la fase 6 y revisar canónicas |

### Análisis de modos de falla
| Escenario | Qué falla | Impacto | Recuperación | ¿Cubierto? |
|---|---|---|---|---|
| Web3Forms caído | Envío | Mensaje no llega | Error visible + correo alternativo | Sí |
| JSON del simulador no carga | Simulador | Sin interacción | Mensaje de error; el caso sigue legible | Sí |
| JavaScript desactivado | Animación, filtros, simulador | Funciones extra | Contenido completo visible; filtros ocultos | Sí |
| Versión nueva de Astro rompe build | Despliegue | Sitio no se actualiza (el anterior sigue publicado) | Fijar versiones | Parcial |
| Imagen faltante | Portadas | Hueco visual | QA detecta imágenes rotas | Sí |

### Lista de entorno
| Aspecto | Dev | Prod | ¿Brecha? |
|---|---|---|---|
| Rutas | `trailingSlash: always` | GitHub Pages | No |
| Red | — | Web3Forms, fuentes locales | No |
| Permisos | — | Pages con OIDC | No |
| Configuración | `site` = github.io | igual | Pendiente dominio |
| Salida | `dist/` | artefacto Pages | No |

### Detalle del veredicto
- Flujo E2E: PASS
- Recuperación de errores: PASS
- Integridad de datos: N/A
- Paridad de entornos: CONCERNS (versiones sin fijar)
- Observabilidad: CONCERNS menores

---

## 8. DX Engineer

**Omitido** — el sitio no es una herramienta para desarrolladores.

---

## 9. Performance Engineer

**Veredicto**: APROBAR

### Presupuesto de recursos (último reporte)
| Recurso | Actual | Tras el rediseño (objetivo) | ¿Riesgo? |
|---|---|---|---|
| Peso por página | 106–206 KiB | ≤ 250 KiB | Medio (portadas más grandes) |
| LCP móvil | 1,4–1,8 s | ≤ 2,0 s | Medio |
| CLS | 0 (0,067 en `/es/`) | 0 | Bajo |
| TBT | 0–50 ms | ≤ 100 ms | Bajo si no se añaden librerías de animación |
| Listeners | 4–6 por página | +1 observer compartido | Bajo |

### Recomendaciones
| # | Problema | Archivo(s) | Por qué | Solución |
|---|---|---|---|---|
| X1 | CLS 0,067 en Inicio | `HomePage.astro` | Único punto bajo 100 | Alto reservado para la animación y portadas |
| X2 | Portadas más grandes en el rediseño | proyectos, lab | Aumenta peso | WebP/AVIF con `srcset` (ya existe `img.js`) y `loading="lazy"` salvo la primera |
| X3 | Animaciones con librería (GSAP/Lottie) | — | +30–60 KiB y TBT | Usar CSS + IntersectionObserver; `animation-timeline: view()` como mejora progresiva |

### Ruta caliente
No hay trabajo en scroll hoy. El rediseño debe mantenerlo así: nada de listeners de `scroll` sin `passive` ni cálculos de layout por fotograma; los revelados se activan una sola vez por elemento.

### Detalle del veredicto
- Memoria: PASS
- Red: PASS
- E/S: PASS
- Arranque: PASS
- Estabilidad: PASS

---

## 10. Accessibility Engineer

**Veredicto**: APROBAR

**Resumen**: 0 violaciones axe (WCAG 2.2 AA + buenas prácticas) en todas las páginas, escritorio y móvil. Hay salto al contenido, foco dorado visible, `aria-pressed` en filtros, `role="alert"`/`role="status"` en el formulario, movimiento reducido respetado.

### Recomendaciones
| # | Problema | Criterio WCAG | Solución |
|---|---|---|---|
| A1 | "Avísame" (404) de 58×20 px | 2.5.8 Tamaño del objetivo | Altura ≥ 24 px |
| A2 | Menú móvil: el foco no entra al abrir | 2.4.3 Orden del foco | Enfocar el primer enlace al abrir |
| A3 | Nuevas animaciones del rediseño | 2.3.3 / 2.2.2 | Todas con `prefers-reduced-motion` y botón de pausa si duran > 5 s (como AnalyticsMotion) |
| A4 | Contadores animados | 4.1.3 | El número final en el DOM desde el inicio; animar solo la presentación (`aria-hidden` en la versión animada) |

### Recorrido con teclado
| Paso | Acción | Foco esperado | Anuncio | ¿OK? |
|---|---|---|---|---|
| 1 | Tab | "Saltar al contenido" | Enlace | Sí |
| 2 | Tab ×n | Navegación, ES/EN, Hablemos | Enlaces | Sí |
| 3 | Enter en "Menú" (móvil) | Debería ir al primer enlace | "Menú, expandido" | Parcial |
| 4 | Escape | Botón Menú | "Menú, contraído" | Sí |
| 5 | Tab en filtros del Lab | Chips | "Análisis, botón, no presionado" | Sí |
| 6 | Flechas en slider del simulador | Valor | "COP 6.000" | Sí |
| 7 | Envío de formulario con errores | Primer campo con error | Mensaje del campo | Sí |

### Lista ARIA
| Elemento | Rol | Etiqueta | Estados | Teclado | Notas |
|---|---|---|---|---|---|
| Botón Menú | button | "Menú" | aria-expanded | Enter/Escape | Falta foco inicial |
| Pausa de animación | button | "Pausar animación" | aria-pressed | Enter | OK |
| Chips de filtro | button | Texto | aria-pressed | Enter | OK |
| Sliders | input range | label | valor | Flechas | OK |
| Honeypot | checkbox | — | aria-hidden, tabindex -1 | Excluido | OK |

### Detalle del veredicto
- Lectores de pantalla: PASS
- Teclado: PASS (con A2)
- Foco: CONCERNS menores
- Contraste: PASS
- Movimiento: PASS
