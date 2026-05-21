import { Phone, Globe2 } from 'lucide-react';
import { languages } from '../data/siteData.js';

export default function TopBar() {
  return (
    <section className="topbar">
      <div className="container topbar-inner">
        <div className="speak">
          <Globe2 size={16} />
          <span>We speak your language!</span>
        </div>
        <div className="phone">
          <Phone size={16} />
          <strong>+30 2810 529000</strong>
          <span className="muted">60 lines</span>
        </div>
        <div className="language-strip" aria-label="Languages">
          {languages.map((lang) => (
            <button key={lang}>{lang.split(' ')[0]}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
