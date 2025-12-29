import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Ahmad Sudirman',
        role: 'Pengusaha',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        text: 'Pelayanan luar biasa! Bus sangat nyaman dengan AC yang sejuk dan kursi yang empuk. Perjalanan Jakarta-Surabaya terasa cepat dan menyenangkan.',
    },
    {
        id: 2,
        name: 'Siti Rahayu',
        role: 'Karyawan Swasta',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        text: 'Saya sering menggunakan PO. Cipeng untuk perjalanan bisnis. Selalu tepat waktu dan sopir sangat profesional. Highly recommended!',
    },
    {
        id: 3,
        name: 'Budi Santoso',
        role: 'Mahasiswa',
        image: 'https://randomuser.me/api/portraits/men/67.jpg',
        rating: 5,
        text: 'Harga terjangkau dengan kualitas premium. WiFi lancar, ada colokan USB, dan snack gratis. Cocok untuk mahasiswa seperti saya!',
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const Testimonials = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-primary-600 font-semibold mb-4 uppercase tracking-wider text-sm">
                        Testimoni
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Apa Kata Pelanggan Kami
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Ribuan pelanggan telah mempercayakan perjalanan mereka kepada kami.
                        Berikut beberapa testimoni dari mereka.
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-4 -left-2">
                                <div className="bg-primary-600 p-3 rounded-xl">
                                    <Quote className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4 pt-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-gray-600 leading-relaxed mb-6">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
