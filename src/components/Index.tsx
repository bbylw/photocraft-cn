import { useState } from 'react';

export type IndexItem = {
  name: string;
  desc: string;
  href: string;
  kind: 'image' | 'fragment';
  src?: string;
  thumb?: string;
  alt?: string;
  fragment?: 'psd' | 'cli' | 'platforms';
  note?: string;
  label?: string;
};

function PsdFragment() {
  return (
    <div className="frag">
      <p className="frag__k">打开再重新保存，与 Photoshop 的渲染对比</p>
      <dl className="frag__rows">
        <div>
          <dt>psd-tools 语料</dt>
          <dd>307 / 309</dd>
        </div>
        <div>
          <dt>混合语料</dt>
          <dd>169 / 170</dd>
        </div>
        <div>
          <dt>形状图层</dt>
          <dd>116 / 116</dd>
        </div>
        <div>
          <dt>测试项</dt>
          <dd>1,700+</dd>
        </div>
      </dl>
    </div>
  );
}

function CliFragment() {
  return (
    <div className="frag frag--mono">
      <p className="frag__k">同一个注册表，四种驱动方式</p>
      <pre className="frag__code">
        <span className="c">${' '}</span>photocraft-cli run wave.psd{`\n`}
        {'  '}--cmd filter.sharpen.smartSharpen{`\n`}
        {'  '}--cmd layer.newAdjustmentLayer.curves{`\n`}
        {'  '}--out wave-final.png
      </pre>
      <p className="frag__ok">→ 2 条命令完成，1 个图层已建立</p>
    </div>
  );
}

function PlatformsFragment() {
  return (
    <div className="frag">
      <p className="frag__k">一个纯 Rust 的原生应用，五个系统与浏览器</p>
      <ul className="frag__platforms">
        {['macOS', 'Windows', 'Linux', 'FreeBSD', 'Web'].map((p) => (
          <li key={p}>
            <span>{p}</span>
            <span>原生构建</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const FRAGMENTS = {
  psd: PsdFragment,
  cli: CliFragment,
  platforms: PlatformsFragment,
};

const FRAGMENT_MARKS = {
  psd: 'PSD',
  cli: 'CLI',
  platforms: 'OS',
};

export default function Index({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div className="index">
      <nav className="index__list" aria-label="索引">
        {items.map((item, i) => (
          <a
            key={item.name}
            className="index__row"
            href={item.href}
            data-active={i === active}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className="index__name">{item.name}</span>
            <span className="index__desc">{item.desc}</span>
            <span className="index__thumb" aria-hidden="true">
              {item.kind === 'image' && item.thumb ? (
                <img
                  src={item.thumb}
                  alt=""
                  width={320}
                  height={200}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="index__mark">
                  {item.fragment ? FRAGMENT_MARKS[item.fragment] : ''}
                </span>
              )}
            </span>
          </a>
        ))}
      </nav>

      <div className="specimen">
        <div className="specimen__frame">
          {items.map((item, i) => {
            const Frag = item.fragment ? FRAGMENTS[item.fragment] : null;
            return (
              <div
                key={item.name}
                className="specimen__slide"
                data-on={i === active}
                aria-hidden={i !== active}
              >
                {item.kind === 'image' ? (
                  <img
                    src={item.src}
                    alt=""
                    width={1040}
                    height={650}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ) : (
                  Frag && <Frag />
                )}
              </div>
            );
          })}
        </div>
        <p className="specimen__caption">
          <span>{current.note}</span>
          <span className="specimen__label">{current.label}</span>
        </p>
      </div>
    </div>
  );
}
