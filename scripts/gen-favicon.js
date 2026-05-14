const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

// Arvo logo path from Logo.js (viewBox 0 0 40 40)
// M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z  (outer, fill-rule evenodd)
// M20 12.5 L24 21 L16 21 Z                           (inner hole)

function sign(ax, ay, bx, by, cx, cy) {
  return (ax - cx) * (by - cy) - (bx - cx) * (ay - cy);
}

function inTriangle(px, py, ax, ay, bx, by, cx, cy) {
  const d1 = sign(px, py, ax, ay, bx, by);
  const d2 = sign(px, py, bx, by, cx, cy);
  const d3 = sign(px, py, cx, cy, ax, ay);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
}

function lerp(a, b, t) { return a + (b - a) * t; }

// Gradient: #5DD6CA → #1B6E66
const TOP = [0x5D, 0xD6, 0xCA];
const BOT = [0x1B, 0x6E, 0x66];

function renderLogo(size, bg) {
  const s = size / 40;
  // Outer triangle
  const o = [[20*s, 3*s], [37*s, 36*s], [3*s, 36*s]];
  // Inner hole
  const i = [[20*s, 12.5*s], [24*s, 21*s], [16*s, 21*s]];
  const yTop = 3*s, yBot = 36*s;

  const buf = Buffer.alloc(size * size * 4, 0);

  if (bg) {
    for (let p = 0; p < size * size; p++) {
      buf[p*4]   = bg[0];
      buf[p*4+1] = bg[1];
      buf[p*4+2] = bg[2];
      buf[p*4+3] = 255;
    }
  }

  // Supersample 2x for smoother edges
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < 2; sy++) {
        for (let sx = 0; sx < 2; sx++) {
          const px = x + (sx + 0.5) / 2;
          const py = y + (sy + 0.5) / 2;
          const inO = inTriangle(px, py, o[0][0], o[0][1], o[1][0], o[1][1], o[2][0], o[2][1]);
          const inI = inTriangle(px, py, i[0][0], i[0][1], i[1][0], i[1][1], i[2][0], i[2][1]);
          if (inO && !inI) {
            const t = Math.max(0, Math.min(1, (py - yTop) / (yBot - yTop)));
            r += Math.round(lerp(TOP[0], BOT[0], t));
            g += Math.round(lerp(TOP[1], BOT[1], t));
            b += Math.round(lerp(TOP[2], BOT[2], t));
            a += 255;
          } else if (bg) {
            r += bg[0]; g += bg[1]; b += bg[2]; a += 255;
          }
        }
      }
      const idx = (y * size + x) * 4;
      buf[idx]   = r >> 2;
      buf[idx+1] = g >> 2;
      buf[idx+2] = b >> 2;
      buf[idx+3] = a >> 2;
    }
  }
  return buf;
}

function crc32(buf) {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = t[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const tb = Buffer.from(type, 'ascii');
  const payload = Buffer.concat([tb, data]);
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(payload), 0);
  return Buffer.concat([len, tb, data, crc]);
}

function toPNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihd = Buffer.alloc(13);
  ihd.writeUInt32BE(size, 0); ihd.writeUInt32BE(size, 4);
  ihd[8] = 8; ihd[9] = 6; // 8-bit RGBA
  const rowBytes = size * 4;
  const raw = Buffer.alloc(size * (1 + rowBytes));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + rowBytes)] = 0;
    rgba.copy(raw, y * (1 + rowBytes) + 1, y * rowBytes, (y + 1) * rowBytes);
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihd),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function toICO(png) {
  const hdr = Buffer.alloc(6);
  hdr.writeUInt16LE(0, 0); hdr.writeUInt16LE(1, 2); hdr.writeUInt16LE(1, 4);
  const dir = Buffer.alloc(16, 0);
  dir[0] = 32; dir[1] = 32; // 32x32
  dir.writeUInt16LE(1, 4); dir.writeUInt16LE(32, 6);
  dir.writeUInt32LE(png.length, 8); dir.writeUInt32LE(22, 12);
  return Buffer.concat([hdr, dir, png]);
}

const pub = path.join(__dirname, '../public');

const bg = [0x12, 0x5A, 0x52]; // dark teal background for apple icons

const r32  = renderLogo(32);
const p32  = toPNG(32, r32);
fs.writeFileSync(path.join(pub, 'favicon.ico'), toICO(p32));
fs.writeFileSync(path.join(pub, 'favicon.png'), p32);

const p180 = toPNG(180, renderLogo(180, bg));
fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), p180);

const p192 = toPNG(192, renderLogo(192, bg));
fs.writeFileSync(path.join(pub, 'logo192.png'), p192);

const p512 = toPNG(512, renderLogo(512, bg));
fs.writeFileSync(path.join(pub, 'logo512.png'), p512);

console.log('Favicons klara: favicon.ico, favicon.png, apple-touch-icon.png, logo192.png, logo512.png');
