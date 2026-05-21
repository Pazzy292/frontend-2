import { Link } from 'react-router-dom';
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: 'Home', href: '/', chevron: false },
  { label: 'Search Ferries', href: '/search', chevron: false },
  { label: 'Compare Ferries', href: '/compare', chevron: false },
  { label: 'My Bookings', href: '/my-bookings', chevron: false },
  { label: 'Customer Support', href: '/support', chevron: false },
];

export default function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <div className="main-nav__inner">
        {/* Desktop + revealed mobile list */}
        <ul className={`main-nav__list${open ? " is-open" : ""}`}>
          {NAV_ITEMS.map(({ label, href, chevron }) => (
            <li key={label}>
              <Link className="main-nav__item" onClick={() => setOpen(false)} to={href}>
                {label}
                {chevron && <ChevronDown size={13} className="main-nav__chevron" />}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile only) */}
        <button
          className="main-nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
