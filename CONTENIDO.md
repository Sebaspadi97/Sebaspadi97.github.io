# Cómo actualizar el contenido del sitio

Todo lo que se publica en Proyectos y en el Lab es un archivo de texto (Markdown) en `src/content/`.
Cada cambio que se guarda en GitHub se publica solo en 1 o 2 minutos.
Si un archivo tiene un error (por ejemplo, falta un dato obligatorio), la publicación se detiene,
la ejecución en **Actions** queda en rojo con el motivo y el sitio sigue mostrando la versión anterior.

```
src/content/proyectos/es/<dirección>.md   un proyecto (la dirección es el nombre del archivo)
src/content/proyectos/en/<dirección>.md   su versión en inglés (opcional)
src/content/lab/<dirección>.md            un artículo del Lab
src/content/datos-curiosos.json           la franja dorada de datos curiosos del Lab
public/img/…                              imágenes
```

Hay tres formas de hacer cambios. Las tres terminan en el mismo lugar.

## 1. Desde el navegador, con formularios (Pages CMS)

1. Entra a https://app.pagescms.org y conéctate con tu cuenta de GitHub.
2. La primera vez, autoriza la aplicación sobre el repositorio `Sebaspadi97.github.io`.
3. Verás **Proyectos (español)**, **Proyectos (inglés)**, **Lab (artículos)** y **Datos curiosos**.
   - **Agregar:** botón para crear una entrada nueva. El nombre del archivo es la dirección
     (por ejemplo `churn-en-telecomunicaciones` → `/es/proyectos/churn-en-telecomunicaciones/`).
   - **Modificar:** abre la entrada, cambia los campos y guarda.
   - **Ocultar sin borrar:** desmarca **Publicado**.
   - **Borrar:** elimina la entrada (queda en el historial de GitHub por si hay que recuperarla).
   - **Imágenes:** se suben desde los campos de imagen o desde **Media** (quedan en `public/img`).
4. El texto largo del caso o del artículo va en el campo de texto en Markdown (ver la sección 4).

## 2. Directamente en GitHub

En https://github.com/Sebaspadi97/Sebaspadi97.github.io → carpeta `src/content/…`:
- **Agregar:** *Add file → Create new file* (o copia uno existente y cambia el contenido).
- **Modificar:** abre el archivo y usa el lápiz ✏️.
- **Borrar:** abre el archivo → menú `…` → *Delete file*.

## 3. Automático desde el repositorio de cada proyecto

Un proyecto nuevo puede vivir en su propio repositorio y llegar solo al sitio:

1. Crea el repositorio con la estructura estándar (`plantillas/proyecto/` de este repositorio).
2. Llena `sp-lab/caso.md` (y si quieres `sp-lab/caso.en.md`).
3. Agrega el tema **`sp-lab`** al repositorio (About → ⚙ → Topics).
4. Pon `publicar: true`.

El flujo **Sincronizar proyectos** (pestaña Actions) revisa cada día a las 6:17 a. m. todos tus
repositorios con el tema `sp-lab`, copia la ficha y los gráficos (en WebP, con versión para móvil),
comprueba que el sitio compile y publica. Para no esperar: **Actions → Sincronizar proyectos →
Run workflow**. Para que sea inmediato, configura el aviso opcional de la plantilla.

- Para retirarlo: `publicar: false` o quitar el tema. En la siguiente sincronización desaparece.
- Esos proyectos llevan `origen:` con la dirección de su repositorio: se editan en su repositorio,
  no en el sitio (la sincronización sobrescribe los cambios hechos aquí).
- Los proyectos escritos a mano en el sitio (sin `origen`) nunca se tocan.

## 4. Cómo se escribe el texto (Markdown)

```markdown
## La pregunta de negocio           ← cada "##" es una sección numerada del índice

> Frase destacada.                   ← al inicio de una sección, frase grande en verde

Párrafo normal con **negrita**, *cursiva* y [un enlace](https://…).

- Lista con viñetas
1. Lista numerada

```cifras                            ← fila de cifras grandes: "cifra | etiqueta"
21.407 | empresas nuevas
19 | localidades
```

![Texto alternativo](/img/casos/x.webp "Pie de figura")   ← figura adaptable con pie

| Columna | Valor |                   ← tabla (se desplaza en móvil)
| --- | --- |
| Fila | 1,0 |
```

En los proyectos, los títulos de la plantilla se reconocen solos: *La pregunta de negocio*,
*Los datos*, *El enfoque*, *Los hallazgos*, *La decisión recomendada* (va en fondo oscuro),
*Limitaciones y próximos pasos* y *Equipo y mi rol*. Se puede usar cualquier otro título.

El caso de abandono usa además un bloque `simulador` donde va el simulador interactivo.

### Industria del proyecto

Además del pilar, cada proyecto puede llevar `industria:` con una de estas claves:
`comercio`, `salud`, `emprendimiento`, `alimentos`, `finanzas`, `industria`, `educacion`, `logistica`.
La industria se muestra como un ícono con su nombre sobre la portada de la tarjeta (Inicio y Proyectos),
junto al pilar en el encabezado del caso, y como filtro en Proyectos (aparece cuando hay al menos
dos industrias distintas). Es opcional: si falta, el proyecto se publica igual, sin ícono.
Para sumar una industria nueva hay que agregarla en `src/lib/industrias.js` (nombre en español
e inglés e ícono) y en la lista del campo en `.pages.yml`.

## Qué queda fuera de los archivos de contenido

- Textos de Inicio, Sobre mí y las páginas legales: `src/data/home.js`, `about.js`, `legal.js`.
- El Inicio muestra una selección curada de proyectos y artículos (en `src/data/home.js`);
  un proyecto nuevo aparece en **Proyectos**, en su página y en el JSON de `/datos/proyectos.json`.
- El CV en PDF toma los 4 primeros proyectos según `orden` (`scripts/cv/generate-cv.mjs`).

## Respaldo en OneDrive

`node scripts/export/exportar-contenido.mjs <carpeta>` copia proyectos, artículos y textos en Markdown.
