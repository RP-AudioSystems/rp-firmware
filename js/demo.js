{
  // Demo van de schakelaar. Op de homepage bedient iemand de schakelaar en zie je de woonkamer live meebewegen.
  const d = document.getElementById('demo');
  if (d && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const q = s => d.querySelector(s);
    const halo = q('.halo'), rays = q('.rays'), clk = q('.clk');
    const lit = q('.lit'), dark = q('.dark'), wdark = q('.wdark'), spill = q('.spill'), touch = q('.touch'), pdark = q('.pdark');
    const keys = [...d.querySelectorAll('.press')];
    const keyPos = [[80, 148], [190, 148], [300, 148]];   // midden van de toetsen, in schakelaar-coördinaten
    let b = 1;
    const set = () => {
      const on = !d.classList.contains('off'), v = on ? b : 0;
      if (halo) halo.style.opacity = v;
      if (rays) rays.style.opacity = on ? 0.35 + 0.65 * b : 0;
      if (lit) lit.style.opacity = v;
      if (dark) dark.style.opacity = 0.04 + 0.8 * (1 - v);
      if (wdark) wdark.style.opacity = 0.08 + 0.5 * (1 - v);
      if (spill) spill.style.opacity = v;
      if (pdark) pdark.style.opacity = 0.45 * (1 - v);
    };
    const tap = i => {
      keys[i].classList.add('down'); setTimeout(() => keys[i].classList.remove('down'), 200);
      if (touch) {
        touch.setAttribute('cx', keyPos[i][0]); touch.setAttribute('cy', keyPos[i][1]);
        touch.style.opacity = 0.35; setTimeout(() => { touch.style.opacity = 0; }, 260);
      }
    };
    const time = () => { if (!clk) return; const t = new Date(); clk.textContent = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0'); };
    const steps = [
      [2200, () => { tap(0); b = 0.7; set(); }],
      [1200, () => { tap(0); b = 0.45; set(); }],
      [1200, () => { tap(0); b = 0.25; set(); }],
      [1800, () => { tap(2); b = 0.6; set(); }],
      [1200, () => { tap(2); b = 1; set(); }],
      [2200, () => { tap(1); d.classList.add('off'); set(); }],
      [2400, () => { tap(1); d.classList.remove('off'); set(); }],
      [2800, () => { time(); d.classList.add('saver'); }],
      [4500, () => { d.classList.remove('saver'); }],
    ];
    set();
    let n = 0;
    const run = () => { const [ms, f] = steps[n]; setTimeout(() => { f(); n = (n + 1) % steps.length; run(); }, ms); };
    run();
  }
}
