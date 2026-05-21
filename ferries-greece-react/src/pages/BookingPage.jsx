import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookingStepper from '../components/BookingStepper.jsx';
import BookingSummary from '../components/BookingSummary.jsx';
import PageShell from '../components/PageShell.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { checkoutCart } from '../api/ferries.js';

// ── helpers ──────────────────────────────────────────────────────────────────
const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

// ── Step 3: Choose Accommodation ─────────────────────────────────────────────
function Step3Form({ booking, onSave, onBack }) {
  // accommodationTiers may be saved in context from the routes response
  const tiers = booking.accommodationTiers ?? [];
  const [selectedCode, setSelectedCode] = useState(
    booking.accommodationCode || tiers[0]?.code || ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const tier = tiers.find((t) => t.code === selectedCode);
    onSave({
      accommodationCode:  selectedCode,
      accommodationLabel: tier?.label ?? selectedCode,
      accommodationPrice: tier?.price ?? null,
      accommodationQuantity: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {tiers.length > 0 ? (
        tiers.map((tier) => (
          <label key={tier.code} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="accommodation"
              value={tier.code}
              checked={selectedCode === tier.code}
              onChange={() => setSelectedCode(tier.code)}
            />
            <span style={{ flex: 1 }}>
              {tier.label || cap(tier.tier)}
              {tier.price != null && (
                <strong style={{ marginLeft: '8px' }}>{tier.currency ?? 'EUR'} {Number(tier.price).toFixed(2)}</strong>
              )}
            </span>
          </label>
        ))
      ) : (
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No cabin options available for this voyage.</p>
      )}
      <div className="booking-stage-card__actions">
        <button type="button" className="secondary-link" onClick={onBack}>Back</button>
        <button type="submit" className="search-button booking-stage-card__cta">Continue to Step 4</button>
      </div>
    </form>
  );
}

// ── Step 4: Passenger Details ─────────────────────────────────────────────────
function Step4Form({ booking, onSave, onBack }) {
  const count = booking.paxAdultNumber ?? 1;
  const [travellers, setTravellers] = useState(() => {
    if (booking.travellers && booking.travellers.length) return booking.travellers;
    return Array.from({ length: count }, () => ({ firstName: '', lastName: '', dob: '' }));
  });
  const update = (i, field, value) =>
    setTravellers((prev) => prev.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ travellers });
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {travellers.map((t, i) => (
        <fieldset key={i} style={{ border: '1px solid var(--line)', borderRadius: '8px', padding: '16px', margin: 0 }}>
          <legend style={{ fontWeight: 700, padding: '0 8px', fontSize: '14px' }}>Passenger {i + 1}</legend>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <label>
              <span>First name</span>
              <input type="text" required value={t.firstName} onChange={(e) => update(i, 'firstName', e.target.value)} />
            </label>
            <label>
              <span>Last name</span>
              <input type="text" required value={t.lastName} onChange={(e) => update(i, 'lastName', e.target.value)} />
            </label>
            <label>
              <span>Date of birth</span>
              <input type="date" required value={t.dob} onChange={(e) => update(i, 'dob', e.target.value)} />
            </label>
          </div>
        </fieldset>
      ))}
      <div className="booking-stage-card__actions">
        <button type="button" className="secondary-link" onClick={onBack}>Back</button>
        <button type="submit" className="search-button booking-stage-card__cta">Continue to Step 5</button>
      </div>
    </form>
  );
}

// ── Step 5: Contact & Account ─────────────────────────────────────────────────
function Step5Form({ booking, onSave, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    onSave({ email: f.email.value, phone: f.phone.value });
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <label>
        <span>Email address</span>
        <input type="email" name="email" required defaultValue={booking.email} autoComplete="email" />
      </label>
      <label>
        <span>Phone number</span>
        <input type="tel" name="phone" required defaultValue={booking.phone} autoComplete="tel" placeholder="+44 7700 000000" />
      </label>
      <div className="booking-stage-card__actions">
        <button type="button" className="secondary-link" onClick={onBack}>Back</button>
        <button type="submit" className="search-button booking-stage-card__cta">Continue to Step 6</button>
      </div>
    </form>
  );
}

// ── Step 6: Review ────────────────────────────────────────────────────────────
function ReviewRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: '12px', padding: '8px 0', borderBottom: '1px solid var(--line)', fontSize: '15px' }}>
      <dt style={{ minWidth: '130px', fontWeight: 700, color: 'var(--muted)', margin: 0 }}>{label}</dt>
      <dd style={{ margin: 0 }}>{value || '—'}</dd>
    </div>
  );
}

