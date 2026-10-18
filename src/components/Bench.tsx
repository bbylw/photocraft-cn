import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';

type Props = { waveSrc: string };

const PREVIEW_W = 1100;

/* ---------- LUT builders ---------- */

function lutCurve(points: [number, number][]): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256);
  const n = points.length;
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const dx: number[] = [];
  const dy: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(xs[i + 1] - xs[i]);
    dy.push(ys[i + 1] - ys[i]);
    slope.push(dy[i] / dx[i]);
  }
  const tangents: number[] = [slope[0]];
  for (let i = 1; i < n - 1; i++) {
    if (slope[i - 1] * slope[i] <= 0) tangents.push(0);
    else {
      const w1 = 2 * dx[i] + dx[i - 1];
      const w2 = dx[i] + 2 * dx[i - 1];
      tangents.push((w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]));
    }
  }
  tangents.push(slope[n - 2]);

  let seg = 0;
  for (let x = 0; x < 256; x++) {
    while (seg < n - 2 && x > xs[seg + 1]) seg++;
    const h = dx[seg];
    const t = Math.min(1, Math.max(0, (x - xs[seg]) / h));
    const t2 = t * t;
    const t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1;
    const h10 = t3 - 2 * t2 + t;
    const h01 = -2 * t3 + 3 * t2;
    const h11 = t3 - t2;
    lut[x] = ys[seg] * h00 + tangents[seg] * h * h10 + ys[seg + 1] * h01 + tangents[seg + 1] * h * h11;
  }
  return lut;
}

function lutLevels(inLow: number, inHigh: number, gamma: number): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256);
  for (let x = 0; x < 256; x++) {
    const t = Math.min(1, Math.max(0, (x - inLow) / (inHigh - inLow)));
    lut[x] = Math.pow(t, gamma) * 255;
  }
  return lut;
}

const CURVE_POINTS: [number, number][] = [
  [0, 4],
  [58, 46],
  [128, 128],
  [198, 212],
  [255, 252],
];

const CURVE_LUT = lutCurve(CURVE_POINTS);
const LEVELS_LUT = lutLevels(4, 250, 1);

type Op = (data: Uint8ClampedArray, alpha: number) => void;

const opLut =
  (lut: Uint8ClampedArray): Op =>
  (data, alpha) => {
    const keep = 1 - alpha;
    for (let i = 0; i < data.length; i += 4) {
      for (let c = 0; c < 3; c++) {
        const v = data[i + c];
        data[i + c] = v * keep + lut[v] * alpha;
      }
    }
  };

const opVibrance: Op = (data, alpha) => {
  const a = alpha * 1.1;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.213 * r + 0.715 * g + 0.072 * b;
    const mx = r > g ? (r > b ? r : b) : g > b ? g : b;
    const mn = r < g ? (r < b ? r : b) : g < b ? g : b;
    const amt = a * (1 - (mx - mn) / 255) * Math.min(1, (255 - lum) / 90);
    data[i] = r + (r - lum) * amt;
    data[i + 1] = g + (g - lum) * amt;
    data[i + 2] = b + (b - lum) * amt;
  }
};

const opBW: Op = (data, alpha) => {
  const keep = 1 - alpha;
  for (let i = 0; i < data.length; i += 4) {
    const y = 0.32 * data[i] + 0.5 * data[i + 1] + 0.18 * data[i + 2];
    data[i] = data[i] * keep + y * alpha;
    data[i + 1] = data[i + 1] * keep + y * alpha;
    data[i + 2] = data[i + 2] * keep + y * alpha;
  }
};

const GRAD: [number, number, number][] = [
  [8, 22, 44],
  [244, 217, 108],
];
const GRAD_LUT = (() => {
  const lut = new Uint8ClampedArray(256 * 3);
  for (let x = 0; x < 256; x++) {
    const t = x / 255;
    for (let c = 0; c < 3; c++) {
      lut[x * 3 + c] = GRAD[0][c] + (GRAD[1][c] - GRAD[0][c]) * t;
    }
  }
  return lut;
})();

const opGradient: Op = (data, alpha) => {
  const keep = 1 - alpha;
  for (let i = 0; i < data.length; i += 4) {
    const y = Math.round(0.213 * data[i] + 0.715 * data[i + 1] + 0.072 * data[i + 2]);
    const k = y * 3;
    data[i] = data[i] * keep + GRAD_LUT[k] * alpha;
    data[i + 1] = data[i + 1] * keep + GRAD_LUT[k + 1] * alpha;
    data[i + 2] = data[i + 2] * keep + GRAD_LUT[k + 2] * alpha;
  }
};

