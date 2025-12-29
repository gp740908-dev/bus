import { motion } from 'framer-motion';
import { Shield, Wallet, Bus, HeadphonesIcon } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Aman & Nyaman',
        description:
            'Perjalanan dengan standar keselamatan tinggi dan kenyamanan maksimal untuk semua penumpang.',
        color: 'from-primary-500 to-primary-600',
        bgColor: 'bg-primary-50',
        iconColor: 'text-primary-600',
    },
    {
        icon: Wallet,
        title: 'Harga Terjangkau',
        description:
            'Nikmati perjalanan berkualitas dengan harga yang ramah di kantong. Banyak promo menarik!',
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        icon: Bus,
        title: 'Armada Modern',
        description:
            'Bus-bus terbaru dengan fasilitas lengkap: AC, WiFi, USB charging, dan kursi yang nyaman.',
        color: 'from-secondary-500 to-secondary-600',
        bgColor: 'bg-secondary-50',
        iconColor: 'text-secondary-600',
    },
    {
        icon: HeadphonesIcon,
        title: 'Layanan 24/7',
        description:
            'Tim customer service kami siap membantu Anda kapan saja, 24 jam sehari, 7 hari seminggu.',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const Features = () => {
    return (
        <section className="py-24 bg-white">
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
                        Mengapa Memilih Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Layanan Terbaik untuk Perjalanan Anda
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Kami berkomitmen memberikan pengalaman perjalanan terbaik dengan
                        layanan prima dan fasilitas modern.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Icon */}
                            <div
                                className={`inline-flex items-center justify-center w-14 h-14 ${feature.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-transform`}
                            >
                                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Hover Gradient Line */}
                            <div
                                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
