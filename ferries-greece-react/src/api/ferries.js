import { api } from './client.js';

/**
 * All available city-pair routes with route codes per operator.
 * GET /api/voyages/routes/
 */
export function getRoutes() {
  return api.get('/voyages/routes/');
}

/**
 * Search available voyages.
 * POST /api/voyages/search/
 * @param {string}  route           Route code, e.g. "FRAJAFRMRS__FRMRSFRAJA"
 * @param {string}  departureDate   ISO date string, e.g. "2026-06-15"
 */
export function searchVoyages({
  route,
  departureDate,
  paxAdultNumber      = 1,
  paxChildrenNumber   = 0,
  paxInfantNumber     = 0,
  paxDogNumber        = 0,
  paxCatNumber        = 0,
  paxMotorcycleNumber = 0,
  accommodationQuantity = 0,
}) {
  return api.post('/voyages/search/', {
    route,
    departureDate,
    paxAdultNumber,
    paxChildrenNumber,
    paxInfantNumber,
    paxAdultChairNumber:    0,
    paxChildrenChairNumber: 0,
    paxDogNumber,
    paxCatNumber,
    paxMotorcycleNumber,
    accommodationQuantity,
  });
}

/**
 * Get available departure dates for a route in a given month.
 *
 * The backend has no dedicated calendar endpoint, so this performs a
 * per-day scan of POST /api/voyages/search/ across the month and returns
 * the ISO dates (YYYY-MM-DD) that have at least one sailing.
 *
 * Results are cached in-memory per (routeCode, year, month).
 *
 * @param {string} routeCode  e.g. "FRAJAFRMRS__FRMRSFRAJA"
 * @param {number} year       4-digit year, e.g. 2026
 * @param {number} month      1-12
 * @param {object} [opts]
 * @param {number} [opts.paxAdultNumber=1]
 * @param {AbortSignal} [opts.signal]
 * @returns {Promise<string[]>} sorted list of available ISO dates
 */
const _availableDatesCache = new Map();
export async function getAvailableDates(routeCode, year, month, opts = {}) {
  const { paxAdultNumber = 1, signal } = opts;
  if (!routeCode) return [];

  const key = `${routeCode}|${year}-${month}|${paxAdultNumber}`;
  if (_availableDatesCache.has(key)) return _availableDatesCache.get(key);

  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dt = new Date(year, month - 1, d);
    if (dt < today) continue;
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    dates.push(iso);
  }

  const results = await Promise.all(
    dates.map(async (iso) => {
      try {
        if (signal?.aborted) return null;
        const res = await searchVoyages({
          route: routeCode,
          departureDate: iso,
          paxAdultNumber,
        });
        const voyages = res?.results ?? res?.voyages ?? res?.data ?? res;
        const hasVoyages = Array.isArray(voyages) ? voyages.length > 0 : !!voyages;
        return hasVoyages ? iso : null;
      } catch {
        return null;
      }
    }),
  );

  const available = results.filter(Boolean);
  _availableDatesCache.set(key, available);
  return available;
}

/** GET /api/voyages/{id}/cart/ */
export function getCart(voyageId) {
  return api.get(`/voyages/${voyageId}/cart/`);
}

/** POST /api/voyages/{id}/cart/update/ */
export function updateCart(voyageId, data) {
  return api.post(`/voyages/${voyageId}/cart/update/`, data);
}

/** POST /api/voyages/{id}/cart/checkout/ */
export function checkoutCart(voyageId) {
  return api.post(`/voyages/${voyageId}/cart/checkout/`, {});
}

/** POST /api/voyages/{id}/cart/clear/ */
export function clearCart(voyageId) {
  return api.post(`/voyages/${voyageId}/cart/clear/`, {});
}

/** GET /api/voyages/{id}/order/ */
export function getOrder(voyageId) {
  return api.get(`/voyages/${voyageId}/order/`);
}

/** GET /api/voyages/{id}/ticket/ */
export function getTicket(voyageId) {
  return api.get(`/voyages/${voyageId}/ticket/`);
}

/** GET /api/voyages/{id}/ticket/pdf/ */
export function getTicketPdf(voyageId) {
  return api.get(`/voyages/${voyageId}/ticket/pdf/`);
}

/** GET /api/voyages/{id}/addons/ */
export function getAddons(voyageId) {
  return api.get(`/voyages/${voyageId}/addons/`);
}

/** GET /api/voyages/vehicle_categories/ */
export function getVehicleCategories() {
  return api.get('/voyages/vehicle_categories/');
}

