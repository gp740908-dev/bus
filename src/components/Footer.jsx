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
        <footer id="footer" className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/10 inline-block px-4 py-2 rounded-full mb-6">
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
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
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
                                        className="text-gray-400 hover:text-white transition-colors inline-block"
                                    >
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
                                        className="text-gray-400 hover:text-white transition-colors inline-block"
                                    >
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
                                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400">
                                    Jl. Raya Cipeng No. 123,<br />
                                    Cakung, Jakarta Timur 13910
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <a href="tel:+6281234567890" className="text-gray-400 hover:text-white transition-colors">
                                    0812-3456-7890
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <a href="mailto:info@pocipeng.com" className="text-gray-400 hover:text-white transition-colors">
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
                            <div className="flex flex-wrap items-center gap-3">
                                {['BCA', 'MANDIRI', 'BRI', 'BNI'].map((bank) => (
                                    <div
                                        key={bank}
                                        className="bg-white/10 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1"
                                    >
                                        <CreditCard className="w-3 h-3" />
                                        {bank}
                                    </div>
                                ))}
                                {['GOPAY', 'OVO', 'DANA'].map((ewallet) => (
                                    <div
                                        key={ewallet}
                                        className="bg-white/10 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1"
                                    >
                                        <Smartphone className="w-3 h-3" />
                                        {ewallet}
                                    </div>
                                ))}
                                <div className="bg-white/10 px-3 py-1.5 rounded text-xs font-medium">
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
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} PO. Cipeng. Hak Cipta Dilindungi.
                        </p>
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-white/10 hover:bg-primary-600 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                        >
                            <ChevronUp className="w-4 h-4" />
                            Kembali ke Atas
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
