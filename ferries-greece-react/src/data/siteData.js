export const languages = ['EN English', 'DE Deutsch', 'IT Italiano', 'NL Nederlands', 'FR Français', 'GR Ελληνικά', 'ES Español', 'TR Türk'];

export const navItems = [
  { label: 'International Routes', href: '#routes' },
  { label: 'Ports by Country', href: '#ports' },
  { label: 'Greece Travel Guide', href: '#destinations' },
  { label: 'Ferry Companies', href: '#companies' },
  { label: 'Customer Support', href: '#support' },
  { label: 'My Reservation', href: '#reservation' },
];

export const internationalRoutes = [
  { from: 'Italy', to: 'Greece', tag: 'popular', icon: '🇮🇹 ⇄ 🇬🇷' },
  { from: 'Turkey', to: 'Greece', tag: 'island gateway', icon: '🇹🇷 ⇄ 🇬🇷' },
  { from: 'Albania', to: 'Greece', tag: 'short crossing', icon: '🇦🇱 ⇄ 🇬🇷' },
  { from: 'Italy', to: 'Albania', tag: 'Adriatic', icon: '🇮🇹 ⇄ 🇦🇱' },
  { from: 'Italy', to: 'Spain', tag: 'western med', icon: '🇮🇹 ⇄ 🇪🇸' },
  { from: 'Italy', to: 'Morocco', tag: 'long route', icon: '🇮🇹 ⇄ 🇲🇦' },
];

export const countries = ['Greece', 'Italy', 'Turkey', 'Albania', 'Croatia', 'France', 'Montenegro', 'Morocco', 'Slovenia', 'Spain', 'Tunisia'];

export const islandGroups = [
  { name: 'Crete', subtitle: 'Heraklion, Chania, Sitia', tone: 'crete' },
  { name: 'Cyclades Islands', subtitle: 'Santorini, Mykonos, Paros', tone: 'cyclades' },
  { name: 'Dodecanese Islands', subtitle: 'Rhodes, Kos, Patmos', tone: 'dodecanese' },
  { name: 'Ionian Islands', subtitle: 'Corfu, Zakynthos, Kefalonia', tone: 'ionian' },
  { name: 'Saronic Islands', subtitle: 'Aegina, Hydra, Poros', tone: 'saronic' },
  { name: 'North Aegean Islands', subtitle: 'Lesbos, Chios, Samos', tone: 'aegean' },
  { name: 'Sporades Islands', subtitle: 'Skiathos, Skopelos, Alonissos', tone: 'sporades' },
  { name: 'Evia', subtitle: 'Mainland connections', tone: 'evia' },
];

export const stats = [
  { value: '50+', label: 'Years of ferry travel experience', icon: '⚓' },
  { value: '30+', label: 'Multilingual support specialists', icon: '💬' },
  { value: '365', label: 'Days focused on Connect ferry routes', icon: '🧭' },
];

export const reviews = [
  { name: 'Anna K.', date: 'January 2026', text: 'Fast booking, clear route options and very helpful support before the trip.', source: 'Google' },
  { name: 'Marco D.', date: 'January 2026', text: 'The booking flow was simple and the ferry information was easy to compare.', source: 'Google' },
  { name: 'Claire M.', date: 'December 2025', text: 'Excellent assistance with our island hopping plan. We received a quick answer.', source: 'Facebook' },
  { name: 'Nikos P.', date: 'December 2025', text: 'A practical platform for checking Connect ferry schedules and tickets.', source: 'Google' },
];

export const destinations = [
  { name: 'Santorini', price: 'from 6€', gradient: 'sunset' },
  { name: 'Heraklion', price: 'from 15€', gradient: 'harbor' },
  { name: 'Zakynthos', price: 'from 13€', gradient: 'blue' },
  { name: 'Mykonos', price: 'from 11€', gradient: 'white' },
  { name: 'Corfu', price: 'from 6€', gradient: 'green' },
  { name: 'Skiathos', price: 'from 17€', gradient: 'teal' },
];

export const portConnections = [
  'France - Corsica Ports',
  'Italy - Spain Ports',
  'Spain - Balearics Ports',
  'Maroc Ports',
];

export const routeTabs = ['Crete', 'Cyclades Islands', 'Dodecanese Islands', 'North Aegean', 'Ionian Islands', 'Saronic Islands', 'Sporades'];

export const companies = ['Blue Star Ferries', 'Minoan Lines', 'ANEK Lines', 'Superfast Ferries', 'Seajets', 'Golden Star Ferries', 'Levante Ferries', 'Dodekanisos Seaways'];

export const companyRouteTabs = [
  'France - Corsica Routes',
  'Italy - Spain Routes',
  'Spain - Balearics Routes',
  'Maroc Routes',
];

