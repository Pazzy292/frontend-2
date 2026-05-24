import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FerryResultCard from '../components/FerryResultCard.jsx';
import PageShell from '../components/PageShell.jsx';
import BookingStepper from '../components/BookingStepper.jsx';
import { searchVoyages } from '../api/ferries.js';
import { useBooking } from '../context/BookingContext.jsx';

const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [voyages, setVoyages]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const { updateBooking } = useBooking();

  const from      = searchParams.get('from');
  const to        = searchParams.get('to');
  const fromPort  = searchParams.get('fromPort') ?? '';
  const toPort    = searchParams.get('toPort')   ?? '';
  const routeCode = searchParams.get('routeCode');
  const date      = searchParams.get('date');
  const pax       = Number(searchParams.get('paxAdultNumber')    ?? 1);
  const paxChildren = Number(searchParams.get('paxChildrenNumber') ?? 0);
  const paxInfants  = Number(searchParams.get('paxInfantNumber')   ?? 0);
  const tripType  = searchParams.get('tripType') ?? 'one-way';
  const returnDate = searchParams.get('returnDate') ?? '';

  // Persist search params into booking context
  useEffect(() => {
    if (routeCode) {
      updateBooking({
        fromCity: from, toCity: to, routeCode, fromPort, toPort, date, returnDate,
        paxAdultNumber: pax, paxChildrenNumber: paxChildren, paxInfantNumber: paxInfants,
        tripType,
      });
    }
  }, [routeCode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!routeCode || !date) { setLoading(false); return; }

    let cancelled = false;
    setLoading(true);
    setError(null);

    searchVoyages({
      routeCode,
      fromPortCode:  fromPort,
      toPortCode:    toPort,
      departureDate: date,
      returnDate:    tripType === 'return' ? returnDate : '',
      paxAdultNumber:    pax,
      paxChildrenNumber: paxChildren,
      paxInfantNumber:   paxInfants,
    })
      .then((data) => {
        if (cancelled) return;
        // OLTA response: { voyages: { aller, return, aller_grouped, return_grouped }, ... }
        // Legacy fallback: array or { results / voyages }
        let list = [];
        if (Array.isArray(data)) list = data;
        else if (Array.isArray(data?.voyages?.aller)) list = data.voyages.aller;
        else if (Array.isArray(data?.voyages))        list = data.voyages;
        else if (Array.isArray(data?.results))        list = data.results;
        setVoyages(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load results.');
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [routeCode, date, pax, paxChildren, paxInfants]); // eslint-disable-line react-hooks/exhaustive-deps

  const heading = from && to ? `${cap(from)} → ${cap(to)}` : 'Available ferries';

  return (
    <PageShell>
      <BookingStepper currentStep={2} />
      <section className="page-section">
        <div className="container page-stack">
          <div className="page-heading">
            <span className="section-kicker">Step 2 — Choose Ferry</span>
            <h1>{heading}</h1>
            <p>
              {date ? `Departing ${date}` : 'Select a date to search'} · {pax} adult{pax !== 1 ? 's' : ''}
              {tripType === 'return' && returnDate ? ` · Return ${returnDate}` : ''}
            </p>
          </div>

          {loading && (
            <p style={{ padding: '20px', color: 'var(--muted)' }}>Loading available ferries…</p>
          )}

          {!loading && error && (
            <div className="page-card" style={{ padding: '24px', color: '#c0392b' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && voyages.length === 0 && (
            <div className="page-card" style={{ padding: '24px' }}>
              No ferries found for this route and date. Please try a different date.
            </div>
          )}

          {!loading && !error && voyages.length > 0 && (
            <div className="results-list">
              {voyages.map((voyage, i) => (
                <FerryResultCard
                  key={voyage.id ?? voyage.trip_id ?? i}
                  voyage={voyage}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
