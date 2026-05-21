import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';
import { login } from '../api/auth.js';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/my-bookings');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <section className="page-section">
        <div className="container narrow-page-stack">
          <div className="page-heading">
            <span className="section-kicker">Login / Signup</span>
            <h1>Sign in or continue as guest</h1>
            <p>ConnectFerry keeps guest checkout available, but account access makes booking management faster.</p>
          </div>
          <div className="comparison-grid">
            <article className="page-card comparison-card">
              <h2>Account login</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label>
                  <span>Email address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  <span>Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </label>
                {error && (
                  <p style={{ color: '#c0392b', margin: 0, fontSize: '14px' }}>{error}</p>
                )}
                <button className="search-button" type="submit" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>
              </form>
            </article>
            <article className="page-card comparison-card">
              <h2>Guest checkout</h2>
              <p>Continue directly to contact details and payment without creating an account.</p>
              <button
                className="secondary-link"
                type="button"
                onClick={() => navigate('/booking/step-1')}
                style={{ marginTop: '12px' }}
              >
                Continue as guest →
              </button>
            </article>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
