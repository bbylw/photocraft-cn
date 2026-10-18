import { useState } from 'react';
import { site, type QA } from '../data/site';

type Props = { items: QA[] };

export default function Faq({ items }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="faq">
      <div className="faq__cols">
        <div>
          <div className="faq__list" role="list">
            {items.map((item, i) => (
              <div key={item.q} role="listitem">
                <button
                  type="button"
                  className="faq__q"
                  id={`faq-q-${i}`}
                  aria-expanded={i === active}
                  aria-controls={`faq-m-${i} faq-pane`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <i aria-hidden="true" />
                  <span>{item.q}</span>
                </button>
                <div
                  className="faq__mobile"
                  id={`faq-m-${i}`}
                  data-open={i === active}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                >
                  <p className="faq__answer">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="faq__more">
            没找到答案？<a href={site.issues} target="_blank" rel="noreferrer">去 GitHub 提一个 issue</a>，或在 Discord 里问。
          </p>
        </div>

        <div className="faq__pane" id="faq-pane" aria-live="polite" aria-atomic="true">
          <div className="faq__paneBody" key={active}>
            <p className="faq__pq">{items[active]?.q}</p>
            <p className="faq__answer">{items[active]?.a}</p>
            <p className="faq__paneFoot">
              <a href={site.issues} target="_blank" rel="noreferrer">
                没找到答案？去 GitHub 提一个 issue
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
