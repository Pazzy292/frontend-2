import { Anchor, Menu, UserRound } from 'lucide-react';
import { navItems } from '../data/siteData.js';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="Ferries Greece home">
          <span className="brand-mark"><Anchor size={28} /></span>
          <span>
            <strong>Ferries</strong>
            <em>Connect</em>
          </span>
        </a>
        <nav className="desktop-nav">
          {navItems.slice(0, 5).map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="reservation" href="#reservation"><UserRound size={17} /> My Reservation</a>
          <button className="menu-button" aria-label="Open menu"><Menu /></button>
        </div>
      </div>
    </header>
  );
}
