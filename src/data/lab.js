// Publicaciones del Lab (pestaña "Publicaciones del Lab" del documento de textos,
// aprobadas el 26 oct 2026). En los textos, **negrita** se convierte en <strong>.
//
// Fechas: quedan en null hasta el lanzamiento. Calendario acordado:
// análisis el día del lanzamiento, dato curioso a los 3–4 días, experimento a la semana siguiente.
// Formato de fecha: 'AAAA-MM-DD'.

export const categories = {
  analisis: { label: 'Análisis', plural: 'Análisis', tone: 'green', reading: '6–10 min', what: 'Una pregunta con datos abiertos, de la cifra a la decisión.' },
  curioso: { label: 'Dato curioso', plural: 'Datos curiosos', tone: 'gold', reading: '1 min', what: 'Una cifra, una frase y su fuente.' },
  experimento: { label: 'Experimento', plural: 'Experimentos', tone: 'teal', reading: '5–8 min', what: 'Un modelo o una técnica puestos a prueba, con lo que salió bien y mal.' },
  nota: { label: 'Nota', plural: 'Notas', tone: 'slate', reading: '2–4 min', what: 'Aprendizajes cortos de la maestría y del oficio.' },
};

const SOURCE_DE = 'Dinámica Empresarial, Datos Abiertos Bogotá (mar 2026)';

