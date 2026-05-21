import { useState } from 'react';
import { destinations } from '../data/siteData.js';

export default function Destinations() {
  const [idx, setIdx] = useState(0);
  const dest = destinations[idx];
  const prev = () => setIdx((i) => (i - 1 + destinations.length) % destinations.length);
  const next = () => setIdx((i) => (i + 1) % destinations.length);

  return (
    <section className="section destinations-section" id="destinations-list">
      <div className="container">
        <div className="dest-header">
          <div>
            <span className="section-kicker">Top Destinations</span>
            <h2 className="dest-title">Top destinations in Greece and the Connect islands</h2>
          </div>
          <div className="dest-arrows">
            <button className="dest-arrow" onClick={prev} aria-label="Previous destination">&#8249;</button>
            <button className="dest-arrow" onClick={next} aria-label="Next destination">&#8250;</button>
          </div>
        </div>

        <div className={`dest-banner dest-banner--${dest.gradient}`}>
          <div className="dest-info-card">
            <h3 className="dest-info-name">{dest.name}</h3>
            <div className="dest-info-price">Ferry Tickets {dest.price}</div>
            <a className="dest-info-link" href="#search">View all ferry connections to {dest.name}</a>
          </div>
        </div>

        <div className="dest-dots">
          {destinations.map((d, i) => (
            <button
              key={d.name}
              className={`dest-dot${i === idx ? ' active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={d.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
