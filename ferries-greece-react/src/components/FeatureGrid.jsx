import FerryConnectionsByPort from './FerryConnectionsByPort.jsx';

export default function FeatureGrid() {
  return (
    <section className="section feature-section">
      <div className="container agent-layout">
        <article className="agent-card">
          <div className="agent-illustration">
            <span>YOUR PERSONAL</span>
            <strong>FERRY BOOKING AGENT</strong>
          </div>
          <h2>Your personal ferry booking agent</h2>
          <p>
            Each customer journey can be paired with a clear support module for
            language-specific assistance and follow-up.
          </p>
        </article>

        <div className="features-wrap feature-port-wrap">
          <FerryConnectionsByPort embedded />
        </div>
      </div>
    </section>
  );
}