type LayerDef = {
  id: string;
  name: string;
  kind: string;
  swatch: string;
  defOn: boolean;
  defOpacity: number;
  op?: Op;
};

const LAYERS: LayerDef[] = [
  { id: 'curves', name: '曲线 1', kind: '调整', swatch: 'curve', defOn: true, defOpacity: 100, op: opLut(CURVE_LUT) },
  { id: 'levels', name: '色阶 1', kind: '调整', swatch: 'level', defOn: true, defOpacity: 100, op: opLut(LEVELS_LUT) },
  { id: 'vibrance', name: '自然饱和度 1', kind: '调整', swatch: 'vib', defOn: true, defOpacity: 55, op: opVibrance },
  { id: 'bw', name: '黑白 1', kind: '调整', swatch: 'half', defOn: false, defOpacity: 100, op: opBW },
  { id: 'gradient', name: '渐变映射 1', kind: '调整', swatch: 'grad', defOn: false, defOpacity: 100, op: opGradient },
  { id: 'bg', name: '背景', kind: '像素', swatch: 'none', defOn: true, defOpacity: 100 },
];

function Eye({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {open ? (
        <>
          <path d="M1 8s2.6-4.2 7-4.2S15 8 15 8s-2.6 4.2-7 4.2S1 8 1 8z" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="8" cy="8" r="1.9" fill="currentColor" />
        </>
      ) : (
        <>
          <path d="M1 8s2.6-4.2 7-4.2S15 8 15 8s-2.6 4.2-7 4.2S1 8 1 8z" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
          <path d="M2.5 13.5L13.5 2.5" stroke="currentColor" strokeWidth="1.2" />
        </>
      )}
    </svg>
  );
}

function Swatch({ kind }: { kind: string }) {
  if (kind === 'curve') {
    return (
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <rect width="12" height="12" fill="#2c5238" />
        <path d="M1 10c3 0 4-6 6-6s3 4 4 4" stroke="#e9efe2" strokeWidth="1.1" fill="none" />
      </svg>
    );
  }
  if (kind === 'level') {
    return (
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <rect width="12" height="12" fill="#2c5238" />
        <path d="M1 9h2V6h2V3h2v3h2v3h2" stroke="#e9efe2" strokeWidth="1" fill="none" />
      </svg>
    );
  }
  if (kind === 'vib') {
    return (
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <circle cx="6" cy="6" r="5" fill="#7d8a72" />
        <path d="M6 1a5 5 0 010 10z" fill="#d8ddcd" />
      </svg>
    );
  }
  if (kind === 'half') {
    return (
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <circle cx="6" cy="6" r="5" fill="#e9efe2" />
        <path d="M6 1a5 5 0 010 10z" fill="#2c5238" />
      </svg>
    );
  }
  if (kind === 'grad') {
    return (
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4d96c" />
            <stop offset="1" stopColor="#08162c" />
          </linearGradient>
        </defs>
        <rect width="12" height="12" fill="url(#g1)" />
      </svg>
    );
  }
  return <span className="swatch" style={{ background: '#6f6552' }} />;
}

