---
titulo: "Radiografía del emprendimiento en Bogotá"
pregunta: "¿En qué localidades y sectores nacen más empresas, y quiénes las lideran?"
hallazgo: "Ciudad Bolívar crea empresas a más del doble del ritmo de Chapinero."
descripcion: "Dónde y en qué nacen las empresas de Bogotá, con datos abiertos del primer trimestre de 2026."
pilar: "data"
herramientas:
  - "Python"
  - "pandas"
fecha: "oct 2026"
repo: "https://github.com/Sebaspadi97/bogota-business-births"
portada: "/img/casos/emprendimiento/01_tasa_creacion_localidad.webp"
destacado: false
orden: 3
publicar: true
etiquetaDatos: "datos abiertos"
simulador: false
ficha:
  - dato: "Autoría"
    valor: "Sebastián Padilla (proyecto individual)"
  - dato: "Método"
    valor: "Análisis descriptivo · indicadores de tasa y participación · auditoría de calidad de datos"
  - dato: "Herramientas"
    valor: "Python · pandas · matplotlib"
  - dato: "Fuente"
    valor: "Datos Abiertos Bogotá · Dinámica Empresarial, corte marzo 2026"
  - dato: "Estado"
    valor: "v1 terminada · se fortalecerá en una v2"
sobreLosDatos: "Este análisis usa datos abiertos del conjunto “Dinámica Empresarial Bogotá”, publicado en Datos Abiertos Bogotá bajo licencia CC BY-SA 4.0, con corte a marzo de 2026. Las tablas y gráficos derivados se comparten bajo la misma licencia. Son registros agregados de empresas; no hay datos personales ni datos del empleador del autor."
licencia: "Tablas y gráficos bajo CC BY-SA 4.0, como la fuente. Código con todos los derechos reservados."
---

## La pregunta de negocio

> ¿En qué localidades y sectores de Bogotá nacen más empresas, y quiénes las lideran?

La respuesta sirve a dos públicos: a quien va a emprender y quiere saber dónde hay movimiento, y a quien diseña programas de fomento y debe decidir dónde invertir.

La pregunta original incluía cuántas empresas se sostienen. Se ajustó porque el archivo no trae cancelaciones (ver Datos).

## Los datos

Se usaron 44.743 registros agregados que suman 465.498 empresas vigentes y 21.407 creadas entre enero y marzo de 2026.

```cifras
465.498 | empresas vigentes
21.407 | empresas nuevas
ene–mar 2026 | periodo
```

Cada registro cruza localidad, tamaño, rama, código CIIU, organización jurídica y sexo del representante legal. La auditoría encontró siete problemas, y contarlos es parte del caso:

| Hallazgo de calidad | Tratamiento |
| --- | --- |
| El archivo “.xlsx” es en realidad una tabla DBF | Lector propio en Python |
| Empresas canceladas en cero en todo el archivo | Se excluye la supervivencia; queda para v2 |
| Un solo corte (marzo 2026) | Análisis transversal, sin tendencias |
| Códigos de localidad distintos a los oficiales (Chapinero aparece con el 19) | Se usa el nombre, coherente con el perfil de cada localidad |
| Sumapaz ausente y 4,9 % de empresas sin localidad | Se reporta; “Sin localidad” queda fuera de los rankings |
| CIIU sin ceros a la izquierda (0010 aparece como 10) | Se completa a cuatro dígitos |
| 6.878 registros con sexo del representante “Indeterminado” | Los % de mujeres se calculan sobre sexo conocido |

## El enfoque

Tres indicadores simples, calculados por localidad, rama, actividad y tamaño:

1. **Tasa de creación:** empresas creadas en ene–mar ÷ vigentes a marzo × 100. Es trimestral, no anual.
2. **Participación:** qué parte de las empresas nuevas aporta cada grupo.
3. **% de mujeres al frente:** representantes legales mujeres ÷ (mujeres + hombres), en vigentes y en nuevas.

Las descripciones de las actividades vienen de la Resolución DIAN 0139 de 2012 (CIIU Rev. 4 A.C.). Todo el proceso es reproducible con dos scripts de Python.

## Los hallazgos

> Entre enero y marzo de 2026 nacieron 21.407 empresas en Bogotá, unas 238 por día: 4,6 por cada 100 vigentes.

**El sur se renueva más rápido.** Ciudad Bolívar, Bosa y Usme crean más empresas por cada 100 existentes. Chapinero, donde se concentran las grandes, tiene la tasa más baja. En volumen absoluto lideran Suba (2.604) y Kennedy (2.421).

![Tasa de creación de empresas por localidad, primer trimestre de 2026: Ciudad Bolívar 6,7, Bosa 6,5 y Usme 6,3 por cada 100 vigentes; Chapinero, la más baja, 3,0.](/img/casos/emprendimiento/01_tasa_creacion_localidad.webp "Empresas creadas por cada 100 vigentes, por localidad")

**Más mujeres al frente de lo nuevo.** El 45,1 % de las empresas nuevas tiene una mujer como representante legal, frente al 41,1 % de las vigentes. Ocurre en 17 de las 19 localidades; las excepciones son Antonio Nariño y La Candelaria.

![Porcentaje de empresas con mujer como representante legal, vigentes frente a nuevas, por localidad: en 17 de 19 localidades es mayor entre las nuevas.](/img/casos/emprendimiento/02_mujeres_localidad.webp "Mujeres representantes legales: empresas vigentes frente a nuevas")

**Bares, belleza y comida encabezan.** Los bares son la actividad con más empresas nuevas, 1,7 veces más que la segunda.

![Actividades económicas con más empresas nuevas en el primer trimestre de 2026, encabezadas por los bares con 1.503.](/img/casos/emprendimiento/03_top_actividades.webp "Actividades con más empresas nuevas")

**Casi todo lo nuevo es micro y de persona natural.** El 99,9 % de las empresas nuevas son microempresas y el 63,6 % se registra como persona natural.

## La decisión recomendada

> Enfocar el apoyo al emprendimiento en el sur, donde más empresas nacen por cada cien existentes y donde más mujeres las lideran.

- **Programas de fomento:** priorizar formalización y acompañamiento en Ciudad Bolívar, Bosa, Usme y Tunjuelito, donde la tasa de creación y la participación de mujeres son más altas.
- **Quien va a emprender:** comida y bebida es el sector con más entrada de competidores. Antes de abrir un bar o restaurante, conviene medir la saturación de la zona (lo aborda el caso del café).
- **Próximo análisis:** medir cuántas de estas empresas sobreviven el primer año antes de invertir a gran escala.

## Limitaciones y próximos pasos

Esta v1 muestra dónde nacen empresas, no cuáles sobreviven.

- **Sin cancelaciones:** no se puede medir supervivencia ni creación neta. Para v2: buscar otros cortes del portal o informes de la Cámara de Comercio de Bogotá y Confecámaras.
- **Un solo corte:** no hay tendencia ni estacionalidad; el primer trimestre puede no representar el año.
- **La tasa favorece a localidades pequeñas:** pocas vigentes inflan la proporción. En v2 se complementa con empresas por cada 1.000 habitantes.
- **Registro no es actividad real:** una empresa matriculada no necesariamente está operando, y la informalidad queda por fuera.
- **Sexo del representante legal:** describe quién figura en el registro, no la propiedad ni quién dirige en la práctica.
