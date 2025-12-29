import { motion } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    ArrowUp,
} from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        quickLinks: [
            { name: 'Beranda', href: '#home' },
            { name: 'Pesan Tiket', href: '#search' },
            { name: 'Armada', href: '#fleet' },
            { name: 'Cek Tiket', href: '#' },
            { name: 'Hubungi Kami', href: '#footer' },
        ],
        info: [
            { name: 'Tentang Kami', href: '#' },
            { name: 'Syarat & Ketentuan', href: '#' },
            { name: 'Kebijakan Privasi', href: '#' },
            { name: 'FAQ', href: '#' },
            { name: 'Karir', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Youtube, href: '#', label: 'Youtube' },
    ];

    return (
        <footer id="footer" className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-6">
                            <span className="text-2xl font-bold">PO. Cipeng</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Perusahaan transportasi bus terpercaya yang telah melayani
                            perjalanan nyaman dan aman di Indonesia sejak 2010.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.2, y: -4 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all"
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
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-lg font-semibold mb-6">Menu</h3>
                        <ul className="space-y-4">
                            {footerLinks.quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all link-hover-effect"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-lg font-semibold mb-6">Informasi</h3>
                        <ul className="space-y-4">
                            {footerLinks.info.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all link-hover-effect"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold mb-6">Kontak</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400">
                                    Jl. Raya Cipeng No. 123
                                    <br />
                                    Jakarta Timur 13450
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <a
                                    href="tel:+622112345678"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    (021) 1234-5678
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <a
                                    href="mailto:info@pocipeng.com"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    info@pocipeng.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                <span className="text-gray-400">24 Jam / 7 Hari</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        © 2024 PO. Cipeng. All rights reserved.
                    </p>
                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