export const ferryCompanies = [
  {
    id: 'gnv',
    name: 'GNV',
    iconColor: '#003087',
    routes: [
      { from: 'Genoa',      to: 'Barcelona',  price: 'from 59€' },
      { from: 'Genoa',      to: 'Palermo',     price: 'from 39€' },
      { from: 'Genoa',      to: 'Tunis',       price: 'from 79€' },
      { from: 'Barcelona',  to: 'Genoa',       price: 'from 59€' },
      { from: 'Palermo',    to: 'Genoa',       price: 'from 39€' },
      { from: 'Tunis',      to: 'Genoa',       price: 'from 79€' },
    ],
  },
  {
    id: 'grimaldi',
    name: 'GRIMALDI LINES',
    iconColor: '#1a3d7c',
    routes: [
      { from: 'Civitavecchia', to: 'Barcelona',  price: 'from 89€' },
      { from: 'Livorno',       to: 'Barcelona',  price: 'from 79€' },
      { from: 'Salerno',       to: 'Tangier',    price: 'from 99€' },
      { from: 'Barcelona',     to: 'Civitavecchia', price: 'from 89€' },
      { from: 'Barcelona',     to: 'Livorno',    price: 'from 79€' },
      { from: 'Tangier',       to: 'Salerno',    price: 'from 99€' },
    ],
  },
  {
    id: 'lameridionale',
    name: 'LA MÉRIDIONALE',
    iconColor: '#004B87',
    routes: [
      { from: 'Marseille', to: 'Ajaccio',      price: 'from 29€' },
      { from: 'Marseille', to: 'Bastia',        price: 'from 29€' },
      { from: 'Marseille', to: 'Porto Vecchio', price: 'from 35€' },
      { from: 'Ajaccio',   to: 'Marseille',    price: 'from 29€' },
      { from: 'Bastia',    to: 'Marseille',    price: 'from 29€' },
    ],
  },
  {
    id: 'corsica',
    name: 'CORSICA FERRIES',
    badgeColor: '#F5A623',
    routes: [
      { from: 'Nice',    to: 'Bastia',   price: 'from 19€' },
      { from: 'Nice',    to: 'Ajaccio',  price: 'from 24€' },
      { from: 'Toulon',  to: 'Ajaccio',  price: 'from 22€' },
      { from: 'Genoa',   to: 'Bastia',   price: 'from 25€' },
      { from: 'Bastia',  to: 'Nice',     price: 'from 19€' },
      { from: 'Ajaccio', to: 'Toulon',   price: 'from 22€' },
    ],
  },
  {
    id: 'balearia',
    name: 'BALEÀRÍA',
    badgeColor: '#E31837',
    routes: [
      { from: 'Denia',      to: 'Ibiza',   price: 'from 35€' },
      { from: 'Denia',      to: 'Palma',   price: 'from 45€' },
      { from: 'Barcelona',  to: 'Palma',   price: 'from 39€' },
      { from: 'Valencia',   to: 'Ibiza',   price: 'from 37€' },
      { from: 'Ibiza',      to: 'Denia',   price: 'from 35€' },
      { from: 'Palma',      to: 'Barcelona', price: 'from 39€' },
    ],
  },
];

export const features = [
  { title: 'Online Ferry Booking Engine', text: 'Enter your routes and travel dates, compare schedules and continue to a simple booking flow.', icon: '🛳️' },
  { title: 'Best Ticket Price', text: 'A clean price-comparison area designed for offers, membership points and passenger discounts.', icon: '🏷️' },
  { title: 'Personal Ferry Agent', text: 'A support-first section for assistance before, during and after the trip.', icon: '👩‍💼' },
  { title: 'Secure Payments', text: 'Payment-trust cards, security badges and checkout confidence elements are prepared in the UI.', icon: '🔐' },
  { title: 'Chat Service', text: 'Visible support access for route questions, reservation changes and traveller assistance.', icon: '💬' },
];

export const infoCards = [
  { title: 'Ticket Collection', text: 'E-ticket, port collection and courier-style ticket information layout.', status: 'Learn more' },
  { title: 'Pets On Board', text: 'Simple card for pet cabins, deck rules and company-specific policies.', status: 'Learn more' },
  { title: 'Offers & Discounts', text: 'Discount and membership offer module for future dynamic provider rules.', status: 'Coming soon' },
  { title: 'Automobile Club Discounts', text: 'Placeholder area for automobile club codes and traveller benefits.', status: 'Learn more' },
  { title: 'Ferry Group Discounts', text: 'Group-fare card for agencies, families and 16+ passenger reservations.', status: 'Coming soon' },
  { title: 'Camping On Board', text: 'Camper, caravan and onboard camping content card.', status: 'Learn more' },
];
