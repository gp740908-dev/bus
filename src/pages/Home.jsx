import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import Features from '../components/Features';
import BusFleet from '../components/BusFleet';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <main>
            <Hero />
            <SearchForm />
            <Features />
            <BusFleet />
            <Testimonials />
        </main>
    );
};

export default Home;
