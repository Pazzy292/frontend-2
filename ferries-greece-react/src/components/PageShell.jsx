import Header from './Header/Header.jsx';
import Footer from './Footer.jsx';

export default function PageShell({ children }) {
  return (
    <div className="site-shell">
      <Header />
      <main className="page-main">{children}</main>
      <Footer />
    </div>
  );
}