export default function Bench({ waveSrc }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const histRef = useRef<HTMLCanvasElement | null>(null);
  const baseRef = useRef<ImageData | null>(null);
  const [ready, setReady] = useState(false);
  const [bins, setBins] = useState<Uint32Array | null>(null);
  const [selected, setSelected] = useState('curves');
  const [panelTab, setPanelTab] = useState<'props' | 'adjustments' | 'histogram'>('props');
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(LAYERS.map((l) => [l.id, l.defOn])),
  );
  const [opacity, setOpacity] = useState<Record<string, number>>(() =>
    Object.fromEntries(LAYERS.map((l) => [l.id, l.defOpacity])),
  );
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      const w = Math.min(PREVIEW_W, img.naturalWidth);
      const h = Math.round((img.naturalHeight / img.naturalWidth) * w);
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const ctx = off.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      baseRef.current = ctx.getImageData(0, 0, w, h);
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = w;
        canvas.height = h;
      }
      setReady(true);
    };
    img.src = waveSrc;
  }, [waveSrc]);

  const render = useCallback(() => {
    const base = baseRef.current;
    const canvas = canvasRef.current;
    if (!base || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const out = new ImageData(new Uint8ClampedArray(base.data), base.width, base.height);
    for (let i = LAYERS.length - 1; i >= 0; i--) {
      const layer = LAYERS[i];
      if (!layer.op || !visible[layer.id]) continue;
      const a = opacity[layer.id] / 100;
      if (a > 0) layer.op(out.data, a);
    }
    ctx.putImageData(out, 0, 0);

    const hist = new Uint32Array(256);
    const d = out.data;
    for (let i = 0; i < d.length; i += 16) {
      const y = (0.213 * d[i] + 0.715 * d[i + 1] + 0.072 * d[i + 2]) | 0;
      hist[y]++;
    }
    setBins(hist);

    const hc = histRef.current;
    if (hc) {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const cw = hc.clientWidth || 260;
      const ch = hc.clientHeight || 72;
      hc.width = cw * dpr;
      hc.height = ch * dpr;
      const hctx = hc.getContext('2d');
      if (hctx) {
        hctx.scale(dpr, dpr);
        hctx.clearRect(0, 0, cw, ch);
        const peak = Math.max(...hist) || 1;
        hctx.fillStyle = 'rgba(233,239,226,0.7)';
        for (let x = 0; x < 256; x++) {
          const bh = (Math.sqrt(hist[x]) / Math.sqrt(peak)) * ch;
          hctx.fillRect((x / 256) * cw, ch - bh, cw / 256 + 0.6, bh);
        }
      }
    }
  }, [visible, opacity]);

  useEffect(() => {
    if (!ready) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      render();
    });
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [ready, render, selected, panelTab]);

  const selectedLayer = LAYERS.find((l) => l.id === selected) ?? LAYERS[0];
  const onCount = LAYERS.filter((l) => l.id !== 'bg' && visible[l.id]).length;

  const stats = useMemo(() => {
    if (!bins) return { mean: '0.0', median: 0, stdDev: '0.0', samples: '0' };
    let total = 0;
    let sum = 0;
    for (let i = 0; i < 256; i++) {
      total += bins[i];
      sum += bins[i] * i;
    }
    const mean = total > 0 ? sum / total : 0;
    let varianceSum = 0;
    let acc = 0;
    let median = 128;
    const half = total / 2;
    let foundMedian = false;

    for (let i = 0; i < 256; i++) {
      varianceSum += bins[i] * Math.pow(i - mean, 2);
      acc += bins[i];
      if (!foundMedian && acc >= half) {
        median = i;
        foundMedian = true;
      }
    }
    const stdDev = total > 0 ? Math.sqrt(varianceSum / total) : 0;
    return {
      mean: mean.toFixed(1),
      median,
      stdDev: stdDev.toFixed(1),
      samples: total.toLocaleString(),
    };
  }, [bins]);

  const curvePath = useMemo(() => {
    let d = '';
    for (let x = 0; x < 256; x += 4) d += `${x === 0 ? 'M' : 'L'}${x} ${((255 - CURVE_LUT[x]) / 255) * 100} `;
    return d;
  }, []);

  const histPath = useMemo(() => {
    if (!bins) return '';
    const peak = Math.max(...bins) || 1;
    let d = 'M0 100 ';
    for (let x = 0; x < 256; x += 2) {
      const h = (Math.sqrt(bins[x]) / Math.sqrt(peak)) * 100;
      d += `L${x} ${100 - h} `;
    }
    return d + 'L255 100 Z';
  }, [bins]);

  const toggle = (id: string) => setVisible((v) => ({ ...v, [id]: !v[id] }));

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const order = ['props', 'adjustments', 'histogram'] as const;
    const i = order.indexOf(panelTab);
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % order.length;
    else if (e.key === 'ArrowLeft') next = (i + order.length - 1) % order.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = order.length - 1;
    else return;
    e.preventDefault();
    setPanelTab(order[next]);
    document.getElementById(`panel-tab-${order[next]}`)?.focus();
  };

  const rangeValue = selected === 'bg' ? 100 : opacity[selected];

  return (
    <div className="plate" data-ui="plate">
      <div className="plate__head">
        <b>great-wave.jpg</b>
        <span>RGB · 8 位</span>
        <span>3859 × 2594</span>
        <span style={{ marginLeft: 'auto' }}>{onCount + 1} 个可见图层</span>
        <span>100%</span>
      </div>

      <div className="plate__body">
        <div className="plate__stage">
          <div className={`plate__canvas ${ready ? 'is-ready' : ''}`}>
            <img src={waveSrc} alt="葛饰北斋《神奈川冲浪里》，约 1831 年，公共领域" width="1100" height="733" />
            <canvas ref={canvasRef} role="img" aria-label="调整图层应用后的画布预览" />
          </div>
        </div>

        <div className="plate__panel">
          <div className="panel__tabs" role="tablist" aria-label="属性与图层">
            <button
              type="button"
              className="panel__tab"
              role="tab"
              id="panel-tab-props"
              aria-selected={panelTab === 'props'}
              aria-controls="panel-props"
              tabIndex={panelTab === 'props' ? 0 : -1}
              onClick={() => setPanelTab('props')}
              onKeyDown={onTabKey}
            >
              属性
            </button>
            <button
              type="button"
              className="panel__tab"
              role="tab"
              id="panel-tab-adjustments"
              aria-selected={panelTab === 'adjustments'}
              aria-controls="panel-adjustments"
              tabIndex={panelTab === 'adjustments' ? 0 : -1}
              onClick={() => setPanelTab('adjustments')}
              onKeyDown={onTabKey}
            >
              调整
            </button>
            <button
              type="button"
              className="panel__tab"
              role="tab"
              id="panel-tab-histogram"
              aria-selected={panelTab === 'histogram'}
              aria-controls="panel-histogram"
              tabIndex={panelTab === 'histogram' ? 0 : -1}
              onClick={() => setPanelTab('histogram')}
              onKeyDown={onTabKey}
            >
              直方图
            </button>
          </div>

          {panelTab === 'props' && (
            <div
              className="panel__props"
              role="tabpanel"
              id="panel-props"
              aria-labelledby="panel-tab-props"
            >
              <div className="panel__row panel__row--head">
                <span>{selectedLayer.name}</span>
                <output>{selectedLayer.kind}图层</output>
              </div>

              {selected === 'curves' && (
                <div className="panel__curve">
                  <svg viewBox="0 0 256 100" preserveAspectRatio="none" aria-hidden="true">
                    <path d={histPath} fill="rgba(233,239,226,0.16)" />
                    <path d={curvePath} fill="none" stroke="#eef2e6" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
                    {CURVE_POINTS.map(([x, y]) => (
                      <rect key={x} x={x - 2} y={((255 - y) / 255) * 100 - 2} width="4" height="4" fill="#f4d96c" />
                    ))}
                  </svg>
                </div>
              )}

              {selected === 'levels' && (
                <div className="panel__curve">
                  <canvas ref={histRef} style={{ width: '100%', height: 72 }} aria-hidden="true" />
                </div>
              )}

              {selected === 'vibrance' && (
                <div className="panel__curve" style={{ padding: '14px' }}>
                  <div style={{ width: '100%', height: 5, background: '#2c5238' }}>
                    <div style={{ width: `${opacity.vibrance}%`, height: '100%', background: '#f4d96c' }} />
                  </div>
                </div>
              )}

              {selected === 'bw' && (
                <div className="panel__curve" style={{ padding: '12px 14px', display: 'grid', gap: 6, width: '100%' }}>
                  {[
                    ['红', 32],
                    ['绿', 50],
                    ['蓝', 18],
                  ].map(([k, v]) => (
                    <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--ui-dim)' }}>{k}</span>
                      <span>{v}%</span>
                    </div>
                  ))}
                </div>
              )}

              {selected === 'gradient' && (
                <svg viewBox="0 0 100 10" preserveAspectRatio="none" height="26" width="100%" aria-hidden="true">
                  <defs>
                    <linearGradient id="gmap" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#08162c" />
                      <stop offset="1" stopColor="#f4d96c" />
                    </linearGradient>
                  </defs>
                  <rect width="100" height="10" fill="url(#gmap)" />
                </svg>
              )}

              {selected === 'bg' && (
                <div className="panel__row">
                  <span>源</span>
                  <output>great-wave.jpg (锁定)</output>
                </div>
              )}

              <label className="panel__row panel__row--range">
                <span>不透明度</span>
                <input
                  className="panel__range"
                  type="range"
                  min={0}
                  max={100}
                  disabled={selected === 'bg'}
                  value={rangeValue}
                  onChange={(e) => setOpacity((o) => ({ ...o, [selected]: Number(e.target.value) }))}
                  aria-label={`${selectedLayer.name} 不透明度`}
                  style={{ '--range-fill': `${rangeValue}%` } as CSSProperties}
                />
                <output>{selected === 'bg' ? '锁定' : `${opacity[selected]}%`}</output>
              </label>

              <button
                type="button"
                className="panel__reset"
                onClick={() => {
                  setVisible(Object.fromEntries(LAYERS.map((l) => [l.id, l.defOn])));
                  setOpacity(Object.fromEntries(LAYERS.map((l) => [l.id, l.defOpacity])));
                  setSelected('curves');
                }}
              >
                复位为默认
              </button>
            </div>
          )}

          {panelTab === 'adjustments' && (
            <div
              className="panel__props"
              role="tabpanel"
              id="panel-adjustments"
              aria-labelledby="panel-tab-adjustments"
            >
              <div className="panel__row">
                <span>调整预设</span>
                <output>{onCount} 项已激活</output>
              </div>
              <div className="panel__presets">
                {LAYERS.filter((l) => l.id !== 'bg').map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className="presetrow"
                    data-selected={selected === l.id}
                    data-visible={visible[l.id]}
                    onClick={() => {
                      setSelected(l.id);
                      setPanelTab('props');
                    }}
                  >
                    <span className="presetrow__name">
                      <Swatch kind={l.swatch} />
                      {l.name}
                    </span>
                    <span className="presetrow__val">
                      {visible[l.id] ? `${opacity[l.id]}%` : '已隐藏'}
                    </span>
                  </button>
                ))}
              </div>
              <div className="panel__actions">
                <button
                  type="button"
                  className="panel__reset"
                  onClick={() => {
                    setVisible((v) => {
                      const next = { ...v };
                      LAYERS.filter((l) => l.id !== 'bg').forEach((l) => (next[l.id] = true));
                      return next;
                    });
                  }}
                >
                  全部开启
                </button>
                <button
                  type="button"
                  className="panel__reset"
                  onClick={() => {
                    setVisible((v) => {
                      const next = { ...v };
                      LAYERS.filter((l) => l.id !== 'bg').forEach((l) => (next[l.id] = false));
                      return next;
                    });
                  }}
                >
                  全部关闭
                </button>
              </div>
            </div>
          )}

          {panelTab === 'histogram' && (
            <div
              className="panel__props"
              role="tabpanel"
              id="panel-histogram"
              aria-labelledby="panel-tab-histogram"
            >
              <div className="panel__row">
                <span>通道</span>
                <output>亮度 (RGB)</output>
              </div>
              <div className="panel__curve">
                <canvas ref={histRef} style={{ width: '100%', height: 72 }} aria-hidden="true" />
              </div>
              <div className="histstats">
                <div>
                  <span>平均值</span>
                  <output>{stats.mean}</output>
                </div>
                <div>
                  <span>标准差</span>
                  <output>{stats.stdDev}</output>
                </div>
                <div>
                  <span>中值</span>
                  <output>{stats.median}</output>
                </div>
                <div>
                  <span>采样数</span>
                  <output>{stats.samples}</output>
                </div>
              </div>
              <button
                type="button"
                className="panel__reset"
                onClick={() => setPanelTab('props')}
              >
                返回图层属性
              </button>
            </div>
          )}


          <div className="panel__layers">
            <div className="panel__layhead">
              <span>正常</span>
              <span>不透明度 {opacity[selected]}%</span>
              <span style={{ marginLeft: 'auto' }}>{LAYERS.length} 个图层</span>
            </div>
            <ul className="layerlist" aria-label="图层">
              {LAYERS.map((l) => (
                <li
                  key={l.id}
                  className="layerrow"
                  data-visible={visible[l.id]}
                  data-selected={selected === l.id}
                >
                  <button
                    type="button"
                    className="eye"
                    aria-pressed={visible[l.id]}
                    aria-label={`${visible[l.id] ? '隐藏' : '显示'} ${l.name}`}
                    onClick={() => toggle(l.id)}
                  >
                    <Eye open={visible[l.id]} />
                  </button>
                  <button
                    type="button"
                    className="layerrow__pick"
                    aria-current={selected === l.id}
                    onClick={() => setSelected(l.id)}
                  >
                    <span className="layerrow__swatch">
                      <Swatch kind={l.swatch} />
                    </span>
                    <span className="layerrow__name">{l.name}</span>
                    <span className="layerrow__kind">{l.kind}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="plate__chips" aria-label="调整图层">
        {LAYERS.filter((l) => l.id !== 'bg').map((l) => (
          <button
            key={l.id}
            type="button"
            className="chip"
            data-on={visible[l.id]}
            aria-pressed={visible[l.id]}
            onClick={() => toggle(l.id)}
          >
            <i aria-hidden="true" />
            {l.name.replace(' 1', '')}
          </button>
        ))}
      </div>
    </div>
  );
}
