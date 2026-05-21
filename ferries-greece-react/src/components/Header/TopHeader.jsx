import { Link } from 'react-router-dom';

const flagData = [
  { code: "EN", flag: "🇬🇧" },
  { code: "DE", flag: "🇩🇪" },
  { code: "IT", flag: "🇮🇹" },
  { code: "NL", flag: "🇳🇱" },
  { code: "FR", flag: "🇫🇷" },
  { code: "GR", flag: "🇬🇷" },
  { code: "ES", flag: "🇪🇸" },
  { code: "TR", flag: "🇹🇷" },
];

function PaperBoatSVG() {
  return (
    <svg
      width="50"
      height="42"
      viewBox="0 0 50 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left sail */}
      <path d="M25 3 L4 29 H25 Z" fill="#00b4c8" />
      {/* Right sail */}
      <path d="M25 3 L46 29 H25 Z" fill="#009db5" />
      {/* Centre fold crease */}
      <line
        x1="25" y1="3" x2="25" y2="29"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
      {/* Hull */}
      <path d="M2 31 L48 31 L42 39 L8 39 Z" fill="#007f96" />
    </svg>
  );
}

export default function TopHeader() {
  return (
    <div className="top-header">
      <div className="top-header__inner">
        {/* ── Brand ── */}
        <Link to="/" className="top-header__brand" aria-label="ConnectFerry home">
          <PaperBoatSVG />
          <div className="top-header__brand-text">
            <span className="th-brand-name">connectferry.com</span>
            <span className="th-brand-sub">Ferry booking platform</span>
          </div>
        </Link>

        {/* ── Language / Support block ── */}
        <div className="top-header__lang">
          <p className="th-speak">We speak your Language!</p>
          <p className="th-phone">
            01623143142
          </p>
          <div className="th-flags">
            {flagData.map(({ code, flag }) => (
              <button key={code} className="th-flag-btn" aria-label={code}>
                <span className="th-flag-emoji">{flag}</span>
                <span className="th-flag-code">{code}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