export const posts = [
  {
    key: 'labBusiness',
    category: 'analisis',
    featured: true,
    date: null,
    minutes: 6,
    title: 'Dónde nacen las empresas de Bogotá, y quién las lidera',
    sub: 'En tres meses nacieron 21.407 empresas. Las localidades del sur crean más, y cada vez más con mujeres al frente.',
    cover: {
      src: '/img/casos/emprendimiento/01_tasa_creacion_localidad.webp',
      alt: 'Tasa de creación de empresas por localidad, primer trimestre de 2026: Ciudad Bolívar 6,7, Bosa 6,5 y Usme 6,3 por cada 100 vigentes; Chapinero, la más baja, 3,0.',
      caption: 'Empresas creadas por cada 100 vigentes, por localidad, enero a marzo de 2026. Fuente: Dinámica Empresarial, Datos Abiertos Bogotá.',
    },
    summary: [
      'En Bogotá nacieron unas 238 empresas por día entre enero y marzo de 2026.',
      'Ciudad Bolívar, Bosa y Usme crean más empresas por cada 100 existentes; Chapinero, la que menos.',
      'El 45,1 % de las empresas nuevas tiene a una mujer como representante legal, cuatro puntos más que entre las existentes.',
    ],
    body: [
      'Cada día se registran en Bogotá unas 238 empresas nuevas. Lo sé porque me pregunté algo sencillo: ¿dónde está naciendo el emprendimiento de la ciudad, y quién lo está liderando? La respuesta estaba en un archivo público, aunque no fue tan fácil de leer como parecía.',
      '**El sur se renueva más rápido.** Entre enero y marzo de 2026 nacieron 21.407 empresas, 4,6 por cada 100 que ya existían. Pero el ritmo cambia mucho según la localidad: en Ciudad Bolívar nacieron 6,7 por cada 100, en Bosa 6,5 y en Usme 6,3. En Chapinero, donde se concentran las grandes empresas, solo 3,0.',
      'Eso no significa que el sur tenga más empresas nuevas en total. En volumen mandan Suba, con 2.604, y Kennedy, con 2.421. La diferencia es de velocidad: en el sur, el tejido empresarial se está renovando más rápido.',
      '**Más mujeres al frente de lo nuevo.** El 45,1 % de las empresas nuevas tiene a una mujer como representante legal, frente al 41,1 % de las existentes. Pasa en 17 de las 19 localidades analizadas. En Tunjuelito, el 53 % de las nuevas ya está en manos de mujeres.',
      '**Casi todo es micro.** El 99,9 % de las empresas nuevas son microempresas y el 63,6 % se registra como persona natural. Y la actividad con más nacimientos es una que pocos adivinarían: los bares.',
      '**Lo que los datos no dicen.** El archivo trae las empresas canceladas en cero, así que este análisis muestra dónde nacen las empresas, no cuáles sobreviven. Además, el “Excel” era en realidad una tabla DBF y algunos códigos de localidad no coincidían con los oficiales. Limpiar eso también hace parte del trabajo.',
    ],
    fact: { n: '53 %', text: 'de las empresas nuevas de Tunjuelito tienen a una mujer como representante legal.', source: SOURCE_DE },
    decision: 'Si tuviera que decidir dónde invertir en programas de emprendimiento, empezaría por Ciudad Bolívar, Bosa, Usme y Tunjuelito, con foco en formalización y acompañamiento para las mujeres que están abriendo negocios. Antes de escalar, mediría cuántas de esas empresas siguen abiertas un año después.',
    askReader: '¿Tú qué harías con estos datos?',
    sources: [
      'Fuente: Dinámica Empresarial Bogotá, Datos Abiertos Bogotá, corte marzo de 2026, licencia CC BY-SA 4.0.',
      'Método: tasa de creación = empresas creadas en el trimestre ÷ empresas vigentes × 100. El porcentaje de mujeres se calcula sobre los registros con sexo conocido.',
    ],
    repo: { url: 'https://github.com/Sebaspadi97/bogota-business-births', note: 'Tablas y gráficos bajo CC BY-SA 4.0.' },
    relatedCase: 'caseBusiness',
  },
  {
    key: 'labBars',
    category: 'curioso',
    date: null,
    minutes: 1,
    title: 'Bogotá abre 17 bares al día',
    sub: 'Los bares fueron la actividad con más empresas nuevas entre enero y marzo de 2026.',
    cover: { figure: '17', text: 'bares nuevos por día se registraron en Bogotá entre enero y marzo de 2026.', source: SOURCE_DE },
    summary: null,
    body: [
      'Entre enero y marzo de 2026 se registraron en Bogotá 1.503 bares nuevos: unos 17 por día. Ninguna otra actividad tuvo tantas empresas nuevas. Los bares superaron por 1,7 veces a la segunda actividad de la lista, las peluquerías y salones de belleza, con 869.',
      'Para comparar, en el mismo periodo nacieron 201 cafeterías. Abrir un bar parece fácil, y por eso mismo la competencia crece rápido.',
    ],
    fact: null,
    decision: 'Si fuera a abrir un bar, antes de firmar el arriendo miraría cuántos abrieron cerca en el último año y cuánta gente vive o trabaja en la zona. Es la misma lógica del caso “¿Dónde abrir un café en Bogotá?”.',
    askReader: '¿Cuántos bares nuevos has visto abrir en tu barrio este año?',
    sources: [
      'Fuente: Dinámica Empresarial Bogotá, Datos Abiertos Bogotá, corte marzo de 2026, licencia CC BY-SA 4.0.',
      'Bares = actividad CIIU 5630 (expendio de bebidas alcohólicas para el consumo dentro del establecimiento). Promedio diario = 1.503 ÷ 90 días.',
      'Un registro mercantil no garantiza que el bar esté operando, y los negocios informales no aparecen.',
    ],
    repo: { url: 'https://github.com/Sebaspadi97/bogota-business-births', note: 'Tablas y gráficos bajo CC BY-SA 4.0.' },
    relatedCase: 'caseCoffee',
  },
  {
    key: 'labChurn',
    category: 'experimento',
    date: null,
    minutes: 6,
    title: '¿Llamar a todos los clientes? El modelo dice que no',
    sub: 'Con datos sintéticos, llamar a todos pierde dinero; llamar a quien vale la pena, gana.',
    cover: {
      src: '/img/casos/abandono/03_curva_ganancia.webp',
      alt: 'Curva de ganancia: ordenando por valor esperado la campaña llega a COP 2,8 millones contactando al 16 % de los clientes; contactar a todos termina en −COP 10,2 millones.',
      caption: 'Ganancia neta de la campaña según cuántos clientes se contactan. Datos sintéticos de TiendaLab, tienda ficticia.',
    },
    summary: [
      'Construí una tienda en línea ficticia con 20.000 clientes y un modelo que anticipa quién dejará de comprar.',
      'Contactar a todos los clientes pierde COP 10,2 millones; contactar solo al 15,5 % con valor esperado positivo gana COP 2,8 millones.',
      'Elegir por valor esperado rinde 2,5 veces más que elegir solo por probabilidad de irse.',
    ],
    body: [
      'Casi todas las empresas tienen la misma tentación: cuando ven que los clientes se van, lanzan una campaña a toda la base. Quise probar si eso tiene sentido, y para hacerlo sin usar datos reales de nadie, inventé una tienda.',
      '**El laboratorio.** TiendaLab es una tienda en línea ficticia con 20.000 clientes generados por código. El 16,8 % deja de comprar en los siguientes 90 días. Escondí en los datos las reglas que causan el abandono, como entregas tarde o mucho tiempo sin comprar, y le pedí al modelo que las encontrara sin verlas.',
      '**El modelo más simple ganó.** Probé tres algoritmos y los tres empataron, con un AUC cercano a 0,82. Me quedé con la regresión logística: es igual de precisa, no se sobreajusta y entrega probabilidades confiables. Eso importa porque esas probabilidades se convierten en pesos.',
      '**Encuentra a quienes se van.** En el 10 % de clientes con mayor riesgo, 2 de cada 3 sí abandonan: 3,9 veces el promedio. Y contactando solo al 20 % más riesgoso se llega al 58 % de todos los que se van. La señal más fuerte son los días sin comprar; la más útil para actuar, las entregas tarde.',
      '**Pero encontrar no es ganar.** Con supuestos ficticios (margen del 25 %, contacto de COP 5.000 y 25 % de efectividad), contactar a los 5.000 clientes de prueba pierde COP 10,2 millones. Contactar solo a quien tiene valor esperado positivo, el 15,5 %, gana COP 2,8 millones, casi el máximo posible.',
      '**El costo manda.** Si el contacto costara COP 2.000, convendría llamar a la mitad de la base. Con COP 15.000 y 15 % de efectividad, ninguna campaña sería rentable. La decisión depende más de la economía de la campaña que del modelo.',
    ],
    fact: { n: '2,5×', text: 'más ganancia al elegir clientes por valor esperado que solo por riesgo de abandono, con el mismo presupuesto.', source: 'Datos sintéticos, SP Lab' },
    decision: 'Puntuaría a toda la base cada mes y contactaría solo a quien tenga valor esperado positivo, con una acción según el motivo del riesgo. Y dejaría un grupo sin contactar para medir si la campaña de verdad funciona.',
    askReader: '¿En tu empresa a quién contactan cuando un cliente se está yendo?',
    sources: [
      'Datos sintéticos: 20.000 clientes de TiendaLab, tienda ficticia. Ninguna fila corresponde a una persona o empresa real.',
      'Método: clasificación supervisada con validación cruzada; valor esperado = probabilidad × efectividad × valor en riesgo − costo del contacto.',
      'Las cifras de dinero dependen de supuestos ficticios: son hallazgos del análisis, no impacto real.',
    ],
    repo: { url: 'https://github.com/Sebaspadi97/customer-churn-retention', note: 'Datos, tablas y gráficos bajo CC BY 4.0.' },
    relatedCase: 'caseChurn',
  },
];

/** Datos curiosos de la franja dorada del Lab (cifra + frase + fuente). */
export const curiosities = [
  { n: '17', text: 'bares nuevos por día se registraron en Bogotá entre enero y marzo de 2026.', source: SOURCE_DE, key: 'labBars' },
  { n: '45 %', text: 'de las empresas nuevas de Bogotá tienen a una mujer como representante legal, más que entre las ya existentes (41 %).', source: SOURCE_DE, key: 'labBusiness' },
  { n: '2×', text: 'Ciudad Bolívar crea empresas a más del doble del ritmo de Chapinero: 6,7 frente a 3,0 por cada 100 vigentes.', source: SOURCE_DE, key: 'labBusiness' },
];

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** "26 oct 2026" a partir de 'AAAA-MM-DD'; null si no hay fecha. */
export function formatDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "26 oct 2026 · 6 min" o solo "6 min de lectura" si aún no hay fecha. */
export function postMeta(p) {
  const d = formatDate(p.date);
  return d ? `${d} · ${p.minutes} min de lectura` : `${p.minutes} min de lectura`;
}
