/**
 * SENSOR HARDWARE DIRECTION:
 *   Light : HIGH value = DARK   (500+ = dark,  <500 = bright)
 *   Temp  : HIGH value = COOL   (110+ = cool,  95-110 = normal,  <95 = hot)
 *   Sound : HIGH value = LOUD   (12+  = loud,  <12 = quiet)
 *
 * MODE RANGES: { min, max } = acceptable range per sensor (null = no limit)
 *   alertLow  = fires when value < min
 *   alertHigh = fires when value > max
 */
const MODES = {
  sleep: {
    label: 'Sleep', icon: '🌙',
    desc: 'Dark, warm (hot/normal) & silent',
    light: { min: 500, max: null, wantLabel: 'Dark (≥500)', alertLow: 'Too bright — dim the lights for sleep', alertHigh: null },
    temp: { min: null, max: 110, wantLabel: 'Warm — not cool (<110)', alertLow: null, alertHigh: 'Too cool — raise temp for comfortable sleep' },
    sound: { min: null, max: 10, wantLabel: 'Silent (<10)', alertLow: null, alertHigh: 'Too noisy — silence needed for sleep' }
  },
  library: {
    label: 'Library', icon: '📚',
    desc: 'Bright, cool & very quiet',
    light: { min: null, max: 450, wantLabel: 'Bright (<450)', alertLow: null, alertHigh: 'Too dark — library needs good lighting' },
    temp: { min: 110, max: null, wantLabel: 'Cool (≥110)', alertLow: 'Too warm — library should be cool', alertHigh: null },
    sound: { min: null, max: 10, wantLabel: 'Very quiet (<10)', alertLow: null, alertHigh: 'Too loud — libraries require near-silence' }
  },
  classroom: {
    label: 'Class', icon: '🏫',
    desc: 'Well-lit, normal temp & moderate noise',
    light: { min: null, max: 460, wantLabel: 'Good light (<460)', alertLow: null, alertHigh: 'Too dark — classroom needs adequate lighting' },
    temp: { min: 95, max: 110, wantLabel: 'Normal (95–110)', alertLow: 'Too hot for a classroom', alertHigh: 'Too cool — students will be uncomfortable' },
    sound: { min: null, max: 50, wantLabel: 'Moderate (<50)', alertLow: null, alertHigh: 'Too loud — class is being disrupted' }
  },
  study: {
    label: 'Study', icon: '✏️',
    desc: 'Bright, cool & quiet',
    light: { min: null, max: 430, wantLabel: 'Bright (<430)', alertLow: null, alertHigh: 'Too dark — need light to study effectively' },
    temp: { min: 110, max: null, wantLabel: 'Cool (≥110)', alertLow: 'Too warm — hard to concentrate', alertHigh: null },
    sound: { min: null, max: 18, wantLabel: 'Quiet (<18)', alertLow: null, alertHigh: 'Too loud — distracting for study' }
  },
  hospital: {
    label: 'Hospital', icon: '🏥',
    desc: 'Clinical lighting, normal temp & strict silence',
    light: { min: null, max: 380, wantLabel: 'Bright clinical (<380)', alertLow: null, alertHigh: 'Too dark — clinical environment needs light' },
    temp: { min: 95, max: 110, wantLabel: 'Normal (95–110)', alertLow: 'Too hot for a clinical setting', alertHigh: 'Too cool for patient comfort' },
    sound: { min: null, max: 12, wantLabel: 'Strict silence (<12)', alertLow: null, alertHigh: 'Too loud — hospital requires silence' }
  },
  gym: {
    label: 'Gym', icon: '💪',
    desc: 'Bright, hot/warm & loud music is fine',
    light: { min: null, max: 470, wantLabel: 'Bright energy (<470)', alertLow: null, alertHigh: 'Too dark for a gym' },
    temp: { min: null, max: 95, wantLabel: 'Hot/warm ok (<95)', alertLow: null, alertHigh: 'Too cool — warm temps expected during workout' },
    sound: { min: null, max: 80, wantLabel: 'Loud ok (<80)', alertLow: null, alertHigh: 'Sound level dangerously high' }
  },
  meditation: {
    label: 'Meditate', icon: '🧘',
    desc: 'Dim, warm/hot & absolute silence',
    light: { min: 400, max: null, wantLabel: 'Dim/candle (≥400)', alertLow: 'Too bright — dim lights for meditation', alertHigh: null },
    temp: { min: null, max: 95, wantLabel: 'Warm/hot (<95)', alertLow: null, alertHigh: 'Too cool — warmth aids meditation' },
    sound: { min: null, max: 8, wantLabel: 'Absolute silence (<8)', alertLow: null, alertHigh: 'Too loud — silence is essential' }
  },
  office: {
    label: 'Office', icon: '💼',
    desc: 'Bright, cool & low background noise',
    light: { min: null, max: 440, wantLabel: 'Bright desk (<440)', alertLow: null, alertHigh: 'Too dark — eye strain risk' },
    temp: { min: 110, max: null, wantLabel: 'Cool AC (≥110)', alertLow: 'Too warm — AC may be off', alertHigh: null },
    sound: { min: null, max: 38, wantLabel: 'Low background (<38)', alertLow: null, alertHigh: 'Too loud — reducing productivity' }
  },
  cinema: {
    label: 'Cinema', icon: '🎬',
    desc: 'Very dark, cool & loud audio expected',
    light: { min: 600, max: null, wantLabel: 'Very dark (≥600)', alertLow: 'Too bright — cinema must be dark', alertHigh: null },
    temp: { min: 110, max: null, wantLabel: 'Cool auditorium (≥110)', alertLow: 'Too warm — auditorium needs AC', alertHigh: null },
    sound: { min: 15, max: null, wantLabel: 'Audio present (≥15)', alertLow: 'Too quiet — check the audio system', alertHigh: null }
  },
  dining: {
    label: 'Dining', icon: '🍽️',
    desc: 'Ambient light, normal temp & lively atmosphere',
    light: { min: null, max: 520, wantLabel: 'Ambient warm (<520)', alertLow: null, alertHigh: 'Too dark — dining needs ambient lighting' },
    temp: { min: 95, max: 110, wantLabel: 'Normal (95–110)', alertLow: 'Too hot for comfortable dining', alertHigh: 'Too cool for comfortable dining' },
    sound: { min: null, max: 45, wantLabel: 'Lively ok (<45)', alertLow: null, alertHigh: 'Too loud for the dining experience' }
  },
  concert: {
    label: 'Concert', icon: '🎸',
    desc: 'Dim stage, warm/hot crowd & loud is the point',
    light: { min: 350, max: null, wantLabel: 'Stage dim (≥350)', alertLow: 'Too bright — dim for concert atmosphere', alertHigh: null },
    temp: { min: null, max: 110, wantLabel: 'Warm/hot ok (<110)', alertLow: null, alertHigh: 'Too cool for a concert crowd' },
    sound: { min: 35, max: null, wantLabel: 'Loud (≥35 expected)', alertLow: 'Too quiet — where is the music?', alertHigh: null }
  },
  lab: {
    label: 'Lab', icon: '🔬',
    desc: 'Very bright, cool & quiet for precision work',
    light: { min: null, max: 320, wantLabel: 'Very bright (<320)', alertLow: null, alertHigh: 'Too dark — safety risk for lab work' },
    temp: { min: 110, max: null, wantLabel: 'Cool controlled (≥110)', alertLow: 'Too warm — may affect samples/equipment', alertHigh: null },
    sound: { min: null, max: 18, wantLabel: 'Quiet (<18)', alertLow: null, alertHigh: 'Too loud for precision work' }
  }
};

