// Páginas legales: Política de tratamiento de datos y Términos de uso.
// Textos aprobados en el lienzo "SP Lab — Sitio web" (v19). Espacios que se llenaron en la
// Fase 5 (26 oct 2026): proveedor del formulario (Web3Forms), analítica (no hay por ahora),
// plazo de conservación (propuesta: 12 meses) y fecha de actualización.
// Antes del lanzamiento: revisión legal (ver estado del proyecto, Fase 6).

export const POLICY_VERSION = '2026-10-26';
export const legalUpdated = '26 de octubre de 2026';
export const legalReviewPending = true; // pasar a false cuando termine la revisión legal
const EMAIL = 'sebastianpadi97@outlook.com';

export const privacy = {
  title: 'Política de tratamiento de datos personales',
  description: 'Cómo uso los datos que compartes en este sitio, en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.',
  short: [
    'Solo recojo los datos que escribes en el formulario de contacto: nombre, correo, motivo y mensaje.',
    'Los uso únicamente para responderte. No los vendo ni los comparto.',
    'El sitio no usa cookies de publicidad ni herramientas que te identifiquen.',
    'Puedes pedir que los consulte, corrija o borre cuando quieras.',
    'Si quieres recibir novedades del Lab, lo autorizas aparte; es opcional.',
  ],
  sections: [
    { title: 'Responsable del tratamiento', body: [`Sebastián Padilla Castaño, persona natural, Bogotá, Colombia. Correo para asuntos de datos personales: [${EMAIL}](mailto:${EMAIL}).`] },
    { title: 'Qué datos recojo', body: ['Los que escribes voluntariamente en el formulario de contacto: nombre, correo, motivo y mensaje. Por ahora el sitio no usa herramientas de analítica; si en el futuro agrego una, será anónima y sin cookies, y lo indicaré en esta página.'] },
    { title: 'Para qué los uso', body: ['Para responder tu mensaje y dar seguimiento a la conversación que inicies. Solo si lo autorizas en la casilla opcional, tu correo se usa también para enviarte novedades del Lab; puedes darte de baja cuando quieras.'] },
    { title: 'Tus derechos', body: ['Como titular puedes conocer, actualizar, rectificar y suprimir tus datos, revocar la autorización y solicitar prueba de ella. También puedes presentar quejas ante la Superintendencia de Industria y Comercio.'] },
    { title: 'Cómo ejercerlos', body: [`Escribe a [${EMAIL}](mailto:${EMAIL}) con el asunto “Datos personales”. Responderé consultas en máximo 10 días hábiles y reclamos en máximo 15 días hábiles.`] },
    {
      title: 'Conservación y seguridad',
      body: [
        'Conservo los mensajes mientras dure la conversación y hasta 12 meses después; luego los elimino. Las autorizaciones se guardan mientras se traten tus datos, como prueba.',
        'El formulario se procesa con Web3Forms mediante conexión cifrada (HTTPS). Web3Forms actúa como encargado: recibe el mensaje y me lo reenvía por correo; su panel conserva el historial de envíos hasta por 30 días.',
      ],
    },
    { title: 'Marco legal y cumplimiento del sitio', checklist: true, body: ['Así responde este sitio a cada obligación aplicable según la normativa colombiana vigente. Si el sitio cambia (por ejemplo, si empieza a vender servicios en línea), esta sección se actualiza.'] },
    { title: 'Cambios a esta política', body: ['Si cambio algo importante, lo publicaré en esta página con su nueva fecha de actualización.'] },
  ],
  checklist: [
    { title: 'Términos y condiciones de uso', status: 'Aplicado', body: 'Los [términos de uso](/es/terminos/) regulan el acceso al sitio, la propiedad del contenido, la licencia del código publicado en GitHub y los límites de responsabilidad de los análisis, que son ilustrativos y no constituyen asesoría.', norm: 'Ley 527 de 1999 (comercio electrónico y mensajes de datos); Ley 1480 de 2011 si llegara a haber ventas.' },
    { title: 'Política de tratamiento de datos', status: 'Aplicado', body: 'Es esta página. Identifica al responsable, los datos que se recogen, su finalidad, los derechos del titular y cómo ejercerlos. Cada formulario enlaza a ella.', norm: 'Ley 1581 de 2012 y Decreto 1377 de 2013.' },
    { title: 'Cookies y consentimiento', status: 'Aplicado', body: 'Colombia no tiene una ley específica de cookies: cuando una cookie recoge datos personales, aplica la Ley 1581 y se necesita autorización previa, expresa e informada. Este sitio no usa cookies de publicidad ni de seguimiento, ni analítica que identifique a nadie, por lo que no muestra banner. Si en el futuro se agregan cookies que identifiquen al visitante (analítica con perfiles, publicidad o redes sociales), se pedirá consentimiento antes de activarlas, con opción real de rechazarlas.', norm: 'Ley 1581 de 2012 (autorización del titular).' },
    { title: 'Dos casillas separadas en cada formulario', status: 'Aplicado', body: 'Casilla 1, obligatoria: autorización del tratamiento de datos para responder el mensaje. Casilla 2, opcional: recibir novedades del Lab. Ninguna viene marcada de antemano, porque el silencio no cuenta como autorización.', norm: 'Decreto 1377 de 2013, art. 7 (la autorización debe ser expresa o por conducta inequívoca).' },
    { title: 'Registro de las autorizaciones', status: 'Aplicado', body: `Con cada envío se guarda: fecha y hora, formulario usado, casillas marcadas, texto exacto aceptado y versión de esta política (versión vigente: ${POLICY_VERSION}). Ese registro sirve como prueba de la autorización y se conserva mientras se traten los datos.`, norm: 'Decreto 1377 de 2013, art. 8 (el responsable conserva prueba de la autorización).' },
    { title: 'Política de reembolso', status: 'No aplica hoy', body: 'Este sitio no vende productos ni servicios en línea. Si llegara a hacerlo, se publicará una política que respete el derecho de retracto (5 días hábiles; en servicios, desde la celebración del contrato) y la reversión del pago (5 días hábiles desde que se conoce la causal, en pagos electrónicos).', norm: 'Ley 1480 de 2011 (Estatuto del Consumidor), arts. 47 y 51; Decreto 587 de 2016.' },
    { title: 'Solo los datos necesarios', status: 'Aplicado', body: 'El formulario pide solo nombre, correo, motivo y mensaje. No se piden teléfono, documento, dirección ni datos sensibles. Los datos se eliminan cuando dejan de ser necesarios para la conversación.', norm: 'Decreto 1377 de 2013, art. 4 (datos pertinentes y adecuados a la finalidad) y art. 11 (conservación limitada).' },
    { title: 'Derechos sobre las imágenes', status: 'Aplicado', body: 'Las imágenes del sitio son propias, gráficos generados a partir de los análisis, o de bancos con licencia que permite este uso, con la atribución que exija cada licencia y la prueba guardada. Ninguna persona reconocible aparece sin su consentimiento.', norm: 'Ley 23 de 1982, Ley 1915 de 2018 y Decisión Andina 351 de 1993 (derecho de autor).' },
    { title: 'Revisión de la normativa local', status: 'Aplicado', body: 'El sitio se revisa frente a las normas anteriores al publicarse y cada vez que cambia. La inscripción en el Registro Nacional de Bases de Datos de la SIC está prevista para sociedades y entidades sin ánimo de lucro con activos superiores a 100.000 UVT y para entidades públicas; el responsable de este sitio es una persona natural, por lo que no está dentro de esos supuestos.', norm: 'Decreto 090 de 2018 y Circular Única de la SIC. Autoridad de control: Superintendencia de Industria y Comercio.' },
  ],
};

