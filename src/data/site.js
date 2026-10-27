// Datos generales del sitio. Un solo lugar para cambiar correo, redes y enlaces.
export const site = {
  name: 'Sebas Padilla Lab',
  shortName: 'SP Lab',
  author: 'Sebastián Padilla Castaño',
  email: 'sebastianpadi97@outlook.com',
  linkedin: 'https://www.linkedin.com/in/sebastianpadillacastano/',
  github: 'https://github.com/Sebaspadi97',
  photo: { webp: '/img/sebas-padilla.webp', jpg: '/img/sebas-padilla.jpg' },
  // CV en PDF generado con scripts/cv/generate-cv.mjs a partir de los textos de Sobre mí.
  cv: { es: '/cv/sebas-padilla-cv-es.pdf', en: '/cv/sebas-padilla-cv-en.pdf' },
  // Formulario de contacto (Web3Forms). La "access key" es pública por diseño: va en el HTML.
  // Mientras sea null, el formulario abre el correo del visitante con el mensaje ya escrito.
  form: { provider: 'web3forms', endpoint: 'https://api.web3forms.com/submit', accessKey: 'f9098b9b-3353-4e49-9e8a-39185e35f76a' },
  // Enlace de agenda (Cal.com o Calendly). Mientras sea null, el botón "Agendar 20 minutos" no aparece.
  agenda: null,
  responseTime: { es: '2 días hábiles', en: '2 business days' },
};
