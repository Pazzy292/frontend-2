import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';

export default function NotFoundPage() {
  return (
    <PageShell>
      <section className="page-section">
        <div className="container confirmation-card page-card">
          <span className="section-kicker">404</span>
          <h1>This route does not exist.</h1>
          <p>Return to the homepage and continue the ferry booking journey from there.</p>
          <Link className="search-button" to="/">Back to homepage</Link>
        </div>
      </section>
    </PageShell>
  );
}
