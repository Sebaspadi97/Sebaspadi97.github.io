---
titulo: "¿Cuántos días le quedan a un paciente en el hospital?"
pregunta: "¿Se puede estimar la estancia restante mejor que con el promedio histórico?"
hallazgo: "el modelo reduce el error a 6,19 días, 6,4 % menos que la referencia histórica."
descripcion: "Modelo que estima cuántos días de hospitalización le quedan a un paciente, con validación temporal y hoy en piloto institucional."
pilar: "ml"
industria: "salud"
herramientas:
  - "Python"
  - "scikit-learn"
  - "pandas"
fecha: "oct 2026"
repo: "https://github.com/Sebaspadi97/hospital-length-of-stay"
portada: "/img/casos/estancia/02_error_por_dias_restantes.webp"
destacado: false
orden: 2
publicar: true
etiquetaDatos: "resultados agregados"
lineaEquipo: "Trabajo en equipo con Alexandra Castro y Kevin Alejandro Paez."
simulador: false
ficha:
  - dato: "Equipo"
    valor: "Alexandra Castro, Kevin Alejandro Paez y Sebastián Padilla"
  - dato: "Mi rol"
    valor: "Calidad y preparación de datos, control de fuga, trazabilidad, análisis por grupos y reproducibilidad"
  - dato: "Método"
    valor: "Regresión supervisada · CRISP-DM · validación temporal"
  - dato: "Herramientas"
    valor: "Python · scikit-learn · XGBoost · pandas · Power Pages"
  - dato: "Contexto"
    valor: "Proyecto final de Machine Learning I, Maestría en Ciencia de Datos (Universidad EAN), 2026"
  - dato: "Estado"
    valor: "Terminado · piloto institucional en marcha"
sobreLosDatos: "Este proyecto usa datos clínicos reales de un hospital de alta complejidad en Bogotá, tratados con autorización institucional para fines analíticos y académicos. Las bases de pacientes no se publican. Aquí solo se muestran resultados agregados, sin identificadores ni registros individuales. Los datos no provienen del empleador del autor."
licencia: "Código (de los tres autores) y resultados agregados con todos los derechos reservados. Los resultados se pueden citar con atribución a los tres autores."
---

## La pregunta de negocio

> ¿Cuántos días de hospitalización le quedan a un paciente, según su edad, sexo, grupo diagnóstico (GRD), severidad y los días que ya lleva internado?

En un hospital de alta complejidad, no saber cuándo saldrá un paciente complica tres cosas: anticipar revisiones, coordinar el egreso y organizar las camas. El modelo no reemplaza el criterio médico. Da una señal para priorizar el seguimiento.

- **Quién decide:** gestión de camas y operaciones clínicas; las decisiones médicas siguen en el equipo tratante.
- **Costo del error:** subestimar crea falsas expectativas; sobreestimar retrasa la gestión del egreso.

## Los datos

Se usaron 37.053 hospitalizaciones de 2024 a 2026, con una partición por año para evitar mirar el futuro.

```cifras
37.053 | hospitalizaciones
8 | variables
2024–2026 | cobertura
```

| Año | Uso | Volumen |
| --- | --- | --- |
| 2024 | Referencia histórica (mediana por GRD y severidad) | 14.096 episodios |
| 2025 | Entrenamiento y validación cruzada | 13.855 episodios · 42.657 cortes |
| 2026 | Prueba temporal | 9.102 episodios · 28.829 cortes |

- **Fuentes:** registro de gestión clínica (estancia, GRD, severidad, peso y norma) cruzado con el conjunto mínimo de datos (edad y sexo), con 99,99 % de concordancia.
- **Cortes:** cada hospitalización se observa en los días 0, 1, 3, 7, 14, 30 y 60 mientras siga abierta. El objetivo es días restantes = estancia final − día actual.
- **Ocho variables:** día actual, edad, sexo, GRD, severidad, peso del GRD, norma de estancia y mediana histórica 2024.
- **Dato curioso:** la estancia media es 8,6 días, pero la mediana es 5. Unos pocos casos muy largos (hasta 466 días) estiran el promedio.

## El enfoque

Se compararon ocho algoritmos contra dos referencias simples, y ganó Random Forest por el menor error medio en validación (5,98 días).

1. **Dos líneas base que hay que superar:** una mediana constante y la mediana histórica por GRD y severidad (P50 2024).
2. **Validación sin trampas:** GroupKFold por episodio, para que los cortes de un mismo paciente no queden a la vez en entrenamiento y validación.
3. **Preprocesamiento dentro del Pipeline:** imputación, codificación y escalado se aprenden solo con cada partición de entrenamiento.
4. **Ablación:** al quitar las referencias y el GRD, el error sube de 6,01 a 7,65 días, lo que confirma su valor.
5. **Prueba final en 2026:** el modelo ganador se aplica a un año que no se usó para elegirlo.

