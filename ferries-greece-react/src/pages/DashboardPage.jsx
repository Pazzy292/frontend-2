import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';
import { getUser, logout, isAuthenticated } from '../api/auth.js';

export default function DashboardPage() {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    getUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        logout();
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageShell>
      <section className="page-section">
        <div className="container page-stack">
          <div className="page-heading">
            <span className="section-kicker">My Bookings</span>
            <h1>Manage active and past ferry reservations</h1>
            <p>Check ticket downloads, route changes, vehicle details and support requests in one place.</p>
          </div>
          {!loading && user && (
            <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>
              Logged in as <strong>{user.username ?? user.email ?? 'User'}</strong>
              <button
                type="button"
                onClick={handleLogout}
                style={{ marginLeft: '16px', background: 'none', border: 'none', color: 'var(--blue-600)', cursor: 'pointer', fontSize: '14px' }}
              >
                Sign out
              </button>
            </p>
          )}
          <div className="comparison-grid">
            <article className="page-card comparison-card">
              <h2>Upcoming trips</h2>
              <p>No upcoming trips found. Search for ferries to make a new booking.</p>
            </article>
            <article className="page-card comparison-card">
              <h2>Need help?</h2>
              <p>Contact support, resend ticket PDFs or update traveller information before departure.</p>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
