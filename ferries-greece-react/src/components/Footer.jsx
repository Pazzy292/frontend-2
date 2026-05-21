import { Anchor } from 'lucide-react';

const footerGroups = [
  { title: 'Ferry Services', links: ['Ferry Tickets Online', 'Ferry Customer Support', 'My Reservation', 'Bonus Per Mile'] },
  { title: 'Additional Services', links: ['Affiliate Program', 'Connect Travel Guide', 'Site map'] },
  { title: 'Our Company', links: ['About us', 'Contact', 'Terms of Use', 'Cookies & Privacy Policy'] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand footer-logo" href="#top">
            <span className="brand-mark"><Anchor size={28} /></span>
            <span><strong>Ferries</strong><em>Connect</em></span>
          </a>
          <p>Connect ferry booking homepage.</p>
          <div className="trust-badges">
            <span>SSL</span>
            <span>VISA</span>
            <span>Mastercard</span>
            <span>3-D Secure</span>
          </div>
        </div>
        {footerGroups.map((group) => (
          <nav className="footer-links" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map((link) => <a href="#footer" key={link}>{link}</a>)}
          </nav>
        ))}
      </div>
      <div className="container copyright">
        <span>2026 © Connect Ferry</span>
        <a href="#top">Back To Top</a>
      </div>
    </footer>
  );
}
