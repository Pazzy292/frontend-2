import { useState } from 'react';
import { companyRouteTabs, ferryCompanies } from '../data/siteData.js';

function CompanyIcon({ company }) {
  if (company.badgeColor) {
    return (
      <span
        className="fc-badge"
        style={{ background: company.badgeColor }}
      >
        {company.name}
      </span>
    );
  }
  return (
    <span
      className="fc-icon-circle"
      style={{ background: company.iconColor ?? '#1a3d7c' }}
    >
      ⛴
    </span>
  );
}

function CompanyCard({ company }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="fc-card">
      <div className="fc-card-head">
        <div className="fc-company-label">
          <CompanyIcon company={company} />
          <div className="fc-company-text">
            {!company.badgeColor && (
              <strong className="fc-company-name">{company.name}</strong>
            )}
            {company.subtitle && (
              <span className="fc-company-sub">{company.subtitle}</span>
            )}
          </div>
        </div>
        <button
          className="fc-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          {open ? '▲' : '▼'}
        </button>
      </div>

      {open && (
        <div className="fc-routes">
          {company.routes.map((r, i) => (
            <div key={i} className="fc-route-row">
              <a href="#route" className="fc-port">{r.from}</a>
              <span className="fc-arrow">→</span>
              <a href="#route" className="fc-port">{r.to}</a>
              <span className={r.price === 'Check Prices' ? 'fc-price check' : 'fc-price'}>
                {r.price}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="fc-card-foot">
        <a href="#offers" className="fc-btn">
          <span>⚙</span> OFFERS &amp; DISCOUNTS
        </a>
        <a href="#itineraries" className="fc-btn">
          <span>⛴</span> VIEW ALL ITINERARIES
        </a>
      </div>
    </div>
  );
}

export default function Connections() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="fc-section" id="companies">
      <div className="container">
        <div className="fc-header">
          <h2>Ferry routes by Ferry Company</h2>
          <p>
            Click on the links below to find out everything you need to know about
            available routes, prices, schedules, offers &amp; discounts, pets on board,
            cabin categories, ticket collection, embarkation, terms &amp; conditions,
            cancellation/amendment policies, and more.
          </p>
        </div>

        <div className="fc-tabs">
          {companyRouteTabs.map((tab, i) => (
            <button
              key={tab}
              className={activeTab === i ? 'active' : ''}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="fc-grid">
          {ferryCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}

