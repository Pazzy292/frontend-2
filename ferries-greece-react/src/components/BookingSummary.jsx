import { useBooking } from '../context/BookingContext.jsx';

const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export default function BookingSummary() {
  const { booking } = useBooking();

  const route  = booking.fromCity && booking.toCity
    ? `${cap(booking.fromCity)} \u2192 ${cap(booking.toCity)}`
    : '\u2014';
  const dates  = [booking.date, booking.returnDate].filter(Boolean).join(' \u2013 ') || '\u2014';
  const total  = booking.price != null ? `${booking.currency ?? 'EUR'} ${Number(booking.price).toFixed(2)}` : '\u2014';

  return (
    <aside className="booking-summary" aria-label="Booking Summary">
      <span className="section-kicker">Summary</span>
      <h3>Booking Summary</h3>
      <dl>
        <div><dt>Route</dt><dd>{route}</dd></div>
        <div><dt>Travel Dates</dt><dd>{dates}</dd></div>
        <div><dt>Adults</dt><dd>{booking.paxAdultNumber ?? 1}</dd></div>
        <div><dt>Operator</dt><dd>{booking.operator || '\u2014'}</dd></div>
        {booking.vessel && <div><dt>Vessel</dt><dd>{booking.vessel}</dd></div>}
        {booking.accommodationLabel && <div><dt>Cabin</dt><dd>{booking.accommodationLabel}</dd></div>}
      </dl>
      <div className="booking-summary__total">
        <span>Total</span>
        <strong>{total}</strong>
      </div>
      <p className="booking-summary__note">The summary stays visible through every booking step.</p>
    </aside>
  );
}
