import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';
import BookingStepper from '../components/BookingStepper.jsx';

export default function FerryComparisonPage() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <BookingStepper currentStep={2} />
      <section className="page-section">
        <div className="container page-stack">
          <div className="page-heading">
            <span className="section-kicker">Comparison</span>
            <h1>Compare ferry operators side by side</h1>
            <p>Select two ferries from the search results to compare them here.</p>
          </div>
          <div className="page-card" style={{ padding: '32px', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>
              No ferries selected for comparison yet.
            </p>
            <button
              type="button"
              className="search-button"
              onClick={() => navigate('/search')}
            >
              Back to search results
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
