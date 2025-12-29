import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const menuItems = [
    { name: 'Home', href: '/', isRoute: true, hasAccent: true },
    { name: 'Pesan Tiket', href: '#search', isRoute: false },
    { name: 'Cek Tiket', href: '#', isRoute: false },
    { name: 'Layanan', href: '#features', isRoute: false },
    { name: 'Armada', href: '#fleet', isRoute: false },
    { name: 'Tentang Kami', href: '#', isRoute: false },
    { name: 'Contact', href: '#footer', isRoute: false },
    { name: 'Masuk', href: '/sign-in', isRoute: true },
];

const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
];

const MobileMenu = ({ onClose }) => {
    const containerVariants = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: {
                type: 'tween',
                duration: 0.4,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.05,
            },
        },
        exit: {
            x: '100%',
            transition: {
                type: 'tween',
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    };

    const handleLinkClick = (href, isRoute) => {
        onClose();
        if (!isRoute && href !== '#') {
            setTimeout(() => {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="fixed inset-0 z-[60] bg-gray-900 flex flex-col"
        >
            {/* Close Button */}
            <div className="flex justify-end p-6">
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="bg-gray-800 p-3 rounded-lg"
                    aria-label="Close menu"
                >
                    <X className="w-6 h-6 text-white" />
                </motion.button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-16">
                <ul className="space-y-4 md:space-y-6">
                    {menuItems.map((item, index) => (
                        <motion.li key={index} variants={itemVariants}>
                            {item.isRoute ? (
                                <Link
                                    to={item.href}
                                    onClick={() => handleLinkClick(item.href, true)}
                                    className="flex items-center gap-4 text-3xl md:text-5xl font-bold text-white uppercase tracking-wide hover:text-primary-500 transition-colors"
                                >
                                    {item.hasAccent && (
                                        <span className="w-3 h-3 bg-secondary-500 rounded-full" />
                                    )}
                                    {item.name}
                                </Link>
                            ) : (
                                <motion.a
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLinkClick(item.href, false);
                                    }}
                                    whileHover={{ x: 20 }}
                                    className="flex items-center gap-4 text-3xl md:text-5xl font-bold text-white uppercase tracking-wide hover:text-primary-500 transition-colors"
                                >
                                    {item.hasAccent && (
                                        <span className="w-3 h-3 bg-secondary-500 rounded-full" />
                                    )}
                                    {item.name}
                                </motion.a>
                            )}
                        </motion.li>
                    ))}
                </ul>
            </nav>

            {/* Social Links */}
            <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-6 p-8"
            >
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.2, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label={social.label}
                    >
                        <social.icon className="w-6 h-6" />
                    </motion.a>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default MobileMenu;
