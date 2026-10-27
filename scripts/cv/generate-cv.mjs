// Genera el CV en PDF (español e inglés) a partir de los textos del sitio.
// Uso local:  node scripts/cv/generate-cv.mjs <carpeta-de-fuentes>
// Requiere Playwright con Chromium. La carpeta de fuentes debe tener los TTF de
// Montserrat (Medium, SemiBold, Bold) y Open Sans (Regular, SemiBold).
// Salida: public/cv/sebas-padilla-cv-es.pdf y public/cv/sebas-padilla-cv-en.pdf
// Regla: el CV web lleva solo correo y LinkedIn (sin dirección ni celular).

import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const fonts = resolve(process.argv[2] || resolve(process.env.HOME || '', '.fonts'));
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const { about } = await import(pathToFileURL(resolve(root, 'src/data/about.js')).href);
const { cases, pillars } = await import(pathToFileURL(resolve(root, 'src/data/cases.js')).href);
const { site } = await import(pathToFileURL(resolve(root, 'src/data/site.js')).href);

const SITE_URL = 'sebaspadi97.github.io';
const logo = readFileSync(resolve(root, 'public/brand/logo-horizontal.svg'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const font = (file) => `data:font/ttf;base64,${readFileSync(resolve(fonts, file)).toString('base64')}`;

const L = {
  es: {
    role: 'Analista de Inteligencia de Negocios · Ingeniero Industrial · Maestría en Ciencia de Datos (en curso)',
    location: 'Bogotá, Colombia · abierto a trabajo remoto',
    profile: 'Perfil',
    experience: 'Experiencia',
    projects: 'Proyectos seleccionados',
    projectsNote: `Casos completos, con datos y código, en ${SITE_URL}`,
    education: 'Formación',
    tools: 'Herramientas',
    finding: 'Hallazgo',
    team: 'en equipo',
    portfolio: 'Portafolio',
    footer: 'De los datos a las decisiones.',
  },
  en: {
    role: "Business Intelligence Analyst · Industrial Engineer · Master's in Data Science (in progress)",
    location: 'Bogotá, Colombia · open to remote work',
    profile: 'Profile',
    experience: 'Experience',
    projects: 'Selected projects',
    projectsNote: `Full case studies, with data and code, at ${SITE_URL}`,
    education: 'Education',
    tools: 'Toolkit',
    finding: 'Finding',
    team: 'team project',
    portfolio: 'Portfolio',
    footer: 'From data to decisions.',
  },
};

function html(lang) {
  const a = about[lang];
  const t = L[lang];
  const profile = [a.intro, a.story[1], a.quote];
  const projects = cases.map((c) => {
    const x = c[lang] || c.es;
    return { pillar: pillars[c.pillar][lang], title: x.title, q: x.question, finding: x.finding, team: c.team, repo: c.repo.replace('https://', '') };
  });

  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><title>Sebastián Padilla Castaño — CV</title>
<style>
@font-face { font-family: 'Montserrat'; font-weight: 500; src: url('${font('Montserrat-Medium.ttf')}'); }
@font-face { font-family: 'Montserrat'; font-weight: 600; src: url('${font('Montserrat-SemiBold.ttf')}'); }
@font-face { font-family: 'Montserrat'; font-weight: 700; src: url('${font('Montserrat-Bold.ttf')}'); }
@font-face { font-family: 'Open Sans'; font-weight: 400; src: url('${font('OpenSans-Regular.ttf')}'); }
@font-face { font-family: 'Open Sans'; font-weight: 600; src: url('${font('OpenSans-SemiBold.ttf')}'); }
@page { size: Letter; margin: 11mm 13mm 10mm 13mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: 'Open Sans', sans-serif; font-size: 8.9pt; line-height: 1.4; color: #202824; }
h1, h2, h3 { font-family: 'Montserrat', sans-serif; margin: 0; }
a { color: #245B45; text-decoration: none; }
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; padding-bottom: 10px; border-bottom: 2px solid #202824; }
.name { font-size: 22pt; font-weight: 700; color: #183D32; letter-spacing: -0.02em; line-height: 1.05; }
.role { margin-top: 4px; font-family: 'Montserrat'; font-weight: 600; font-size: 9.2pt; color: #245B45; }
.contact { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 2px 14px; font-size: 8.8pt; color: #66736C; }
.contact b { color: #202824; font-weight: 600; }
.logo { width: 118px; flex: 0 0 auto; }
.logo svg { width: 100%; height: auto; display: block; }
.grid { display: grid; grid-template-columns: 1fr 185px; gap: 18px; margin-top: 10px; }
section { margin-bottom: 9px; }
h2 { font-size: 8.4pt; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #245B45; padding-bottom: 3px; border-bottom: 1px solid #E7EBE7; margin-bottom: 7px; }
.profile p { margin: 0 0 5px; }
.profile .quote { font-family: 'Montserrat'; font-weight: 600; color: #183D32; }
.job { margin-bottom: 7px; break-inside: avoid; }
.job-top { display: flex; justify-content: space-between; gap: 10px; align-items: baseline; }
.job h3 { font-size: 10pt; font-weight: 700; color: #202824; }
.job .org { font-family: 'Montserrat'; font-weight: 500; color: #66736C; }
.job .period { font-family: 'Montserrat'; font-weight: 600; font-size: 8.2pt; color: #245B45; white-space: nowrap; }
.job p { margin: 3px 0 4px; }
.chips { display: flex; flex-wrap: wrap; gap: 4px; }
.chip { background: #D6A64F; color: #202824; font-weight: 600; font-size: 7.8pt; padding: 1px 7px; border-radius: 99px; }
.projs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px; }
.proj { break-inside: avoid; }
.proj .p-top { font-family: 'Montserrat'; font-size: 7.6pt; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #2F7A73; }
.proj h3 { font-size: 9.6pt; font-weight: 700; }
.proj p { margin: 1px 0 0; }
.proj .f { color: #202824; }
.proj .f b { color: #8A6420; }
.proj .r { font-size: 8pt; color: #66736C; }
.note { font-size: 8.2pt; color: #66736C; margin-top: 2px; }
.side ul { list-style: none; margin: 0; padding: 0; }
.edu li { margin-bottom: 6px; }
.edu b { font-family: 'Montserrat'; font-weight: 600; display: block; font-size: 8.8pt; line-height: 1.3; }
.edu span { color: #66736C; font-size: 8.3pt; }
.tools h3 { font-size: 7.8pt; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 6px 0 3px; }
.tools .g-green { color: #245B45; } .tools .g-teal { color: #2F7A73; } .tools .g-gold { color: #8A6420; }
.tools p { margin: 0; font-size: 8.6pt; }
.foot { margin-top: 8px; padding-top: 6px; border-top: 1px solid #E7EBE7; display: flex; justify-content: space-between; font-size: 7.8pt; color: #66736C; }
.foot b { font-family: 'Montserrat'; color: #183D32; }
</style></head>
<body>
  <header class="head">
    <div>
      <h1 class="name">Sebastián Padilla Castaño</h1>
      <div class="role">${esc(t.role)}</div>
      <div class="contact">
        <span><a href="mailto:${esc(site.email)}"><b>${esc(site.email)}</b></a></span>
        <span><a href="${esc(site.linkedin)}">linkedin.com/in/sebastianpadillacastano</a></span>
        <span>${t.portfolio}: <a href="https://${SITE_URL}/${lang}/">${SITE_URL}</a></span>
        <span>${esc(t.location)}</span>
      </div>
    </div>
    <div class="logo">${logo}</div>
  </header>

  <div class="grid">
    <main>
      <section class="profile">
        <h2>${t.profile}</h2>
        ${profile.slice(0, 2).map((p) => `<p>${esc(p)}</p>`).join('')}
      </section>

      <section>
        <h2>${t.experience}</h2>
        ${a.experience.map((e) => `
        <div class="job">
          <div class="job-top"><h3>${esc(e.role)} <span class="org">· ${esc(e.org)}</span></h3><span class="period">${esc(e.period)}</span></div>
          <p>${esc(e.text)}</p>
          <div class="chips">${e.results.map((r) => `<span class="chip">${esc(r)}</span>`).join('')}</div>
        </div>`).join('')}
      </section>

      <section>
        <h2>${t.projects}</h2>
        <div class="projs">${projects.map((p) => `
        <div class="proj">
          <div class="p-top">${esc(p.pillar)}${p.team ? ` · ${t.team}` : ''}</div>
          <h3>${esc(p.title)}</h3>
          <p class="f"><b>${t.finding}:</b> ${esc(p.finding)}</p>
        </div>`).join('')}</div>
        <p class="note"><a href="https://${SITE_URL}/${lang === 'es' ? 'es/proyectos' : 'en'}/">${esc(t.projectsNote)}</a></p>
      </section>
    </main>

    <aside class="side">
      <section class="edu">
        <h2>${t.education}</h2>
        <ul>${a.education.map((e) => `<li><b>${esc(e.name)}</b><span>${esc(e.org)} · ${esc(e.period)}</span></li>`).join('')}</ul>
      </section>
      <section class="tools">
        <h2>${t.tools}</h2>
        ${a.tools.map((g) => `<h3 class="g-${g.tone}">${esc(g.group)}</h3><p>${g.items.map(esc).join(' · ')}</p>`).join('')}
      </section>
    </aside>
  </div>

  <footer class="foot"><span><b>Sebas Padilla Lab</b> · ${esc(t.footer)}</span><span>${SITE_URL}</span></footer>
</body></html>`;
}

const outDir = resolve(root, 'public/cv');
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
for (const lang of ['es', 'en']) {
  const page = await browser.newPage();
  await page.setContent(html(lang), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const out = resolve(outDir, `sebas-padilla-cv-${lang}.pdf`);
  await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
  console.log('OK', out);
  await page.close();
}
await browser.close();
