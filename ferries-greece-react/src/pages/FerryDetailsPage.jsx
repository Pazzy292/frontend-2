import { useNavigate } from 'react-router-dom';
import BookingSummary from '../components/BookingSummary.jsx';
import BookingStepper from '../components/BookingStepper.jsx';
import PageShell from '../components/PageShell.jsx';
import { useBooking } from '../context/BookingContext.jsx';

export default function FerryDetailsPage() {
  const { booking } = useBooking();
  const navigate = useNavigate();

  const operator    = booking.operator    ?? '—';
  const vessel      = booking.vessel      ?? '—';
  const depTime     = booking.departureTime ?? '—';
  const arrTime     = booking.arrivalTime   ?? '—';
  const duration    = booking.duration    ?? '—';
  const price       = booking.price       != null ? `${booking.currency ?? 'EUR'} ${Number(booking.price).toFixed(2)}` : '—';
  const fromCity    = booking.fromCity    ?? booking.from ?? '—';
  const toCity      = booking.toCity      ?? booking.to   ?? '—';

  return (
    <PageShell>
      <BookingStepper currentStep={2} />
      <section className="page-section">
        <div className="container booking-layout">
          <div className="page-stack">
            <div className="page-heading">
              <span className="section-kicker">Ferry Details</span>
              <h1>{operator} · {fromCity} → {toCity}</h1>
              <p>Review timings, onboard comfort and route specifics before you customise the booking.</p>
            </div>
            <article className="page-card detail-card">
              <div className="detail-card__row"><strong>Departure</strong><span>{depTime}</span></div>
              <div className="detail-card__row"><strong>Arrival</strong><span>{arrTime}</span></div>
              <div className="detail-card__row"><strong>Duration</strong><span>{duration}</span></div>
              <div className="detail-card__row"><strong>Vessel</strong><span>{vessel}</span></div>
              <div className="detail-card__row"><strong>Price</strong><span>{price}</span></div>
              <button
                type="button"
                className="search-button detail-card__cta"
                onClick={() => navigate('/booking/step-3')}
              >
                Continue to Step 3
              </button>
            </article>
          </div>
          <BookingSummary />
        </div>
      </section>
    </PageShell>
  );
}
