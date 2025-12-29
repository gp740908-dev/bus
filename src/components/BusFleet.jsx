import { motion } from 'framer-motion';
import { Wifi, Wind, Usb, Tv, Coffee, Armchair, ArrowRight } from 'lucide-react';

const buses = [
    {
        id: 1,
        name: 'Executive Class',
        type: 'Luxury',
        image:
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
        seats: 32,
        facilities: ['wifi', 'ac', 'usb', 'tv', 'snack', 'recliner'],
        price: 'Rp 350.000',
        route: 'Jakarta - Surabaya',
    },
    {
        id: 2,
        name: 'Business Class',
        type: 'Premium',
        image:
            'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80',
        seats: 40,
        facilities: ['wifi', 'ac', 'usb', 'tv'],
        price: 'Rp 250.000',
        route: 'Jakarta - Bandung',
    },
    {
        id: 3,
        name: 'Economy Plus',
        type: 'Standard',
        image:
            'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=800&q=80',
        seats: 48,
        facilities: ['ac', 'usb'],
        price: 'Rp 150.000',
        route: 'Jakarta - Semarang',
    },
];

const facilityIcons = {
    wifi: { icon: Wifi, label: 'WiFi' },
    ac: { icon: Wind, label: 'AC' },
    usb: { icon: Usb, label: 'USB' },
    tv: { icon: Tv, label: 'TV' },
    snack: { icon: Coffee, label: 'Snack' },
    recliner: { icon: Armchair, label: 'Recliner' },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const BusFleet = () => {
    return (
        <section id="fleet" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header - Minimalist Split */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                            Our Premium<br />
                            <span className="text-gray-400 font-light">Fleet Selection</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 pb-1 border-b-2 border-transparent hover:border-gray-900 transition-all">
                            View All Fleet
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>
                </div>

                {/* Bus Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {buses.map((bus) => (
                        <motion.div
                            key={bus.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
                        >
                            {/* Image - Clean */}
                            <div className="relative h-64 overflow-hidden">
                                <motion.img
                                    src={bus.image}
                                    alt={bus.name}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Badge - Minimal White */}
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                        {bus.type}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{bus.route}</div>
                                        <h3 className="text-2xl font-bold text-gray-900">{bus.name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-gray-900">{bus.price}</div>
                                    </div>
                                </div>

                                {/* Facilities - Minimal Icons */}
                                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
                                    {bus.facilities.slice(0, 4).map((facility) => {
                                        const { icon: Icon } = facilityIcons[facility];
                                        return (
                                            <div
                                                key={facility}
                                                className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300"
                                                title={facilityIcons[facility].label}
                                            >
                                                <Icon className="w-5 h-5" strokeWidth={1.5} />
                                            </div>
                                        );
                                    })}
                                    {bus.facilities.length > 4 && (
                                        <span className="text-xs font-medium text-gray-400 self-center">+{bus.facilities.length - 4} more</span>
                                    )}
                                </div>

                                <div className="mt-8">
                                    <button className="w-full py-4 bg-gray-50 text-gray-900 font-bold text-sm uppercase tracking-wider rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                                        Book This Bus
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BusFleet;
