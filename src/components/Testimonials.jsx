import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Ahmad Sudirman',
        role: 'Pengusaha',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        text: 'Pelayanan luar biasa! Bus sangat nyaman dengan AC yang sejuk dan kursi yang empuk. Perjalanan Jakarta-Surabaya terasa cepat dan menyenangkan.',
        bgColor: 'bg-gradient-to-br from-primary-50 to-primary-100',
    },
    {
        id: 2,
        name: 'Siti Rahayu',
        role: 'Karyawan Swasta',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        text: 'Saya sering menggunakan PO. Cipeng untuk perjalanan bisnis. Selalu tepat waktu dan sopir sangat profesional. Highly recommended!',
        bgColor: 'bg-gradient-to-br from-secondary-50 to-secondary-100',
    },
    {
        id: 3,
        name: 'Budi Santoso',
        role: 'Mahasiswa',
        image: 'https://randomuser.me/api/portraits/men/67.jpg',
        rating: 5,
        text: 'Harga terjangkau dengan kualitas premium. WiFi lancar, ada colokan USB, dan snack gratis. Cocok untuk mahasiswa seperti saya!',
        bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    },
    {
        id: 4,
        name: 'Linda Permata',
        role: 'Ibu Rumah Tangga',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 5,
        text: 'Perjalanan mudik bersama keluarga jadi sangat nyaman. Anak-anak senang karena ada hiburan di bus. Terima kasih PO. Cipeng!',
        bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
    },
];

// Individual sticky card component
const StickyCard = ({ testimonial, index, totalCards }) => {
    const cardRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'start start'],
    });

    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        [0.9, 1]
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        [0.6, 0.9, 1]
    );

    // Calculate top position for stacking effect
    const topPosition = 100 + index * 40;

    return (
        <motion.div
            ref={cardRef}
            style={{
                scale,
                opacity,
                top: `${topPosition}px`,
                zIndex: index + 1,
            }}
            className="sticky mb-8 last:mb-0"
        >
            <div className={`${testimonial.bgColor} rounded-3xl p-8 md:p-10 shadow-lg border border-white/50 backdrop-blur-sm max-w-4xl mx-auto`}>
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8">
                    <div className="bg-primary-600 p-3 rounded-xl shadow-lg">
                        <Quote className="w-6 h-6 text-white" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-8 pt-4">
                    {/* Author Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-lg ring-4 ring-white"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                                />
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                            "{testimonial.text}"
                        </p>

                        {/* Author Info */}
                        <div>
                            <div className="font-bold text-gray-900 text-lg">
                                {testimonial.name}
                            </div>
                            <div className="text-gray-500">{testimonial.role}</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="py-24 bg-gray-50 relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

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
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Apa Kata Pelanggan Kami
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Ribuan pelanggan telah mempercayakan perjalanan mereka kepada kami.
                        Berikut beberapa testimoni dari mereka.
                    </p>
                </motion.div>

                {/* Sticky Stacking Cards */}
                <div className="relative pb-20">
                    {testimonials.map((testimonial, index) => (
                        <StickyCard
                            key={testimonial.id}
                            testimonial={testimonial}
                            index={index}
                            totalCards={testimonials.length}
                        />
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { number: '10,000+', label: 'Pelanggan Puas' },
                        { number: '4.9', label: 'Rating Rata-rata' },
                        { number: '98%', label: 'Tepat Waktu' },
                        { number: '24/7', label: 'Customer Support' },
                    ].map((stat, index) => (
                        <div key={index}>
                            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">
                                {stat.number}
                            </div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
