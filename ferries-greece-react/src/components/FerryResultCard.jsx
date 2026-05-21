import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext.jsx';

// Safely extract a value from a voyage object regardless of backend field name
function field(v, ...keys) {
  for (const k of keys) { if (v[k] != null) return v[k]; }
  return null;
}

export default function FerryResultCard({ voyage }) {
  const { updateBooking } = useBooking();
  const navigate = useNavigate();

  const id         = field(voyage, 'id', 'trip_id', 'voyage_id');
  const operator   = field(voyage, 'operator', 'company', 'operator_name') ?? '—';
  const vessel     = field(voyage, 'vessel', 'ship', 'ship_name', 'ferry_name') ?? '—';
  const depTime    = field(voyage, 'departure_time', 'departure', 'dep_time') ?? '—';
  const arrTime    = field(voyage, 'arrival_time', 'arrival', 'arr_time') ?? '—';
  const duration   = field(voyage, 'duration', 'travel_time') ?? '—';
  const price      = field(voyage, 'price', 'price_from', 'total_price', 'amount');
  const currency   = field(voyage, 'currency') ?? 'EUR';
  const fromPort   = field(voyage, 'departure_port', 'from_port', 'origin') ?? '—';
  const toPort     = field(voyage, 'arrival_port', 'to_port', 'destination') ?? '—';

  const handleChoose = () => {
    updateBooking({
      voyageId:     id,
      operator,
      vessel,
      departureTime: depTime,
      arrivalTime:   arrTime,
      duration,
      price,
      currency,
    });
    navigate('/booking/step-3');
  };

  return (
    <article className="ferry-result-card">
      <div className="ferry-result-card__head">
        <div>
          <span className="section-kicker">{operator}</span>
          <h3>{fromPort} → {toPort}</h3>
        </div>
        {price != null && (
          <div className="ferry-result-card__price">
            {currency} {Number(price).toFixed(2)}
          </div>
        )}
      </div>
      <div className="ferry-result-card__meta">
        <span>Dep. {depTime}</span>
        <span>Arr. {arrTime}</span>
        {duration !== '—' && <span>{duration}</span>}
        {vessel !== '—' && <span>{vessel}</span>}
      </div>
      <div className="ferry-result-card__actions">
        <button
          type="button"
          className="search-button ferry-result-card__cta"
          onClick={handleChoose}
        >
          Choose this voyage
        </button>
      </div>
    </article>
  );
}
