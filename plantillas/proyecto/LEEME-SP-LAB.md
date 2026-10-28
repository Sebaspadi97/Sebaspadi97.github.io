# Plantilla de proyecto · Sebas Padilla Lab

Estructura estándar de un proyecto. Copia esta carpeta en un repositorio nuevo (o crea el
repositorio y sube estos archivos) y llénala.

```
README.md            Resumen del proyecto (español + resumen en inglés)
LICENSE.md           Licencias: código con derechos reservados; datos y gráficos según la fuente
datos/               Datos abiertos o sintéticos (nunca datos del empleador)
scripts/             Código del análisis
tablas/              Resultados en CSV/Excel
graficos/            Gráficos con la tipografía de la marca (PNG)
fuentes/             Montserrat y Open Sans para los gráficos (licencia OFL)
sp-lab/caso.md       Ficha y texto del caso para el sitio  ← lo que lee la web
sp-lab/caso.en.md    Versión en inglés (opcional)
.github/workflows/avisar-al-sitio.yml   Aviso inmediato al sitio (opcional)
```

## Publicarlo en el sitio

1. En GitHub, en el repositorio: **About → ⚙ → Topics**, agrega `sp-lab`.
2. En `sp-lab/caso.md`, cambia `publicar: false` por `publicar: true`.
3. Listo. El sitio lo lee cada día a las 6:17 a. m. (hora de Bogotá). Para no esperar:
   en el repositorio del sitio, **Actions → Sincronizar proyectos → Run workflow**.

Si a la ficha le falta algo obligatorio, el sitio no lo publica y la ejecución queda en rojo
con el motivo; el resto del sitio sigue igual.

## Quitarlo del sitio

Cambia `publicar` a `false` (o quita el tema `sp-lab`). En la siguiente sincronización desaparece.

## Cómo se escribe el texto

Ver la guía `CONTENIDO.md` del repositorio del sitio: secciones con `## Título`, frase destacada
con `>`, cifras con un bloque `cifras`, figuras con `![texto](ruta "pie")` y tablas normales.
Las imágenes se ponen con rutas relativas a `sp-lab/` (por ejemplo `../graficos/01.png`).
