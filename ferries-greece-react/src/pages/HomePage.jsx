import Header from '../components/Header/Header.jsx';
import HeroBooking from '../components/HeroBooking.jsx';
import ClubBanner from '../components/ClubBanner.jsx';
import Reviews from '../components/Reviews.jsx';
import Destinations from '../components/Destinations.jsx';
import Connections from '../components/Connections.jsx';
import FerryConnectionsByPort from '../components/FerryConnectionsByPort.jsx';
import FeatureGrid from '../components/FeatureGrid.jsx';
import InfoCards from '../components/InfoCards.jsx';
import Footer from '../components/Footer.jsx';

export default function HomePage() {
  return (
    <main className="site-shell">
      <Header />
      <HeroBooking />
      <Destinations />
      <ClubBanner />
      <Reviews />
      <Connections />
      <FerryConnectionsByPort />
      <InfoCards />
      <Footer />
    </main>
  );
}
