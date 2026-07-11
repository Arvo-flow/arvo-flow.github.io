import { chromium } from 'playwright';
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
const BUILD = path.resolve('build');
const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml', '.json':'application/json' };
const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0].replace(/^\/flow/, '') || '/';
  let f = path.join(BUILD, p);
  if (!existsSync(f) || !path.extname(p)) f = path.join(BUILD, 'index.html');
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] ?? 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(4196, r));
mkdirSync('/tmp/v5-local', { recursive: true });
const b = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 } });
  await p.route('**/api/**', (r) => r.fulfill({ json: {} }));
  await p.goto('http://localhost:4196/flow/', { waitUntil: 'domcontentloaded' });
  // scrolla långsamt genom sidan så alla inview-triggers fyrar innan fullPage-fotot
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 350) { window.scrollTo(0, y); await new Promise((r2) => setTimeout(r2, 160)); }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(2200);
  await p.screenshot({ path: `/tmp/v5-local/${tag}.png`, fullPage: true });
  console.log('✓', tag);
  await p.close();
}
await b.close(); server.close();
