import { Route, Routes } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext.jsx';
import HomePage from './pages/HomePage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import FerryComparisonPage from './pages/FerryComparisonPage.jsx';
import FerryDetailsPage from './pages/FerryDetailsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/compare" element={<FerryComparisonPage />} />
        <Route path="/ferry/:routeId" element={<FerryDetailsPage />} />
        <Route path="/booking/step-:stepId" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-bookings" element={<DashboardPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/contact" element={<SupportPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BookingProvider>
  );
}
