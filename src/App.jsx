import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import Features from './components/Features';
import BusFleet from './components/BusFleet';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-satoshi">
      <Navbar />
      <main>
        <Hero />
        <SearchForm />
        <Features />
        <BusFleet />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
