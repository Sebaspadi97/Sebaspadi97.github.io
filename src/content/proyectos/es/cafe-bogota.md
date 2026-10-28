---
titulo: "¿Dónde abrir un café en Bogotá?"
pregunta: "¿Qué localidades tienen clientes sin tanta competencia?"
hallazgo: "solo Suba y Usaquén superan el promedio en adultos y en empresas por cada café."
descripcion: "Inteligencia de ubicación con datos abiertos: dónde hay más demanda por cada punto de café en Bogotá."
pilar: "mi"
herramientas:
  - "Python"
  - "pandas"
fecha: "oct 2026"
repo: "https://github.com/Sebaspadi97/bogota-coffee-location"
portada: "/img/casos/cafe/01_matriz_demanda_competencia.webp"
destacado: false
orden: 4
publicar: true
etiquetaDatos: "datos abiertos"
simulador: false
ficha:
  - dato: "Autoría"
    valor: "Sebastián Padilla (proyecto individual)"
  - dato: "Método"
    valor: "Inteligencia de ubicación · oferta frente a demanda · índice con análisis de sensibilidad"
  - dato: "Herramientas"
    valor: "Python · pandas · matplotlib"
  - dato: "Fuentes"
    valor: "Datos Abiertos Bogotá: Dinámica Empresarial (mar 2026) y proyecciones de población 2026"
  - dato: "Estado"
    valor: "v1 terminada · v2 a nivel de UPZ"
ingles:
  titulo: "Where to open a coffee shop in Bogotá"
  pregunta: "Which districts have customers without too much competition?"
  hallazgo: "only Suba and Usaquén beat the city average on both adults and businesses per coffee shop."
sobreLosDatos: "Este análisis combina dos conjuntos de Datos Abiertos Bogotá: “Dinámica Empresarial Bogotá” (corte marzo 2026, CC BY-SA 4.0) y las proyecciones de población por localidad 2005–2035 (CC BY 4.0). Como una de las fuentes es CC BY-SA, las tablas y gráficos derivados se comparten bajo CC BY-SA 4.0. Son datos agregados, sin información personal ni del empleador del autor."
licencia: "Tablas y gráficos bajo CC BY-SA 4.0, por derivar de una fuente CC BY-SA. Código con todos los derechos reservados."
---

## La pregunta de negocio

> ¿En qué localidad de Bogotá conviene abrir un café: dónde hay más demanda por cada punto de café que ya existe?

Es la primera decisión de quien emprende en comida y bebida, donde bares y restaurantes están entre las actividades con más empresas nuevas de la ciudad. Un error de ubicación cuesta el arriendo, la adecuación y meses de ventas bajas.

Este caso continúa la “Radiografía del emprendimiento en Bogotá”: primero, dónde nacen los negocios; ahora, dónde conviene abrir uno.

## Los datos

Se cruzaron la competencia registrada con la población de 2026 en las 19 localidades urbanas.

```cifras
9.338 | puntos de café
6,24 M | adultos
19 | localidades
```

| Dimensión | Variable | Fuente |
| --- | --- | --- |
| Oferta | Cafeterías (CIIU 5613) y panaderías (CIIU 1081) vigentes y nuevas: 9.338 puntos con localidad | Dinámica Empresarial, mar 2026 |
| Demanda residencial | Adultos de 18 años o más, 2026: 6,24 millones | Proyecciones de población por localidad |
| Demanda diurna | Empresas vigentes por localidad: 442.498 | Dinámica Empresarial, mar 2026 |

- Se incluyen las panaderías porque en Bogotá son el lugar de barrio donde más se toma café.
- Control de calidad: las 20 localidades suman 7.945.996 habitantes, igual al total de Bogotá del archivo.
- Quedan por fuera Sumapaz (rural) y 528 puntos “Sin localidad”.

## El enfoque

Dos medidas de demanda por cada punto de café, comparadas contra el promedio de Bogotá, y un índice puesto a prueba con distintos pesos.

