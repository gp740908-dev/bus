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

const FOOTER_HEIGHT = 500; // Approximate footer height in pixels

const Footer = () => {
    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(FOOTER_HEIGHT);

    useEffect(() => {
        // Update footer height after mount
        if (footerRef.current) {
            setFooterHeight(footerRef.current.offsetHeight);
        }

        const handleResize = () => {
            if (footerRef.current) {
                setFooterHeight(footerRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    return (
        <>
            {/* Spacer div to create room for fixed footer */}
            <div style={{ height: `${footerHeight}px` }} className="bg-gray-900" />

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
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gradient-to-r from-primary-600 to-secondary-500 inline-block px-5 py-2.5 rounded-full mb-6">
                                <span className="text-lg font-bold tracking-wide">PO. CIPENG</span>
                            </div>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Mitra perjalanan terpercaya Anda. Menyediakan layanan transportasi bus yang aman,
                                nyaman, dan tepat waktu sejak 2005.
                            </p>
                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
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
                            <h4 className="font-bold text-lg mb-6">Menu Cepat</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-0.5 bg-primary-500 group-hover:w-3 transition-all" />
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
                            <h4 className="font-bold text-lg mb-6">Informasi</h4>
                            <ul className="space-y-3">
                                {infoLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-0 h-0.5 bg-primary-500 group-hover:w-3 transition-all" />
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
                            <h4 className="font-bold text-lg mb-6">Hubungi Kami</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <MapPin className="w-4 h-4 text-primary-500" />
                                    </div>
                                    <span className="text-gray-400 text-sm">
                                        Jl. Raya Cipeng No. 123,<br />
                                        Cakung, Jakarta Timur 13910
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-4 h-4 text-primary-500" />
                                    </div>
                                    <a href="tel:+6281234567890" className="text-gray-400 hover:text-white transition-colors text-sm">
                                        0812-3456-7890
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-4 h-4 text-primary-500" />
                                    </div>
                                    <a href="mailto:info@pocipeng.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                                        info@pocipeng.com
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Payment Methods */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 pt-8 border-t border-gray-800"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h5 className="text-sm font-medium text-gray-400 mb-3">Metode Pembayaran</h5>
                                <div className="flex flex-wrap items-center gap-2">
                                    {['BCA', 'MANDIRI', 'BRI', 'BNI'].map((bank) => (
                                        <div
                                            key={bank}
                                            className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
                                        >
                                            <CreditCard className="w-3 h-3 text-gray-400" />
                                            {bank}
                                        </div>
                                    ))}
                                    {['GOPAY', 'OVO', 'DANA'].map((ewallet) => (
                                        <div
                                            key={ewallet}
                                            className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
                                        >
                                            <Smartphone className="w-3 h-3 text-gray-400" />
                                            {ewallet}
                                        </div>
                                    ))}
                                    <div className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium">
                                        QRIS
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-gray-500 text-sm text-center md:text-left">
                                © {new Date().getFullYear()} PO. Cipeng. Hak Cipta Dilindungi.
                            </p>
                            <motion.button
                                onClick={scrollToTop}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-primary-600/20"
                            >
                                <ChevronUp className="w-4 h-4" />
                                Kembali ke Atas
                            </motion.button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
