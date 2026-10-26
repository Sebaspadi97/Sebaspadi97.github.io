// Textos de Inicio, aprobados el 26 oct 2026 (documento "SP Lab — Textos del sitio").
// Español: pestaña principal. Inglés: pestaña "English".

export const home = {
  es: {
    title: 'Sebas Padilla Lab · De los datos a las decisiones',
    description:
      'Casos de datos, machine learning e inteligencia de mercado contados desde la pregunta de negocio hasta la decisión. Por Sebas Padilla.',
    hero: {
      metaLeft: 'Edición n.º 01 · Bogotá',
      metaRight: 'Data · Machine Learning · Market Intelligence',
      headlineBefore: 'De los datos a las ',
      headlineMark: 'decisiones',
      headlineAfter: '.',
      intro:
        'Soy Sebas Padilla: analista de inteligencia de negocios, ingeniero industrial y estudiante de la Maestría en Ciencia de Datos.',
      sub:
        'Este es mi laboratorio. Aquí convierto datos en casos, modelos e investigaciones de mercado: empiezo por la pregunta de negocio y termino en una decisión.',
      primary: 'Explorar proyectos',
      secondary: 'Descargar CV',
    },
    method: {
      label: 'El método',
      title: 'Cada punto es un dato. Con método, forman una decisión.',
      figure: 'Campo de puntos dispersos que se ordenan hasta formar las letras SP',
      steps: [
        { n: '01', name: 'La pregunta', text: 'Qué necesita decidir el negocio.' },
        { n: '02', name: 'Los datos', text: 'Fuentes abiertas, sintéticas o autorizadas, limpias y documentadas.' },
        { n: '03', name: 'El hallazgo', text: 'Lo que el análisis revela, con su cifra.' },
        { n: '04', name: 'La decisión', text: 'Qué haría yo con esa evidencia.' },
      ],
    },
    projects: {
      title: 'Preguntas que terminaron en decisiones',
      all: 'Todos los proyectos',
      findingLabel: 'Hallazgo',
      featured: {
        key: 'caseChurn',
        pillar: 'Destacado · Machine Learning',
        title: '¿Qué clientes están por irse?',
        question: '¿A quién conviene llamar antes de que deje de comprar?',
        finding: 'Llamar solo al 15,5 % con mayor valor esperado rinde más que llamar a todos (datos sintéticos).',
        chart: {
          label:
            'Resultado de la campaña en el conjunto de prueba: contactar a todos pierde 10,2 millones de pesos; contactar al 15,5 % elegido por el modelo gana 2,8 millones.',
          all: 'Contactar a todos',
          model: 'Contactar al 15,5 % (modelo)',
          allValue: '−COP 10,2 M',
          modelValue: '+COP 2,8 M',
          note: 'Conjunto de prueba · datos sintéticos',
        },
      },
      cards: [
        {
          key: 'caseBusiness',
          pillar: 'Data',
          pillarTone: 'mint',
          title: 'Radiografía del emprendimiento en Bogotá',
          question: '¿En qué localidades y sectores nacen más empresas, y quiénes las lideran?',
          finding: 'Los bares son la actividad n.º 1: 1.503 nuevos en el primer trimestre de 2026.',
        },
        {
          key: 'caseCoffee',
          pillar: 'Market Intelligence',
          pillarTone: 'gold',
          title: '¿Dónde abrir un café en Bogotá?',
          question: '¿Qué localidades tienen clientes sin tanta competencia?',
          finding: 'Solo Suba y Usaquén superan el promedio en adultos y en empresas por cada café.',
        },
      ],
    },
    fact: {
      label: 'Dato curioso',
      text: 'En Bogotá se registraron unos 17 bares nuevos por día entre enero y marzo de 2026.',
      source: 'Fuente: Dinámica Empresarial, Datos Abiertos Bogotá, corte marzo de 2026.',
      button: 'Ver el análisis',
      key: 'labBars',
    },
    manifesto: {
      quote: 'Un dato sin decisión es solo una cifra.',
      sub: 'Trabajo con la pregunta adelante: si un análisis no cambia lo que alguien haría mañana, todavía no está terminado.',
    },
    services: {
      label: 'Servicios',
      items: [
        { name: 'Tableros de BI', text: 'Indicadores que se entienden en un minuto y se usan cada semana.' },
        { name: 'Modelos predictivos', text: 'Predicciones con su margen de error, comparadas contra una referencia simple.' },
        { name: 'Inteligencia de mercado', text: 'Tamaño, ubicación y competencia con datos abiertos, para decidir dónde entrar.' },
      ],
      button: 'Cuéntame tu reto',
    },
    lab: {
      title: 'Desde el Lab',
      more: 'Más artículos',
      items: [
        { key: 'labBars', category: 'Dato curioso', tone: 'gold', title: 'Bogotá abre 17 bares al día' },
        { key: 'labBusiness', category: 'Análisis', tone: 'green', title: 'Dónde nacen las empresas de Bogotá, y quién las lidera' },
        { key: 'labChurn', category: 'Experimento', tone: 'teal', title: '¿Llamar a todos los clientes? El modelo dice que no' },
      ],
    },
  },

  en: {
    title: 'Sebas Padilla Lab · From data to decisions',
    description:
      'Data, machine learning and market intelligence case studies, told from the business question to the decision. By Sebas Padilla, Bogotá.',
    hero: {
      metaLeft: 'Issue no. 01 · Bogotá',
      metaRight: 'Data · Machine Learning · Market Intelligence',
      headlineBefore: 'From data to ',
      headlineMark: 'decisions',
      headlineAfter: '.',
      intro:
        "I'm Sebas Padilla: business intelligence analyst, industrial engineer and Data Science master's student.",
      sub:
        'This is my lab. I turn data into case studies, models and market research: I start with the business question and end with a decision.',
      primary: 'Explore projects',
      secondary: 'Download CV',
    },
    method: {
      label: 'The method',
      title: 'Every dot is a data point. With method, they become a decision.',
      figure: 'A field of scattered dots that line up to form the letters SP',
      steps: [
        { n: '01', name: 'The question', text: 'What the business needs to decide.' },
        { n: '02', name: 'The data', text: 'Open, synthetic or authorized sources, cleaned and documented.' },
        { n: '03', name: 'The finding', text: 'What the analysis reveals, with its number.' },
        { n: '04', name: 'The decision', text: 'What I would do with that evidence.' },
      ],
    },
    projects: {
      title: 'Questions that ended in decisions',
      all: 'All projects',
      findingLabel: 'Finding',
      featured: {
        key: 'caseChurn',
        pillar: 'Featured · Machine Learning',
        title: 'Which customers are about to leave?',
        question: 'Who should you contact before they stop buying?',
        finding: 'Contacting only the 15.5% with the highest expected value beats contacting everyone (synthetic data).',
        chart: {
          label:
            'Campaign result on the test set: contacting everyone loses 10.2 million pesos; contacting the 15.5% chosen by the model earns 2.8 million.',
          all: 'Contact everyone',
          model: 'Contact the top 15.5% (model)',
          allValue: '−COP 10.2M',
          modelValue: '+COP 2.8M',
          note: 'Test set · synthetic data',
        },
      },
      cards: [
        {
          key: 'caseBusiness',
          pillar: 'Data',
          pillarTone: 'mint',
          title: "Where are Bogotá's new businesses born?",
          question: 'Which districts and sectors create the most businesses, and who leads them?',
          finding: 'Bars are the No. 1 activity: 1,503 new ones in the first quarter of 2026.',
        },
        {
          key: 'caseCoffee',
          pillar: 'Market Intelligence',
          pillarTone: 'gold',
          title: 'Where to open a coffee shop in Bogotá',
          question: 'Which districts have customers without too much competition?',
          finding: 'Only Suba and Usaquén beat the city average on both adults and businesses per coffee shop.',
        },
      ],
    },
    fact: {
      label: 'Fun fact',
      text: 'Bogotá registered about 17 new bars a day between January and March 2026.',
      source: 'Source: Business Dynamics, Bogotá Open Data, March 2026 release.',
      button: 'See the analysis (in Spanish)',
      key: 'labBars',
    },
    manifesto: {
      quote: 'A data point without a decision is just a number.',
      sub: "I keep the question up front: if an analysis doesn't change what someone would do tomorrow, it isn't finished yet.",
    },
    services: {
      label: 'Services',
      items: [
        { name: 'BI dashboards', text: 'Metrics people understand in a minute and use every week.' },
        { name: 'Predictive models', text: 'Forecasts with their margin of error, compared against a simple baseline.' },
        { name: 'Market intelligence', text: 'Market size, location and competition from open data, to decide where to enter.' },
      ],
      button: 'Tell me your challenge',
    },
    lab: {
      title: 'From the Lab',
      more: 'More articles (in Spanish)',
      items: [
        { key: 'labBars', category: 'Fun fact', tone: 'gold', title: 'Bogotá opens 17 bars a day' },
        { key: 'labBusiness', category: 'Analysis', tone: 'green', title: "Where Bogotá's businesses are born, and who leads them" },
        { key: 'labChurn', category: 'Experiment', tone: 'teal', title: 'Call every customer? The model says no' },
      ],
    },
  },
};
