import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    ChevronUp,
    CreditCard,
    Smartphone
} from 'lucide-react';

const Footer = () => {
    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateDimensions = () => {
            if (footerRef.current) {
                setFooterHeight(footerRef.current.offsetHeight);
            }
            setIsMobile(window.innerWidth < 768);
        };

        // Initial calculation
        updateDimensions();

        // Recalculate on resize
        window.addEventListener('resize', updateDimensions);

        // Also recalculate after a short delay to ensure content is rendered
        const timer = setTimeout(updateDimensions, 100);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            clearTimeout(timer);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const quickLinks = [
        { name: 'Pesan Tiket', href: '/pesan-tiket' },
        { name: 'Cek Tiket', href: '/cek-tiket' },
        { name: 'Armada', href: '/armada' },
        { name: 'Layanan', href: '/layanan' },
    ];

    const infoLinks = [
        { name: 'Tentang Kami', href: '/tentang-kami' },
        { name: 'Hubungi Kami', href: '/hubungi-kami' },
        { name: 'Syarat & Ketentuan', href: '#' },
        { name: 'Kebijakan Privasi', href: '#' },
    ];

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Youtube, href: '#', label: 'YouTube' },
    ];

    // On mobile, use static footer (no fixed positioning) for better responsiveness
    if (isMobile) {
        return (
            <footer id="footer" className="bg-gray-900 text-white">
                {/* Decorative Top Edge */}
                <div className="h-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600" />

                <div className="px-4 py-10">
                    {/* Brand */}
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-r from-primary-600 to-secondary-500 inline-block px-5 py-2 rounded-full mb-4">
                            <span className="text-lg font-bold tracking-wide">PO. CIPENG</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                            Mitra perjalanan terpercaya. Aman, nyaman, dan tepat waktu sejak 2005.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <h4 className="font-bold text-sm mb-3">Menu Cepat</h4>
                            <ul className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.href} className="text-gray-400 text-sm hover:text-white">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-3">Informasi</h4>
                            <ul className="space-y-2">
                                {infoLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.href} className="text-gray-400 text-sm hover:text-white">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mb-8 text-center">
                        <div className="flex flex-col items-center gap-3 text-sm text-gray-400">
                            <a href="tel:+6281234567890" className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary-500" />
                                0812-3456-7890
                            </a>
                            <a href="mailto:info@pocipeng.com" className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary-500" />
                                info@pocipeng.com
                            </a>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3 mb-8">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>

                    {/* Payment Methods */}
                    <div className="text-center mb-6">
                        <h5 className="text-xs font-medium text-gray-500 mb-3">Metode Pembayaran</h5>
                        <div className="flex flex-wrap justify-center gap-2">
                            {['BCA', 'MANDIRI', 'BRI'].map((bank) => (
                                <div key={bank} className="bg-white/10 px-2 py-1 rounded text-xs">
                                    {bank}
                                </div>
                            ))}
                            {['GOPAY', 'OVO', 'DANA'].map((ewallet) => (
                                <div key={ewallet} className="bg-white/10 px-2 py-1 rounded text-xs">
                                    {ewallet}
                                </div>
                            ))}
                            <div className="bg-white/10 px-2 py-1 rounded text-xs">QRIS</div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="pt-6 border-t border-gray-800 text-center">
                        <p className="text-gray-500 text-xs mb-4">
                            © {new Date().getFullYear()} PO. Cipeng
                        </p>
                        <button
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-2 bg-primary-600 px-4 py-2 rounded-full text-sm font-medium"
                        >
                            <ChevronUp className="w-4 h-4" />
                            Kembali ke Atas
                        </button>
                    </div>
                </div>
            </footer>
        );
    }

    // Desktop: Fixed footer with parallax reveal effect
    return (
        <>
            {/* Spacer div to create room for fixed footer */}
            <div style={{ height: footerHeight > 0 ? `${footerHeight}px` : '400px' }} className="bg-gray-900" />

            {/* Fixed Footer */}
            <footer
                ref={footerRef}
                id="footer"
                className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white"
                style={{ zIndex: 0 }}
            >
                {/* Decorative Top Edge */}
                <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600" />

                {/* Main Footer */}
                <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        {/* Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="col-span-2 lg:col-span-1"
                        >
                            <div className="bg-gradient-to-r from-primary-600 to-secondary-500 inline-block px-5 py-2.5 rounded-full mb-4">
                                <span className="text-lg font-bold tracking-wide">PO. CIPENG</span>
                            </div>
                            <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                                Mitra perjalanan terpercaya Anda. Aman, nyaman, dan tepat waktu sejak 2005.
                            </p>
                            {/* Social Links */}
                            <div className="flex items-center gap-2">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h4 className="font-bold mb-4">Menu Cepat</h4>
                            <ul className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-0.5 bg-primary-500 group-hover:w-2 transition-all" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Info Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="font-bold mb-4">Informasi</h4>
                            <ul className="space-y-2">
                                {infoLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-0.5 bg-primary-500 group-hover:w-2 transition-all" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h4 className="font-bold mb-4">Hubungi Kami</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-400 text-sm">
                                        Jl. Raya Cipeng No. 123, Jakarta Timur
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                    <a href="tel:+6281234567890" className="text-gray-400 hover:text-white transition-colors text-sm">
                                        0812-3456-7890
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                    <a href="mailto:info@pocipeng.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                                        info@pocipeng.com
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Payment Methods & Copyright */}
                    <div className="mt-10 pt-6 border-t border-gray-800">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                                {['BCA', 'MANDIRI', 'BRI', 'BNI'].map((bank) => (
                                    <div key={bank} className="bg-white/10 px-2.5 py-1 rounded text-xs flex items-center gap-1">
                                        <CreditCard className="w-3 h-3 text-gray-400" />
                                        {bank}
                                    </div>
                                ))}
                                {['GOPAY', 'OVO', 'DANA'].map((ewallet) => (
                                    <div key={ewallet} className="bg-white/10 px-2.5 py-1 rounded text-xs flex items-center gap-1">
                                        <Smartphone className="w-3 h-3 text-gray-400" />
                                        {ewallet}
                                    </div>
                                ))}
                                <div className="bg-white/10 px-2.5 py-1 rounded text-xs">QRIS</div>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="text-gray-500 text-sm">
                                    © {new Date().getFullYear()} PO. Cipeng
                                </p>
                                <motion.button
                                    onClick={scrollToTop}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                                >
                                    <ChevronUp className="w-4 h-4" />
                                    Ke Atas
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
