import { CalendarDays, MapPin, Search, ShipWheel, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getRoutes } from '../api/ferries.js';
import { useBooking } from '../context/BookingContext.jsx';

const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const today = new Date().toISOString().split('T')[0];
function addDays(isoDate, n) {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

export default function HeroBooking() {
  const [tripType, setTripType]   = useState('One Way');
  const [routesData, setRoutesData] = useState(null);
  const [fromCity, setFromCity]   = useState('');
  const [toCity, setToCity]       = useState('');
  const [departureDate, setDepartureDate] = useState(today);
  const [returnDate, setReturnDate]       = useState(addDays(today, 7));
  const [routesError, setRoutesError]     = useState('');
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  // Ensure return date is always after departure
  useEffect(() => {
    if (returnDate && returnDate <= departureDate) {
      setReturnDate(addDays(departureDate, 1));
    }
  }, [departureDate]);

  // Load routes from backend on mount
  useEffect(() => {
    getRoutes()
      .then((data) => {
        setRoutesData(data);
        const first = data?.departure_cities?.[0];
        if (first) {
          setFromCity(first.departure_city);
          const firstArrival = first.arrival_cities?.[0];
          if (firstArrival) setToCity(firstArrival.arrival_city);
        }
      })
      .catch((err) => {
        console.error('[HeroBooking] getRoutes failed:', err);
        setRoutesError(err?.message || 'Routen konnten nicht geladen werden');
      });
  }, []);

  // All departure cities
  const departureCities = useMemo(
    () => routesData?.departure_cities ?? [],
    [routesData],
  );

  // Arrival cities for selected departure city
  const arrivalCities = useMemo(() => {
    if (!routesData || !fromCity) return [];
    return routesData.departure_cities
      .find((d) => d.departure_city === fromCity)
      ?.arrival_cities ?? [];
  }, [routesData, fromCity]);

  // When fromCity changes, reset toCity to first available arrival
  useEffect(() => {
    if (arrivalCities.length) setToCity(arrivalCities[0].arrival_city);
  }, [arrivalCities]);

  // Find first non-null route code for the selected city pair
  function getRouteCode(from, to) {
    const dep = routesData?.departure_cities?.find((d) => d.departure_city === from);
    const arr = dep?.arrival_cities?.find((a) => a.arrival_city === to);
    if (!arr) return '';
    for (const r of arr.routes ?? []) {
      for (const code of Object.values(r.route_codes ?? {})) {
        if (code) return code;
      }
    }
    return '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    const routeCode = getRouteCode(fromCity, toCity);
    const pax = Number(f.paxAdultNumber.value) || 1;

    updateBooking({
      fromCity, toCity, routeCode,
      date:       departureDate,
      returnDate: tripType === 'Return' ? returnDate : '',
      tripType:   tripType === 'Return' ? 'return' : 'one-way',
      paxAdultNumber: pax,
    });

    const params = new URLSearchParams({
      from: fromCity, to: toCity, routeCode,
      date: departureDate,
      paxAdultNumber: pax,
      tripType: tripType === 'Return' ? 'return' : 'one-way',
    });
    if (tripType === 'Return' && returnDate) {
      params.set('returnDate', returnDate);
    }
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="hero" id="top">
      <div className="hero-sea" />
      <div className="container hero-grid">
        <article className="hero-copy">
          <span className="eyebrow"><ShipWheel size={18} /> ConnectFerry — Ferry Booking Platform</span>
          <h1>Book ferry tickets across Europe &amp; the Mediterranean</h1>
          <p>
            Compare ferry operators, routes, schedules and prices. Book in minutes — one way or return.
          </p>
          <div className="hero-badges">
            <span>Online booking</span>
            <span>Vehicle &amp; pet friendly</span>
            <span>Multilingual support</span>
          </div>
        </article>

        <aside className="booking-card" aria-label="Ferry booking search">
          <h2>Search Your Ferry</h2>
          <div className="trip-tabs">
            {['One Way', 'Return'].map((type) => (
              <button
                key={type}
                className={tripType === type ? 'active' : ''}
                onClick={() => setTripType(type)}
                type="button"
              >
                {type}
              </button>
            ))}
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            {routesError && (
              <div style={{
                gridColumn: '1 / -1',
                background: '#fee', color: '#900',
                padding: '8px 12px', borderRadius: 8, fontSize: 14,
              }}>
                {routesError}
              </div>
            )}
            <label>
              <span><MapPin size={16} /> From</span>
              <select name="from" value={fromCity} onChange={(e) => setFromCity(e.target.value)} required>
                {departureCities.length === 0
                  ? <option>Loading…</option>
                  : departureCities.map(({ departure_city, country }) => (
                    <option key={departure_city} value={departure_city}>
                      {cap(departure_city)}{country ? `, ${country}` : ''}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              <span><MapPin size={16} /> To</span>
              <select name="to" value={toCity} onChange={(e) => setToCity(e.target.value)} required>
                {arrivalCities.length === 0
                  ? <option>Loading…</option>
                  : arrivalCities.map(({ arrival_city, country, price_from }) => (
                    <option key={arrival_city} value={arrival_city}>
                      {cap(arrival_city)}{country ? `, ${country}` : ''}
                      {price_from?.amount ? ` — from ${price_from.amount} ${price_from.currency}` : ''}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              <span><CalendarDays size={16} /> Departure</span>
              <input
                name="date"
                type="date"
                required
                min={today}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </label>

            {tripType === 'Return' && (
              <label>
                <span><CalendarDays size={16} /> Return</span>
                <input
                  name="returnDate"
                  type="date"
                  required
                  min={addDays(departureDate, 1)}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </label>
            )}

            <label>
              <span><UsersRound size={16} /> Adults</span>
              <input name="paxAdultNumber" type="number" min="1" max="9" defaultValue="1" />
            </label>

            <button className="search-button" type="submit">
              <Search size={18} /> Search Ferries
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
