// Casos de estudio del lanzamiento.
// Fuente de los textos: fichas de caso en Claude Docs (español) y pestaña "English"
// del documento "SP Lab — Textos del sitio" (inglés), aprobados el 26 oct 2026.
//
// Cada sección es una lista de bloques:
//   { p }            párrafo               { lead }   frase destacada
//   { ul } / { ol }  listas                 { table: { head, rows } }
//   { fig: { src, alt, caption } }          { stats: [{ n, label }] }
//   { sim: true }    simulador interactivo del caso de abandono
// En los textos, **negrita** y *cursiva* se convierten en <strong> y <em>.

const img = (slug, file) => `/img/casos/${slug}/${file}.webp`;

export const pillars = {
  data: { es: 'Data', en: 'Data', tone: 'mint' },
  ml: { es: 'Machine Learning', en: 'Machine Learning', tone: 'mint' },
  mi: { es: 'Market Intelligence', en: 'Market Intelligence', tone: 'gold' },
};

export const cases = [
  // ------------------------------------------------------------------ 1
  {
    key: 'caseChurn',
    pillar: 'ml',
    featured: true,
    tools: ['Python', 'scikit-learn', 'pandas'],
    date: { es: 'oct 2026', en: 'Oct 2026' },
    repo: 'https://github.com/Sebaspadi97/customer-churn-retention',
    thumb: img('abandono', '03_curva_ganancia'),
    es: {
      title: '¿Qué clientes están por irse?',
      question: '¿A quién conviene llamar antes de que deje de comprar?',
      finding: 'llamar al 15,5 % con mayor valor esperado gana; llamar a todos pierde dinero.',
      description: 'Modelo de abandono con datos sintéticos que termina en una decisión económica: a quién contactar y con qué acción.',
      dataTag: 'datos sintéticos',
      facts: [
        ['Autoría', 'Sebastián Padilla (proyecto individual)'],
        ['Método', 'Clasificación supervisada · validación cruzada · importancia por permutación · curva de ganancia'],
        ['Herramientas', 'Python · scikit-learn · pandas · matplotlib'],
        ['Datos', 'Sintéticos: 20.000 clientes de TiendaLab, tienda en línea ficticia'],
        ['Estado', 'v1 terminada · v2 con modelo de uplift'],
      ],
      about: 'Datos sintéticos. TiendaLab es una tienda en línea ficticia y sus 20.000 clientes se generaron con código publicado en el repositorio. Ninguna fila corresponde a una persona o empresa real, y no hay datos de pagos ni del empleador del autor. Las cifras de dinero dependen de supuestos ficticios y son hallazgos del análisis, no impacto real.',
      sections: {
        question: [
          { lead: '¿Qué clientes van a dejar de comprar en los próximos 90 días, a quiénes conviene contactar y con qué acción?' },
          { p: 'Retener cuesta dinero: cupones, envíos gratis, gestión. Contactar a todos desperdicia presupuesto en quien se iba a quedar igual, y no contactar a nadie deja ir a los clientes valiosos.' },
        ],
        data: [
          { p: 'Se generaron 20.000 clientes con su foto al 30 de junio de 2026; el 16,8 % abandona entre julio y septiembre.' },
          { stats: [{ n: '20.000', label: 'clientes' }, { n: '14', label: 'variables' }, { n: '16,8 %', label: 'abandona en 90 días' }] },
          { ul: [
            '**14 variables:** ciudad, antigüedad, canal (app o web), programa de lealtad, pedidos en 12 meses, días desde la última compra, ticket promedio, categorías, % de pedidos con descuento, % de entregas tarde, devoluciones, casos de soporte, calificación de la última compra y % de apertura de correos.',
            '**Etiqueta:** abandono = ninguna compra en los 90 días siguientes.',
            '**Reglas ocultas:** el abandono se generó a partir de recencia, frecuencia, entregas tarde, soporte, mala calificación, lealtad, canal, cazadores de descuento, clientes nuevos y apertura de correos, más ruido. El modelo no las ve. Que las recupere en su ranking de importancia prueba que el método funciona.',
          ] },
        ],
        approach: [
          { p: 'Tres algoritmos empataron, y se eligió el más simple: la regresión logística.' },
          { table: {
            head: ['Modelo', 'AUC CV', 'PR-AUC CV', 'AUC entrenamiento'],
            rows: [
              ['Random Forest', '0,819', '0,565', '0,903'],
              ['**Regresión logística**', '**0,819**', '**0,563**', '**0,821**'],
              ['HistGradientBoosting', '0,818', '0,561', '0,867'],
              ['Referencia (tasa promedio)', '0,500', '0,168', '0,500'],
            ],
          } },
          { ol: [
            '**Partición:** 75 % entrenamiento, 25 % prueba (5.000 clientes), estratificada; validación cruzada de 5 folds.',
            '**Regla de selección declarada:** gana la mejor PR-AUC, salvo que un modelo más simple esté a menos de una desviación estándar.',
            '**Por qué la logística:** igual de precisa, sin sobreajuste (Random Forest cae de 0,90 a 0,82), fácil de explicar y la mejor calibrada (Brier 0,104). La calibración importa porque la probabilidad se convierte en dinero.',
            '**Decisión económica:** valor esperado de contactar = probabilidad × efectividad × valor en riesgo − costo. Supuestos ficticios: margen del 25 %, contacto de COP 5.000 y efectividad del 25 %.',
          ] },
        ],
        findings: [
          { lead: 'El modelo encuentra a quienes se van, pero la ganancia depende de a cuáles se contacta.' },
          { p: '**Qué anticipa el abandono.** Los días sin comprar son la señal más fuerte; las entregas tarde, la más accionable. Le siguen la frecuencia de compra y los casos de soporte.' },
          { fig: { src: img('abandono', '01_que_pesa_mas'), alt: 'Barras de importancia por permutación: días desde la última compra (0,297) muy por encima de % de entregas tarde (0,044), pedidos en 12 meses y casos de soporte.', caption: 'Importancia por permutación de las variables' } },
          { p: '**A quién llega.** En el 10 % de mayor riesgo, 2 de cada 3 clientes sí abandonan: 3,9 veces el promedio.' },
          { fig: { src: img('abandono', '02_curva_captura'), alt: 'Curva de captura: contactando al 20 % de mayor riesgo se alcanza el 58 % de los clientes que abandonan.', caption: 'Curva de captura de abandonos' } },
          { p: '**Cuánto gana.** En los 5.000 clientes de prueba, contactar a todos pierde COP 10,2 millones. La regla “contactar si el valor esperado es mayor que 0” elige al 15,5 % y gana COP 2,8 millones, cerca del máximo posible en retrospectiva (COP 2,9 millones).' },
          { fig: { src: img('abandono', '03_curva_ganancia'), alt: 'Curva de ganancia: ordenando por valor esperado la campaña llega a COP 2,8 millones contactando al 16 %; contactar a todos termina en −COP 10,2 millones.', caption: 'Ganancia neta de la campaña según cuántos clientes se contactan' } },
          { sim: true },
          { p: '**El valor importa tanto como el riesgo.** Con el mismo número de contactos, ordenar por valor esperado gana 2,5 veces más que ordenar solo por probabilidad (COP 2,8 millones frente a 1,1 millones).' },
          { p: '**La decisión depende más del costo del contacto que del modelo.** Con un contacto de COP 2.000 conviene llamar a la mitad de la base; con uno de COP 15.000 y efectividad del 15 %, ninguna campaña es rentable.' },
        ],
        decision: {
          lead: 'Puntuar a la base cada mes, contactar solo a quien tenga valor esperado positivo y elegir la acción según el motivo del riesgo.',
          blocks: [
            { table: {
              head: ['Acción sugerida', '% de contactados'],
              rows: [
                ['Recuperar el servicio (disculpa + envío gratis)', '62 %'],
                ['Reactivar (recordatorio + novedad)', '29 %'],
                ['Invitar al programa de lealtad', '5 %'],
                ['Acompañar al cliente nuevo (segunda compra guiada)', '2 %'],
                ['Cupón focalizado en su categoría', '1 %'],
              ],
            } },
            { ul: [
              '**Atacar la causa:** si las entregas tarde explican la mayoría de los contactos, mejorar la logística puede valer más que cualquier cupón.',
              '**Medir de verdad:** dejar un grupo de control sin contactar; la efectividad del 25 % es un supuesto que solo un experimento confirma.',
            ] },
          ],
        },
        limits: [
          { p: 'Los resultados muestran el método, no el desempeño en una tienda real.' },
          { ul: [
            '**Datos sintéticos:** el modelo aprende reglas que también se escribieron en código; con datos reales el AUC probablemente será menor.',
            '**Una sola foto en el tiempo:** en producción se valida con cortes posteriores.',
            '**Abandono no es respuesta a la campaña:** la v2 es un modelo de *uplift* con grupo de control.',
            '**Importancia no es causa:** la permutación muestra asociación.',
            '**Supuestos de dinero ficticios:** por eso se publica la tabla de sensibilidad.',
          ] },
        ],
      },
      license: 'Datos, tablas y gráficos bajo CC BY 4.0. Código con todos los derechos reservados.',
    },
    en: {
      title: 'Which customers are about to leave?',
      question: 'Who should you contact before they stop buying?',
      finding: 'contacting the top 15.5% by expected value wins; contacting everyone loses money.',
      description: 'A churn model on synthetic data that ends in an economic decision: who to contact and with what action.',
      dataTag: 'synthetic data',
      facts: [
        ['Author', 'Sebastián Padilla (solo project)'],
        ['Method', 'Supervised classification · cross-validation · permutation importance · profit curve'],
        ['Tools', 'Python · scikit-learn · pandas · matplotlib'],
        ['Data', 'Synthetic: 20,000 customers of TiendaLab, a fictional online store'],
        ['Status', 'Version 1 complete · version 2 with an uplift model'],
      ],
      about: "Synthetic data. TiendaLab is a fictional online store, and its 20,000 customers were generated with code published in the repository. No row belongs to a real person or company, and there is no payment data or data from the author's employer. Money figures depend on fictional assumptions: they are analytical findings, not real-world impact.",
      sections: {
        question: [
          { lead: 'Which customers will stop buying in the next 90 days, which ones are worth contacting, and with what action?' },
          { p: 'Retention costs money: coupons, free shipping, staff time. Contacting everyone wastes budget on people who would have stayed anyway, and contacting no one lets valuable customers walk away.' },
        ],
        data: [
          { p: 'I generated 20,000 customers as of June 30, 2026; 16.8% churn between July and September.' },
          { stats: [{ n: '20,000', label: 'customers' }, { n: '14', label: 'features' }, { n: '16.8%', label: 'churn within 90 days' }] },
          { ul: [
            '**14 features:** city, tenure, channel (app or web), loyalty program, orders in the last 12 months, days since last purchase, average order value, categories, % of orders with a discount, % of late deliveries, returns, support tickets, last purchase rating and email open rate.',
            '**Label:** churn = no purchase in the following 90 days.',
            '**Hidden rules:** churn was generated from recency, frequency, late deliveries, support tickets, poor ratings, loyalty, channel, discount hunting, new customers and email engagement, plus noise. The model never sees these rules. If it recovers them in its importance ranking, the method works.',
          ] },
        ],
        approach: [
          { p: 'Three algorithms tied, and I chose the simplest one: logistic regression.' },
          { table: {
            head: ['Model', 'CV AUC', 'CV PR-AUC', 'Training AUC'],
            rows: [
              ['Random Forest', '0.819', '0.565', '0.903'],
              ['**Logistic regression**', '**0.819**', '**0.563**', '**0.821**'],
              ['HistGradientBoosting', '0.818', '0.561', '0.867'],
              ['Baseline (average rate)', '0.500', '0.168', '0.500'],
            ],
          } },
          { ol: [
            '**Split:** 75% training, 25% test (5,000 customers), stratified; 5-fold cross-validation.',
            '**Pre-declared selection rule:** best PR-AUC wins, unless a simpler model is within one standard deviation.',
            '**Why logistic regression:** just as accurate, no overfitting (Random Forest drops from 0.90 to 0.82), easy to explain and the best calibrated (Brier score 0.104). Calibration matters because the probability turns into money.',
            '**Economic decision:** expected value of contacting = probability × effectiveness × value at risk − cost. Fictional assumptions: 25% margin, COP 5,000 per contact and 25% effectiveness.',
          ] },
        ],
        findings: [
          { lead: 'The model finds the customers who leave, but profit depends on which ones you contact.' },
          { p: '**What predicts churn.** Days since last purchase is the strongest signal; late deliveries, the most actionable. Purchase frequency and support tickets come next.' },
          { fig: { src: img('abandono', '01_que_pesa_mas'), alt: 'Permutation importance bars: days since last purchase (0.297) far ahead of late deliveries (0.044), orders in 12 months and support tickets.', caption: 'Permutation importance of the features (chart labels in Spanish)' } },
          { p: '**Who it reaches.** In the top 10% risk group, 2 out of 3 customers do churn: 3.9 times the average.' },
          { fig: { src: img('abandono', '02_curva_captura'), alt: 'Capture curve: contacting the riskiest 20% reaches 58% of the customers who churn.', caption: 'Churn capture curve (chart labels in Spanish)' } },
          { p: '**How much it earns.** On the 5,000 test customers, contacting everyone loses COP 10.2 million. The rule "contact if expected value is above zero" selects 15.5% and earns COP 2.8 million, close to the best possible result in hindsight (COP 2.9 million).' },
          { fig: { src: img('abandono', '03_curva_ganancia'), alt: 'Profit curve: ranking by expected value peaks at COP 2.8 million contacting 16%; contacting everyone ends at minus COP 10.2 million.', caption: 'Net campaign profit by share of customers contacted (chart labels in Spanish)' } },
          { sim: true },
          { p: '**Value matters as much as risk.** With the same number of contacts, ranking by expected value earns 2.5 times more than ranking by probability alone (COP 2.8 million vs. 1.1 million).' },
          { p: '**Contact cost matters more than the model.** At COP 2,000 per contact, it pays to reach half the base; at COP 15,000 with 15% effectiveness, no campaign is profitable.' },
        ],
        decision: {
          lead: 'Score the full base every month, contact only customers with positive expected value, and pick the action based on why they are at risk.',
          blocks: [
            { table: {
              head: ['Suggested action', '% of contacted customers'],
              rows: [
                ['Service recovery (apology + free shipping)', '62%'],
                ['Reactivation (reminder + new arrivals)', '29%'],
                ['Loyalty program invitation', '5%'],
                ['New customer onboarding (guided second purchase)', '2%'],
                ['Targeted coupon in their category', '1%'],
              ],
            } },
            { ul: [
              '**Fix the cause:** if late deliveries drive most contacts, improving logistics may be worth more than any coupon.',
              '**Measure for real:** keep a control group that is not contacted; the 25% effectiveness is an assumption only an experiment can confirm.',
            ] },
          ],
        },
        limits: [
          { p: 'These results show the method, not performance in a real store.' },
          { ul: [
            '**Synthetic data:** the model learns rules that were also written in code; with real data, AUC will probably be lower.',
            '**A single snapshot:** in production, validate with later time periods.',
            '**Churn is not campaign response:** version 2 is an *uplift* model with a control group.',
            '**Importance is not causation:** permutation importance shows association.',
            '**Fictional money assumptions:** that is why the sensitivity table is published.',
          ] },
        ],
      },
      license: 'Data, tables and charts under CC BY 4.0. Code: all rights reserved.',
    },
  },

  // ------------------------------------------------------------------ 2
  {
    key: 'caseHospital',
    pillar: 'ml',
    tools: ['Python', 'scikit-learn', 'pandas'],
    team: true,
    date: { es: 'oct 2026', en: 'Oct 2026' },
    repo: 'https://github.com/Sebaspadi97/hospital-length-of-stay',
    thumb: img('estancia', '02_error_por_dias_restantes'),
    es: {
      title: '¿Cuántos días le quedan a un paciente en el hospital?',
      question: '¿Se puede estimar la estancia restante mejor que con el promedio histórico?',
      finding: 'el modelo reduce el error a 6,19 días, 6,4 % menos que la referencia histórica.',
      description: 'Modelo que estima cuántos días de hospitalización le quedan a un paciente, con validación temporal y hoy en piloto institucional.',
      dataTag: 'resultados agregados',
      teamLine: 'Trabajo en equipo con Alexandra Castro y Kevin Alejandro Paez.',
      facts: [
        ['Equipo', 'Alexandra Castro, Kevin Alejandro Paez y Sebastián Padilla'],
        ['Mi rol', 'Calidad y preparación de datos, control de fuga, trazabilidad, análisis por grupos y reproducibilidad'],
        ['Método', 'Regresión supervisada · CRISP-DM · validación temporal'],
        ['Herramientas', 'Python · scikit-learn · XGBoost · pandas · Power Pages'],
        ['Contexto', 'Proyecto final de Machine Learning I, Maestría en Ciencia de Datos (Universidad EAN), 2026'],
        ['Estado', 'Terminado · piloto institucional en marcha'],
      ],
      about: 'Este proyecto usa datos clínicos reales de un hospital de alta complejidad en Bogotá, tratados con autorización institucional para fines analíticos y académicos. Las bases de pacientes no se publican. Aquí solo se muestran resultados agregados, sin identificadores ni registros individuales. Los datos no provienen del empleador del autor.',
      sections: {
        question: [
          { lead: '¿Cuántos días de hospitalización le quedan a un paciente, según su edad, sexo, grupo diagnóstico (GRD), severidad y los días que ya lleva internado?' },
          { p: 'En un hospital de alta complejidad, no saber cuándo saldrá un paciente complica tres cosas: anticipar revisiones, coordinar el egreso y organizar las camas. El modelo no reemplaza el criterio médico. Da una señal para priorizar el seguimiento.' },
          { ul: [
            '**Quién decide:** gestión de camas y operaciones clínicas; las decisiones médicas siguen en el equipo tratante.',
            '**Costo del error:** subestimar crea falsas expectativas; sobreestimar retrasa la gestión del egreso.',
          ] },
        ],
        data: [
          { p: 'Se usaron 37.053 hospitalizaciones de 2024 a 2026, con una partición por año para evitar mirar el futuro.' },
          { stats: [{ n: '37.053', label: 'hospitalizaciones' }, { n: '8', label: 'variables' }, { n: '2024–2026', label: 'cobertura' }] },
          { table: {
            head: ['Año', 'Uso', 'Volumen'],
            rows: [
              ['2024', 'Referencia histórica (mediana por GRD y severidad)', '14.096 episodios'],
              ['2025', 'Entrenamiento y validación cruzada', '13.855 episodios · 42.657 cortes'],
              ['2026', 'Prueba temporal', '9.102 episodios · 28.829 cortes'],
            ],
          } },
          { ul: [
            '**Fuentes:** registro de gestión clínica (estancia, GRD, severidad, peso y norma) cruzado con el conjunto mínimo de datos (edad y sexo), con 99,99 % de concordancia.',
            '**Cortes:** cada hospitalización se observa en los días 0, 1, 3, 7, 14, 30 y 60 mientras siga abierta. El objetivo es días restantes = estancia final − día actual.',
            '**Ocho variables:** día actual, edad, sexo, GRD, severidad, peso del GRD, norma de estancia y mediana histórica 2024.',
            '**Dato curioso:** la estancia media es 8,6 días, pero la mediana es 5. Unos pocos casos muy largos (hasta 466 días) estiran el promedio.',
          ] },
        ],
        approach: [
          { p: 'Se compararon ocho algoritmos contra dos referencias simples, y ganó Random Forest por el menor error medio en validación (5,98 días).' },
          { ol: [
            '**Dos líneas base que hay que superar:** una mediana constante y la mediana histórica por GRD y severidad (P50 2024).',
            '**Validación sin trampas:** GroupKFold por episodio, para que los cortes de un mismo paciente no queden a la vez en entrenamiento y validación.',
            '**Preprocesamiento dentro del Pipeline:** imputación, codificación y escalado se aprenden solo con cada partición de entrenamiento.',
            '**Ablación:** al quitar las referencias y el GRD, el error sube de 6,01 a 7,65 días, lo que confirma su valor.',
            '**Prueba final en 2026:** el modelo ganador se aplica a un año que no se usó para elegirlo.',
          ] },
          { p: 'Las diferencias entre Random Forest, XGBoost y HistGradientBoosting son pequeñas, así que la elección sigue la regla declarada y no se presenta como una superioridad clara.' },
          { fig: { src: img('estancia', '01_comparacion_modelos'), alt: 'Error absoluto medio en validación cruzada 2025 de 8 algoritmos y 2 referencias: Random Forest 5,98, XGBoost 5,99, HistGradientBoosting 6,01; referencia P50 histórica 6,23; árbol sin poda 7,69.', caption: 'Los seis primeros modelos quedan a menos de 0,12 días entre sí; el árbol sin poda es el ejemplo claro de sobreajuste.' } },
        ],
        findings: [
          { lead: 'En la prueba de 2026, Random Forest baja el error medio a 6,19 días, un 6,4 % menos que la referencia histórica. Pero no gana en todo.' },
          { table: {
            head: ['Métrica (prueba 2026)', 'Random Forest', 'P50 histórica', 'Mediana constante'],
            rows: [
              ['MAE (días)', '**6,19**', '6,62', '7,34'],
              ['RMSE (días)', '**12,10**', '13,24', '14,81'],
              ['R²', '**0,24**', '0,09', '−0,14'],
              ['Dentro de ±3 días', '46,8 %', '**53,5 %**', '51,6 %'],
              ['Sesgo (predicho − real)', '**−0,6 d**', '−4,4 d', '−5,1 d'],
            ],
          } },
          { ul: [
            '**Estancias cortas:** cuando faltan 7 días o menos, la referencia simple acierta más que el modelo.',
            '**Estancias largas, el gran reto:** cuando faltan más de 28 días, el error sube a 28,7 días y el modelo subestima unos 24 días en promedio.',
            '**La unidad cambia la conclusión:** si cada hospitalización pesa igual (no cada corte), la referencia queda ligeramente mejor (4,69 frente a 4,78 días).',
            '**Por severidad:** el error va de 2,3 días en severidad baja a 8,7 en alta.',
          ] },
          { fig: { src: img('estancia', '02_error_por_dias_restantes'), alt: 'Error absoluto medio en la prueba 2026 por días que faltaban: con 3 días o menos el modelo yerra 3,7 frente a 2,1 de la referencia; con más de 28 días, 28,7 frente a 37,1.', caption: 'El modelo empieza a ganarle a la referencia desde los 8 días restantes, justo donde más cuesta planear una cama.' } },
        ],
        decision: {
          lead: 'Usar el modelo como apoyo informativo y supervisado para priorizar egresos, nunca como fecha de alta.',
          blocks: [
            { ul: [
              'Mostrar cada estimación con una banda de incertidumbre, no como un número exacto.',
              'Activar una alerta cuando el paciente pertenece a un grupo con riesgo de gran error (estancias largas, severidad alta).',
              'No usar la fecha estimada para compromisos operativos irreversibles.',
              'Definir con el equipo clínico qué umbral de error es aceptable y qué cuesta más: subestimar o sobreestimar.',
            ] },
            { p: 'El modelo ya está en un piloto institucional; el seguimiento de esos pacientes medirá su desempeño real.' },
          ],
        },
        limits: [
          { p: 'Los resultados son una prueba retrospectiva, no una garantía de precisión con pacientes activos.' },
          { ul: [
            '**GRD de egreso:** el grupo diagnóstico final puede incluir información posterior al día simulado; en la práctica solo existe un GRD provisional, menos completo.',
            '**Prueba no del todo intacta:** el año 2026 se consultó durante iteraciones previas. Hace falta una cohorte posterior sin consultas.',
            '**Sobreajuste moderado:** Random Forest tiene una brecha de 1,1 días entre entrenamiento (4,88) y validación (5,98).',
            '**Cobertura parcial:** no todos los pacientes cumplen las condiciones para recibir estimación.',
            '**Equidad:** las diferencias por sexo no prueban discriminación; pueden venir de la mezcla de diagnósticos y severidad.',
            '**Impacto no medido:** menos error no equivale a menos días-cama. Eso requiere medir el piloto.',
          ] },
        ],
        team: [
          { p: 'Proyecto en equipo con Alexandra Castro y Kevin Alejandro Paez. Mi parte se centró en la calidad y preparación de los datos, el control de fuga de información, la trazabilidad de los experimentos y el análisis del error por grupos. Participé en todo el desarrollo y en la sustentación.' },
          { table: {
            head: ['Integrante', 'Programa', 'Aporte principal'],
            rows: [
              ['**Sebastián Padilla**', 'Maestría en Ciencia de Datos', 'Calidad y preparación de datos, control de fuga, trazabilidad experimental, análisis de error por grupos y reproducibilidad'],
              ['Alexandra Castro', 'Especialización en Machine Learning', 'Modelos, validación cruzada, sobreajuste, métricas y comparación de algoritmos'],
              ['Kevin Alejandro Paez', 'Maestría en Ciencia de Datos', 'Problema operativo, flujo de datos, variables, aplicación institucional y seguimiento del piloto'],
            ],
          } },
          { p: 'El equipo usó ChatGPT como apoyo en organización, revisión de código y documentación; todos los resultados fueron verificados por el equipo.' },
        ],
      },
      license: 'Código (de los tres autores) y resultados agregados con todos los derechos reservados. Los resultados se pueden citar con atribución a los tres autores.',
    },
    en: {
      title: 'How many days does a patient have left in hospital?',
      question: 'Can remaining length of stay be estimated better than with the historical average?',
      finding: 'the model cuts error to 6.19 days, 6.4% less than the historical baseline.',
      description: 'A model that estimates how many hospital days a patient has left, with temporal validation and now in an institutional pilot.',
      dataTag: 'aggregate results',
      teamLine: 'Team project with Alexandra Castro and Kevin Alejandro Paez.',
      facts: [
        ['Team', 'Alexandra Castro, Kevin Alejandro Paez and Sebastián Padilla'],
        ['My role', 'Data quality and preparation, leakage control, experiment tracking, error analysis by group and reproducibility'],
        ['Method', 'Supervised regression · CRISP-DM · temporal validation'],
        ['Tools', 'Python · scikit-learn · XGBoost · pandas · Power Pages'],
        ['Context', "Final project for Machine Learning I, Master's in Data Science (Universidad EAN), 2026"],
        ['Status', 'Completed · institutional pilot underway'],
      ],
      about: "This project uses real clinical data from a high-complexity hospital in Bogotá, processed with institutional authorization for analytical and academic purposes. Patient records are not published. Only aggregate results are shown here, with no identifiers or individual records. The data does not come from the author's employer.",
      sections: {
        question: [
          { lead: 'How many hospital days does a patient have left, given their age, sex, diagnosis-related group (DRG), severity and the days they have already spent in hospital?' },
          { p: 'In a high-complexity hospital, not knowing when a patient will be discharged makes three things harder: planning reviews, coordinating discharge and managing beds. The model does not replace clinical judgment. It gives a signal to prioritize follow-up.' },
          { ul: [
            '**Who decides:** bed management and clinical operations; medical decisions stay with the care team.',
            '**Cost of error:** underestimating creates false expectations; overestimating delays discharge planning.',
          ] },
        ],
        data: [
          { p: 'We used 37,053 hospital stays from 2024 to 2026, split by year to avoid looking into the future.' },
          { stats: [{ n: '37,053', label: 'hospital stays' }, { n: '8', label: 'features' }, { n: '2024–2026', label: 'coverage' }] },
          { table: {
            head: ['Year', 'Use', 'Volume'],
            rows: [
              ['2024', 'Historical baseline (median by DRG and severity)', '14,096 stays'],
              ['2025', 'Training and cross-validation', '13,855 stays · 42,657 snapshots'],
              ['2026', 'Temporal test', '9,102 stays · 28,829 snapshots'],
            ],
          } },
          { ul: [
            '**Sources:** clinical management records (length of stay, DRG, severity, weight and expected stay) joined with the minimum basic data set (age and sex), with 99.99% match.',
            '**Snapshots:** each stay is observed on days 0, 1, 3, 7, 14, 30 and 60 while still open. The target is remaining days = final length of stay − current day.',
            '**Eight features:** current day, age, sex, DRG, severity, DRG weight, expected stay and 2024 historical median.',
            '**Fun fact:** the average stay is 8.6 days, but the median is 5. A few very long cases (up to 466 days) stretch the average.',
          ] },
        ],
        approach: [
          { p: 'We compared eight algorithms against two simple baselines, and Random Forest won with the lowest mean error in validation (5.98 days).' },
          { ol: [
            '**Two baselines to beat:** a constant median and the historical median by DRG and severity (2024 P50).',
            '**Leak-free validation:** GroupKFold by stay, so snapshots of the same patient never land in both training and validation.',
            '**Preprocessing inside the pipeline:** imputation, encoding and scaling are learned only from each training split.',
            '**Ablation:** removing the baselines and the DRG raises error from 6.01 to 7.65 days, confirming their value.',
            '**Final test on 2026:** the winning model is applied to a year that was not used to choose it.',
          ] },
          { p: 'The differences between Random Forest, XGBoost and HistGradientBoosting are small, so the choice follows the pre-declared rule and is not presented as a clear superiority.' },
          { fig: { src: img('estancia', '01_comparacion_modelos'), alt: 'Mean absolute error in 2025 cross-validation for 8 algorithms and 2 baselines: Random Forest 5.98, XGBoost 5.99, HistGradientBoosting 6.01; historical P50 baseline 6.23; unpruned tree 7.69.', caption: 'The top six models are within 0.12 days of each other; the unpruned tree is the clear case of overfitting (chart labels in Spanish).' } },
        ],
        findings: [
          { lead: "On the 2026 test, Random Forest lowers mean error to 6.19 days, 6.4% less than the historical baseline. But it doesn't win everywhere." },
          { table: {
            head: ['Metric (2026 test)', 'Random Forest', 'Historical P50', 'Constant median'],
            rows: [
              ['MAE (days)', '**6.19**', '6.62', '7.34'],
              ['RMSE (days)', '**12.10**', '13.24', '14.81'],
              ['R²', '**0.24**', '0.09', '−0.14'],
              ['Within ±3 days', '46.8%', '**53.5%**', '51.6%'],
              ['Bias (predicted − actual)', '**−0.6 d**', '−4.4 d', '−5.1 d'],
            ],
          } },
          { ul: [
            '**Short stays:** with 7 days or fewer remaining, the simple baseline is more accurate than the model.',
            '**Long stays, the big challenge:** with more than 28 days remaining, error rises to 28.7 days and the model underestimates by about 24 days on average.',
            '**The unit changes the conclusion:** if each stay counts equally (instead of each snapshot), the baseline comes out slightly ahead (4.69 vs. 4.78 days).',
            '**By severity:** error ranges from 2.3 days at low severity to 8.7 at high severity.',
          ] },
          { fig: { src: img('estancia', '02_error_por_dias_restantes'), alt: 'Mean absolute error on the 2026 test by days actually remaining: with 3 days or fewer the model misses by 3.7 vs. 2.1 for the baseline; with more than 28 days, 28.7 vs. 37.1.', caption: 'The model starts beating the baseline at 8 remaining days, exactly where bed planning is hardest (chart labels in Spanish).' } },
        ],
        decision: {
          lead: 'Use the model as an informative, supervised aid to prioritize discharges, never as a discharge date.',
          blocks: [
            { ul: [
              'Show each estimate with an uncertainty band, not as an exact number.',
              'Trigger an alert when a patient belongs to a group with high error risk (long stays, high severity).',
              'Do not use the estimated date for irreversible operational commitments.',
              'Agree with the clinical team on an acceptable error threshold and which is costlier: underestimating or overestimating.',
            ] },
            { p: 'The model is already in an institutional pilot; following those patients will measure its real-world performance.' },
          ],
        },
        limits: [
          { p: 'These results come from a retrospective test, not a guarantee of accuracy on active patients.' },
          { ul: [
            '**Discharge DRG:** the final diagnostic group may include information from after the simulated day; in practice only a provisional, less complete DRG exists.',
            '**Test set not fully untouched:** 2026 was consulted during earlier iterations. A later, unseen cohort is needed.',
            '**Moderate overfitting:** Random Forest shows a 1.1-day gap between training (4.88) and validation (5.98).',
            '**Partial coverage:** not every patient meets the conditions to receive an estimate.',
            '**Fairness:** differences by sex do not prove discrimination; they may come from the mix of diagnoses and severity.',
            '**Impact not measured:** lower error does not mean fewer bed-days. That requires measuring the pilot.',
          ] },
        ],
        team: [
          { p: 'Team project with Alexandra Castro and Kevin Alejandro Paez. My work focused on data quality and preparation, information leakage control, experiment tracking and error analysis by group. I took part in the full development and in the final defense.' },
          { table: {
            head: ['Member', 'Program', 'Main contribution'],
            rows: [
              ['**Sebastián Padilla**', "Master's in Data Science", 'Data quality and preparation, leakage control, experiment tracking, error analysis by group and reproducibility'],
              ['Alexandra Castro', 'Specialization in Machine Learning', 'Models, cross-validation, overfitting, metrics and algorithm comparison'],
              ['Kevin Alejandro Paez', "Master's in Data Science", 'Operational problem, data flow, features, institutional application and pilot follow-up'],
            ],
          } },
          { p: 'The team used ChatGPT to support organization, code review and documentation; all results were verified by the team.' },
        ],
      },
      license: 'Code (by the three authors) and aggregate results: all rights reserved. Results may be cited with attribution to the three authors.',
    },
  },

  // ------------------------------------------------------------------ 3
  {
    key: 'caseBusiness',
    pillar: 'data',
    tools: ['Python', 'pandas'],
    date: { es: 'oct 2026', en: 'Oct 2026' },
    repo: 'https://github.com/Sebaspadi97/bogota-business-births',
    thumb: img('emprendimiento', '01_tasa_creacion_localidad'),
    es: {
      title: 'Radiografía del emprendimiento en Bogotá',
      question: '¿En qué localidades y sectores nacen más empresas, y quiénes las lideran?',
      finding: 'Ciudad Bolívar crea empresas a más del doble del ritmo de Chapinero.',
      description: 'Dónde y en qué nacen las empresas de Bogotá, con datos abiertos del primer trimestre de 2026.',
      dataTag: 'datos abiertos',
      facts: [
        ['Autoría', 'Sebastián Padilla (proyecto individual)'],
        ['Método', 'Análisis descriptivo · indicadores de tasa y participación · auditoría de calidad de datos'],
        ['Herramientas', 'Python · pandas · matplotlib'],
        ['Fuente', 'Datos Abiertos Bogotá · Dinámica Empresarial, corte marzo 2026'],
        ['Estado', 'v1 terminada · se fortalecerá en una v2'],
      ],
      about: 'Este análisis usa datos abiertos del conjunto “Dinámica Empresarial Bogotá”, publicado en Datos Abiertos Bogotá bajo licencia CC BY-SA 4.0, con corte a marzo de 2026. Las tablas y gráficos derivados se comparten bajo la misma licencia. Son registros agregados de empresas; no hay datos personales ni datos del empleador del autor.',
      sections: {
        question: [
          { lead: '¿En qué localidades y sectores de Bogotá nacen más empresas, y quiénes las lideran?' },
          { p: 'La respuesta sirve a dos públicos: a quien va a emprender y quiere saber dónde hay movimiento, y a quien diseña programas de fomento y debe decidir dónde invertir.' },
          { p: 'La pregunta original incluía cuántas empresas se sostienen. Se ajustó porque el archivo no trae cancelaciones (ver Datos).' },
        ],
        data: [
          { p: 'Se usaron 44.743 registros agregados que suman 465.498 empresas vigentes y 21.407 creadas entre enero y marzo de 2026.' },
          { stats: [{ n: '465.498', label: 'empresas vigentes' }, { n: '21.407', label: 'empresas nuevas' }, { n: 'ene–mar 2026', label: 'periodo' }] },
          { p: 'Cada registro cruza localidad, tamaño, rama, código CIIU, organización jurídica y sexo del representante legal. La auditoría encontró siete problemas, y contarlos es parte del caso:' },
          { table: {
            head: ['Hallazgo de calidad', 'Tratamiento'],
            rows: [
              ['El archivo “.xlsx” es en realidad una tabla DBF', 'Lector propio en Python'],
              ['Empresas canceladas en cero en todo el archivo', 'Se excluye la supervivencia; queda para v2'],
              ['Un solo corte (marzo 2026)', 'Análisis transversal, sin tendencias'],
              ['Códigos de localidad distintos a los oficiales (Chapinero aparece con el 19)', 'Se usa el nombre, coherente con el perfil de cada localidad'],
              ['Sumapaz ausente y 4,9 % de empresas sin localidad', 'Se reporta; “Sin localidad” queda fuera de los rankings'],
              ['CIIU sin ceros a la izquierda (0010 aparece como 10)', 'Se completa a cuatro dígitos'],
              ['6.878 registros con sexo del representante “Indeterminado”', 'Los % de mujeres se calculan sobre sexo conocido'],
            ],
          } },
        ],
        approach: [
          { p: 'Tres indicadores simples, calculados por localidad, rama, actividad y tamaño:' },
          { ol: [
            '**Tasa de creación:** empresas creadas en ene–mar ÷ vigentes a marzo × 100. Es trimestral, no anual.',
            '**Participación:** qué parte de las empresas nuevas aporta cada grupo.',
            '**% de mujeres al frente:** representantes legales mujeres ÷ (mujeres + hombres), en vigentes y en nuevas.',
          ] },
          { p: 'Las descripciones de las actividades vienen de la Resolución DIAN 0139 de 2012 (CIIU Rev. 4 A.C.). Todo el proceso es reproducible con dos scripts de Python.' },
        ],
        findings: [
          { lead: 'Entre enero y marzo de 2026 nacieron 21.407 empresas en Bogotá, unas 238 por día: 4,6 por cada 100 vigentes.' },
          { p: '**El sur se renueva más rápido.** Ciudad Bolívar, Bosa y Usme crean más empresas por cada 100 existentes. Chapinero, donde se concentran las grandes, tiene la tasa más baja. En volumen absoluto lideran Suba (2.604) y Kennedy (2.421).' },
          { fig: { src: img('emprendimiento', '01_tasa_creacion_localidad'), alt: 'Tasa de creación de empresas por localidad, primer trimestre de 2026: Ciudad Bolívar 6,7, Bosa 6,5 y Usme 6,3 por cada 100 vigentes; Chapinero, la más baja, 3,0.', caption: 'Empresas creadas por cada 100 vigentes, por localidad' } },
          { p: '**Más mujeres al frente de lo nuevo.** El 45,1 % de las empresas nuevas tiene una mujer como representante legal, frente al 41,1 % de las vigentes. Ocurre en 17 de las 19 localidades; las excepciones son Antonio Nariño y La Candelaria.' },
          { fig: { src: img('emprendimiento', '02_mujeres_localidad'), alt: 'Porcentaje de empresas con mujer como representante legal, vigentes frente a nuevas, por localidad: en 17 de 19 localidades es mayor entre las nuevas.', caption: 'Mujeres representantes legales: empresas vigentes frente a nuevas' } },
          { p: '**Bares, belleza y comida encabezan.** Los bares son la actividad con más empresas nuevas, 1,7 veces más que la segunda.' },
          { fig: { src: img('emprendimiento', '03_top_actividades'), alt: 'Actividades económicas con más empresas nuevas en el primer trimestre de 2026, encabezadas por los bares con 1.503.', caption: 'Actividades con más empresas nuevas' } },
          { p: '**Casi todo lo nuevo es micro y de persona natural.** El 99,9 % de las empresas nuevas son microempresas y el 63,6 % se registra como persona natural.' },
        ],
        decision: {
          lead: 'Enfocar el apoyo al emprendimiento en el sur, donde más empresas nacen por cada cien existentes y donde más mujeres las lideran.',
          blocks: [
            { ul: [
              '**Programas de fomento:** priorizar formalización y acompañamiento en Ciudad Bolívar, Bosa, Usme y Tunjuelito, donde la tasa de creación y la participación de mujeres son más altas.',
              '**Quien va a emprender:** comida y bebida es el sector con más entrada de competidores. Antes de abrir un bar o restaurante, conviene medir la saturación de la zona (lo aborda el caso del café).',
              '**Próximo análisis:** medir cuántas de estas empresas sobreviven el primer año antes de invertir a gran escala.',
            ] },
          ],
        },
        limits: [
          { p: 'Esta v1 muestra dónde nacen empresas, no cuáles sobreviven.' },
          { ul: [
            '**Sin cancelaciones:** no se puede medir supervivencia ni creación neta. Para v2: buscar otros cortes del portal o informes de la Cámara de Comercio de Bogotá y Confecámaras.',
            '**Un solo corte:** no hay tendencia ni estacionalidad; el primer trimestre puede no representar el año.',
            '**La tasa favorece a localidades pequeñas:** pocas vigentes inflan la proporción. En v2 se complementa con empresas por cada 1.000 habitantes.',
            '**Registro no es actividad real:** una empresa matriculada no necesariamente está operando, y la informalidad queda por fuera.',
            '**Sexo del representante legal:** describe quién figura en el registro, no la propiedad ni quién dirige en la práctica.',
          ] },
        ],
      },
      license: 'Tablas y gráficos bajo CC BY-SA 4.0, como la fuente. Código con todos los derechos reservados.',
    },
    en: {
      title: "Where are Bogotá's new businesses born?",
      question: 'Which districts and sectors create the most businesses, and who leads them?',
      finding: 'Ciudad Bolívar creates businesses at more than twice the rate of Chapinero.',
      description: "Where and in what sectors Bogotá's businesses are born, using open data from the first quarter of 2026.",
      dataTag: 'open data',
      facts: [
        ['Author', 'Sebastián Padilla (solo project)'],
        ['Method', 'Descriptive analysis · rate and share indicators · data quality audit'],
        ['Tools', 'Python · pandas · matplotlib'],
        ['Source', 'Bogotá Open Data · Business Dynamics (Dinámica Empresarial), March 2026 release'],
        ['Status', 'Version 1 complete · to be extended in version 2'],
      ],
      about: 'This analysis uses open data from the "Dinámica Empresarial Bogotá" dataset, published on Bogotá Open Data under a CC BY-SA 4.0 license, as of March 2026. Derived tables and charts are shared under the same license. These are aggregate business records; there is no personal data and no data from the author\'s employer.',
      sections: {
        question: [
          { lead: 'In which districts and sectors of Bogotá are the most businesses born, and who leads them?' },
          { p: 'The answer serves two audiences: people about to start a business who want to know where the activity is, and those who design entrepreneurship programs and must decide where to invest.' },
          { p: 'The original question included how many businesses survive. I adjusted it because the file has no closures (see The data).' },
        ],
        data: [
          { p: 'I used 44,743 aggregate records covering 465,498 active businesses and 21,407 created between January and March 2026.' },
          { stats: [{ n: '465,498', label: 'active businesses' }, { n: '21,407', label: 'new businesses' }, { n: 'Jan–Mar 2026', label: 'period' }] },
          { p: "Each record crosses district, size, sector, ISIC code, legal form and the legal representative's sex. The audit found seven issues, and reporting them is part of the case:" },
          { table: {
            head: ['Data quality issue', 'Treatment'],
            rows: [
              ['The ".xlsx" file is actually a DBF table', 'Custom reader in Python'],
              ['Closed businesses are zero across the whole file', 'Survival excluded; left for version 2'],
              ['A single snapshot (March 2026)', 'Cross-sectional analysis, no trends'],
              ['District codes differ from the official ones (Chapinero appears as 19)', "District names used instead, consistent with each district's profile"],
              ['Sumapaz missing and 4.9% of businesses with no district', 'Reported; "No district" excluded from rankings'],
              ['ISIC codes missing leading zeros (0010 appears as 10)', 'Padded to four digits'],
              ['6,878 records with the representative\'s sex "Undetermined"', "Women's shares calculated on known sex only"],
            ],
          } },
        ],
        approach: [
          { p: 'Three simple indicators, calculated by district, sector, activity and size:' },
          { ol: [
            '**Creation rate:** businesses created in January–March ÷ active businesses in March × 100. It is quarterly, not annual.',
            '**Share:** what part of new businesses each group contributes.',
            '**% led by women:** female legal representatives ÷ (women + men), for active and new businesses.',
          ] },
          { p: 'Activity descriptions come from DIAN Resolution 0139 of 2012 (ISIC Rev. 4 adapted for Colombia). The whole process is reproducible with two Python scripts.' },
        ],
        findings: [
          { lead: 'Between January and March 2026, 21,407 businesses were born in Bogotá, about 238 a day: 4.6 for every 100 active ones.' },
          { p: '**The south renews faster.** Ciudad Bolívar, Bosa and Usme create the most businesses per 100 existing ones. Chapinero, where large companies concentrate, has the lowest rate. In absolute volume, Suba (2,604) and Kennedy (2,421) lead.' },
          { fig: { src: img('emprendimiento', '01_tasa_creacion_localidad'), alt: 'Business creation rate by district, first quarter of 2026: Ciudad Bolívar 6.7, Bosa 6.5 and Usme 6.3 per 100 active businesses; Chapinero lowest at 3.0.', caption: 'New businesses per 100 active ones, by district (chart labels in Spanish)' } },
          { p: "**More women at the helm of what's new.** 45.1% of new businesses have a woman as legal representative, versus 41.1% of active ones. This happens in 17 of the 19 districts; the exceptions are Antonio Nariño and La Candelaria." },
          { fig: { src: img('emprendimiento', '02_mujeres_localidad'), alt: 'Share of businesses with a female legal representative, active vs. new, by district: higher among new businesses in 17 of 19 districts.', caption: 'Female legal representatives: active vs. new businesses (chart labels in Spanish)' } },
          { p: '**Bars, beauty and food lead.** Bars are the activity with the most new businesses, 1.7 times more than the second.' },
          { fig: { src: img('emprendimiento', '03_top_actividades'), alt: 'Economic activities with the most new businesses in the first quarter of 2026, led by bars with 1,503.', caption: 'Activities with the most new businesses (chart labels in Spanish)' } },
          { p: '**Almost everything new is micro and sole-proprietor.** 99.9% of new businesses are microenterprises and 63.6% are registered as individuals.' },
        ],
        decision: {
          lead: 'Focus entrepreneurship support on the south, where more businesses are born per hundred existing ones and where more women lead them.',
          blocks: [
            { ul: [
              '**Entrepreneurship programs:** prioritize formalization and mentoring in Ciudad Bolívar, Bosa, Usme and Tunjuelito, where both the creation rate and women\'s share are highest.',
              '**Would-be founders:** food and drink is the sector with the most new competitors. Before opening a bar or restaurant, measure how saturated the area is (the coffee shop case covers this).',
              '**Next analysis:** measure how many of these businesses survive their first year before investing at scale.',
            ] },
          ],
        },
        limits: [
          { p: 'This version shows where businesses are born, not which ones survive.' },
          { ul: [
            "**No closures:** survival and net creation can't be measured. For version 2: look for other releases on the portal or reports from the Bogotá Chamber of Commerce and Confecámaras.",
            '**A single snapshot:** no trend or seasonality; the first quarter may not represent the year.',
            '**The rate favors small districts:** few active businesses inflate the ratio. Version 2 adds businesses per 1,000 residents.',
            "**Registration isn't real activity:** a registered business isn't necessarily operating, and informal businesses are left out.",
            "**Legal representative's sex:** it describes who appears in the registry, not ownership or who actually runs the business.",
          ] },
        ],
      },
      license: 'Tables and charts under CC BY-SA 4.0, like the source. Code: all rights reserved.',
    },
  },

  // ------------------------------------------------------------------ 4
  {
    key: 'caseCoffee',
    pillar: 'mi',
    tools: ['Python', 'pandas'],
    date: { es: 'oct 2026', en: 'Oct 2026' },
    repo: 'https://github.com/Sebaspadi97/bogota-coffee-location',
    thumb: img('cafe', '01_matriz_demanda_competencia'),
    es: {
      title: '¿Dónde abrir un café en Bogotá?',
      question: '¿Qué localidades tienen clientes sin tanta competencia?',
      finding: 'solo Suba y Usaquén superan el promedio en adultos y en empresas por cada café.',
      description: 'Inteligencia de ubicación con datos abiertos: dónde hay más demanda por cada punto de café en Bogotá.',
      dataTag: 'datos abiertos',
      facts: [
        ['Autoría', 'Sebastián Padilla (proyecto individual)'],
        ['Método', 'Inteligencia de ubicación · oferta frente a demanda · índice con análisis de sensibilidad'],
        ['Herramientas', 'Python · pandas · matplotlib'],
        ['Fuentes', 'Datos Abiertos Bogotá: Dinámica Empresarial (mar 2026) y proyecciones de población 2026'],
        ['Estado', 'v1 terminada · v2 a nivel de UPZ'],
      ],
      about: 'Este análisis combina dos conjuntos de Datos Abiertos Bogotá: “Dinámica Empresarial Bogotá” (corte marzo 2026, CC BY-SA 4.0) y las proyecciones de población por localidad 2005–2035 (CC BY 4.0). Como una de las fuentes es CC BY-SA, las tablas y gráficos derivados se comparten bajo CC BY-SA 4.0. Son datos agregados, sin información personal ni del empleador del autor.',
      sections: {
        question: [
          { lead: '¿En qué localidad de Bogotá conviene abrir un café: dónde hay más demanda por cada punto de café que ya existe?' },
          { p: 'Es la primera decisión de quien emprende en comida y bebida, donde bares y restaurantes están entre las actividades con más empresas nuevas de la ciudad. Un error de ubicación cuesta el arriendo, la adecuación y meses de ventas bajas.' },
          { p: 'Este caso continúa la “Radiografía del emprendimiento en Bogotá”: primero, dónde nacen los negocios; ahora, dónde conviene abrir uno.' },
        ],
        data: [
          { p: 'Se cruzaron la competencia registrada con la población de 2026 en las 19 localidades urbanas.' },
          { stats: [{ n: '9.338', label: 'puntos de café' }, { n: '6,24 M', label: 'adultos' }, { n: '19', label: 'localidades' }] },
          { table: {
            head: ['Dimensión', 'Variable', 'Fuente'],
            rows: [
              ['Oferta', 'Cafeterías (CIIU 5613) y panaderías (CIIU 1081) vigentes y nuevas: 9.338 puntos con localidad', 'Dinámica Empresarial, mar 2026'],
              ['Demanda residencial', 'Adultos de 18 años o más, 2026: 6,24 millones', 'Proyecciones de población por localidad'],
              ['Demanda diurna', 'Empresas vigentes por localidad: 442.498', 'Dinámica Empresarial, mar 2026'],
            ],
          } },
          { ul: [
            'Se incluyen las panaderías porque en Bogotá son el lugar de barrio donde más se toma café.',
            'Control de calidad: las 20 localidades suman 7.945.996 habitantes, igual al total de Bogotá del archivo.',
            'Quedan por fuera Sumapaz (rural) y 528 puntos “Sin localidad”.',
          ] },
        ],
        approach: [
          { p: 'Dos medidas de demanda por cada punto de café, comparadas contra el promedio de Bogotá, y un índice puesto a prueba con distintos pesos.' },
          { ol: [
            '**Adultos por punto de café:** cuánta gente vive en la localidad por cada competidor (Bogotá: 668).',
            '**Empresas por punto de café:** cuánta actividad laboral hay durante el día por cada competidor (Bogotá: 47).',
            '**Tasa de entrada:** puntos nuevos en ene–mar ÷ vigentes; muestra qué tan rápido llega competencia (Bogotá: 5,1 %).',
            '**Índice de ejemplo:** 50 % adultos por punto + 30 % empresas por punto − 20 % tasa de entrada, en puntajes z.',
          ] },
          { p: 'La prueba de sensibilidad mostró que el ranking cambia mucho con los pesos: Chapinero pasa del puesto 1 al 13 según el modelo. Por eso la conclusión se apoya en la matriz y en los dos tipos de café, no en un ranking único.' },
        ],
        findings: [
          { lead: 'Solo Suba y Usaquén superan el promedio de Bogotá en las dos demandas por punto de café: la de quienes viven allí y la de quienes trabajan allí.' },
          { fig: { src: img('cafe', '01_matriz_demanda_competencia'), alt: 'Matriz de localidades: adultos por punto de café frente a empresas por punto de café, con líneas en el promedio de Bogotá; solo Suba y Usaquén quedan por encima en ambos ejes.', caption: 'Demanda residencial y diurna por punto de café, por localidad' } },
          { ul: [
            '**Suba** combina tamaño y espacio: es la localidad más poblada (1,25 millones de habitantes) y tiene 887 adultos y 51 empresas por punto.',
            '**Usaquén** tiene 773 adultos y 76 empresas por punto, la segunda demanda diurna más alta.',
            '**Las más saturadas** son La Candelaria (94 adultos por punto) y Los Mártires (163), aunque su población flotante no aparece en los datos.',
          ] },
          { p: '**El mejor lugar depende del tipo de café.** El sur tiene la mayor demanda residencial por punto, y Chapinero la mayor demanda diurna.' },
          { fig: { src: img('cafe', '02_dos_modelos_de_cafe'), alt: 'Comparación de localidades para dos modelos de café: café de barrio, donde lideran Usme, Ciudad Bolívar y Bosa, y café de oficina, donde lideran Chapinero y Usaquén.', caption: 'Dos modelos de café, dos mapas distintos' } },
          { p: '**La competencia está llegando más rápido** a Rafael Uribe Uribe (8,0 % de puntos nuevos en el trimestre) y Tunjuelito (7,3 %), frente al 5,1 % de Bogotá.' },
        ],
        decision: {
          lead: 'Para un café con clientela mixta, de residentes y de trabajadores, empezar la búsqueda de local en Suba o Usaquén.',
          blocks: [
            { table: {
              head: ['Si el café es…', 'Buscar en', 'Por qué', 'Validar antes'],
              rows: [
                ['Mixto (barrio + trabajo)', 'Suba, Usaquén', 'Únicas por encima del promedio en ambas demandas', 'Zonas específicas dentro de cada localidad'],
                ['De barrio, precio accesible', 'Usme, Ciudad Bolívar, Bosa', 'Más de 1.000 adultos por punto', 'Poder adquisitivo y ticket promedio'],
                ['De especialidad para oficinas', 'Chapinero, Usaquén', 'Mayor demanda diurna por punto', 'Arriendo y competencia de cadenas'],
              ],
            } },
            { p: 'Antes de firmar un arriendo hay que bajar a UPZ o barrio, con estrato, valor del suelo y flujo peatonal.' },
          ],
        },
        limits: [
          { p: 'Esta v1 señala zonas de búsqueda, no el local exacto.' },
          { ul: [
            '**La localidad es una unidad muy grande:** Suba o Usaquén tienen zonas saturadas y zonas vacías. La v2 baja a UPZ con población, estrato y valor del suelo por manzana.',
            '**Sin ingresos ni flujo peatonal:** mucha gente por punto no garantiza capacidad de pago.',
            '**Empresas registradas no son trabajadores:** Chapinero concentra sedes legales, lo que puede inflar su demanda diurna.',
            '**Solo competencia formal:** no aparecen la venta informal de tinto ni los restaurantes y tiendas que también venden café.',
            '**Un solo corte de oferta (mar 2026)** y un índice sensible a los pesos, que se declara como ejemplo.',
          ] },
        ],
      },
      license: 'Tablas y gráficos bajo CC BY-SA 4.0, por derivar de una fuente CC BY-SA. Código con todos los derechos reservados.',
    },
    // Solo título, pregunta y hallazgo en inglés (tarjetas y CV); el caso completo sigue en español.
    en: {
      title: 'Where to open a coffee shop in Bogotá',
      question: 'Which districts have customers without too much competition?',
      finding: 'only Suba and Usaquén beat the city average on both adults and businesses per coffee shop.',
    },
  },
];

/** Casos en el orden de la página Proyectos (por relevancia). */
export const orderedCases = cases;

/** Herramientas que se ofrecen como filtro (solo las que tienen al menos un proyecto). */
export const toolFilters = ['Python', 'scikit-learn', 'pandas'];
