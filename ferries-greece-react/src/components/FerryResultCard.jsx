import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext.jsx';

// Safely extract a value from a voyage object regardless of backend field name
function field(v, ...keys) {
  for (const k of keys) { if (v?.[k] != null) return v[k]; }
  return null;
}

// Format an ISO datetime or H:M string as "HH:MM"
function formatTime(value) {
  if (!value) return '—';
  if (typeof value === 'string' && /^\d{2}:\d{2}/.test(value)) return value.slice(0, 5);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

// Format minutes as "Xh Ym"
function formatDuration(minutes) {
  if (minutes == null) return '—';
  const n = Number(minutes);
  if (!Number.isFinite(n)) return String(minutes);
  const h = Math.floor(n / 60);
  const m = n % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function FerryResultCard({ voyage }) {
  const { updateBooking } = useBooking();
  const navigate = useNavigate();

  const route      = voyage?.route ?? {};

  const id         = field(voyage, 'id', 'trip_id', 'voyage_id');
  const operator   = field(voyage, 'operator', 'company', 'operator_name', 'provider') ?? '—';
  const vessel     = field(voyage, 'vessel', 'ship', 'ship_name', 'ferry_name') ?? '—';
  const depRaw     = field(voyage, 'departure_time', 'departure', 'dep_time', 'departure_datetime');
  const arrRaw     = field(voyage, 'arrival_time', 'arrival', 'arr_time', 'arrival_datetime');
  const depTime    = formatTime(depRaw);
  const arrTime    = formatTime(arrRaw);
  const durationRaw = field(voyage, 'duration', 'travel_time');
  const duration   = durationRaw ?? formatDuration(field(voyage, 'duration_minutes'));
  const price      = field(voyage, 'price', 'price_from', 'total_price', 'amount');
  const currency   = field(voyage, 'currency') ?? 'EUR';
  const fromPort   = field(voyage, 'departure_port', 'from_port', 'origin')
                  ?? field(route,  'from_port', 'departure_port', 'origin') ?? '—';
  const toPort     = field(voyage, 'arrival_port', 'to_port', 'destination')
                  ?? field(route,  'to_port', 'arrival_port', 'destination') ?? '—';

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
