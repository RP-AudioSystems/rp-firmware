{
  // Demo op de homepage: de schakelaar dimt, gaat uit en aan, en toont daarna even de screensaver.
  const d = document.getElementById('demo');
  if (d && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const halo = d.querySelector('.halo'), rays = d.querySelector('.rays'), clk = d.querySelector('.clk');
    const keys = [...d.querySelectorAll('.press')];
    let b = 1;
    const set = () => {
      const off = d.classList.contains('off');
      halo.style.opacity = off ? 0 : b;
      rays.style.opacity = off ? 0 : 0.35 + 0.65 * b;
    };
    const tap = i => { keys[i].classList.add('down'); setTimeout(() => keys[i].classList.remove('down'), 180); };
    const time = () => { const t = new Date(); clk.textContent = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0'); };
    const steps = [
      [1800, () => { tap(0); b = 0.65; set(); }],
      [1100, () => { tap(0); b = 0.35; set(); }],
      [1300, () => { tap(2); b = 0.75; set(); }],
      [1100, () => { tap(2); b = 1; set(); }],
      [1700, () => { tap(1); d.classList.add('off'); set(); }],
      [1800, () => { tap(1); d.classList.remove('off'); set(); }],
      [2400, () => { time(); d.classList.add('saver'); }],
      [4500, () => { d.classList.remove('saver'); }],
    ];
    let n = 0;
    const run = () => { const [ms, f] = steps[n]; setTimeout(() => { f(); n = (n + 1) % steps.length; run(); }, ms); };
    run();
  }
}
