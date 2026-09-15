(() => {
  const thresholds = ['< 30 mm / 30 days or < 120 mm / 90 days', '> 25 °C average', '< 50%', 'Unavailable', '> 5% YoY', 'Emergency', 'Watch / Warning / Alert'];
  const q = s => document.querySelector(s);
  const renderDrivers = () => {
    const grid = q('#indicator-grid'), target = q('#drivers');
    if (!grid || !target) return;
    const cards = [...grid.querySelectorAll('.indicator')];
    if (cards.length !== 7) return;
    target.className = 'signal-visualization';
    target.innerHTML = cards.map((card, i) => {
      const title = card.querySelector('h3')?.textContent || `Indicator ${i + 1}`;
      const value = card.querySelector('strong')?.textContent || '—';
      const status = card.querySelector('p')?.textContent || '';
      const active = status.includes('1 pressure point');
      const unavailable = status.includes('Not scored');
      const position = unavailable ? 0 : active ? 76 : 34;
      return `<div class="signal-row ${active ? 'is-triggered' : ''} ${unavailable ? 'is-unavailable' : ''}"><div class="signal-row-head"><strong>${title}</strong><span>${active ? '+1 point' : unavailable ? 'Not scored' : '0 points'}</span></div><div class="signal-track" role="img" aria-label="${title}: current value ${value}; threshold ${thresholds[i]}; ${active ? 'threshold crossed, contributes plus one' : unavailable ? 'not scored' : 'threshold not crossed'}"><i class="signal-fill" style="width:${position}%"></i><b class="signal-threshold" style="left:68%"></b><em class="signal-marker" style="left:${position}%"></em></div><div class="signal-row-meta"><span>Current: ${value}</span><span>Threshold: ${thresholds[i]}</span></div></div>`;
    }).join('');
  };
  const renderScenario = () => {
    const current = q('#current-scenario'), scenario = q('#scenario-score'), card = q('.scenario');
    if (!current || !scenario || !card) return;
    let change = q('#scenario-delta');
    if (!change) { change = document.createElement('p'); change.id = 'scenario-delta'; change.className = 'scenario-delta'; card.querySelector('.scenario-compare')?.append(change); }
    const c = current.textContent || '—', s = scenario.textContent || '—';
    change.textContent = c === s ? '→ No change in pressure points' : `→ ${c} to ${s}`;
  };
  const observe = () => { renderDrivers(); renderScenario(); };
  new MutationObserver(observe).observe(document.body, {subtree:true, childList:true, characterData:true});
  observe();
})();
