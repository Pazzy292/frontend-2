import { createContext, useCallback, useContext, useState } from 'react';

const STORAGE_KEY = 'cf_booking';

export const defaultBooking = {
  // ── Step 1: Route search ──
  fromCity:   '',       // e.g. "marseille"
  toCity:     '',       // e.g. "ajaccio"
  routeCode:  '',       // e.g. "FRMRSFRAJA__FRAJAFRMS"  (per-operator route code)
  date:       '',       // departure date ISO string
  returnDate: '',
  tripType:   'one-way',

  // Passenger counts (real API field names)
  paxAdultNumber:       1,
  paxChildrenNumber:    0,
  paxInfantNumber:      0,
  paxMotorcycleNumber:  0,
  paxDogNumber:         0,
  paxCatNumber:         0,
  accommodationQuantity: 0,

  // ── Step 2: Voyage selection ──
  voyageId:     null,   // backend voyage id / trip_id
  operator:     '',
  price:        null,
  currency:     'EUR',
  departureTime: '',
  arrivalTime:   '',
  duration:      '',
  vessel:        '',

  // ── Step 3: Cabin / accommodation ──
  accommodationCode:  '',
  accommodationLabel: '',
  accommodationPrice: null,

  // ── Step 4: Passenger details ──
  travellers: [],

  // ── Step 5: Contact ──
  email: '',
  phone: '',
};

function readSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultBooking, ...JSON.parse(raw) } : { ...defaultBooking };
  } catch {
    return { ...defaultBooking };
  }
}

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(readSession);

  const updateBooking = useCallback((patch) => {
    setBooking((prev) => {
      const next = { ...prev, ...patch };
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const resetBooking = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setBooking({ ...defaultBooking });
  }, []);

  return (
    <BookingContext.Provider value={{ booking, updateBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
