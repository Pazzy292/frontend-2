import { Star } from 'lucide-react';
import { reviews } from '../data/siteData.js';

export default function Reviews() {
  return (
    <section className="section reviews-section">
      <div className="container">
        <div className="section-title centered">
          <span className="section-kicker">Customer Reviews and Ratings</span>
          <h2>See what travellers say about the ferry booking service</h2>
          <div className="rating-box">
            <span className="google-badge">G</span>
            <strong>4.8 / 5</strong>
            <span>Demo review module</span>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-head">
                <div className="avatar">{review.name.charAt(0)}</div>
                <div>
                  <h3>{review.name}</h3>
                  <span>{review.date} · {review.source}</span>
                </div>
              </div>
              <div className="stars" aria-label="five stars">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill="currentColor" />)}
              </div>
              <p>{review.text}</p>
              <button>Read More</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
