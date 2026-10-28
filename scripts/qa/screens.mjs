// Capturas de página completa del sitio publicado (escritorio y móvil), para revisión visual.
// Uso: node scripts/qa/screens.mjs <url-base> <carpeta-salida>
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE = (process.argv[2] || 'https://sebaspadi97.github.io').replace(/\/$/, '');
const OUT = process.argv[3] || 'qa-out/screens';
mkdirSync(OUT, { recursive: true });

const pages = [
  '/es/', '/es/proyectos/', '/es/proyectos/abandono-de-clientes/', '/es/proyectos/estancia-hospitalaria/',
  '/es/lab/', '/es/lab/donde-nacen-las-empresas-de-bogota/', '/es/lab/bogota-abre-17-bares-al-dia/',
  '/es/sobre-mi/', '/es/contacto/', '/es/privacidad/', '/en/', '/no-existe/',
];
const vps = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } };

const browser = await chromium.launch();
for (const [k, vp] of Object.entries(vps)) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor || 1, reducedMotion: 'reduce' });
  for (const p of pages) {
    const page = await ctx.newPage();
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 500));
    });
    const name = `${k}-${p.replace(/\W+/g, '_').replace(/^_|_$/g, '') || 'root'}.jpg`;
    await page.screenshot({ path: `${OUT}/${name}`, fullPage: true, type: 'jpeg', quality: 60 });
    console.log('ok', name);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
