// Páginas que todavía no están construidas. Cada una muestra "en construcción"
// para que el menú y los enlaces funcionen desde el primer despliegue.
// Al construir una página real, se quita de esta lista.

export const pending = [
  { key: 'about', active: 'about', es: { label: 'Sobre mí', title: 'Sobre mí' }, en: { label: 'About', title: 'From industrial engineering to data science.' } },
  { key: 'contact', active: 'contact', es: { label: 'Contacto', title: 'Hablemos' } },
  { key: 'privacy', active: null, es: { label: 'Legal', title: 'Política de privacidad' } },
  { key: 'terms', active: null, es: { label: 'Legal', title: 'Términos de uso' } },


];
