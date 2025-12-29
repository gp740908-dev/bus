import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-300 ${isScrolled
                        ? 'bg-white shadow-lg py-3'
                        : 'bg-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-100 px-6 py-3 rounded-full"
                    >
                        <span className="text-lg font-bold tracking-wide text-gray-900 uppercase">
                            PO. Cipeng
                        </span>
                    </motion.div>

                    {/* Hamburger Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMobileMenu}
                        className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6 text-gray-900" />
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Floating Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed top-4 left-4 right-4 z-50 md:hidden transition-all duration-300`}
            >
                <div className="glassmorphism rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="bg-white/90 px-4 py-2 rounded-full">
                        <span className="text-sm font-bold tracking-wide text-gray-900 uppercase">
                            PO. Cipeng
                        </span>
                    </div>

                    {/* Hamburger Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMobileMenu}
                        className="bg-white/90 p-2.5 rounded-lg"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5 text-gray-900" />
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
