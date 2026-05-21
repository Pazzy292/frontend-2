export default function ClubBanner() {
  return (
    <section className="club-band" id="reservation">
      <div className="container club-grid">
        <article className="club-card">
          <span className="section-kicker light">Bonus per Mile</span>
          <h2>Join the Connect ferry traveller club for free</h2>
          <p>Collect points, receive discounts and prepare loyalty benefits for frequent ferry customers.</p>
          <a className="primary-link" href="#start">Start here</a>
        </article>
        <article className="reservation-card">
          <span>My Reservation</span>
          <h3>Manage your booking</h3>
          <p>Check booking status, traveller details, ticket collection and support messages.</p>
          <button>Open reservation</button>
        </article>
      </div>
    </section>
  );
}