let currentMode = 'sleep';
let lastL = 0, lastT = 0, lastS = 0;

/* Build buttons */
const mGrid = document.getElementById('modeGrid');
Object.entries(MODES).forEach(([key, m]) => {
  const b = document.createElement('button');
  b.className = 'mbtn' + (key === 'sleep' ? ' active' : '');
  b.innerHTML = `<span class="mi">${m.icon}</span>${m.label}`;
  b.onclick = () => setMode(key);
  b.id = 'mb-' + key;
  mGrid.appendChild(b);
});

function setMode(k) {
  currentMode = k;
  document.querySelectorAll('.mbtn').forEach(b => b.classList.remove('active'));
  document.getElementById('mb-' + k).classList.add('active');
  document.getElementById('modeTag').textContent = 'MODE: ' + MODES[k].label.toUpperCase();
  renderInfo(lastL, lastT, lastS);
  doAlerts(lastL, lastT, lastS);
  doBackground(lastL, lastT, lastS);
}

/* Check if a value is bad for a sensor config. Returns null or the alert message. */
function sensorAlert(val, cfg) {
  if (cfg.min !== null && val < cfg.min) return cfg.alertLow;
  if (cfg.max !== null && val > cfg.max) return cfg.alertHigh;
  return null;
}

function sensorOk(val, cfg) { 
  return sensorAlert(val, cfg) === null; 
}

function rangeStr(cfg) {
  if (cfg.min !== null && cfg.max !== null) return `${cfg.min}–${cfg.max}`;
  if (cfg.min !== null) return `≥${cfg.min}`;
  if (cfg.max !== null) return `<${cfg.max}`;
  return 'any';
}

