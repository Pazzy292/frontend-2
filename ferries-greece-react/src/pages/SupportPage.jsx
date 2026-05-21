import PageShell from '../components/PageShell.jsx';

export default function SupportPage() {
  return (
    <PageShell>
      <section className="page-section">
        <div className="container page-stack">
          <div className="page-heading">
            <span className="section-kicker">Contact / Support</span>
            <h1>Get help before or after booking</h1>
            <p>Use support for route questions, ticket collection, vehicle requirements, pets and booking changes.</p>
          </div>
          <div className="comparison-grid">
            <article className="page-card comparison-card">
              <h2>Before travel</h2>
              <p>Questions about operators, ports, check-in time or what is included in the fare.</p>
            </article>
            <article className="page-card comparison-card">
              <h2>After booking</h2>
              <p>Help with ticket PDFs, booking updates, cancellations and schedule changes.</p>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
