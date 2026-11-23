/* Uthkarsh & Bhagyashree · paper-cut 2.5D wedding invitation */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp01 = v => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = t => t * t * (3 - 2 * t);
const ease = t => 1 - Math.pow(1 - t, 3);
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tf = (el, s) => { if (el) el.style.transform = s; };
const op = (el, v) => { if (el) el.style.opacity = v; };

/* ---------------- Optional art: show when present ---------------- */
$$('img.opt').forEach(im => {
  const ok = () => im.classList.add('ok');
  if (im.complete && im.naturalWidth) ok(); else { im.addEventListener('load', ok); im.addEventListener('error', () => im.remove()); }
});

/* ---------------- Language ---------------- */
const KN = {
  introDate: '28 ಹಾಗೂ 30 ಡಿಸೆಂಬರ್ 2026', introSub: 'ತಮಗೆ ಆದರದ ಆಹ್ವಾನ',
  heroDate: '28 ಹಾಗೂ 30 ಡಿಸೆಂಬರ್ 2026 · ಬಾಗಲಕೋಟೆ ಹಾಗೂ ಬೆಂಗಳೂರು',
  scroll: 'ಮುಂದೆ ಸಾಗಿ',
  shubham: 'ಎಲ್ಲವೂ ಶುಭವಾಗಲಿ',
  lead: 'ಗುರು-ಹಿರಿಯರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ, ತಮ್ಮನ್ನು ಸಕುಟುಂಬ ಸಮೇತರಾಗಿ ಈ ಶುಭ ವಿವಾಹಕ್ಕೆ ಪ್ರೀತಿಯಿಂದ ಆಹ್ವಾನಿಸುತ್ತೇವೆ',
  groom: 'ಉತ್ಕರ್ಷ',
  weds: 'ಮತ್ತು',
  bride: 'ಭಾಗ್ಯಶ್ರೀ',
  mLabel: 'ಶುಭ ಮುಹೂರ್ತ', mDate: 'ಸೋಮವಾರ, 28 ಡಿಸೆಂಬರ್ 2026', mTime: 'ಮಧ್ಯಾಹ್ನ 12:24 · ಅಭಿಜಿತ್ ಲಗ್ನ',
  mWhere: 'ಎನ್. ಸಿ. ಅಥಣಿ ಕಲ್ಯಾಣ ಮಂಟಪ, ವಿದ್ಯಾಗಿರಿ, ಬಾಗಲಕೋಟೆ',
  close: 'ತಮ್ಮ ಆಗಮನ ಹಾಗೂ ಆಶೀರ್ವಾದ ನಮ್ಮ ಸಂಭ್ರಮವನ್ನು ಪೂರ್ಣಗೊಳಿಸುತ್ತದೆ.',
  cdLabel: 'ಶುಭ ಮುಹೂರ್ತಕ್ಕೆ', days: 'ದಿನ', hours: 'ಗಂಟೆ', mins: 'ನಿಮಿಷ', secs: 'ಸೆಕೆಂಡು',
  celTitle: 'ಶುಭ ಕಾರ್ಯಕ್ರಮಗಳು', celSub: 'ಎರಡು ದಿನ · ಎರಡು ಊರು',
  wedTitle: 'ವಿವಾಹ', wedDate: 'ಸೋಮವಾರ · 28 ಡಿಸೆಂಬರ್ 2026',
  wedTime: 'ಮಧ್ಯಾಹ್ನ 12:24', wedWhat: 'ಅಭಿಜಿತ್ ಲಗ್ನದಲ್ಲಿ ಮುಹೂರ್ತ, ಮಾಂಗಲ್ಯಧಾರಣ ಹಾಗೂ ಅಕ್ಷತಾರೋಪಣ',
  wedFeastWhen: 'ಬಳಿಕ', wedFeast: 'ಮದುವೆಯ ಭೋಜನ',
  wedVenue: 'ಎನ್. ಸಿ. ಅಥಣಿ ಕಲ್ಯಾಣ ಮಂಟಪ', wedCity: 'ವಿದ್ಯಾಗಿರಿ, ಬಾಗಲಕೋಟೆ',
  addCal: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ', viewMap: 'ದಾರಿ',
  recTitle: 'ಆರತಕ್ಷತೆ', recDate: 'ಬುಧವಾರ · 30 ಡಿಸೆಂಬರ್ 2026',
  recTime: 'ಸಂಜೆ 6 – ರಾತ್ರಿ 10', recWhat: 'ಆರತಕ್ಷತೆ', shubha: 'ಶುಭ ವಿವಾಹ',
  recVenue: 'ಪೈ ವಿಸ್ಟಾ ಕನ್ವೆನ್ಷನ್ ಹಾಲ್', recCity: 'ಸೌತ್ ಎಂಡ್ ಸರ್ಕಲ್, ಬಸವನಗುಡಿ, ಬೆಂಗಳೂರು',
  venTitle: 'ಕಾರ್ಯಕ್ರಮದ ಸ್ಥಳಗಳು',
  vTagWed: 'ವಿವಾಹ · ಸೋಮ 28 ಡಿಸೆಂಬರ್', vNameWed: 'ಎನ್. ಸಿ. ಅಥಣಿ ಕಲ್ಯಾಣ ಮಂಟಪ', vAddrWed: 'ವಿದ್ಯಾಗಿರಿ, ಬಾಗಲಕೋಟೆ, ಕರ್ನಾಟಕ 587103',
  vTagRec: 'ಆರತಕ್ಷತೆ · ಬುಧ 30 ಡಿಸೆಂಬರ್', vNameRec: 'ಪೈ ವಿಸ್ಟಾ ಕನ್ವೆನ್ಷನ್ ಹಾಲ್', vAddrRec: 'ಸೌತ್ ಎಂಡ್ ಸರ್ಕಲ್, ಬಸವನಗುಡಿ, ಬೆಂಗಳೂರು',
  openMaps: 'ಗೂಗಲ್ ನಕ್ಷೆಯಲ್ಲಿ ತೆರೆಯಿರಿ', copyAddr: 'ವಿಳಾಸ ನಕಲಿಸಿ', mapTap: 'ನಕ್ಷೆ ತೆರೆಯಲು ಸ್ಪರ್ಶಿಸಿ',
  spTitle: 'ತಮಗಾಗಿ ನಮ್ಮ ಮನೆಯ ಬಾಗಿಲು ತೆರೆದಿದೆ', spSub: 'ಪರದೆ ಸರಿಸಿ, ತಾವು ಬರುವಿರೋ ಎಂದು ತಿಳಿಸಿ',
  rsvpTitle: 'ತಮ್ಮ ಆಗಮನವನ್ನು ತಿಳಿಸಿ', rsvpSub: 'ತಾವು ಬರುವಿರೋ ಎಂದು ದಯವಿಟ್ಟು ತಿಳಿಸಿ',
  fName: 'ತಮ್ಮ ಹೆಸರು', fGuests: 'ತಮ್ಮನ್ನೂ ಸೇರಿ ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ', fAttend: 'ನಾನು ಭಾಗವಹಿಸುವುದು',
  optWed: 'ವಿವಾಹ · 28 ಡಿಸೆಂಬರ್, ಬಾಗಲಕೋಟೆ', optRec: 'ಆರತಕ್ಷತೆ · 30 ಡಿಸೆಂಬರ್, ಬೆಂಗಳೂರು',
  fNote: 'ವಧು-ವರರಿಗೆ ಶುಭಾಶಯ', preview: 'ತಮ್ಮ ಸಂದೇಶ', send: 'ಕಳುಹಿಸಿ', sent: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ', resend: 'ಬದಲಾವಣೆ ಕಳುಹಿಸಿ', copyMsg: 'ಸಂದೇಶ ನಕಲಿಸಿ',
  thanks: 'ಧನ್ಯವಾದಗಳು, ತಮ್ಮ ಉತ್ತರ ನಮಗೆ ತಲುಪಿದೆ. ತಮ್ಮನ್ನು ಸ್ವಾಗತಿಸಲು ಕಾತುರರಾಗಿದ್ದೇವೆ.',
  wedWk: 'ಸೋಮವಾರ', recWk: 'ಬುಧವಾರ', monYear: 'ಡಿಸೆಂಬರ್ 2026', wedPlace: 'ಬಾಗಲಕೋಟೆ', recPlace: 'ಬೆಂಗಳೂರು',
  withLove: 'ಪ್ರೀತಿ ಹಾಗೂ ಆಶೀರ್ವಾದಗಳೊಂದಿಗೆ',
  presence: '', families: 'ಆದ್ಯ ಹಾಗೂ ದೇಶಪಾಂಡೆ ಕುಟುಂಬಗಳ ಪರವಾಗಿ ಪ್ರೀತಿಯಿಂದ', familiesB: 'ದೇಶಪಾಂಡೆ ಹಾಗೂ ಆದ್ಯ ಕುಟುಂಬಗಳ ಪರವಾಗಿ ಪ್ರೀತಿಯಿಂದ'
};
const EN = {};
$$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (!(k in EN)) EN[k] = el.innerHTML; });
let LANG = 'en';
try { if (localStorage.getItem('lang') === 'kn') LANG = 'kn'; } catch (e) {}
function setLang(l) {
  LANG = l; document.body.dataset.lang = l; document.documentElement.lang = l === 'kn' ? 'kn' : 'en';
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; el.innerHTML = (l === 'kn' && k in KN) ? KN[k] : EN[k]; });
  $$('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.setLang === l));
  try { localStorage.setItem('lang', l); } catch (e) {}
  updatePreview();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}