function Step6Review({ booking, onConfirm, onBack }) {
  return (
    <div>
      <dl style={{ margin: '0 0 24px 0' }}>
        <ReviewRow label="Route"      value={booking.fromCity && booking.toCity ? `${cap(booking.fromCity)} → ${cap(booking.toCity)}` : null} />
        <ReviewRow label="Departure"  value={booking.date} />
        {booking.returnDate && <ReviewRow label="Return" value={booking.returnDate} />}
        <ReviewRow label="Operator"   value={booking.operator} />
        <ReviewRow label="Vessel"     value={booking.vessel} />
        <ReviewRow label="Cabin"      value={booking.accommodationLabel} />
        <ReviewRow label="Adults"     value={String(booking.paxAdultNumber ?? 1)} />
        <ReviewRow label="Dep. time"  value={booking.departureTime} />
        <ReviewRow label="Arr. time"  value={booking.arrivalTime} />
        <ReviewRow label="Price"      value={booking.price != null ? `${booking.currency ?? 'EUR'} ${Number(booking.price).toFixed(2)}` : '—'} />
        <ReviewRow label="Email"      value={booking.email} />
        <ReviewRow label="Phone"      value={booking.phone} />
      </dl>
      <div className="booking-stage-card__actions">
        <button type="button" className="secondary-link" onClick={onBack}>Back</button>
        <button type="button" className="search-button booking-stage-card__cta" onClick={onConfirm}>Proceed to Payment</button>
      </div>
    </div>
  );
}

// ── Step 7: Payment ───────────────────────────────────────────────────────────
function Step7Payment({ booking, onSubmit, onBack, submitting, submitError }) {
  return (
    <div>
      <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '14px' }}>
        Confirm your booking. Your e-ticket will be sent to <strong>{booking.email || 'your email'}</strong>.
      </p>
      <div style={{ background: 'var(--blue-100)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
        <strong>Total: </strong>
        <span style={{ fontSize: '18px', fontWeight: 700 }}>{booking.price != null ? `${booking.currency ?? 'EUR'} ${Number(booking.price).toFixed(2)}` : '—'}</span>
      </div>
      {submitError && <p style={{ color: '#c0392b', marginBottom: '12px', fontSize: '14px' }}>{submitError}</p>}
      <div className="booking-stage-card__actions">
        <button type="button" className="secondary-link" onClick={onBack}>Back</button>
        <button type="button" className="search-button booking-stage-card__cta" onClick={onSubmit} disabled={submitting}>
          {submitting ? 'Confirming booking…' : 'Confirm & Pay'}
        </button>
      </div>
    </div>
  );
}

// ── Main BookingPage ──────────────────────────────────────────────────────────
const TITLES = {
  1: 'Search Trip', 2: 'Choose Ferry', 3: 'Customize Trip',
  4: 'Passenger Details', 5: 'Contact & Account', 6: 'Review Booking', 7: 'Payment & Ticket',
};
const INTROS = {
  1: 'Select route, trip type, dates, passengers, vehicles and pets.',
  2: 'Compare schedules, prices, operators and travel duration.',
  3: 'Choose seats, cabin type, vehicle placement and pet options.',
  4: 'Add traveller names and dates of birth.',
  5: 'Provide contact details to receive your e-ticket.',
  6: 'Review the complete booking before payment.',
  7: 'Confirm your booking and complete payment.',
};

export default function BookingPage() {
  const { stepId } = useParams();
  const currentStep = Number(stepId);
  const { booking, updateBooking, resetBooking } = useBooking();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const goBack = () => navigate(currentStep > 1 ? `/booking/step-${currentStep - 1}` : '/search');

  const saveAndNext = (patch) => {
    updateBooking(patch);
    navigate(`/booking/step-${currentStep + 1}`);
  };

  const handlePayment = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await checkoutCart(booking.voyageId);
      resetBooking();
      navigate('/confirmation');
    } catch (err) {
      setSubmitError(err.message || 'Booking failed. Please try again.');
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 3: return <Step3Form booking={booking} onSave={saveAndNext} onBack={goBack} />;
      case 4: return <Step4Form booking={booking} onSave={saveAndNext} onBack={goBack} />;
      case 5: return <Step5Form booking={booking} onSave={saveAndNext} onBack={goBack} />;
      case 6: return <Step6Review booking={booking} onConfirm={() => navigate('/booking/step-7')} onBack={goBack} />;
      case 7: return <Step7Payment booking={booking} onSubmit={handlePayment} onBack={goBack} submitting={submitting} submitError={submitError} />;
      default:
        return (
          <div>
            <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>
              {currentStep === 1 ? 'Use the search form on the homepage to start a booking.' : 'Select a ferry from the search results to continue.'}
            </p>
            <div className="booking-stage-card__actions">
              <button type="button" className="secondary-link" onClick={goBack}>Back</button>
              <button type="button" className="search-button booking-stage-card__cta" onClick={() => navigate(currentStep === 1 ? '/' : '/search')}>
                {currentStep === 1 ? 'Go to homepage' : 'Go to search results'}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <PageShell>
      <BookingStepper currentStep={currentStep} />
      <section className="page-section">
        <div className="container booking-layout">
          <div className="page-stack">
            <div className="page-heading">
              <span className="section-kicker">Step {currentStep}</span>
              <h1>{TITLES[currentStep] || 'Booking'}</h1>
              <p>{INTROS[currentStep] || ''}</p>
            </div>
            <article className="page-card booking-stage-card">
              {renderStep()}
            </article>
          </div>
          <BookingSummary />
        </div>
      </section>
    </PageShell>
  );
}
