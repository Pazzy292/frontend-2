import { api } from './client.js';

/**
 * All available city-pair routes with route codes per operator.
 * GET /api/voyages/routes/
 */
export function getRoutes() {
  return api.get('/voyages/routes/');
}

/** GET /api/voyages/ports/ */
export function getPorts() {
  return api.get('/voyages/ports/');
}

/** GET /api/voyages/destinations/ */
export function getDestinations() {
  return api.get('/voyages/destinations/');
}

/**
 * Primary voyage search (OLTA aggregator).
 * Accepts both GET and POST on the backend; we use POST with JSON.
 * POST /api/voyages/search-olta/
 *
 * The backend auto-detects the provider from the routeCode format
 * (3-char ports, 5-char ports, dash, 6-letter, ≥8-letter, short alnum).
 * fromPortCode/toPortCode are used as fallback when routeCode is missing.
 *
 * Response shape:
 *   { status, voyages: { aller[], return[], aller_grouped[], return_grouped[] },
 *     pagination, provider_results: { GNV, grimaldi, meridionale, BALEARIA }, meta }
 */
export function searchVoyages({
  routeCode,
  fromPortCode,
  toPortCode,
  departureDate,
  returnDate            = '',
  paxAdultNumber        = 1,
  paxChildrenNumber     = 0,
  paxInfantNumber       = 0,
  paxAdultChairNumber   = 0,
  paxChildrenChairNumber = 0,
  paxDogNumber          = 0,
  paxCatNumber          = 0,
  paxMotorcycleNumber   = 0,
  accommodationQuantity = 0,
}) {
  const body = {
    routeCode,
    fromPortCode,
    toPortCode,
    departureDate,
    paxAdultNumber,
    paxChildrenNumber,
    paxInfantNumber,
    paxAdultChairNumber,
    paxChildrenChairNumber,
    paxDogNumber,
    paxCatNumber,
    paxMotorcycleNumber,
    accommodationQuantity,
  };
  if (returnDate) body.returnDate = returnDate;
  return api.post('/voyages/search-olta/', body);
}

/**
 * Availability calendar for a route.
 * GET /api/voyages/calendar/?route_code=...&year=YYYY&month=M
 *
 * Response: { success, from_date, to_date, results: [{ route_code, provider, dates: string[] }], merged_results: string[] }
 *
 * @param {string} routeCode  Full route code (e.g. "FRAJAFRMRS__FRMRSFRAJA") or short code
 * @param {number} [year]
 * @param {number} [month]    1-12
 */
const _availableDatesCache = new Map();
export async function getAvailableDates(routeCode, year, month, opts = {}) {
  if (!routeCode) return [];
  const key = `${routeCode}|${year ?? ''}-${month ?? ''}`;
  if (_availableDatesCache.has(key)) return _availableDatesCache.get(key);

  const params = new URLSearchParams({ route_code: routeCode });
  if (year)  params.set('year',  String(year));
  if (month) params.set('month', String(month));

  const res = await api.get(`/voyages/calendar/?${params.toString()}`);
  const merged = Array.isArray(res?.merged_results) ? res.merged_results : [];
  const fromResults = Array.isArray(res?.results)
    ? res.results.flatMap((r) => r?.dates ?? [])
    : [];
  const dates = Array.from(new Set([...merged, ...fromResults])).sort();
  _availableDatesCache.set(key, dates);
  return dates;
}

/* --------------------------- Booking & Cart --------------------------- */

/** POST /api/voyages/booking/create/ */
export function createBooking(data) {
  return api.post('/voyages/booking/create/', data);
}

/** POST /api/voyages/booking/recall/ */
export function recallBooking(data) {
  return api.post('/voyages/booking/recall/', data);
}

/** POST /api/voyages/cart/create/ */
export function createCart(data) {
  return api.post('/voyages/cart/create/', data);
}

/** GET /api/voyages/{uid}/cart/ */
export function getCart(voyageId) {
  return api.get(`/voyages/${voyageId}/cart/`);
}

/** PUT /api/voyages/{uid}/cart/update/ */
export function updateCart(voyageId, data) {
  return api.put(`/voyages/${voyageId}/cart/update/`, data);
}

/** POST /api/voyages/{uid}/cart/checkout/ */
export function checkoutCart(voyageId) {
  return api.post(`/voyages/${voyageId}/cart/checkout/`, {});
}

/** DELETE /api/voyages/{uid}/cart/clear/ */
export function clearCart(voyageId) {
  return api.delete(`/voyages/${voyageId}/cart/clear/`);
}

/** GET /api/voyages/{uid}/order/ */
export function getOrder(voyageId) {
  return api.get(`/voyages/${voyageId}/order/`);
}

/** GET /api/voyages/{uid}/order/ticket/ */
export function getTicket(voyageId) {
  return api.get(`/voyages/${voyageId}/order/ticket/`);
}

/** GET /api/voyages/{uid}/order/ticket/pdf/ */
export function getTicketPdf(voyageId) {
  return api.get(`/voyages/${voyageId}/order/ticket/pdf/`);
}

/** GET /api/voyages/{id}/addons/ */
export function getAddons(voyageId) {
  return api.get(`/voyages/${voyageId}/addons/`);
}

/** GET /api/voyages/vehicle_categories/ */
export function getVehicleCategories() {
  return api.get('/voyages/vehicle_categories/');
}

