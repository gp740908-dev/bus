import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Wifi,
    Wind,
    Usb,
    Armchair,
    Bus,
    ShieldCheck,
    Clock
} from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Premium minimal staggered text
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // Custom cubic-bezier for "expensive" feel
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex items-center overflow-hidden bg-white"
        >
            {/* Abstract Minimalist Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Very subtle noise texture for premium paper feel */}
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* Soft blur accent - very subtle */}
                <div className="absolute -top-[20%] right-0 w-[800px] h-[800px] bg-gray-50 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Content (Typography Focused) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        {/* Minimal Label */}
                        <motion.div variants={textVariants} className="inline-flex items-center gap-2 mb-6">
                            <span className="w-8 h-[1px] bg-black"></span>
                            <span className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">
                                Premium Intercity Bus
                            </span>
                        </motion.div>

                        {/* Main Headline - High Contrast, Tight Leading */}
                        <motion.h1 variants={textVariants} className="mb-8">
                            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-gray-900 leading-[1.1] tracking-tight">
                                Travel in
                            </span>
                            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.0] tracking-tighter">
                                Absolute Comfort.
                            </span>
                        </motion.h1>

                        {/* Description - Clean Serif or Sans */}
                        <motion.p
                            variants={textVariants}
                            className="text-lg md:text-xl text-gray-500 font-light max-w-md mx-auto lg:mx-0 leading-relaxed mb-10"
                        >
                            Experience the new standard of bus travel.
                            Extra legroom, premium service, and punctuality you can trust.
                        </motion.p>

                        {/* Actions */}
                        <motion.div
                            variants={textVariants}
                            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                        >
                            {/* Primary Button - Black Solid */}
                            <Link to="/pesan-tiket">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative px-10 py-5 bg-gray-900 text-white text-base font-semibold rounded-full overflow-hidden transition-all hover:bg-black shadow-xl shadow-gray-200"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Book Now
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </motion.button>
                            </Link>

                            {/* Secondary Button - Link Style */}
                            <Link to="/armada">
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    className="text-gray-900 font-semibold text-base border-b-2 border-transparent hover:border-gray-900 transition-all pb-1"
                                >
                                    Explore Fleet
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Minimal Stats */}
                        <motion.div
                            variants={textVariants}
                            className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-center lg:justify-start gap-12"
                        >
                            <div>
                                <div className="text-3xl font-bold text-gray-900">10k+</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Happy Users</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">4.9</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">App Rating</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Visual (Clean Product Shot) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative order-1 lg:order-2"
                    >
                        {/* Main Visual Container */}
                        <div className="relative z-10">
                            {/* This would ideally be a high-quality transparent PNG of the bus */}
                            {/* For now, using a clean card representation */}
                            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-50 relative group shadow-2xl shadow-gray-200/50">
                                {/* Visual Placeholder - Replace with actual Bus Image */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white flex items-center justify-center">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                        className="relative"
                                    >
                                        <Bus className="w-64 h-64 text-gray-900" strokeWidth={0.5} />
                                        {/* Shadow underneath */}
                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/10 blur-xl rounded-full" />
                                    </motion.div>
                                </div>

                                {/* Floating Feature Tags - Clean White Labels */}
                                <motion.div
                                    className="absolute top-8 left-8 bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-3"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="bg-gray-100 p-2 rounded-lg">
                                        <Armchair className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium">Seat Type</div>
                                        <div className="text-sm font-bold text-gray-900">Executive Class</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-3"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="bg-gray-100 p-2 rounded-lg">
                                        <Wifi className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium">Connectivity</div>
                                        <div className="text-sm font-bold text-gray-900">Free 5G WiFi</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Decorative geometrical background elements (Minimalist) */}
                        <div className="absolute -z-10 top-[-10%] right-[-10%] w-[120%] h-[120%] bg-gray-50/50 rounded-full blur-3xl opacity-40 pointer-events-none" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
