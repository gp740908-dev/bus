import { motion } from 'framer-motion';
import { Wifi, Wind, Usb, Tv, Coffee, Armchair, ArrowRight } from 'lucide-react';

const buses = [
    {
        id: 1,
        name: 'Executive Class',
        type: 'Bus Mewah',
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
        type: 'Bus Premium',
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
        type: 'Bus Ekonomi',
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
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const BusFleet = () => {
    return (
        <section id="fleet" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-primary-600 font-semibold mb-4 uppercase tracking-wider text-sm">
                        Armada Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Pilihan Bus untuk Setiap Kebutuhan
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Dari kelas ekonomi hingga eksekutif, kami menyediakan berbagai
                        pilihan bus dengan fasilitas lengkap untuk kenyamanan Anda.
                    </p>
                </motion.div>

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
                            whileHover={{ y: -12 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <motion.img
                                    src={bus.image}
                                    alt={bus.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {bus.type}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="text-white text-sm opacity-90">{bus.route}</div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{bus.name}</h3>
                                    <span className="text-sm text-gray-500">{bus.seats} kursi</span>
                                </div>

                                {/* Facilities */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {bus.facilities.map((facility) => {
                                        const { icon: Icon, label } = facilityIcons[facility];
                                        return (
                                            <div
                                                key={facility}
                                                className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-600"
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span>{label}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <span className="text-sm text-gray-500">Mulai dari</span>
                                        <div className="text-xl font-bold text-primary-600">
                                            {bus.price}
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05, x: 4 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Lihat Detail
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-600 transition-all"
                    >
                        Lihat Semua Armada
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default BusFleet;