function renderInfo(l, t, s) {
  const m = MODES[currentMode];
  const rows = [
    { ok: sensorOk(l, m.light), label: m.light.wantLabel, range: rangeStr(m.light), cur: l ? Math.round(l) : '---' },
    { ok: sensorOk(t, m.temp), label: m.temp.wantLabel, range: rangeStr(m.temp), cur: t ? Math.round(t) : '---' },
    { ok: sensorOk(s, m.sound), label: m.sound.wantLabel, range: rangeStr(m.sound), cur: s ? Math.round(s) : '---' },
  ];
  document.getElementById('modeInfo').innerHTML =
    `<div style="font-size:9px;letter-spacing:2px;color:var(--c-dim);margin-bottom:7px;text-transform:uppercase">${m.desc}</div>` +
    rows.map(r => `<div class="req ${r.ok ? 'ok' : 'bad'}"><div class="rdot"></div><span>${r.label} — now: ${r.cur}</span></div>`).join('');
}

/* Clock */
function tick() {
  const n = new Date();
  document.getElementById('clock').textContent =
    String(n.getHours()).padStart(2, '0') + ':' +
    String(n.getMinutes()).padStart(2, '0') + ':' +
    String(n.getSeconds()).padStart(2, '0');
}
setInterval(tick, 1000); 
tick();

/* Uptime */
let t0 = null;
setInterval(() => {
  if (!t0) return;
  const s = Math.floor((Date.now() - t0) / 1000);
  document.getElementById('mu').textContent =
    String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}, 1000);

let mxL = 0, mxT = 0, mxS = 0, alertCount = 0;

/* Human labels */
function lbl_light(v) {
  if (v < 150) return 'VERY BRIGHT';
  if (v < 350) return 'BRIGHT';
  if (v < 500) return 'DIM';
  if (v < 700) return 'DARK';
  return 'VERY DARK';
}

function lbl_temp(v) {
  if (v < 95) return 'HOT';
  if (v < 110) return 'NORMAL';
  return 'COOL';
}

function lbl_sound(v) {
  if (v < 5) return 'SILENT';
  if (v < 12) return 'QUIET';
  if (v < 30) return 'MODERATE';
  if (v < 60) return 'LOUD';
  return 'VERY LOUD';
}

/* Chart */
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        borderColor: '#00ffc8', data: [], tension: 0.5, pointRadius: 0, borderWidth: 2, fill: true,
        backgroundColor: c => { const g = c.chart.ctx.createLinearGradient(0, 0, 0, c.chart.height); g.addColorStop(0, 'rgba(0,255,200,0.12)'); g.addColorStop(1, 'rgba(0,255,200,0)'); return g; }
      },
      {
        borderColor: '#ffc840', data: [], tension: 0.5, pointRadius: 0, borderWidth: 2, fill: true,
        backgroundColor: c => { const g = c.chart.ctx.createLinearGradient(0, 0, 0, c.chart.height); g.addColorStop(0, 'rgba(255,200,64,0.10)'); g.addColorStop(1, 'rgba(255,200,64,0)'); return g; }
      },
      {
        borderColor: '#ff6060', data: [], tension: 0.5, pointRadius: 0, borderWidth: 2, fill: true,
        backgroundColor: c => { const g = c.chart.ctx.createLinearGradient(0, 0, 0, c.chart.height); g.addColorStop(0, 'rgba(255,96,96,0.10)'); g.addColorStop(1, 'rgba(255,96,96,0)'); return g; }
      },
      { borderColor: 'rgba(255,255,255,0.08)', borderDash: [5, 5], data: [], pointRadius: 0, borderWidth: 1, fill: false }
    ]
  },
  options: {
    animation: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: {
        display: true, min: 0, max: 100,
        grid: { color: 'rgba(0,255,200,0.04)' },
        ticks: { color: 'rgba(180,220,210,0.35)', font: { family: 'Share Tech Mono', size: 9 }, callback: v => v + '%' }
      }
    }
  }
});

function norm(v, mx) { 
  return Math.min((v / mx) * 100, 100); 
}

/* Demo */
let demoInt = null;
function startDemo() {
  t0 = Date.now();
  document.getElementById('connStatus').textContent = '● DEMO';
  document.getElementById('connStatus').className = 'pill lit';
  document.getElementById('mst').textContent = 'DEMO';
  let i = 0;
  demoInt = setInterval(() => {
    i++;
    const l = 300 + Math.sin(i * 0.04) * 280 + (Math.random() - 0.5) * 50;
    const t = 70 + Math.sin(i * 0.025) * 45 + (Math.random() - 0.5) * 8;
    const s = 5 + Math.abs(Math.sin(i * 0.07)) * 60 + (Math.random() - 0.5) * 4;
    update(Math.max(0, l), Math.max(0, t), Math.max(0, s));
  }, 600);
}

