---
titulo: "¿Llamar a todos los clientes? El modelo dice que no"
categoria: "experimento"
destacado: false
minutos: 6
bajada: "Con datos sintéticos, llamar a todos pierde dinero; llamar a quien vale la pena, gana."
portada:
  imagen: "/img/casos/abandono/03_curva_ganancia.webp"
  alt: "Curva de ganancia: ordenando por valor esperado la campaña llega a COP 2,8 millones contactando al 16 % de los clientes; contactar a todos termina en −COP 10,2 millones."
  pie: "Ganancia neta de la campaña según cuántos clientes se contactan. Datos sintéticos de TiendaLab, tienda ficticia."
resumen:
  - "Construí una tienda en línea ficticia con 20.000 clientes y un modelo que anticipa quién dejará de comprar."
  - "Contactar a todos los clientes pierde COP 10,2 millones; contactar solo al 15,5 % con valor esperado positivo gana COP 2,8 millones."
  - "Elegir por valor esperado rinde 2,5 veces más que elegir solo por probabilidad de irse."
dato:
  cifra: "2,5×"
  texto: "más ganancia al elegir clientes por valor esperado que solo por riesgo de abandono, con el mismo presupuesto."
  fuente: "Datos sintéticos, SP Lab"
decision: "Puntuaría a toda la base cada mes y contactaría solo a quien tenga valor esperado positivo, con una acción según el motivo del riesgo. Y dejaría un grupo sin contactar para medir si la campaña de verdad funciona."
preguntaAlLector: "¿En tu empresa a quién contactan cuando un cliente se está yendo?"
fuentes:
  - "Datos sintéticos: 20.000 clientes de TiendaLab, tienda ficticia. Ninguna fila corresponde a una persona o empresa real."
  - "Método: clasificación supervisada con validación cruzada; valor esperado = probabilidad × efectividad × valor en riesgo − costo del contacto."
  - "Las cifras de dinero dependen de supuestos ficticios: son hallazgos del análisis, no impacto real."
repo:
  url: "https://github.com/Sebaspadi97/customer-churn-retention"
  nota: "Datos, tablas y gráficos bajo CC BY 4.0."
casoRelacionado: "abandono-de-clientes"
publicar: true
---

Casi todas las empresas tienen la misma tentación: cuando ven que los clientes se van, lanzan una campaña a toda la base. Quise probar si eso tiene sentido, y para hacerlo sin usar datos reales de nadie, inventé una tienda.

**El laboratorio.** TiendaLab es una tienda en línea ficticia con 20.000 clientes generados por código. El 16,8 % deja de comprar en los siguientes 90 días. Escondí en los datos las reglas que causan el abandono, como entregas tarde o mucho tiempo sin comprar, y le pedí al modelo que las encontrara sin verlas.

**El modelo más simple ganó.** Probé tres algoritmos y los tres empataron, con un AUC cercano a 0,82. Me quedé con la regresión logística: es igual de precisa, no se sobreajusta y entrega probabilidades confiables. Eso importa porque esas probabilidades se convierten en pesos.

**Encuentra a quienes se van.** En el 10 % de clientes con mayor riesgo, 2 de cada 3 sí abandonan: 3,9 veces el promedio. Y contactando solo al 20 % más riesgoso se llega al 58 % de todos los que se van. La señal más fuerte son los días sin comprar; la más útil para actuar, las entregas tarde.

**Pero encontrar no es ganar.** Con supuestos ficticios (margen del 25 %, contacto de COP 5.000 y 25 % de efectividad), contactar a los 5.000 clientes de prueba pierde COP 10,2 millones. Contactar solo a quien tiene valor esperado positivo, el 15,5 %, gana COP 2,8 millones, casi el máximo posible.

**El costo manda.** Si el contacto costara COP 2.000, convendría llamar a la mitad de la base. Con COP 15.000 y 15 % de efectividad, ninguna campaña sería rentable. La decisión depende más de la economía de la campaña que del modelo.