export const terms = {
  title: 'Términos de uso',
  description: 'Las reglas para usar este sitio y su contenido. Al navegarlo, aceptas estos términos.',
  short: [
    'Este es un portafolio personal e informativo. No vende productos ni servicios en línea.',
    'Los análisis usan datos abiertos, sintéticos o resultados agregados autorizados, y son ilustrativos: no son asesoría.',
    'Las opiniones son mías y no representan a ningún empleador actual ni anterior.',
    'Puedes compartir los textos y gráficos del Lab con atribución y enlace. Algunos casos tienen su propia licencia, y el código no tiene licencia abierta (sección 03).',
  ],
  sections: [
    { title: 'Quién está detrás del sitio', body: [`Sebas Padilla Lab es el sitio personal de Sebastián Padilla Castaño, persona natural con domicilio en Bogotá, Colombia. Contacto: [${EMAIL}](mailto:${EMAIL}).`] },
    { title: 'Qué es este sitio', body: ['Un portafolio profesional y un espacio de divulgación sobre datos, machine learning e inteligencia de mercado. Su contenido es informativo. Cualquier servicio profesional se acuerda por separado, por escrito, fuera del sitio.'] },
    {
      title: 'Propiedad intelectual',
      body: [
        'Los textos, gráficos, el diseño del sitio y la marca SP Lab, incluido su logotipo, son obra de su autor y están protegidos por la normativa de derecho de autor. Las imágenes de terceros se usan con licencia y su atribución se indica junto a cada una.',
        'Cada tipo de contenido tiene su propia licencia:',
      ],
      licenses: true,
      after: ['Si un repositorio o un caso indica una licencia más específica en su archivo LICENSE o en su nota “Sobre los datos”, esa es la que aplica. Las fuentes de datos de terceros conservan su propia licencia.'],
      norm: 'Ley 23 de 1982, Ley 1915 de 2018 y Decisión Andina 351 de 1993. Licencias: [creativecommons.org](https://creativecommons.org/licenses/).',
    },
    {
      title: 'Sobre los datos y los análisis',
      body: [
        'Los proyectos y artículos usan datos abiertos o datos sintéticos creados para simular escenarios. Cuando un trabajo académico usa datos institucionales, solo se publican resultados agregados, con autorización y sin registros individuales. Nada de lo publicado contiene información confidencial de ningún empleador, cliente ni tercero.',
        'Los resultados, modelos y recomendaciones son ilustrativos y educativos. No constituyen asesoría financiera, de inversión, legal ni de ningún otro tipo profesional, y no deben usarse como único fundamento para tomar decisiones.',
        '**Opiniones propias.** Lo publicado aquí refleja mi criterio personal y no representa la posición de ninguna empresa en la que trabaje o haya trabajado.',
      ],
    },
    {
      title: 'Uso aceptable',
      body: ['Puedes navegar, leer, compartir y citar el contenido. No está permitido:'],
      list: [
        'Presentar el contenido como propio o quitarle la atribución.',
        'Intentar vulnerar la seguridad del sitio o interferir con su funcionamiento.',
        'Usar el formulario de contacto para enviar spam, publicidad no solicitada o contenido ilícito.',
        'Suplantar la identidad del autor o de la marca SP Lab.',
      ],
    },
    { title: 'Enlaces a otros sitios', body: ['El sitio enlaza a fuentes de datos, repositorios y redes sociales de terceros. Sus contenidos y políticas son responsabilidad de cada uno de ellos.'] },
    { title: 'Disponibilidad y responsabilidad', body: ['El sitio se ofrece tal como está. Procuro que funcione siempre y que el contenido sea correcto, pero puede haber interrupciones o errores. Si encuentras uno, [avísame](/es/contacto/) y lo corrijo.'] },
    { title: 'Comunicaciones y datos personales', body: ['Los mensajes que envías por el formulario o por correo son mensajes de datos con plena validez. Los datos personales se tratan según la [política de tratamiento de datos personales](/es/privacidad/).'], norm: 'Ley 527 de 1999; Ley 1581 de 2012.' },
    { title: 'Ventas en el futuro', body: ['Hoy el sitio no vende nada. Si en el futuro ofrece productos o servicios con pago en línea, se publicarán condiciones específicas que incluirán los derechos del consumidor, como el retracto y la reversión del pago.'], norm: 'Ley 1480 de 2011 (Estatuto del Consumidor).' },
    { title: 'Cambios, ley aplicable y contacto', body: [`Estos términos pueden actualizarse; la fecha de la última versión aparece arriba. Se rigen por las leyes de la República de Colombia. Para cualquier duda, escribe a [${EMAIL}](mailto:${EMAIL}).`] },
  ],
  licenses: [
    { what: 'Textos y gráficos del Lab', license: 'CC BY 4.0', open: true, text: 'Puedes compartirlos y adaptarlos, incluso con fines comerciales, citando al autor con enlace a la fuente. Aplica también a los datos sintéticos, tablas y gráficos del caso «¿Qué clientes están por irse?».' },
    { what: 'Casos con datos de Bogotá', license: 'CC BY-SA 4.0', open: true, text: 'Los datos, tablas y gráficos de «Radiografía del emprendimiento en Bogotá» y «¿Dónde abrir un café en Bogotá?» derivan de Datos Abiertos Bogotá, publicados bajo CC BY-SA 4.0, y por eso se comparten con la misma licencia: puedes reutilizarlos citando al autor y a la fuente, y lo que crees a partir de ellos debe llevar también CC BY-SA 4.0.' },
    { what: 'Caso de estancia hospitalaria', license: 'Derechos reservados', text: 'Trabajo académico en equipo (Alexandra Castro, Kevin Alejandro Paez y Sebastián Padilla). Sus resultados agregados provienen de datos institucionales de acceso restringido, usados con autorización, y no tienen licencia abierta. Puedes citarlos con atribución a sus autores; para reproducirlos o adaptarlos se necesita autorización escrita.' },
    { what: 'Código en GitHub', license: 'Derechos reservados', text: 'El código de los repositorios no tiene licencia abierta. Es público para que puedas revisarlo y reproducir los análisis; copiarlo, modificarlo o redistribuirlo requiere autorización escrita. El código del caso hospitalario pertenece a sus tres autores.' },
    { what: 'Marca, logo y diseño', license: 'Derechos reservados', text: 'No pueden usarse sin autorización escrita.' },
  ],
};