/* Serial */
let port, reader, buf = '';
async function connect() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    if (demoInt) { clearInterval(demoInt); demoInt = null; }
    t0 = Date.now();
    document.getElementById('connStatus').textContent = '● LIVE';
    document.getElementById('connStatus').className = 'pill lit';
    document.getElementById('mst').textContent = 'LIVE';
    const dec = new TextDecoderStream();
    port.readable.pipeTo(dec.writable);
    reader = dec.readable.getReader();
    readLoop();
  } catch (e) { startDemo(); }
}

async function readLoop() {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += value;
    const lines = buf.split('\n'); buf = lines.pop();
    for (let line of lines) {
      line = line.trim(); if (!line) continue;
      try { const d = JSON.parse(line); update(d.light, d.temp, d.sound); } catch (e) {}
    }
  }
}

/* Main update */
let smoothSev = 0;
function update(light, temp, sound) {
  lastL = light; lastT = temp; lastS = sound;

  document.getElementById('v-light').textContent = Math.round(light);
  document.getElementById('v-temp').textContent = Math.round(temp);
  document.getElementById('v-sound').textContent = Math.round(sound);
  document.getElementById('s-light').textContent = lbl_light(light);
  document.getElementById('s-temp').textContent = lbl_temp(temp);
  document.getElementById('s-sound').textContent = lbl_sound(sound);

  document.getElementById('b-light').style.width = norm(light, 1023) + '%';
  document.getElementById('b-temp').style.width = norm(temp, 150) + '%';
  document.getElementById('b-sound').style.width = norm(sound, 80) + '%';

  if (light > mxL) { mxL = light; document.getElementById('ml').textContent = Math.round(light); }
  if (temp > mxT) { mxT = temp; document.getElementById('mt').textContent = Math.round(temp); }
  if (sound > mxS) { mxS = sound; document.getElementById('ms').textContent = Math.round(sound); }

  chart.data.labels.push('');
  chart.data.datasets[0].data.push(norm(light, 1023));
  chart.data.datasets[1].data.push(norm(temp, 150));
  chart.data.datasets[2].data.push(norm(sound, 80));
  chart.data.datasets[3].data.push(50);
  if (chart.data.labels.length > 120) { chart.data.labels.shift(); chart.data.datasets.forEach(d => d.data.shift()); }
  chart.update();

  renderInfo(light, temp, sound);
  doAlerts(light, temp, sound);
  doBackground(light, temp, sound);
}

function doAlerts(l, t, s) {
  const m = MODES[currentMode];
  const lMsg = sensorAlert(l, m.light);
  const tMsg = sensorAlert(t, m.temp);
  const sMsg = sensorAlert(s, m.sound);

  setCard('c-light', !!lMsg);
  setCard('c-temp', !!tMsg);
  setCard('c-sound', !!sMsg);

  const msgs = [lMsg, tMsg, sMsg].filter(Boolean).map(x => '⚠ ' + x);
  const adv = document.getElementById('advice');
  if (msgs.length === 0) {
    adv.className = 'ok';
    adv.innerHTML = `✓ All conditions nominal<br><span style="font-size:11px;opacity:0.55;letter-spacing:1px">Environment optimal for ${MODES[currentMode].label.toUpperCase()}</span>`;
    document.getElementById('modeTag').className = 'pill lit';
  } else {
    alertCount += msgs.length;
    document.getElementById('ma').textContent = alertCount;
    adv.className = 'bad';
    adv.innerHTML = msgs.join('<br><br>');
    document.getElementById('modeTag').className = 'pill warn';
  }
}

function setCard(id, isAlert) {
  const el = document.getElementById(id);
  el.classList.toggle('alert', isAlert);
  el.classList.toggle('good', !isAlert);
}

function doBackground(l, t, s) {
  const m = MODES[currentMode];
  let target = 0;
  if (sensorAlert(l, m.light)) target += 0.35;
  if (sensorAlert(t, m.temp)) target += 0.35;
  if (sensorAlert(s, m.sound)) target += 0.30;
  smoothSev += (Math.min(target, 1) - smoothSev) * 0.07;
  document.getElementById('sevBg').style.opacity = smoothSev;
}

window.addEventListener('load', () => { 
  renderInfo(0, 0, 0); 
  setTimeout(startDemo, 600); 
});