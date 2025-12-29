import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
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

function App() {
  return (
    <Router>
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
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </BookingProvider>
    </Router>
  );
}

export default App;