$$('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)));

/* ---------------- Petals and birds ---------------- */
$$('.petals').forEach(box => {
  const n = +box.dataset.petals || 14;
  for (let i = 0; i < n; i++) {
    const im = new Image(); im.alt = ''; im.className = 'petal'; im.decoding = 'async';
    im.src = `assets/a33-p${1 + Math.floor(Math.random() * 24)}.webp`;
    im.style.cssText = `left:${Math.random() * 100}%;--s:${14 + Math.random() * 18}px;--d:${11 + Math.random() * 10}s;--dl:${-Math.random() * 20}s;--dx:${(Math.random() * 30 - 15).toFixed(1)}vw;--r:${(Math.random() * 720 - 360).toFixed(0)}deg`;
    box.appendChild(im);
  }
});
(() => { // birds appear only when the bird art exists
  const test = new Image();
  test.onload = () => $$('.birds').forEach(box => {
    for (let i = 0; i < 4; i++) {
      const b = new Image(); b.alt = ''; b.className = 'bird'; b.src = `assets/a37-bird${[1,4,5,7][i]}.webp`;
      b.style.cssText = `top:${8 + Math.random() * 26}%;width:${46 + Math.random() * 40}px;--d:${26 + Math.random() * 18}s;--dl:${-Math.random() * 30}s`;
      box.appendChild(b);
    }
  });
  test.src = 'assets/a37-bird1.webp';
})();

(() => { const box = $('.strew'); if (!box) return;
  const spots = []; for (let i = 0; i < 34; i++) { const t = i / 33; spots.push([3 + t * 94 + Math.sin(i * 2.3) * 2.5, 18 + ((i * 37) % 70)]); }
  spots.forEach(([x, y], i) => { const im = new Image(); im.alt = ''; im.src = `assets/a33-p${1 + (i * 5) % 24}.webp`;
    im.style.cssText = `left:${x}%;top:${y}%;--s:${8 + (i % 5) * 3}px;--r:${(i * 47) % 360}deg`; box.appendChild(im); });
})();

/* ---------------- Kolam: line patterns drawn like rice flour ---------------- */
const pathFrom = pts => 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L');
function kolamDivider(svg) {
  const parts = [], dots = [];
  [[-1, 136, 40], [1, 164, 260]].forEach(([dir, x0, x1]) => {
    [1, -1].forEach(ph => { const pts = []; for (let x = x0; dir < 0 ? x >= x1 : x <= x1; x += dir) { const t = Math.abs(x - x0) / 24 * Math.PI; pts.push([x, 20 + ph * 8 * Math.sin(t) * Math.min(1, (Math.abs(x1 - x) + 2) / 14)]); } parts.push(pathFrom(pts)); });
    for (let k = 0; k < 4; k++) dots.push([x0 + dir * (12 + 24 * k), 20]);
  });
  const rose = []; for (let i = 0; i <= 720; i++) { const th = i / 720 * Math.PI * 2, r = 15 * Math.cos(4 * th); rose.push([150 + r * Math.cos(th), 20 + r * Math.sin(th)]); }
  parts.push(pathFrom(rose));
  svg.innerHTML = parts.map(d => `<path d="${d}"/>`).join('') + `<circle class="r" cx="150" cy="20" r="4.5"/>` + dots.concat([[150, 20]]).map(([x, y]) => `<circle class="d" cx="${x}" cy="${y}" r="1.8"/>`).join('');
}
function kolamBig(svg) {
  // Radial rangoli: every ring shares the same 8 axes (8, 16 and 32 repeats), and every dot sits on a petal tip or in a gap.
  const parts = [], dots = [];
  const curve = (f, n = 1440) => { const pts = []; for (let i = 0; i <= n; i++) { const th = i / n * Math.PI * 2, r = f(th); pts.push([r * Math.cos(th), r * Math.sin(th)]); } return pathFrom(pts); };
  const ring = (n, r, off = 0) => { for (let k = 0; k < n; k++) { const a = (k + off) / n * Math.PI * 2 - Math.PI / 2; dots.push([r * Math.cos(a), r * Math.sin(a)]); } };
  const up = t => t + Math.PI / 2;                                        // first petal points straight up
  parts.push(curve(t => 62 * Math.abs(Math.cos(4 * up(t))) ** 0.9));     // 8-petal lotus
  ring(8, 40);                                                            // one dot inside each petal
  parts.push(curve(t => 82));                                             // ring holding the lotus
  ring(8, 82, 0.5);                                                       // dots where the ring meets the gaps
  parts.push(curve(t => 104 + 14 * Math.cos(16 * up(t))));                // 16 scallops
  ring(16, 128);                                                          // dot above each scallop tip
  parts.push(curve(t => 146 + 20 * Math.abs(Math.cos(8 * up(t)))));       // 16 outer petals
  ring(16, 152, 0.5);                                                     // dot nestled between outer petals
  parts.push(curve(t => 180 + 6 * Math.cos(32 * up(t))));                 // fine 32-bead border
  ring(32, 192);                                                          // a bead outside each wave
  svg.setAttribute('viewBox', '-200 -200 400 400');
  svg.innerHTML = parts.map(d => `<path d="${d}"/>`).join('') + `<circle class="r" cx="0" cy="0" r="12"/>` + dots.concat([[0, 0]]).map(([x, y]) => `<circle class="d" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6"/>`).join('');
}
$$('[data-kolam]').forEach(svg => (svg.dataset.kolam === 'big' ? kolamBig : kolamDivider)(svg));
(() => { const svg = $('[data-rangoli]'); if (!svg) return;
  const ring = (n, r0, r1, w, col, rot = 0) => { let s = ''; for (let i = 0; i < n; i++) { const a = rot + i / n * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a);
    const x0 = r0 * c, y0 = r0 * sn, x1 = r1 * c, y1 = r1 * sn, px = -sn * w, py = c * w, mx = (r0 + r1) / 2;
    s += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} Q${(mx * c + px).toFixed(1)} ${(mx * sn + py).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)} Q${(mx * c - px).toFixed(1)} ${(mx * sn - py).toFixed(1)} ${x0.toFixed(1)} ${y0.toFixed(1)}Z" fill="${col}"/>`; } return s; };
  svg.innerHTML = `<circle r="196" fill="#F6EAD0"/><circle r="196" fill="none" stroke="#B0182E" stroke-width="6"/>` + ring(24, 150, 194, 13, '#E2A92B') + ring(24, 150, 186, 6, '#C2410C', Math.PI / 24)
    + `<circle r="148" fill="#B0182E"/>` + ring(16, 92, 146, 20, '#F6EAD0') + ring(16, 96, 138, 10, '#E86A9A')
    + `<circle r="92" fill="#2E7D5B"/>` + ring(8, 30, 90, 26, '#F5C542') + ring(8, 36, 84, 12, '#E8742C', Math.PI / 8)
    + `<circle r="30" fill="#B0182E"/><circle r="17" fill="#F6EAD0"/><circle r="8" fill="#E2A92B"/>`;
  svg.setAttribute('preserveAspectRatio', 'none');
})();
const FK = {};
function prepFloor() { const svg = $('.floor-kolam'); if (!svg) return; FK.strokes = [...svg.querySelectorAll('path, circle.r')]; FK.len = FK.strokes.map(p => p.getTotalLength()); FK.strokes.forEach((p, i) => { p.style.strokeDasharray = FK.len[i]; p.style.strokeDashoffset = FK.len[i]; }); FK.dots = [...svg.querySelectorAll('circle.d')]; FK.dots.forEach(d => { d.style.opacity = 0; d.style.transition = 'opacity .6s'; }); }
prepFloor();
function prepDraw(svg) {
  const strokes = [...svg.querySelectorAll('path, circle.r')];
  strokes.forEach(p => { const L = p.getTotalLength ? p.getTotalLength() : 100; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
  gsap.set(svg.querySelectorAll('circle.d'), { scale: 0, transformOrigin: '50% 50%' });
  return strokes;
}

/* ---------------- Names: letters ---------------- */
$$('[data-split]').forEach(el => { el.innerHTML = [...el.textContent].map(c => `<span class="ch">${c}</span>`).join(''); });

/* ================= HERO · plays as one sequence after the first scroll ================= */
const hero = $('#hero'), hs = $('.stage', hero);
const H = {
  sky: $('.sky', hs), far: $('.clouds-far', hs), birds: $('.birds', hs), world: $('.world', hs), skyline: $('.skyline', hs),
  tower: $('.tower', hs), glow: $('.door-glow', hs), cfront: $('.cloud-front', hs), groveL: $('.grove-l', hs), groveR: $('.grove-r', hs),
  court: $('.courtyard', hs), flag: $('.flagstaff', hs), mist: $('.mist', hs), shade: $('.names-shade', hs), names: $('.names', hs),
  folL: $('.fol-l', hs), folR: $('.fol-r', hs), sheet: $('.sheet', hs), shower: $('.hero-shower', hs), strew: $('.strew', hs),
  base: $('.basegroup', hs), cwall: $('.cwall', hs), wband: $('.wband', hs), rang: $('.rangoli', hs), hpL: $('.hp-l', hs), hpR: $('.hp-r', hs), bnL: $('.bn-l', hs), bnR: $('.bn-r', hs), lamps: ['.l1', '.r1', '.l2', '.r2'].map(c => $('.basegroup ' + c, hs)), fk: $('.floor-kolam', hs), cue: $('.scroll-cue', hs)
};
const IN = { far: 1, skyline: 1, tower: 1, groves: 1, court: 1, fol: 1 };
let G = {}, heroP = 0;
function heroLayout() {
  const vw = innerWidth, vh = hs.clientHeight || innerHeight, portrait = vw / vh < 0.85;
  const tw = portrait ? 1.42 * vw : Math.min(0.74 * vw, 1.7 * vh / 1.27), th = tw * 1.27;
  const tl = (vw - tw) / 2 + (portrait ? 0.07 * tw : 0.02 * tw);
  const startTop = (portrait ? 0.46 : 0.44) * vh;
  const ground = 0.936 * th;
  const endTop = (portrait ? 0.70 : 0.76) * vh - ground;
  const dx = tl + 0.267 * tw, dyRel = 0.845 * th, dw = 0.08 * tw, dh = 0.19 * th;
  const cw = (portrait ? 2.7 : 2.2) * tw, ch = cw * 645 / 2600, cl = dx - 0.5 * cw, cTopRel = ground - 0.52 * ch + 0.006 * th;
  const sw = Math.max(vw * 1.35, tw * 2.1), sh = sw * 520 / 2600, sl = (vw - sw) / 2;
  const gh = (portrait ? 0.58 : 0.62) * th;
  const glW = gh * 845 / 1400, grW = gh * 656 / 1400;
  const glX = tl + 0.17 * tw - glW, grX = tl + 0.70 * tw;
  const fH = 0.5 * th;
  const CW = (portrait ? 1.9 : 1.75) * tw, CH = CW * 733 / 2600, GW = 1.2 * tw, GH = 0.13 * tw;
  G = { vw, vh, portrait, tw, th, tl, startTop, endTop, ground, dx, dyRel, dw, dh, cw, ch, cl, cTopRel, sw, sh, sl, gh, glW, grW, glX, grX, fH, GW, GH, CW, CH };
  H.cwall.style.width = CW + 'px';
  Object.assign(H.wband.style, { width: CW + 'px', height: 0.075 * tw + 'px' });
  H.rang.style.width = 0.62 * tw + 'px'; H.rang.style.height = 0.62 * tw * 0.3 + 'px';
  [H.hpL, H.hpR].forEach(e => e.style.width = 0.36 * tw + 'px');
  [H.bnL, H.bnR].forEach(e => e.style.height = 0.4 * tw + 'px');
  Object.assign(H.base.style, { width: GW + 'px', height: GH + 'px' });
  H.tower.style.width = tw + 'px'; H.court.style.width = cw + 'px'; H.skyline.style.width = sw + 'px';
  if (H.groveL) H.groveL.style.height = gh + 'px';
  if (H.groveR) H.groveR.style.height = gh + 'px';
  if (H.flag) H.flag.style.height = fH + 'px';
  H.cfront.style.width = 0.34 * tw + 'px';
  Object.assign(H.mist.style, { width: Math.max(vw * 1.5, tw * 2.4) + 'px', height: 0.2 * th + 'px' });
  Object.assign(H.glow.style, { width: dw * 2 + 'px', height: dh * 1.25 + 'px' });
  // floral side panels hang from above the screen, so the jasmine strings read as garlands
  const fh = (portrait ? 0.72 : 1.04) * vh, flw = fh * 634 / 1485, frw = fh * 651 / 1485, out = portrait ? (vw >= 700 ? 0.72 : 0.62) : 0.24 + Math.max(0, 1.6 - vw / vh) * 0.6;   // squarer tablet screens push the florals further out
  // the hero copies carry the jasmine strands 420px further up, so they always run off the top of the screen
  const fhx = fh * 1905 / 1485; H.folL.style.height = fhx + 'px'; H.folR.style.height = fhx + 'px';
  H.folL.style.marginLeft = -out * flw + 'px'; H.folR.style.marginRight = -out * frw + 'px';
  // the panels start low enough that their cut-off base never rises into view, swaying included
  G.folBuf = 8 + 0.016 * Math.max(flw, frw); G.folUp = Math.max(0, -(endTop - startTop) * 0.06) + G.folBuf;
  heroRender(heroP);
}
function heroRender(p) {
  heroP = p; const g = G; if (!g.vw) return;
  const { vw, vh } = g, E = IN;
  const a = smooth(seg(p, 0, 0.56));                      // the camera tilts down the gopuram
  const top = lerp(g.startTop, g.endTop, a), dy = top - g.startTop;
  const r = smooth(seg(p, 0.58, 0.97));                       // a sheet of invitation paper sweeps up over the scene
  const lift = -r * 0.1 * vh;
  tf(H.sky, `translate3d(0,${dy * 0.06 + E.far * 30 + lift * 0.3}px,0) scale(1.08)`);
  tf(H.far, `translate3d(0,${dy * 0.18 + E.far * 60 + lift * 0.5}px,0)`); op(H.far, 1 - E.far);
  tf(H.world, `translate3d(0,${lift}px,0)`);
  const base = top + g.ground;
  tf(H.skyline, `translate3d(${g.sl}px,${g.startTop + 0.88 * g.th - g.sh + dy * 0.55 + E.skyline * 80}px,0)`); op(H.skyline, 1 - E.skyline);
  tf(H.tower, `translate3d(${g.tl}px,${top + E.tower * 110}px,0) scale(${1 - E.tower * 0.04})`); op(H.tower, 1 - E.tower * 0.9);
  tf(H.glow, `translate3d(${g.dx - g.dw}px,${top + g.dyRel - g.dh * 0.6}px,0)`); op(H.glow, 0.35 + 0.65 * smooth(seg(p, 0.3, 0.62)));
  tf(H.cfront, `translate3d(${g.tl + 0.7 * g.tw}px,${top + 0.16 * g.th + (1 - a) * 30}px,0)`); op(H.cfront, 1 - E.far);
  const gy = base + 0.05 * g.th - g.gh + (1 - a) * 0.06 * vh;
  if (H.groveL) { tf(H.groveL, `translate3d(${g.glX - E.groves * 0.2 * vw}px,${gy + E.groves * 120}px,0)`); op(H.groveL, 1 - E.groves); }
  if (H.groveR) { tf(H.groveR, `translate3d(${g.grX + E.groves * 0.2 * vw}px,${gy + E.groves * 120}px,0)`); op(H.groveR, 1 - E.groves); }
  tf(H.court, `translate3d(${g.cl}px,${top + g.cTopRel + (1 - a) * 0.10 * vh + E.court * 160}px,0)`); op(H.court, 1 - E.court);
  const gnd = (1 - a) * 0.08 * vh + E.court * 160;      // things standing on the forecourt
  if (H.flag) { tf(H.flag, `translate3d(${g.dx + 0.29 * g.tw}px,${base + 0.05 * g.th - g.fH + gnd}px,0)`); op(H.flag, 1 - E.court); }
  // the temple's compound wall stands in front, its gate lined up with the door
  const wallBot = base + 0.075 * g.th;
  tf(H.cwall, `translate3d(${g.dx - 0.498 * g.CW}px,${wallBot - g.CH + gnd}px,0)`); op(H.cwall, 1 - E.court);
  const tw2 = g.tw;
  tf(H.wband, `translate3d(${g.dx - 0.498 * g.CW}px,${wallBot - 0.04 * tw2 + gnd}px,0)`); op(H.wband, 1 - E.court);
  tf(H.rang, `translate3d(${g.dx - 0.31 * tw2}px,${wallBot + 0.045 * tw2 + gnd}px,0)`); op(H.rang, 1 - E.court);
  const bh = 0.4 * tw2, bw = bh * 469 / 534;
  tf(H.bnL, `translate3d(${g.dx - 0.205 * g.CW - bw / 2}px,${wallBot - bh + 0.005 * tw2 + gnd}px,0)`);
  tf(H.bnR, `translate3d(${g.dx + 0.205 * g.CW - bw / 2}px,${wallBot - bh + 0.005 * tw2 + gnd}px,0)`);
  const hw = 0.36 * tw2, hh = hw * 391 / 856;
  tf(H.hpL, `translate3d(${g.dx - 0.62 * tw2 - hw / 2}px,${wallBot + 0.09 * tw2 - hh + gnd}px,0)`);
  tf(H.hpR, `translate3d(${g.dx + 0.62 * tw2 - hw / 2}px,${wallBot + 0.09 * tw2 - hh + gnd}px,0)`);
  [H.bnL, H.bnR, H.hpL, H.hpR].forEach(el => op(el, 1 - E.court));
  tf(H.base, `translate3d(${g.dx - 0.5 * g.GW}px,${wallBot - g.GH + 0.015 * g.th + gnd}px,0)`); op(H.base, 1 - E.court);
  // lamps are lit from the outside in as we arrive, and a kolam is drawn on the forecourt
  H.lamps.forEach((w, i) => { if (!w) return; const l = smooth(seg(p, 0.32 + i * 0.035, 0.38 + i * 0.035)); op(w.children[0], 1 - l); op(w.children[1], l); op(w.children[2], l); });
  if (FK.strokes) { const k = smooth(seg(p, 0.34, 0.56)); FK.strokes.forEach((s, i) => { const kk = clamp01(k * 1.6 - i * 0.15); s.style.strokeDashoffset = FK.len[i] * (1 - kk); }); FK.dots.forEach(d => d.style.opacity = k > 0.85 ? 1 : 0); }
  op(H.shower, smooth(seg(p, 0.4, 0.52)) * (1 - smooth(seg(p, 0.86, 1))));
  tf(H.mist, `translate3d(${vw / 2 - parseFloat(H.mist.style.width) / 2}px,${base - 0.12 * g.th}px,0)`); op(H.mist, 0.55 * (1 - E.court));
  // foreground parts like curtains as the paper rises
  const sheetY = lerp(vh + 30, 0, r), part = smooth(r);
  const fy = Math.max(dy * 0.06 + (g.folUp || 0) + lift * 1.6, Math.min(g.folBuf || 0, sheetY - vh + 10));
  tf(H.folL, `translate3d(${-E.fol * 45 - part * 14 - (g.portrait ? 8 * a : 0)}vw,${fy}px,0)`);
  tf(H.folR, `translate3d(${E.fol * 45 + part * 14 + (g.portrait ? 8 * a : 0)}vw,${fy}px,0)`);
  const no = 1 - smooth(seg(p, 0.02, 0.14));
  tf(H.names, `translate3d(0,${dy * 0.45 - (1 - no) * 30}px,0)`); op(H.names, no); op(H.shade, no);
  op(H.cue, 1 - seg(p, 0, 0.04));
  const band = H.sheet ? H.sheet.firstElementChild.offsetHeight : 60;
  tf(H.sheet, `translate3d(0,${sheetY}px,0)`);
}

/* ================= FINALE · plays once as it comes into view ================= */
const fin = $('#finale'), fs = $('.stage', fin);
const F = {
  world: $('.fworld', fs), c1: $('.fc1', fs), c2: $('.fc2', fs), tower: $('.f-tower', fs),
  gl: $('.f-grove-l', fs), gr: $('.f-grove-r', fs), tank: $('.f-tank', fs), bank: $('.f-bank', fs), couple: $('.f-couple', fs), text: $('.f-text', fs), lotus: $$('.f-lotus', fs),
  sun: $('.f-sun', fs), diyas: $('.f-diyas', fs), contact: $('.f-contact', fs), flL: $('.fl-l', fs), flR: $('.fl-r', fs)
};
let FG = {}, finP = 0;
const TANK_WATER_TOP = 0.005;
function finLayout() {
  const vw = innerWidth, vh = fs.clientHeight || innerHeight, portrait = vw / vh < 0.85;
  const horizon = (portrait ? 0.6 : 0.56) * vh;
  const tkW = Math.max(portrait ? 2.2 * vw : Math.max(1.08 * vw, vh * 2.1), (vh - horizon) * 2600 / 731 + 30), tkH = tkW * 731 / 2600;
  const tkTop = horizon - TANK_WATER_TOP * tkH;
  const ft = (portrait ? 0.34 : 0.56) * vh, fw = ft / 1.27, tcx = portrait ? 0.6 * vw : 0.7 * vw, fl = tcx - 0.42 * fw;
  const sw = Math.max(1.1 * vw, 2.8 * fw), sh = sw * 520 / 2600;
  const ch = (portrait ? 0.36 : 0.44) * vh, cw = ch * 762 / 1300;
  const gh = ft * 0.5;
  FG = { vw, vh, portrait, tkW, tkH, tkTop, horizon, ft, fw, fl, tcx, sw, sh, ch, cw, gh };
  F.tank.style.width = tkW + 'px'; F.tower.style.width = fw + 'px'; F.couple.style.width = cw + 'px';
  F.bank.style.width = vw * 1.3 + 'px';
  if (F.gl) F.gl.style.height = gh + 'px';
  if (F.gr) F.gr.style.height = gh + 'px';
  F.c1.style.width = Math.min(0.28 * vw, 400) + 'px'; F.c2.style.width = Math.min(0.22 * vw, 320) + 'px';
  const sun = (portrait ? 0.5 : 0.62) * vh; Object.assign(F.sun.style, { width: sun + 'px', height: sun + 'px' }); FG.sun = sun;
  Object.assign(F.contact.style, { width: cw * 1.5 + 'px', height: Math.max(14, ch * 0.06) + 'px' });
  const fh = (portrait ? 0.26 : 0.42) * vh, ih = fh / 0.56;
  [[F.flL, 640], [F.flR, 651]].forEach(([el, iw]) => { const w = ih * iw / 1485; Object.assign(el.style, { width: w + 'px', height: fh + 'px' }); el.firstElementChild.style.height = ih + 'px'; });
  FG.fh = fh; FG.flw = ih * 640 / 1485; FG.frw = ih * 651 / 1485;
  // floating diyas on the water, smaller as they go further out
  const wt = horizon, wb = horizon + 0.42 * tkH;
  F.diyas.innerHTML = '';
  [[0.2, 0.55], [0.34, 0.25], [0.41, 0.72], [0.62, 0.4], [0.71, 0.78], [0.93, 0.3], [0.08, 0.85]].forEach(([x, d], i) => {
    if (portrait && (i === 2 || i === 4)) return;
    const el = document.createElement('div'); el.className = 'diya'; const sz = (portrait ? 20 : 26) + d * (portrait ? 16 : 26);
    el.style.cssText = `left:${x * vw - sz / 2}px;top:${wt + d * (wb - wt) - sz}px;--s:${sz}px;--d:${3.4 + (i % 3) * 0.9}s;--dl:${-i * 0.7}s`;
    el.innerHTML = '<i class="flame"></i><img src="assets/a39-lotus.webp" alt="">'; F.diyas.appendChild(el);
  });
  finRender(finP);
}
function finRender(p) {
  finP = p; const g = FG; if (!g.vw) return;
  const { vw, vh } = g, e = ease(p);
  // a slow pull-back: far layers barely move, near layers settle the most
  const L = (depth) => 1 + 0.16 * depth * (1 - e);
  const ox = vw / 2, oy = vh;
  const lay = (el, x, y, depth) => tf(el, `translate3d(${ox + (x - ox) * L(depth)}px,${oy + (y - oy) * L(depth)}px,0) scale(${L(depth)})`);
  lay(F.c1, 0.05 * vw + p * 20, 0.12 * vh, 0.2); lay(F.c2, 0.68 * vw - p * 16, 0.17 * vh, 0.2);
  lay(F.tower, g.fl, g.horizon - g.ft * 0.9, 0.45);                 // base sinks below the waterline
  if (F.gl) lay(F.gl, g.tcx - g.gh * 845 / 1400 + 0.04 * g.fw, g.horizon - g.gh * 0.88, 0.55);
  if (F.gr) lay(F.gr, g.tcx - 0.06 * g.fw, g.horizon - g.gh * 0.88, 0.55);
  lay(F.tank, (vw - g.tkW) / 2, g.tkTop, 0.7);
  lay(F.bank, -0.15 * vw, g.horizon - 7, 0.7);
  const lw = Math.min(70, vw * 0.09), wy = vh - g.horizon;
  [[0.12, 0.1, 1], [0.3, 0.2, 0.8], [0.84, 0.14, 1.1]].forEach(([x, y, s], i) => { const el = F.lotus[i]; if (!el) return; el.style.width = lw * s + 'px'; lay(el, x * vw, g.horizon + y * wy, 0.8); });
  lay(F.sun, g.tcx - g.sun / 2, g.horizon - g.ft * 0.95 - g.sun * 0.32, 0.3);
  lay(F.diyas, 0, 0, 0.75);
  const feet = vh * (g.portrait ? 0.975 : 0.985);
  lay(F.contact, vw * 0.5 - g.cw * 0.75, feet - parseFloat(F.contact.style.height) * 0.6, 1);
  lay(F.couple, vw * 0.5 - g.cw / 2, feet - g.ch, 1);            // standing on the lowest step
  lay(F.flL, 0, vh - g.fh + 6, 1.15); lay(F.flR, vw - g.frw, vh - g.fh + 6, 1.15);
}
finRender(0);

/* ================= Scroll plumbing ================= */
gsap.registerPlugin(ScrollTrigger);
let lenis = null;
if (window.Lenis) {
  lenis = new Lenis({ smoothWheel: false, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
const invite = $('#invite');
let heroState = 'locked', heroTw = null;            // locked → ready → playing → done
const inviteTop = () => invite.getBoundingClientRect().top + window.scrollY;
let INV_TOP = 0; const cacheTop = () => { INV_TOP = inviteTop(); }; ScrollTrigger.addEventListener('refresh', cacheTop); addEventListener('load', cacheTop);
function playHero(dir) {
  if (heroState === 'playing') return;
  heroState = 'playing'; lenis && lenis.stop();
  if (dir < 0) { lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : scrollTo(0, 0); }
  heroTw && heroTw.kill();
  const o = { p: heroP };
  heroTw = gsap.to(o, {
    p: dir > 0 ? 1 : 0, duration: dir > 0 ? 4.6 : 2.8, ease: dir > 0 ? 'power1.inOut' : 'power2.inOut',
    onUpdate: () => heroRender(o.p),
    onComplete: () => {
      if (dir > 0) {
        heroState = 'done';
        cacheTop(); if (lenis) { lenis.start(); lenis.scrollTo(INV_TOP, { immediate: true, force: true }); } else scrollTo(0, INV_TOP); lastY = INV_TOP;
        arrive();
      } else heroState = 'ready';
    }
  });
}
function arrive() {
  gsap.fromTo('.t-top', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out' });
  gsap.fromTo('.t-mid', { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'sine.out', delay: 0.2 });
  gsap.fromTo('.invite-panel', { y: 60 }, { y: 0, duration: 1.4, ease: 'power3.out' });
  gsap.fromTo('#invite .side', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'sine.out' });
  gsap.fromTo('#invite .rail .festoon', { scaleY: 0.2, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.8)', delay: 0.15 });
}
const wantsDown = e => e.deltaY > 4;
addEventListener('wheel', e => {
  if (heroState === 'ready' || heroState === 'playing') { e.preventDefault(); if (heroState === 'ready' && wantsDown(e)) playHero(1); else if (heroState === 'playing' && heroTw && wantsDown(e) && heroTw.vars.p === 1) heroTw.timeScale(2.4); }
}, { passive: false });
let ty0 = null;
addEventListener('touchstart', e => { ty0 = e.touches[0].clientY; }, { passive: true });
addEventListener('touchmove', e => {
  if (heroState !== 'ready' && heroState !== 'playing') return;
  e.preventDefault(); const up = ty0 != null && ty0 - e.touches[0].clientY > 24;
  // a swipe plays the approach at the same pace a mouse wheel does on a laptop
  if (heroState === 'ready' && up) { playHero(1); heroTw && heroTw.timeScale(2.4); }
  else if (heroState === 'playing' && up && heroTw && heroTw.vars.p === 1) heroTw.timeScale(2.4);
}, { passive: false });
addEventListener('keydown', e => {
  if (heroState === 'ready' && ['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(e.key)) { e.preventDefault(); playHero(1); }
});
// scrolling back above the invitation replays the approach in reverse
let lastY = 0;
addEventListener('scroll', () => { const y = scrollY; if (heroState === 'done' && y < lastY && y < INV_TOP - 2) playHero(-1); lastY = y; }, { passive: true });
H.cue && H.cue.addEventListener('click', () => heroState === 'ready' && playHero(1));
// a down arrow stays on screen until the very end of the invitation
const nextCue = $('.next-cue'), closingEnd = $('.foot') || $('#closing');
let atEnd = false;
new IntersectionObserver(es => es.forEach(e => { atEnd = e.isIntersecting; cueState(); }), { threshold: 0.2 }).observe(closingEnd);
const topCue = $('.top-cue');
function cueState() { nextCue.classList.toggle('show', !document.body.classList.contains('is-locked') && heroState !== 'playing' && heroState !== 'locked' && !atEnd);
  topCue.classList.toggle('show', atEnd && heroState !== 'playing'); }
// at the end, an up arrow glides back through the invitation and replays the temple approach in reverse
topCue.addEventListener('click', () => {
  atEnd = false; cueState(); cacheTop();
  const back = () => { if (heroState === 'done') playHero(-1); else if (lenis) lenis.scrollTo(0, { immediate: true, force: true }); else scrollTo(0, 0); };
  const dist = Math.max(0, scrollY - INV_TOP), dur = Math.min(3.2, 1 + dist / 6000);
  if (lenis && heroState === 'done') lenis.scrollTo(INV_TOP, { duration: dur, easing: t => 1 - Math.pow(1 - t, 3), force: true, onComplete: back });
  else if (lenis) lenis.scrollTo(0, { duration: dur, force: true });
  else scrollTo({ top: 0, behavior: 'smooth' });
});
setInterval(cueState, 400);
nextCue.addEventListener('click', () => {
  if (heroState === 'ready') { playHero(1); return; }
  const y = window.scrollY + innerHeight * 0.85;
  if (lenis) lenis.scrollTo(y, { duration: 1.1 }); else scrollTo({ top: y, behavior: 'smooth' });
});

// timeline thread draws as you read down it
gsap.fromTo('.tl-thread i', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
// curtains: the section holds still while they part, then the form scrolls up between them
const drapeOpen = () => (innerWidth / innerHeight < 0.85 ? 94 : 82);
const lamp = $('.lamp');
// the browser itself holds the stage in place (CSS sticky), so the curtains can never drift off the screen on phones
gsap.timeline({ scrollTrigger: { trigger: '#rsvp', start: 'top top', end: () => '+=' + $('.rsvp-hold').offsetHeight, scrub: 0.6, invalidateOnRefresh: true,
    onUpdate: s => lamp.classList.toggle('lit', s.progress > 0.62) } })
  .fromTo('.drape-l', { xPercent: () => (innerWidth / innerHeight < 0.6 ? -1 : -18) }, { xPercent: () => -drapeOpen(), ease: 'power2.inOut', duration: 1 }, 0.05)
  .fromTo('.drape-r', { xPercent: () => (innerWidth / innerHeight < 0.6 ? 1 : 18) }, { xPercent: () => drapeOpen(), ease: 'power2.inOut', duration: 1 }, 0.05)
  .fromTo('.silk-plaque', { scale: 0.94, y: 18 }, { scale: 1, y: 0, ease: 'power2.out', duration: 0.25 }, 0)
  .to('.silk-plaque', { y: () => -innerHeight * 1.05, ease: 'power2.in', duration: 0.8 }, 0.2)
  .fromTo('.silk', { yPercent: 0 }, { yPercent: -102, ease: 'power2.in', duration: 0.8 }, 0.2)
  .to('.drapes', { autoAlpha: 0, duration: 0.12, ease: 'none' }, 1.0)
  .to({}, { duration: 0.06 });
ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => gsap.set('.progress i', { scaleX: s.progress }) });
// the names card unrolls on its own clock (1.2s into the scene, over 2.1s), run by the browser itself so phones keep laptop pace
function revealCard() {
  const t = F.text, d = REDUCED ? 1 : 1176, dur = REDUCED ? 1 : 2100;
  const from = { opacity: 1, clipPath: 'inset(0 0 100% 0)', transform: 'translateY(16px)' }, to = { opacity: 1, clipPath: 'inset(0 0 0% 0)', transform: 'translateY(0)' };
  if (t.animate) t.animate([from, to], { duration: dur, delay: d, easing: 'cubic-bezier(.45,0,.55,1)', fill: 'both' });
  else setTimeout(() => Object.assign(t.style, to), d);
}
// finale plays once, when most of it is on screen
let finPlayed = false;
new IntersectionObserver((es, ob) => es.forEach(e => {
  if (e.intersectionRatio > 0.55 && !finPlayed) { finPlayed = true; ob.disconnect(); const o = { p: 0 }; gsap.to(o, { p: 1, duration: REDUCED ? 0.01 : 4.2, ease: 'none', onUpdate: () => finRender(o.p) }); revealCard(); }
}), { threshold: [0, 0.55, 0.8] }).observe(fin);
// get the closing scene's pictures ready while guests are still at the RSVP, so it opens without a stall on phones
new IntersectionObserver((es, ob) => { if (es.some(e => e.isIntersecting)) { ob.disconnect(); warm([...fin.querySelectorAll('img')]); } }, { rootMargin: '100% 0px' }).observe($('#rsvp'));

function akshata(el) {
  const box = el.querySelector('.akshata'); if (!box) return; const w = box.offsetWidth, h = box.offsetHeight;
  for (let i = 0; i < 46; i++) {
    const g = document.createElement('i'); box.appendChild(g); const x = w * (0.08 + Math.random() * 0.84);
    gsap.fromTo(g, { x, y: -40 - Math.random() * 60, rotation: Math.random() * 180, opacity: 1 },
      { y: h * (0.55 + Math.random() * 0.5), x: x + (Math.random() * 40 - 20), rotation: '+=' + (Math.random() * 360), duration: 1.4 + Math.random() * 0.8, delay: Math.random() * 0.5, ease: 'power1.in',
        onComplete: () => gsap.to(g, { opacity: 0, duration: 1.2, delay: 0.6, onComplete: () => g.remove() }) });
  }
}
const escapeHTML = t => t.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const REVEAL = {
  up: el => gsap.fromTo(el, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }),
  rise: el => gsap.fromTo(el, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }),
  write: el => gsap.fromTo(el, { clipPath: 'inset(-30% 100% -30% 0)', opacity: 1 }, { clipPath: 'inset(-30% 0% -30% 0)', duration: 1.7, ease: 'power2.inOut', clearProps: 'clipPath' }),
  frame: el => { gsap.fromTo(el, { clipPath: 'inset(0 50% 0 50%)', opacity: 1 }, { clipPath: 'inset(0 0% 0 0%)', duration: 1.4, ease: 'power3.inOut', clearProps: 'clipPath' }); },
  words: el => {
    el.innerHTML = el.textContent.split(/(\s+)/).map(w => /^\s+$/.test(w) ? w : `<span class="w"><span>${escapeHTML(w)}</span></span>`).join('');
    gsap.set(el, { opacity: 1 });
    gsap.fromTo(el.querySelectorAll('.w>span'), { yPercent: 70, rotateX: -55, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.09 });
  }
};
if (!REDUCED) {
  $$('[data-c]').forEach(el => gsap.set(el, ['write', 'frame'].includes(el.dataset.c) ? { clipPath: el.dataset.c === 'frame' ? 'inset(0 50% 0 50%)' : 'inset(-30% 100% -30% 0)' } : { opacity: 0 }));
  ScrollTrigger.batch('[data-c]', { start: 'top 90%', once: true, onEnter: els => els.forEach((el, i) => gsap.delayedCall(i * 0.14, () => REVEAL[el.dataset.c](el))) });
}
if (!REDUCED) {
  $$('.kolam-div').forEach(svg => { const st = prepDraw(svg);
    ScrollTrigger.create({ trigger: svg, start: 'top 90%', once: true, onEnter: () => {
      gsap.to(st, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: 0.12 });
      gsap.to(svg.querySelectorAll('circle.d'), { scale: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.05, delay: 0.9 });
    } }); });
  const big = $('.kolam-big');
  if (big) { const st = prepDraw(big);
    gsap.timeline({ scrollTrigger: { trigger: '#closing', start: 'top 85%', end: 'bottom bottom', scrub: 0.8 } })
      .to(st, { strokeDashoffset: 0, ease: 'none', stagger: 0.15, duration: 1 })
      .to(big.querySelectorAll('circle.d'), { scale: 1, ease: 'back.out(3)', stagger: 0.01, duration: 0.3 }, 0.6); }
}
if (!REDUCED) $$('.festoon.hang, .top-fest, #rsvp .rail .festoon').forEach(f => { gsap.set(f, { scaleY: 0.25, opacity: 0 }); ScrollTrigger.create({ trigger: f, start: 'top 92%', once: true, onEnter: () => gsap.to(f, { scaleY: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.8)' }) }); });
$$('.stage').forEach(st => new IntersectionObserver(es => es.forEach(e => st.classList.toggle('off', !e.isIntersecting))).observe(st));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
$$('.rv, .countdown').forEach(el => io.observe(el));
const ioEv = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; e.target.classList.add('lit'); ioEv.unobserve(e.target);
  const d = e.target.querySelector('.ev-day'); if (!d || REDUCED) return; const to = +d.textContent, o = { v: 1 };
  gsap.to(o, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: () => { d.textContent = Math.round(o.v); } });
}), { rootMargin: '0px 0px -18% 0px' });
$$('.event').forEach(el => ioEv.observe(el));
/* ---------------- Illustrated paper-cut venue maps ---------------- */
const MAPS = {
  wed: `
   <rect width="400" height="240" fill="#F4EAD3"/>
   <g class="m-l" fill="#E7DABB"><path d="M0 150 C60 120 120 160 190 130 S320 90 400 110 V240 H0Z"/></g>
   <g class="m-l" fill="#CFE0C4"><path d="M250 0 C230 30 268 52 300 46 S356 18 360 0Z"/><path d="M18 34c22-14 50-6 54 14s-26 32-48 24S-4 48 18 34Z"/><ellipse cx="96" cy="196" rx="44" ry="20"/></g>
   <g class="m-l"><path d="M-10 210 C70 196 110 228 180 214 S300 176 410 196 V250 H-10Z" fill="#9CCBCB"/><path d="M-10 214 C70 200 110 232 180 218 S300 180 410 200" fill="none" stroke="#E9F4EF" stroke-width="2" stroke-dasharray="6 7"/></g>
   <g class="m-road" fill="none" stroke="#FFFDF7" stroke-linecap="round" stroke-linejoin="round" stroke-width="11"><path d="M-10 92 H410"/><path d="M150 -10 V250"/><path d="M290 -10 C282 60 300 120 288 250"/><path d="M150 152 C210 152 236 132 290 138"/><path d="M40 -10 C46 40 60 70 150 92"/></g>
   <g class="m-road" fill="none" stroke="#E2CFA6" stroke-width="1.2"><path d="M-10 92 H410"/><path d="M150 -10 V250"/><path d="M290 -10 C282 60 300 120 288 250"/></g>
   <g class="m-l blocks" fill="#E9C89C"><rect x="166" y="24" width="38" height="26" rx="3"/><rect x="212" y="30" width="30" height="40" rx="3"/><rect x="170" y="104" width="34" height="34" rx="3"/><rect x="306" y="44" width="40" height="30" rx="3"/><rect x="306" y="104" width="52" height="24" rx="3"/><rect x="70" y="104" width="62" height="28" rx="3"/><rect x="88" y="40" width="34" height="34" rx="3"/></g>
   <g class="m-l" fill="#7C9A62"><circle cx="230" cy="174" r="7"/><circle cx="244" cy="180" r="5"/><circle cx="338" cy="160" r="6"/><circle cx="352" cy="168" r="4.5"/><circle cx="60" cy="150" r="6"/><circle cx="120" cy="20" r="5"/></g>
   <text class="m-txt" x="20" y="86">Vidyagiri Main Rd</text><text class="m-txt" x="196" y="232" fill="#3f7c7f">Ghataprabha</text>
   <g class="m-pin" transform="translate(226 118)"><ellipse class="m-ripple" cx="0" cy="0" rx="14" ry="5" fill="#7A1022" opacity=".25"/><path d="M0 0 C-4 -10 -14 -16 -14 -27 a14 14 0 0 1 28 0 C14 -16 4 -10 0 0Z" fill="#7A1022"/><circle cx="0" cy="-27" r="6" fill="#F1CF7A"/></g>`,
  rec: `
   <rect width="400" height="240" fill="#F4EAD3"/>
   <g class="m-l" fill="#CFE0C4"><path d="M262 140 C300 120 380 130 410 150 V250 H250 C240 210 236 162 262 140Z"/><circle cx="56" cy="44" r="34"/><ellipse cx="330" cy="30" rx="44" ry="24"/></g>
   <g class="m-l" fill="#9CCBCB"><ellipse cx="330" cy="196" rx="34" ry="18"/></g>
   <g class="m-road" fill="none" stroke="#FFFDF7" stroke-linecap="round" stroke-width="11"><path d="M-10 120 H410"/><path d="M200 -10 V250"/><path d="M60 250 L340 -10"/><path d="M40 -10 L360 250"/></g>
   <g class="m-road" fill="none" stroke="#E2CFA6" stroke-width="1.2"><path d="M-10 120 H410"/><path d="M200 -10 V250"/></g>
   <g class="m-l"><circle cx="200" cy="120" r="30" fill="#FFFDF7"/><circle cx="200" cy="120" r="19" fill="#CFE0C4"/><circle cx="200" cy="120" r="19" fill="none" stroke="#E2CFA6" stroke-width="1.2"/><path d="M200 108 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1Z" fill="#C9962E"/></g>
   <g class="m-l blocks" fill="#E9C89C"><rect x="96" y="30" width="44" height="30" rx="3"/><rect x="236" y="56" width="40" height="34" rx="3"/><rect x="250" y="150" width="34" height="26" rx="3"/><rect x="110" y="150" width="48" height="30" rx="3"/><rect x="60" y="190" width="40" height="30" rx="3"/><rect x="150" y="200" width="32" height="28" rx="3"/></g>
   <g class="m-l" fill="#7C9A62"><circle cx="300" cy="166" r="7"/><circle cx="314" cy="160" r="5"/><circle cx="360" cy="150" r="6"/><circle cx="44" cy="40" r="7"/><circle cx="64" cy="54" r="6"/><circle cx="72" cy="32" r="5"/></g>
   <text class="m-txt" x="214" y="166">South End Circle</text><text class="m-txt" x="16" y="114">Basavanagudi</text>
   <g class="m-pin" transform="translate(226 146)"><ellipse class="m-ripple" cx="0" cy="0" rx="14" ry="5" fill="#7A1022" opacity=".25"/><path d="M0 0 C-4 -10 -14 -16 -14 -27 a14 14 0 0 1 28 0 C14 -16 4 -10 0 0Z" fill="#7A1022"/><circle cx="0" cy="-27" r="6" fill="#F1CF7A"/></g>`
};
$$('svg[data-illus]').forEach(svg => {
  svg.innerHTML = `<defs><filter id="ps-${svg.dataset.illus}" x="-5%" y="-5%" width="110%" height="120%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.3" flood-color="#5a3a1a" flood-opacity=".28"/></filter></defs>` + MAPS[svg.dataset.illus];
  svg.querySelectorAll('.m-l, .m-road').forEach(g => g.setAttribute('filter', `url(#ps-${svg.dataset.illus})`));
  const pin = svg.querySelector('.m-pin');
  if (REDUCED) return;
  gsap.set(svg.querySelectorAll('.m-l, .m-road'), { opacity: 0, y: 8 });
  gsap.set(pin.querySelector('path'), { y: -60, opacity: 0 }); gsap.set(pin.querySelector('circle'), { y: -60, opacity: 0 });
  ScrollTrigger.create({ trigger: svg, start: 'top 88%', once: true, onEnter: () => {
    const tl = gsap.timeline();
    tl.to(svg.querySelectorAll('.m-l, .m-road'), { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.06 })
      .to(pin.querySelectorAll('path, circle'), { y: 0, opacity: 1, duration: 0.9, ease: 'bounce.out' }, '+=0.1')
      .add(() => pin.classList.add('live'));
  } });
});


let torSize = '';
function decorateTorana() {
  const t = $('.torana'), d = $('.t-deco'); if (!t || !d) return; const W = t.offsetWidth, Ht = t.offsetHeight;
  // rebuilding swaps every image, which flickers, so only rebuild when the arch has really changed size
  const key = W + 'x' + Math.round(Ht / 24) + 'x' + (innerWidth <= 600 ? 's' : innerWidth <= 820 ? 'm' : 'l'); if (key === torSize && d.childElementCount) return; torSize = key;
  d.innerHTML = '';
  // brass lamps hang on chains from the inner corners of the crown
  const lh = Math.min(0.21 * W, 250), lw = lh * 228 / 632;
  [[0.232, 0], [0.768, 1]].forEach(([x, i]) => { const el = document.createElement('div'); el.className = 'hl';
    el.style.cssText = `left:${x * W - lw / 2}px;top:${0.285 * W}px;width:${lw}px;--d:${5.5 + i * 1.3}s;--dl:${-i * 2}s`;
    el.innerHTML = '<img src="assets/a49-hanglamp.webp" alt=""><i></i>'; d.appendChild(el); });
  // the crown garland is doubled with a fuller festoon and hanging jasmine strands
  const fest = document.createElement('div'); fest.className = 'crown-fest';
  fest.style.cssText = `left:${0.02 * W}px;width:${0.96 * W}px;top:${-0.012 * W}px;height:${0.085 * W}px`; d.appendChild(fest);
  [0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9].forEach((x, i) => { const im = new Image(); im.alt = ''; im.className = 'jstr'; im.src = i % 3 === 1 ? 'assets/a47-jasmine-loop.webp' : 'assets/a48-jasmine-string.webp';
    const h = (i % 3 === 1 ? 0.13 : 0.1) * W, w = h * (i % 3 === 1 ? 188 / 537 : 59 / 450);
    im.style.cssText = `left:${x * W - w / 2}px;top:${0.045 * W}px;height:${h}px;width:${w}px;--d:${5 + (i % 3)}s;--dl:${-i * 0.9}s`; d.appendChild(im); });
  // banana plants tied to the outer side of each pillar, with flowers heaped at their feet
  const bh = 0.4 * W, bw = bh * 469 / 534, base = Ht - 0.1 * W;
  [[-0.035, "l"], [1.035, "r"]].forEach(([x, s]) => { const im = new Image(); im.alt = ''; im.className = 'tban ' + s; im.src = 'assets/a52-banana.webp';
    im.style.cssText = `left:${x * W - bw / 2}px;top:${base - bh}px;height:${bh}px;width:${bw}px`; d.appendChild(im); });
  const hw = 0.26 * W, hh = hw * 391 / 856;
  [0.03, 0.97].forEach(x => { const im = new Image(); im.alt = ''; im.className = 'theap'; im.src = 'assets/a54-heap-b.webp';
    im.style.cssText = `left:${x * W - hw / 2}px;top:${base - hh + 0.03 * W}px;width:${hw}px`; d.appendChild(im); });
  // paper flowers gathered into a few layered bunches tied to the face of each pillar
  const narrow = innerWidth <= 820, tiny = innerWidth <= 600, fs = (tiny ? 0.078 : 0.072) * W;
  const y0 = 0.6 * W, y1 = Ht - 0.36 * W;
  const SRC = { lot: ['a39-lotus', 184 / 234], qo: ['a58-quill-o', 1], qy: ['a59-quill-y', 1], pk: ['a60-pinkflower', 1] };
  // each bunch: [flower, dx, dy, size, rotation] in units of fs, listed back to front
  const BUNCH = [
    [['qo', -0.36, -0.46, 0.72, -14], ['qy', 0.34, -0.34, 0.62, 18], ['pk', -0.08, 0.38, 0.78, 8], ['lot', 0.04, -0.02, 1.14, 0]],
    [['pk', 0.3, -0.44, 0.7, -10], ['qy', -0.34, 0.3, 0.64, 12], ['qo', 0.26, 0.4, 0.6, -20], ['lot', -0.04, -0.04, 1.1, 0]],
    [['qy', -0.3, -0.42, 0.66, 20], ['pk', 0.34, -0.2, 0.66, -6], ['qo', -0.02, 0.42, 0.74, 10], ['lot', 0.02, 0, 1.12, 0]]
  ];
  const inner = narrow ? (tiny ? 0.206 : 0.198) : 0.172, nIn = 3;
  const spots = [];
  for (let k = 0; k < nIn; k++) { const y = y0 + (y1 - y0) * k / (nIn - 1); spots.push([inner, y, k, 1], [1 - inner, y, k, -1]); }
  if (!narrow) [0.27, 0.73].forEach((f, k) => { const y = y0 + (y1 - y0) * f; spots.push([0.0975, y, k + 1, 1, 0.82], [0.9025, y, k + 1, -1, 0.82]); });
  spots.forEach(([x, y, k, side, sc = 1], si) => {
    const wrap = document.createElement('div'); wrap.className = 'pbunch'; wrap.style.cssText = `left:${x * W}px;top:${y}px;--dl:${-(si * 1.3)}s`;
    BUNCH[k % 3].forEach(([key, dx, dy, sz, rot]) => { const [src, ar] = SRC[key], w = fs * sz * sc, h = w * ar;
      const im = new Image(); im.alt = ''; im.className = 'pflower' + (key === 'lot' ? ' lot' : ''); im.src = 'assets/' + src + '.webp';
      im.style.cssText = `left:${dx * side * fs * sc - w / 2}px;top:${dy * fs * sc - h / 2}px;width:${w}px;height:${h}px;--r:${rot * side}deg`; wrap.appendChild(im); });
    d.appendChild(wrap); });
  // tall lit lamps stand before the pillar bases, with lotuses at their feet
  const sh = 0.2 * W;
  [0.104, 0.896].forEach(x => { const el = document.createElement('div'); el.className = 'stand';
    el.style.cssText = `left:${x * W}px;top:${Ht - 0.111 * W - sh + 0.01 * W}px;height:${sh}px;width:${sh * 384 / 800}px`;
    el.innerHTML = '<div class="litlamp"><img src="assets/a27-lamp-on.webp" alt=""></div><div class="lotus-pair"><img src="assets/a39-lotus.webp" alt=""><img src="assets/a39-lotus.webp" alt=""></div>'; d.appendChild(el); });
  // a bed of paper flowers fills each corner of the plinth, layered back to front
  const bedY = Ht + 0.004 * W, put = (src, x, w, ar, cls, rot = 0, dy = 0) => { const im = new Image(); im.alt = ''; im.className = 'bed ' + cls; im.src = 'assets/' + src + '.webp';
    const h = w * ar; im.style.cssText = `left:${x * W - w / 2}px;top:${bedY - h + dy * W}px;width:${w}px;height:${h}px;--r:${rot}deg`; d.appendChild(im); };
  [1, -1].forEach(sd => { const X = f => sd > 0 ? f : 1 - f;
    put('a54-heap-b', X(0.08), 0.19 * W, 391 / 856, 'back' + (sd < 0 ? ' flip' : ''), 0, -0.006);
    put('a54-heap-b', X(0.215), 0.15 * W, 391 / 856, 'back' + (sd > 0 ? ' flip' : ''), 0, 0.004);
    put('a38-kalasha', X(0.012), 0.068 * W, 292 / 190, 'mid', 0, -0.004);
    // quilled blooms tucked in behind, then a few lotuses of different sizes in front, lower towards the centre
    [[0.1, 'a58-quill-o', 0.05, -12, -0.03], [0.19, 'a60-pinkflower', 0.052, 8, -0.026], [0.265, 'a59-quill-y', 0.042, -18, -0.008], [0.045, 'a59-quill-y', 0.044, 16, -0.012]]
      .forEach(([x, src, w, r, dy]) => put(src, X(x), w * W, 1, 'mid', r * sd, dy));
    [[0.07, 0.074, 0], [0.152, 0.06, 0.004], [0.228, 0.05, 0.006]].forEach(([x, w, dy]) => put('a39-lotus', X(x), w * W, 184 / 234, 'front', 0, dy));
  });
}
if (window.ResizeObserver && $('.torana')) { let tr; new ResizeObserver(() => { cancelAnimationFrame(tr); tr = requestAnimationFrame(decorateTorana); }).observe($('.torana')); }
function layoutAll() { heroLayout(); finLayout(); decorateTorana(); }
// while a guest is typing in the RSVP form, the phone keyboard resizes the window; relaying out then would pull the field out of focus
const typing = () => { const a = document.activeElement; return !!a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName); };
let rz; addEventListener('resize', () => { if (typing()) return; clearTimeout(rz); rz = setTimeout(() => { if (typing()) return; layoutAll(); ScrollTrigger.refresh(); if (heroState === 'done' && lenis && lenis.scroll < inviteTop()) lenis.scrollTo(inviteTop(), { immediate: true, force: true }); }, 120); });
layoutAll();
addEventListener('load', () => { layoutAll(); ScrollTrigger.refresh(); });
if (window.ResizeObserver) { let rh = document.body.scrollHeight, rt; new ResizeObserver(() => { const h = document.body.scrollHeight; if (Math.abs(h - rh) < 2 || typing()) return; rh = h; clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 200); }).observe(document.body); }

/* ---------------- Countdown ---------------- */
const TARGET = Date.UTC(2026, 11, 28, 6, 54, 0); // 12:24 PM IST
const cd = { d: $('[data-cd=d]'), h: $('[data-cd=h]'), m: $('[data-cd=m]'), s: $('[data-cd=s]') };
function tick() {
  const t = Math.max(0, TARGET - Date.now()) / 1000;
  const v = { d: Math.floor(t / 86400), h: Math.floor(t % 86400 / 3600), m: Math.floor(t % 3600 / 60), s: Math.floor(t % 60) };
  for (const k in v) { const s = String(v[k]).padStart(2, '0'); if (cd[k] && cd[k].textContent !== s) { cd[k].textContent = s; cd[k].classList.remove('flip'); void cd[k].offsetWidth; cd[k].classList.add('flip'); } }
}
tick(); setInterval(tick, 1000);

/* ---------------- RSVP ---------------- */
const form = $('#rsvpForm'), sendBtn = $('#rsvpSend');
/* RSVP responses are saved to a Google Sheet. Paste the web app URL from rsvp-sheet/README here. */
const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwwgMwxJlyid9wd-vTvqNWs7Yt4-Mbu4lCt2Uoyf3eJUH3GK7iEsJgSygSJXNxxSiyOyA/exec';
function saveRSVP() {
  const fd = new FormData(form), data = new URLSearchParams({
    name: (fd.get('name') || '').trim(), guests: fd.get('guests') || '', wed: fd.get('wed') ? '1' : '0', rec: fd.get('rec') ? '1' : '0',
    note: (fd.get('note') || '').trim(), lang: LANG, page: location.href.split('#')[0], site: document.title.split(' · ')[0]
  });
  try { localStorage.setItem('rsvp-last', JSON.stringify(Object.fromEntries(data))); } catch (e) {}
  if (!RSVP_ENDPOINT) return;
  try { fetch(RSVP_ENDPOINT, { method: 'POST', mode: 'no-cors', keepalive: true, body: data }).catch(() => {}); } catch (e) {}
}
function buildMsg() {
  const fd = new FormData(form), name = (fd.get('name') || '').trim(), n = fd.get('guests'), wed = !!fd.get('wed'), rec = !!fd.get('rec'), note = (fd.get('note') || '').trim();
  if (LANG === 'kn') {
    const who = name ? `ನಮಸ್ಕಾರ! ನಾನು ${name}.` : 'ನಮಸ್ಕಾರ! ನಾನು [ತಮ್ಮ ಹೆಸರು].';
    const att = wed && rec ? 'ನಾವು 28 ಡಿಸೆಂಬರ್ ವಿವಾಹಕ್ಕೆ (ಬಾಗಲಕೋಟೆ) ಹಾಗೂ 30 ಡಿಸೆಂಬರ್ ಆರತಕ್ಷತೆಗೆ (ಬೆಂಗಳೂರು) ಬರುತ್ತೇವೆ.' : wed ? 'ನಾವು 28 ಡಿಸೆಂಬರ್ ವಿವಾಹಕ್ಕೆ (ಬಾಗಲಕೋಟೆ) ಬರುತ್ತೇವೆ.' : rec ? 'ನಾವು 30 ಡಿಸೆಂಬರ್ ಆರತಕ್ಷತೆಗೆ (ಬೆಂಗಳೂರು) ಬರುತ್ತೇವೆ.' : 'ಬರಲು ಆಗುತ್ತಿಲ್ಲ, ನಮ್ಮ ಶುಭಾಶಯಗಳು.';
    return `${who} ${att}${wed || rec ? ` ಅತಿಥಿಗಳು: ${n}.` : ''}${note ? `\n${note}` : ''}\nಉತ್ಕರ್ಷ ಹಾಗೂ ಭಾಗ್ಯಶ್ರೀ ಅವರಿಗೆ ಶುಭಾಶಯಗಳು!`;
  }
  const who = name ? `Namaskara! This is ${name}.` : 'Namaskara! This is [your name].';
  const att = wed && rec ? 'We will attend the Wedding on 28 Dec in Bagalkote and the Reception on 30 Dec in Bengaluru.' : wed ? 'We will attend the Wedding on 28 Dec in Bagalkote.' : rec ? 'We will attend the Reception on 30 Dec in Bengaluru.' : 'We will not be able to attend, but we send our blessings.';
  return `${who} ${att}${wed || rec ? ` Guests: ${n}.` : ''}${note ? `\n${note}` : ''}\nCongratulations to Uthkarsh & Bhagyashree!`;
}
function updatePreview() {}
const sendLabel = () => sendBtn.querySelector('span');
const T = k => (LANG === 'kn' ? { send: 'ಕಳುಹಿಸಿ', sent: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ', resend: 'ಬದಲಾವಣೆ ಕಳುಹಿಸಿ' } : { send: 'Send RSVP', sent: 'Received', resend: 'Send an update' })[k];
let sentOnce = false;
try { sentOnce = !!localStorage.getItem('rsvp-sent'); } catch (e) {}
if (sentOnce) { const l = sendLabel(); l.removeAttribute('data-i18n'); l.textContent = T('resend'); }
form.addEventListener('input', () => form.elements.name.classList.remove('err'));
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.elements.name;
  if (!name.value.trim()) { name.classList.add('err'); name.focus(); return; }
  if (sendBtn.disabled) return;
  saveRSVP(); try { localStorage.setItem('rsvp-sent', '1'); } catch (err) {}
  const l = sendLabel(); l.removeAttribute('data-i18n'); l.textContent = T('sent'); sendBtn.disabled = true;
  $('.thanks').hidden = false; chime(); burst(sendBtn);
  setTimeout(() => { sendBtn.disabled = false; l.textContent = T('resend'); }, 4000);
});
function burst(from) {
  if (REDUCED) return; const r = from.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const box = document.createElement('div'); box.className = 'burst'; document.body.appendChild(box);
  for (let i = 0; i < 26; i++) {
    const p = new Image(); p.src = `assets/a33-p${1 + (i * 7) % 24}.webp`; p.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${14 + (i % 4) * 4}px`; box.appendChild(p);
    const ang = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 220;
    gsap.timeline({ onComplete: () => p.remove() })
      .to(p, { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist * 0.7 - 90, rotation: Math.random() * 360, duration: 0.9, ease: 'power3.out' })
      .to(p, { y: '+=' + (220 + Math.random() * 200), rotation: '+=' + (Math.random() * 300 - 150), opacity: 0, duration: 1.8, ease: 'sine.in' });
  }
  setTimeout(() => box.remove(), 3200);
}
function copyText(t, btn) {
  const o = btn.innerHTML, done = () => { btn.textContent = LANG === 'kn' ? 'ನಕಲಿಸಲಾಗಿದೆ' : 'Copied'; setTimeout(() => btn.innerHTML = o, 1600); };
  try { navigator.clipboard.writeText(t).then(done, done); } catch (e) { done(); }
}
$$('[data-copy]').forEach(b => b.addEventListener('click', () => copyText(b.dataset.copy, b)));

/* ---------------- Temple music (synthesised tanpura and bell) ---------------- */
let AC = null, master = null, musicOn = false, loopT = null, bellT = null;
function pluck(f, t, g = 0.16) {
  const o = AC.createOscillator(), o2 = AC.createOscillator(), lp = AC.createBiquadFilter(), gn = AC.createGain();
  o.type = 'sawtooth'; o2.type = 'sawtooth'; o.frequency.value = f; o2.frequency.value = f * 1.003;
  lp.type = 'lowpass'; lp.frequency.setValueAtTime(2400, t); lp.frequency.exponentialRampToValueAtTime(700, t + 3); lp.Q.value = 2;
  gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(g, t + 0.03); gn.gain.exponentialRampToValueAtTime(0.0001, t + 4.2);
  o.connect(lp); o2.connect(lp); lp.connect(gn); gn.connect(master); o.start(t); o2.start(t); o.stop(t + 4.4); o2.stop(t + 4.4);
}
function bell(t, base = 660, g = 0.08) {
  [[1, 1], [2.01, .5], [2.76, .38], [5.4, .18], [8.9, .08]].forEach(([m, a]) => {
    const o = AC.createOscillator(), gn = AC.createGain(); o.type = 'sine'; o.frequency.value = base * m;
    gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(g * a, t + 0.008); gn.gain.exponentialRampToValueAtTime(0.0001, t + 5.5 / Math.sqrt(m));
    o.connect(gn); gn.connect(master); o.start(t); o.stop(t + 6);
  });
}
function cycle() { if (!musicOn) return; const t = AC.currentTime + 0.05, SA = 138.59; pluck(SA * 0.75, t); pluck(SA * 2, t + 0.95, 0.11); pluck(SA * 2, t + 1.9, 0.11); pluck(SA, t + 2.85, 0.18); loopT = setTimeout(cycle, 3800); }
function bellLoop() { if (!musicOn) return; bell(AC.currentTime + 0.05); bellT = setTimeout(bellLoop, 11000 + Math.random() * 7000); }
function chime() { if (!musicOn) return; try { ensureAC(); master.gain.setTargetAtTime(0.5, AC.currentTime, 0.05); bell(AC.currentTime + 0.02, 880, 0.07); bell(AC.currentTime + 0.5, 990, 0.05); } catch (e) {} }
/* Your own song: put an mp3 at assets/music.mp3 (or change the path below). Without it, the synthesised tanpura plays. */
const MUSIC_FILE = 'assets/music.mp3';
const MUSIC_VOLUME = 0.32;
let track = null, trackOk = null;
function ensureAC() {
  if (!AC) { AC = new (window.AudioContext || window.webkitAudioContext)(); master = AC.createGain(); master.gain.value = 0; const comp = AC.createDynamicsCompressor(); master.connect(comp); comp.connect(AC.destination); }
  AC.resume();
}
function startSynth() {
  try { ensureAC(); master.gain.cancelScheduledValues(AC.currentTime); master.gain.setTargetAtTime(0.5, AC.currentTime, 1.2); cycle(); setTimeout(bellLoop, 2500); } catch (e) {}
}
function startMusic() {
  musicOn = true; $('#music').setAttribute('aria-pressed', 'true');
  if (trackOk === false) { startSynth(); return; }
  if (!track) {
    track = new Audio(MUSIC_FILE); track.loop = true; track.preload = 'auto'; track.volume = 0;
    track.addEventListener('error', () => { if (trackOk !== true) { trackOk = false; track = null; if (musicOn) startSynth(); } }, { once: true });
  }
  track.play().then(() => { trackOk = true; gsap.to(track, { volume: MUSIC_VOLUME, duration: 2.5, ease: 'sine.out', overwrite: true }); })
    .catch(() => { if (trackOk === null) { trackOk = false; track = null; if (musicOn) startSynth(); } });
}
function stopMusic() {
  musicOn = false; clearTimeout(loopT); clearTimeout(bellT);
  if (track && trackOk) gsap.to(track, { volume: 0, duration: 0.8, overwrite: true, onComplete: () => track.pause() });
  if (AC && master) master.gain.setTargetAtTime(0, AC.currentTime, 0.4);
  $('#music').setAttribute('aria-pressed', 'false');
}
$('#music').addEventListener('click', () => musicOn ? stopMusic() : startMusic());

/* ---------------- Opening: the gatefold ---------------- */
const intro = $('#intro');
let opened = false;
// decode the temple's big images while the cover waits for a tap, so phones don't stall decoding them mid-animation
const warm = imgs => imgs.forEach(i => { try { i.decode && i.decode().catch(() => {}); } catch (e) {} });
warm([...document.querySelectorAll('.stage')[0].querySelectorAll('img')]);
// on touch screens the lamp glows rest while a finger is scrolling, since they're repainted every frame
if (matchMedia('(pointer: coarse)').matches) { const root = document.documentElement; let st;
  addEventListener('scroll', () => { root.classList.add('scrolling'); clearTimeout(st); st = setTimeout(() => root.classList.remove('scrolling'), 220); }, { passive: true }); }
function openInvite() {
  if (opened) return; opened = true; startMusic();
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onComplete: () => intro.remove() });
  tl.to('#seal', { scale: 1.18, y: -50, rotate: 10, opacity: 0, duration: 0.9, ease: 'power2.in' }, 0)
    .to('.intro-plaque, .intro-cta', { opacity: 0, y: -10, duration: 0.5 }, 0)
    .to('.flap-l', { rotateY: -104, duration: 1.7 }, 0.35)
    .to('.flap-r', { rotateY: 104, duration: 1.7 }, 0.35)
    .to(intro, { backgroundColor: 'rgba(58,10,18,0)', duration: 1.0 }, 0.9)
    .add(() => { document.body.classList.remove('is-locked'); if (REDUCED) { heroState = 'free'; lenis && lenis.start(); } else heroState = 'ready'; }, 1.3);
  const pop = (key, at, dur = 1.5, e = 'power3.out') => tl.to(IN, { [key]: 0, duration: dur, ease: e, onUpdate: () => heroRender(heroP) }, at);
  pop('far', 0.9); pop('skyline', 1.0); pop('tower', 1.1, 1.7); pop('groves', 1.2, 1.6); pop('court', 1.3); pop('fol', 1.45, 1.6);
  tl.fromTo('.names-kn', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', stagger: 0.5 }, 1.75)
    .fromTo('.names-main .ch, .names-main .amp', { opacity: 0, y: 30, rotateX: -70 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.0, ease: 'power3.out', stagger: 0.045 }, 1.85);
}
$('#seal').addEventListener('click', openInvite);
gsap.set('.names-kn, .names-main .ch, .names-main .amp', { opacity: 0 });
heroRender(0);
setLang(LANG);
})();
