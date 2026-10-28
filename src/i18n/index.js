// Rutas y textos comunes en los dos idiomas.
// Regla de lanzamiento: solo Inicio, Sobre mí y 3 casos tienen versión en inglés.
// Desde /en, lo que no está traducido lleva a la versión en español con ?from=en,
// y esa página muestra el aviso "This page is only available in Spanish for now."

export const languages = { es: 'Español', en: 'English' };
export const defaultLang = 'es';

export const routes = {
  home: { es: '/es/', en: '/en/' },
  projects: { es: '/es/proyectos/' },
  lab: { es: '/es/lab/' },
  about: { es: '/es/sobre-mi/', en: '/en/about/' },
  contact: { es: '/es/contacto/' },
  privacy: { es: '/es/privacidad/' },
  terms: { es: '/es/terminos/' },

  // Los proyectos y artículos se registran solos al leer src/content/ (ver src/lib/contenido.js).
};

/** Registra la dirección de un proyecto o artículo. */
export function registerRoute(key, paths) {
  routes[key] = paths;
}

/** ¿La ruta existe en ese idioma? */
export function hasLang(key, lang) {
  return Boolean(routes[key] && routes[key][lang]);
}

/** Enlace a una página en el idioma pedido; si no existe, a la versión en español. */
export function link(key, lang = defaultLang) {
  const r = routes[key];
  if (!r) throw new Error(`Ruta desconocida: ${key}`);
  if (r[lang]) return r[lang];
  return lang === 'en' ? `${r.es}?from=en` : r.es;
}

/** Enlace para el selector de idioma desde la página actual. */
export function alternate(key, toLang) {
  const r = routes[key];
  if (r && r[toLang]) return r[toLang];
  return routes.home[toLang];
}

export const ui = {
  es: {
    navLabel: 'Principal',
    menu: 'Menú',
    close: 'Cerrar',
    nav: [
      { key: 'projects', label: 'Proyectos' },
      { key: 'lab', label: 'Lab' },
      { key: 'about', label: 'Sobre mí' },
      { key: 'contact', label: 'Contacto' },
    ],
    cta: 'Hablemos',
    langLabel: 'Idioma',
    slogan: 'De los datos a las decisiones.',
    footerLinks: { linkedin: 'LinkedIn', github: 'GitHub', email: 'Correo', privacy: 'Privacidad', terms: 'Términos' },
    rights: (year) => `© ${year} Sebastián Padilla Castaño. Licencias en`,
    rightsLink: 'Términos de uso',
    inSpanish: 'En español',
    skip: 'Saltar al contenido',
  },
  en: {
    navLabel: 'Main',
    menu: 'Menu',
    close: 'Close',
    nav: [
      { key: 'projects', label: 'Projects' },
      { key: 'lab', label: 'Lab' },
      { key: 'about', label: 'About' },
      { key: 'contact', label: 'Contact' },
    ],
    cta: "Let's talk",
    langLabel: 'Language',
    slogan: 'From data to decisions.',
    footerLinks: { linkedin: 'LinkedIn', github: 'GitHub', email: 'Email', privacy: 'Privacy', terms: 'Terms' },
    rights: (year) => `© ${year} Sebastián Padilla Castaño. Licenses in the`,
    rightsLink: 'Terms of use',
    inSpanish: 'In Spanish',
    skip: 'Skip to content',
  },
};

export const spanishOnlyNotice = 'This page is only available in Spanish for now.';
