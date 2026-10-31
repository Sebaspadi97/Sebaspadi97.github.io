---
titulo: "¿Qué clientes están por irse?"
pregunta: "¿A quién conviene llamar antes de que deje de comprar?"
hallazgo: "llamar al 15,5 % con mayor valor esperado gana; llamar a todos pierde dinero."
descripcion: "Modelo de abandono con datos sintéticos que termina en una decisión económica: a quién contactar y con qué acción."
pilar: "ml"
industria: "comercio"
herramientas:
  - "Python"
  - "scikit-learn"
  - "pandas"
fecha: "oct 2026"
repo: "https://github.com/Sebaspadi97/customer-churn-retention"
portada: "/img/casos/abandono/03_curva_ganancia.webp"
destacado: true
orden: 1
publicar: true
etiquetaDatos: "datos sintéticos"
simulador: true
ficha:
  - dato: "Autoría"
    valor: "Sebastián Padilla (proyecto individual)"
  - dato: "Método"
    valor: "Clasificación supervisada · validación cruzada · importancia por permutación · curva de ganancia"
  - dato: "Herramientas"
    valor: "Python · scikit-learn · pandas · matplotlib"
  - dato: "Datos"
    valor: "Sintéticos: 20.000 clientes de TiendaLab, tienda en línea ficticia"
  - dato: "Estado"
    valor: "v1 terminada · v2 con modelo de uplift"
sobreLosDatos: "Datos sintéticos. TiendaLab es una tienda en línea ficticia y sus 20.000 clientes se generaron con código publicado en el repositorio. Ninguna fila corresponde a una persona o empresa real, y no hay datos de pagos ni del empleador del autor. Las cifras de dinero dependen de supuestos ficticios y son hallazgos del análisis, no impacto real."
licencia: "Datos, tablas y gráficos bajo CC BY 4.0. Código con todos los derechos reservados."
---

## La pregunta de negocio

> ¿Qué clientes van a dejar de comprar en los próximos 90 días, a quiénes conviene contactar y con qué acción?

Retener cuesta dinero: cupones, envíos gratis, gestión. Contactar a todos desperdicia presupuesto en quien se iba a quedar igual, y no contactar a nadie deja ir a los clientes valiosos.

## Los datos

Se generaron 20.000 clientes con su foto al 30 de junio de 2026; el 16,8 % abandona entre julio y septiembre.

```cifras
20.000 | clientes
14 | variables
16,8 % | abandona en 90 días
```

- **14 variables:** ciudad, antigüedad, canal (app o web), programa de lealtad, pedidos en 12 meses, días desde la última compra, ticket promedio, categorías, % de pedidos con descuento, % de entregas tarde, devoluciones, casos de soporte, calificación de la última compra y % de apertura de correos.
- **Etiqueta:** abandono = ninguna compra en los 90 días siguientes.
- **Reglas ocultas:** el abandono se generó a partir de recencia, frecuencia, entregas tarde, soporte, mala calificación, lealtad, canal, cazadores de descuento, clientes nuevos y apertura de correos, más ruido. El modelo no las ve. Que las recupere en su ranking de importancia prueba que el método funciona.

## El enfoque

Tres algoritmos empataron, y se eligió el más simple: la regresión logística.

| Modelo | AUC CV | PR-AUC CV | AUC entrenamiento |
| --- | --- | --- | --- |
| Random Forest | 0,819 | 0,565 | 0,903 |
| **Regresión logística** | **0,819** | **0,563** | **0,821** |
| HistGradientBoosting | 0,818 | 0,561 | 0,867 |
| Referencia (tasa promedio) | 0,500 | 0,168 | 0,500 |

1. **Partición:** 75 % entrenamiento, 25 % prueba (5.000 clientes), estratificada; validación cruzada de 5 folds.
2. **Regla de selección declarada:** gana la mejor PR-AUC, salvo que un modelo más simple esté a menos de una desviación estándar.
3. **Por qué la logística:** igual de precisa, sin sobreajuste (Random Forest cae de 0,90 a 0,82), fácil de explicar y la mejor calibrada (Brier 0,104). La calibración importa porque la probabilidad se convierte en dinero.
4. **Decisión económica:** valor esperado de contactar = probabilidad × efectividad × valor en riesgo − costo. Supuestos ficticios: margen del 25 %, contacto de COP 5.000 y efectividad del 25 %.

## Los hallazgos

> El modelo encuentra a quienes se van, pero la ganancia depende de a cuáles se contacta.

**Qué anticipa el abandono.** Los días sin comprar son la señal más fuerte; las entregas tarde, la más accionable. Le siguen la frecuencia de compra y los casos de soporte.

![Barras de importancia por permutación: días desde la última compra (0,297) muy por encima de % de entregas tarde (0,044), pedidos en 12 meses y casos de soporte.](/img/casos/abandono/01_que_pesa_mas.webp "Importancia por permutación de las variables")

**A quién llega.** En el 10 % de mayor riesgo, 2 de cada 3 clientes sí abandonan: 3,9 veces el promedio.

![Curva de captura: contactando al 20 % de mayor riesgo se alcanza el 58 % de los clientes que abandonan.](/img/casos/abandono/02_curva_captura.webp "Curva de captura de abandonos")

**Cuánto gana.** En los 5.000 clientes de prueba, contactar a todos pierde COP 10,2 millones. La regla “contactar si el valor esperado es mayor que 0” elige al 15,5 % y gana COP 2,8 millones, cerca del máximo posible en retrospectiva (COP 2,9 millones).

![Curva de ganancia: ordenando por valor esperado la campaña llega a COP 2,8 millones contactando al 16 %; contactar a todos termina en −COP 10,2 millones.](/img/casos/abandono/03_curva_ganancia.webp "Ganancia neta de la campaña según cuántos clientes se contactan")

```simulador
```

**El valor importa tanto como el riesgo.** Con el mismo número de contactos, ordenar por valor esperado gana 2,5 veces más que ordenar solo por probabilidad (COP 2,8 millones frente a 1,1 millones).

**La decisión depende más del costo del contacto que del modelo.** Con un contacto de COP 2.000 conviene llamar a la mitad de la base; con uno de COP 15.000 y efectividad del 15 %, ninguna campaña es rentable.

## La decisión recomendada

> Puntuar a la base cada mes, contactar solo a quien tenga valor esperado positivo y elegir la acción según el motivo del riesgo.

| Acción sugerida | % de contactados |
| --- | --- |
| Recuperar el servicio (disculpa + envío gratis) | 62 % |
| Reactivar (recordatorio + novedad) | 29 % |
| Invitar al programa de lealtad | 5 % |
| Acompañar al cliente nuevo (segunda compra guiada) | 2 % |
| Cupón focalizado en su categoría | 1 % |

- **Atacar la causa:** si las entregas tarde explican la mayoría de los contactos, mejorar la logística puede valer más que cualquier cupón.
- **Medir de verdad:** dejar un grupo de control sin contactar; la efectividad del 25 % es un supuesto que solo un experimento confirma.

## Limitaciones y próximos pasos

Los resultados muestran el método, no el desempeño en una tienda real.

- **Datos sintéticos:** el modelo aprende reglas que también se escribieron en código; con datos reales el AUC probablemente será menor.
- **Una sola foto en el tiempo:** en producción se valida con cortes posteriores.
- **Abandono no es respuesta a la campaña:** la v2 es un modelo de *uplift* con grupo de control.
- **Importancia no es causa:** la permutación muestra asociación.
- **Supuestos de dinero ficticios:** por eso se publica la tabla de sensibilidad.
