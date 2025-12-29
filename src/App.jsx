import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BookingProvider } from './context/BookingContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import TicketSearch from './pages/TicketSearch';
import BusListResults from './pages/BusListResults';
import SeatSelection from './pages/SeatSelection';
import PassengerDetails from './pages/PassengerDetails';
import PaymentPage from './pages/PaymentPage';
import BookingConfirmation from './pages/BookingConfirmation';
import CheckTicket from './pages/CheckTicket';
import Dashboard from './pages/Dashboard';
import Fleet from './pages/Fleet';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ToastProvider>
          <BookingProvider>
            <div className="min-h-screen bg-white font-satoshi">
              <Routes>
                {/* Auth pages without navbar/footer */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Main pages with navbar/footer */}
                <Route
                  path="/*"
                  element={
                    <>
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pesan-tiket" element={<TicketSearch />} />
                        <Route path="/pesan-tiket/hasil" element={<BusListResults />} />
                        <Route path="/pesan-tiket/pilih-kursi" element={<SeatSelection />} />
                        <Route path="/pesan-tiket/detail-penumpang" element={<PassengerDetails />} />
                        <Route path="/pesan-tiket/pembayaran" element={<PaymentPage />} />
                        <Route path="/pesan-tiket/konfirmasi" element={<BookingConfirmation />} />
                        <Route path="/cek-tiket" element={<CheckTicket />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/armada" element={<Fleet />} />
                        <Route path="/layanan" element={<Services />} />
                        <Route path="/tentang-kami" element={<AboutUs />} />
                        <Route path="/hubungi-kami" element={<ContactUs />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      <Footer />
                    </>
                  }
                />
              </Routes>
            </div>
          </BookingProvider>
        </ToastProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