1. **Adultos por punto de café:** cuánta gente vive en la localidad por cada competidor (Bogotá: 668).
2. **Empresas por punto de café:** cuánta actividad laboral hay durante el día por cada competidor (Bogotá: 47).
3. **Tasa de entrada:** puntos nuevos en ene–mar ÷ vigentes; muestra qué tan rápido llega competencia (Bogotá: 5,1 %).
4. **Índice de ejemplo:** 50 % adultos por punto + 30 % empresas por punto − 20 % tasa de entrada, en puntajes z.

La prueba de sensibilidad mostró que el ranking cambia mucho con los pesos: Chapinero pasa del puesto 1 al 13 según el modelo. Por eso la conclusión se apoya en la matriz y en los dos tipos de café, no en un ranking único.

## Los hallazgos

> Solo Suba y Usaquén superan el promedio de Bogotá en las dos demandas por punto de café: la de quienes viven allí y la de quienes trabajan allí.

![Matriz de localidades: adultos por punto de café frente a empresas por punto de café, con líneas en el promedio de Bogotá; solo Suba y Usaquén quedan por encima en ambos ejes.](/img/casos/cafe/01_matriz_demanda_competencia.webp "Demanda residencial y diurna por punto de café, por localidad")

- **Suba** combina tamaño y espacio: es la localidad más poblada (1,25 millones de habitantes) y tiene 887 adultos y 51 empresas por punto.
- **Usaquén** tiene 773 adultos y 76 empresas por punto, la segunda demanda diurna más alta.
- **Las más saturadas** son La Candelaria (94 adultos por punto) y Los Mártires (163), aunque su población flotante no aparece en los datos.

**El mejor lugar depende del tipo de café.** El sur tiene la mayor demanda residencial por punto, y Chapinero la mayor demanda diurna.

![Comparación de localidades para dos modelos de café: café de barrio, donde lideran Usme, Ciudad Bolívar y Bosa, y café de oficina, donde lideran Chapinero y Usaquén.](/img/casos/cafe/02_dos_modelos_de_cafe.webp "Dos modelos de café, dos mapas distintos")

**La competencia está llegando más rápido** a Rafael Uribe Uribe (8,0 % de puntos nuevos en el trimestre) y Tunjuelito (7,3 %), frente al 5,1 % de Bogotá.

## La decisión recomendada

> Para un café con clientela mixta, de residentes y de trabajadores, empezar la búsqueda de local en Suba o Usaquén.

| Si el café es… | Buscar en | Por qué | Validar antes |
| --- | --- | --- | --- |
| Mixto (barrio + trabajo) | Suba, Usaquén | Únicas por encima del promedio en ambas demandas | Zonas específicas dentro de cada localidad |
| De barrio, precio accesible | Usme, Ciudad Bolívar, Bosa | Más de 1.000 adultos por punto | Poder adquisitivo y ticket promedio |
| De especialidad para oficinas | Chapinero, Usaquén | Mayor demanda diurna por punto | Arriendo y competencia de cadenas |

Antes de firmar un arriendo hay que bajar a UPZ o barrio, con estrato, valor del suelo y flujo peatonal.

## Limitaciones y próximos pasos

Esta v1 señala zonas de búsqueda, no el local exacto.

- **La localidad es una unidad muy grande:** Suba o Usaquén tienen zonas saturadas y zonas vacías. La v2 baja a UPZ con población, estrato y valor del suelo por manzana.
- **Sin ingresos ni flujo peatonal:** mucha gente por punto no garantiza capacidad de pago.
- **Empresas registradas no son trabajadores:** Chapinero concentra sedes legales, lo que puede inflar su demanda diurna.
- **Solo competencia formal:** no aparecen la venta informal de tinto ni los restaurantes y tiendas que también venden café.
- **Un solo corte de oferta (mar 2026)** y un índice sensible a los pesos, que se declara como ejemplo.
