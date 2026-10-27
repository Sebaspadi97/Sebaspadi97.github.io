// Auditoría de calidad del sitio publicado.
// - axe-core (WCAG 2.0/2.1/2.2 A y AA) en todas las páginas del sitemap, escritorio y móvil
// - Desbordes horizontales, errores de consola y recursos que fallan
// - Lighthouse (móvil) en las páginas clave
// Uso: node scripts/qa/run-qa.mjs <url-base> <carpeta-salida>

import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const BASE = (process.argv[2] || 'https://sebaspadi97.github.io').replace(/\/$/, '');
const OUT = process.argv[3] || 'qa-out';
mkdirSync(OUT, { recursive: true });

const sitemap = await (await fetch(`${BASE}/sitemap-0.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).filter((p) => p !== '/');
pages.push('/no-existe-qa/'); // la 404

const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 375, height: 812, isMobile: true, hasTouch: true } };
const browser = await chromium.launch();
const results = [];

for (const [vpName, vp] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch, reducedMotion: 'reduce' });
  for (const path of pages) {
    const page = await ctx.newPage();
    const consoleErrors = [];
    const failed = [];
    page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', (e) => consoleErrors.push(String(e)));
    page.on('response', (r) => { if (r.status() >= 400 && !r.url().includes('no-existe-qa')) failed.push(`${r.status()} ${r.url()}`); });
    const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    // carga las imágenes diferidas antes de medir
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 600));
      window.scrollTo(0, 0);
    });
    const layout = await page.evaluate(() => {
      const W = document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll('body *')]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          if (r.width === 0 || r.right <= W + 1) return false;
          let p = e.parentElement;
          while (p) { const s = getComputedStyle(p); if (/(auto|scroll|hidden)/.test(s.overflowX)) return false; p = p.parentElement; }
          return true;
        })
        .slice(0, 5)
        .map((e) => `${e.tagName.toLowerCase()}.${(e.getAttribute('class') || '').split(' ')[0]}`);
      const brokenImgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
      const small = [...document.querySelectorAll('a, button, input, select, textarea, label.check, [role=button]')]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          if (!r.width || !r.height) return false;
          const inline = getComputedStyle(e).display === 'inline' && e.closest('p, li, dd, td, span.c-s, figcaption');
          return !inline && (r.height < 24 || r.width < 24);
        })
        .slice(0, 8)
        .map((e) => `${e.tagName.toLowerCase()} "${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
      return {
        title: document.title,
        lang: document.documentElement.lang,
        h1: document.querySelectorAll('h1').length,
        description: !!document.querySelector('meta[name=description]')?.content,
        canonical: document.querySelector('link[rel=canonical]')?.href || null,
        overflow: document.documentElement.scrollWidth > W + 1,
        wide,
        brokenImgs,
        small,
      };
    });
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    results.push({
      viewport: vpName,
      path,
      status: res ? res.status() : null,
      ...layout,
      consoleErrors,
      failed,
      axe: axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.slice(0, 6).map((n) => ({ target: n.target.join(' '), summary: (n.failureSummary || '').slice(0, 300), html: n.html.slice(0, 160) })),
        count: v.nodes.length,
      })),
    });
    await page.close();
    console.log(vpName, path, 'axe:', axe.violations.length);
  }
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}/pages.json`, JSON.stringify(results, null, 2));

// ---------- Lighthouse (móvil) ----------
const key = ['/es/', '/en/', '/es/proyectos/', '/es/proyectos/abandono-de-clientes/', '/es/lab/', '/es/lab/donde-nacen-las-empresas-de-bogota/', '/es/sobre-mi/', '/es/contacto/'];
const lh = [];
for (const path of key) {
  const file = `${OUT}/lh-${path.replace(/\W+/g, '_')}.json`;
  try {
    execFileSync('npx', ['lighthouse', BASE + path, '--quiet', '--output=json', `--output-path=${file}`, '--chrome-flags=--headless=new --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo'], { stdio: 'inherit', env: process.env });
    const r = JSON.parse((await import('node:fs')).readFileSync(file, 'utf8'));
    const failing = Object.values(r.audits)
      .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'manual' && a.scoreDisplayMode !== 'notApplicable')
      .map((a) => ({ id: a.id, title: a.title, score: a.score, value: a.displayValue || '', items: (a.details?.items || []).slice(0, 5).map((it) => it.url || it.node?.snippet || it.source?.url || JSON.stringify(it).slice(0, 160)) }));
    lh.push({
      path,
      scores: Object.fromEntries(Object.entries(r.categories).map(([k, c]) => [k, Math.round(c.score * 100)])),
      metrics: {
        FCP: r.audits['first-contentful-paint'].displayValue,
        LCP: r.audits['largest-contentful-paint'].displayValue,
        TBT: r.audits['total-blocking-time'].displayValue,
        CLS: r.audits['cumulative-layout-shift'].displayValue,
        SI: r.audits['speed-index'].displayValue,
        weight: r.audits['total-byte-weight'].displayValue,
      },
      failing,
    });
    (await import('node:fs')).unlinkSync(file);
  } catch (e) {
    lh.push({ path, error: String(e).slice(0, 300) });
  }
}
writeFileSync(`${OUT}/lighthouse.json`, JSON.stringify(lh, null, 2));

// ---------- Resumen ----------
const byRule = {};
for (const r of results) for (const v of r.axe) {
  byRule[v.id] ??= { impact: v.impact, help: v.help, pages: new Set(), count: 0 };
  byRule[v.id].pages.add(`${r.viewport}:${r.path}`);
  byRule[v.id].count += v.count;
}
const summary = {
  base: BASE,
  date: new Date().toISOString(),
  pages: pages.length,
  axeRules: Object.fromEntries(Object.entries(byRule).map(([k, v]) => [k, { ...v, pages: [...v.pages] }])),
  overflow: results.filter((r) => r.overflow).map((r) => `${r.viewport}:${r.path} ${r.wide.join(',')}`),
  consoleErrors: results.filter((r) => r.consoleErrors.length).map((r) => `${r.viewport}:${r.path} ${r.consoleErrors.join(' | ')}`),
  failed: results.filter((r) => r.failed.length).map((r) => `${r.viewport}:${r.path} ${r.failed.join(' | ')}`),
  brokenImgs: results.filter((r) => r.brokenImgs.length).map((r) => `${r.path} ${r.brokenImgs.join(',')}`),
  smallTargets: results.filter((r) => r.viewport === 'mobile' && r.small.length).map((r) => `${r.path} ${r.small.join(' ; ')}`),
  seo: results.filter((r) => r.viewport === 'desktop' && (r.h1 !== 1 || !r.description || !r.title)).map((r) => `${r.path} h1=${r.h1} desc=${r.description}`),
  lighthouse: lh.map((x) => ({ path: x.path, scores: x.scores, metrics: x.metrics, error: x.error })),
};
writeFileSync(`${OUT}/summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
