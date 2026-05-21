import { infoCards } from '../data/siteData.js';

export default function InfoCards() {
  return (
    <section className="section info-section">
      <div className="container">
        <div className="section-title centered">
          <span className="section-kicker">Useful information</span>
          <h2>Helpful information about your ferry trip</h2>
        </div>
        <div className="info-grid">
          {infoCards.map((item) => (
            <article className="info-card" key={item.title}>
              <div className="info-thumb" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href="#info">{item.status}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