Las diferencias entre Random Forest, XGBoost y HistGradientBoosting son pequeñas, así que la elección sigue la regla declarada y no se presenta como una superioridad clara.

![Error absoluto medio en validación cruzada 2025 de 8 algoritmos y 2 referencias: Random Forest 5,98, XGBoost 5,99, HistGradientBoosting 6,01; referencia P50 histórica 6,23; árbol sin poda 7,69.](/img/casos/estancia/01_comparacion_modelos.webp "Los seis primeros modelos quedan a menos de 0,12 días entre sí; el árbol sin poda es el ejemplo claro de sobreajuste.")

## Los hallazgos

> En la prueba de 2026, Random Forest baja el error medio a 6,19 días, un 6,4 % menos que la referencia histórica. Pero no gana en todo.

| Métrica (prueba 2026) | Random Forest | P50 histórica | Mediana constante |
| --- | --- | --- | --- |
| MAE (días) | **6,19** | 6,62 | 7,34 |
| RMSE (días) | **12,10** | 13,24 | 14,81 |
| R² | **0,24** | 0,09 | −0,14 |
| Dentro de ±3 días | 46,8 % | **53,5 %** | 51,6 % |
| Sesgo (predicho − real) | **−0,6 d** | −4,4 d | −5,1 d |

- **Estancias cortas:** cuando faltan 7 días o menos, la referencia simple acierta más que el modelo.
- **Estancias largas, el gran reto:** cuando faltan más de 28 días, el error sube a 28,7 días y el modelo subestima unos 24 días en promedio.
- **La unidad cambia la conclusión:** si cada hospitalización pesa igual (no cada corte), la referencia queda ligeramente mejor (4,69 frente a 4,78 días).
- **Por severidad:** el error va de 2,3 días en severidad baja a 8,7 en alta.

![Error absoluto medio en la prueba 2026 por días que faltaban: con 3 días o menos el modelo yerra 3,7 frente a 2,1 de la referencia; con más de 28 días, 28,7 frente a 37,1.](/img/casos/estancia/02_error_por_dias_restantes.webp "El modelo empieza a ganarle a la referencia desde los 8 días restantes, justo donde más cuesta planear una cama.")

## La decisión recomendada

> Usar el modelo como apoyo informativo y supervisado para priorizar egresos, nunca como fecha de alta.

- Mostrar cada estimación con una banda de incertidumbre, no como un número exacto.
- Activar una alerta cuando el paciente pertenece a un grupo con riesgo de gran error (estancias largas, severidad alta).
- No usar la fecha estimada para compromisos operativos irreversibles.
- Definir con el equipo clínico qué umbral de error es aceptable y qué cuesta más: subestimar o sobreestimar.

El modelo ya está en un piloto institucional; el seguimiento de esos pacientes medirá su desempeño real.

## Limitaciones y próximos pasos

Los resultados son una prueba retrospectiva, no una garantía de precisión con pacientes activos.

- **GRD de egreso:** el grupo diagnóstico final puede incluir información posterior al día simulado; en la práctica solo existe un GRD provisional, menos completo.
- **Prueba no del todo intacta:** el año 2026 se consultó durante iteraciones previas. Hace falta una cohorte posterior sin consultas.
- **Sobreajuste moderado:** Random Forest tiene una brecha de 1,1 días entre entrenamiento (4,88) y validación (5,98).
- **Cobertura parcial:** no todos los pacientes cumplen las condiciones para recibir estimación.
- **Equidad:** las diferencias por sexo no prueban discriminación; pueden venir de la mezcla de diagnósticos y severidad.
- **Impacto no medido:** menos error no equivale a menos días-cama. Eso requiere medir el piloto.

## Equipo y mi rol

Proyecto en equipo con Alexandra Castro y Kevin Alejandro Paez. Mi parte se centró en la calidad y preparación de los datos, el control de fuga de información, la trazabilidad de los experimentos y el análisis del error por grupos. Participé en todo el desarrollo y en la sustentación.

| Integrante | Programa | Aporte principal |
| --- | --- | --- |
| **Sebastián Padilla** | Maestría en Ciencia de Datos | Calidad y preparación de datos, control de fuga, trazabilidad experimental, análisis de error por grupos y reproducibilidad |
| Alexandra Castro | Especialización en Machine Learning | Modelos, validación cruzada, sobreajuste, métricas y comparación de algoritmos |
| Kevin Alejandro Paez | Maestría en Ciencia de Datos | Problema operativo, flujo de datos, variables, aplicación institucional y seguimiento del piloto |

El equipo usó ChatGPT como apoyo en organización, revisión de código y documentación; todos los resultados fueron verificados por el equipo.
