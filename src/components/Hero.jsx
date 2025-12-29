import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Star,
    Bus,
    Headphones,
    Wifi,
    Wind,
    Usb,
    Armchair,
    Shield,
    Clock,
    Users
} from 'lucide-react';

// Counter animation hook
const useCountUp = (target, duration = 2000, startOnView = true) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!hasStarted) return;

        const steps = 60;
        const increment = target / steps;
        const stepDuration = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [hasStarted, target, duration]);

    useEffect(() => {
        if (!startOnView) {
            setHasStarted(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [startOnView, hasStarted]);

    return { count, ref };
};

// Floating card data
const floatingCards = [
    { icon: Wifi, label: 'WiFi Gratis', delay: 0, x: '10%', y: '20%' },
    { icon: Wind, label: 'AC Dingin', delay: 0.5, x: '85%', y: '15%' },
    { icon: Usb, label: 'USB Charger', delay: 1, x: '75%', y: '70%' },
    { icon: Armchair, label: 'Seat Reclining', delay: 1.5, x: '5%', y: '65%' },
];

// Stats data
const stats = [
    { icon: Star, value: 10000, suffix: '+', label: 'Penumpang Puas' },
    { icon: Bus, value: 50, suffix: '+', label: 'Armada Modern' },
    { icon: Headphones, value: 24, suffix: '/7', label: 'Customer Support' },
];

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Text animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    };

    const floatAnimation = {
        y: [0, -12, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-gray-950"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Animated Gradient Mesh */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 -left-40 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px]"
                />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Light Rays */}
                <div className="absolute top-0 right-0 w-full h-full opacity-[0.02]">
                    <div className="absolute top-0 right-0 w-[120%] h-[120%] bg-gradient-to-bl from-white/10 via-transparent to-transparent transform rotate-12 -translate-y-1/4 translate-x-1/4" />
                </div>
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 lg:py-0"
            >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
                    {/* Left Content - 60% */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-3 text-center lg:text-left"
                    >
                        {/* Main Headline */}
                        <motion.h1 variants={textVariants} className="mb-6">
                            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                                Perjalanan Nyaman,
                            </span>
                            <span
                                className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]"
                            >
                                Tepat Waktu
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={textVariants}
                            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
                        >
                            Nikmati pengalaman perjalanan premium dengan armada modern dan layanan terbaik di kelasnya.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={textVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
                        >
                            <Link to="/pesan-tiket">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-lg font-bold rounded-full shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Pesan Tiket Sekarang
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.button>
                            </Link>

                            <Link to="/armada">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white text-lg font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                                >
                                    Lihat Armada
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={textVariants}
                            className="flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-0"
                        >
                            {stats.map((stat, index) => {
                                const { count, ref } = useCountUp(stat.value);
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={index}
                                        ref={ref}
                                        className={`flex items-center gap-3 px-4 lg:px-6 ${index > 0 ? 'lg:border-l lg:border-gray-700' : ''
                                            }`}
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white">
                                                {count.toLocaleString()}{stat.suffix}
                                            </div>
                                            <div className="text-sm text-gray-500">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* Right Visual - 40% */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-2 relative hidden lg:block"
                    >
                        {/* Main Bus Visual */}
                        <motion.div
                            animate={floatAnimation}
                            className="relative z-10"
                        >
                            <div className="relative">
                                {/* Bus Illustration Placeholder */}
                                <div className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                                    <div className="relative">
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent blur-2xl" />

                                        {/* Bus Icon */}
                                        <motion.div
                                            animate={{
                                                rotateY: [0, 5, 0, -5, 0],
                                            }}
                                            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                                            className="relative z-10"
                                        >
                                            <Bus className="w-48 h-48 text-white/80" strokeWidth={0.8} />
                                        </motion.div>

                                        {/* Decorative Elements */}
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-red-500/30 blur-xl rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Premium Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="absolute -top-4 -right-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                                >
                                    ✨ Premium
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Floating Feature Cards */}
                        {floatingCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        opacity: { delay: 1 + card.delay * 0.3 },
                                        scale: { delay: 1 + card.delay * 0.3 },
                                        y: {
                                            duration: 3 + index * 0.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: card.delay,
                                        },
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    className="absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl cursor-pointer"
                                    style={{ left: card.x, top: card.y }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-red-600/30 to-orange-600/30 rounded-lg flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-red-400" />
                                        </div>
                                        <span className="text-white text-sm font-medium">{card.label}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-gray-500 text-sm">Scroll</span>
                    <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-red-500 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Mobile Visual */}
            <div className="lg:hidden absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-full blur-3xl" />
            </div>
        </section>
    );
};

export default Hero;
