import { internationalRoutes } from '../data/siteData.js';

export default function RouteCards() {
  return (
    <section className="section route-section" id="routes">
      <div className="container">
        <div className="section-title split-title">
          <div>
            <span className="section-kicker">International Routes</span>
            <h2>Travelling by ferry from one country to another</h2>
          </div>
          <a className="text-link" href="#all-routes">View all connections</a>
        </div>

        <div className="route-grid">
          {internationalRoutes.map((route) => (
            <article className="route-card" key={`${route.from}-${route.to}`}>
              <div className="route-icon">{route.icon}</div>
              <span className="route-tag">{route.tag}</span>
              <h3>{route.from} - {route.to}</h3>
              <p>Routes, prices, schedules and offers.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
