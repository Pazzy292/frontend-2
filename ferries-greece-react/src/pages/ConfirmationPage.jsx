import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';

export default function ConfirmationPage() {
  return (
    <PageShell>
      <section className="page-section">
        <div className="container confirmation-card page-card">
          <span className="section-kicker">Booking Confirmation</span>
          <h1>Payment successful. Your ferry ticket is ready.</h1>
          <p>Your e-ticket is available for download and the booking can now be managed from your dashboard.</p>
          <div className="confirmation-card__actions">
            <Link className="search-button" to="/my-bookings">Manage booking</Link>
            <Link className="secondary-link" to="/support">Need support?</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
