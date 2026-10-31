// Industrias o sectores de los proyectos (31 oct 2026). Cada una tiene su nombre en español
// e inglés y un ícono de trazo (24 × 24) dibujado con el mismo estilo que los íconos del menú.
// Para sumar una industria nueva: agregarla aquí (clave en minúsculas, sin tildes) y usar la
// clave en el campo "industria" del proyecto. El editor web (.pages.yml) lista las mismas claves.

export const industries = {
  comercio: {
    es: 'Comercio y e-commerce',
    en: 'Retail & e-commerce',
    icon: '<path d="M5.5 8.5h13l-1.1 11.5H6.6Z"/><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/>',
  },
  salud: {
    es: 'Salud',
    en: 'Healthcare',
    icon: '<path d="M12 20s-7.5-4.5-7.5-10.1A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.5C19.5 15.5 12 20 12 20Z"/><path d="M7 12.6h2.7l1.4-2.5 2 4.4 1.4-1.9H17"/>',
  },
  emprendimiento: {
    es: 'Emprendimiento',
    en: 'Entrepreneurship',
    icon: '<path d="M12 20.5v-8.5"/><path d="M12 12C12 8.4 9.4 6 5.5 6c0 3.8 2.6 6 6.5 6Z"/><path d="M12 14.6c0-3.4 2.4-5.8 6.5-5.8 0 3.6-2.6 5.8-6.5 5.8Z"/><path d="M8 20.5h8"/>',
  },
  alimentos: {
    es: 'Alimentos y bebidas',
    en: 'Food & beverage',
    icon: '<path d="M5 10h11v4.5a5.5 5.5 0 0 1-11 0Z"/><path d="M16 11.5h1.4a2.5 2.5 0 0 1 0 5h-2"/><path d="M8.5 7.5c0-1 1-1.5 1-2.6M12 7.5c0-1 1-1.5 1-2.6"/>',
  },
  finanzas: {
    es: 'Servicios financieros',
    en: 'Financial services',
    icon: '<path d="M4 9.5 12 5l8 4.5"/><path d="M5 9.8h14"/><path d="M6.5 10.5v6.5M10 10.5v6.5M14 10.5v6.5M17.5 10.5v6.5"/><path d="M4.5 19.5h15"/>',
  },
  industria: {
    es: 'Industria y manufactura',
    en: 'Manufacturing',
    icon: '<path d="M3.5 20h17"/><path d="M4.5 20v-8.5l4.5 2.8v-2.8l4.5 2.8V6h3.5v14"/><path d="M8 17.2h1.5M12 17.2h1.5"/>',
  },
  educacion: {
    es: 'Educación',
    en: 'Education',
    icon: '<path d="M2.5 9.5 12 5l9.5 4.5L12 14Z"/><path d="M6.5 11.8V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.2"/><path d="M21.5 9.5v5"/>',
  },
  logistica: {
    es: 'Logística y transporte',
    en: 'Logistics & transport',
    icon: '<path d="M3 6.5h11v10H3Z"/><path d="M14 9.5h4l3 3.5v3.5h-7"/><circle cx="7" cy="17.6" r="1.8"/><circle cx="17.5" cy="17.6" r="1.8"/>',
  },
};

export const industryKeys = /** @type {[string, ...string[]]} */ (Object.keys(industries));
