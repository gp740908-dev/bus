import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    MessageCircle,
    Send,
    ChevronDown,
    Check,
    AlertCircle
} from 'lucide-react';

const contactTopics = [
    { id: 'pertanyaan', label: 'Pertanyaan' },
    { id: 'komplain', label: 'Komplain' },
    { id: 'saran', label: 'Saran' },
    { id: 'kerjasama', label: 'Kerjasama' },
];

const contactInfo = [
    {
        icon: MapPin,
        title: 'Kantor Pusat',
        content: 'Jl. Raya Cipeng No. 123, Cakung, Jakarta Timur 13910',
        color: 'bg-blue-100 text-blue-600',
    },
    {
        icon: Phone,
        title: 'Telepon',
        content: '(021) 1234-5678 / 0812-3456-7890',
        color: 'bg-green-100 text-green-600',
    },
    {
        icon: Mail,
        title: 'Email',
        content: 'info@pocipeng.com',
        color: 'bg-purple-100 text-purple-600',
    },
    {
        icon: MessageCircle,
        title: 'WhatsApp',
        content: '0812-3456-7890',
        link: 'https://wa.me/6281234567890',
        color: 'bg-emerald-100 text-emerald-600',
    },
    {
        icon: Clock,
        title: 'Jam Operasional',
        content: '24 Jam (Setiap Hari)',
        color: 'bg-orange-100 text-orange-600',
    },
];

const faqs = [
    {
        question: 'Bagaimana cara memesan tiket bus?',
        answer: 'Anda dapat memesan tiket melalui website kami di halaman "Pesan Tiket", pilih rute dan tanggal, pilih bus dan kursi, lalu lakukan pembayaran. Anda juga dapat menghubungi customer service kami atau datang langsung ke agen terdekat.',
    },
    {
        question: 'Apa saja metode pembayaran yang tersedia?',
        answer: 'Kami menerima pembayaran via Transfer Bank (BCA, Mandiri, BRI, BNI), E-Wallet (GoPay, OVO, DANA, ShopeePay), Virtual Account, dan QRIS. Pembayaran tunai juga tersedia di agen-agen kami.',
    },
    {
        question: 'Bagaimana cara membatalkan tiket?',
        answer: 'Pembatalan tiket dapat dilakukan maksimal H-1 sebelum keberangkatan. Hubungi customer service kami dengan menyertakan kode booking. Refund akan diproses dalam 3-7 hari kerja dengan potongan biaya admin.',
    },
    {
        question: 'Apakah bisa reschedule tiket?',
        answer: 'Ya, reschedule dapat dilakukan maksimal H-1 sebelum keberangkatan. Hubungi customer service kami. Reschedule pertama gratis, reschedule selanjutnya dikenakan biaya admin.',
    },
    {
        question: 'Bagaimana jika ketinggalan bus?',
        answer: 'Jika Anda ketinggalan bus, tiket tidak dapat di-refund atau digunakan untuk jadwal lain. Kami menyarankan untuk tiba di terminal minimal 30 menit sebelum keberangkatan.',
    },
    {
        question: 'Apakah tersedia layanan antar jemput?',
        answer: 'Ya, kami menyediakan layanan antar jemput dari rumah ke terminal dan sebaliknya. Layanan ini tersedia di area Jakarta, Bandung, Semarang, Surabaya, dan Yogyakarta dengan biaya tambahan.',
    },
    {
        question: 'Berapa batas bagasi yang diperbolehkan?',
        answer: 'Setiap penumpang diperbolehkan membawa bagasi maksimal 20kg. Bagasi berlebih akan dikenakan biaya tambahan per kg sesuai ketentuan.',
    },
    {
        question: 'Apakah bus tersedia fasilitas untuk disabilitas?',
        answer: 'Beberapa armada kami sudah dilengkapi fasilitas untuk penumpang dengan kebutuhan khusus. Silakan hubungi customer service kami minimal H-2 sebelum keberangkatan untuk pengaturan khusus.',
    },
];

const ContactUs = () => {
    const [formData, setFormData] = useState({
        topic: 'pertanyaan',
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
        if (!formData.email.trim()) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Nomor telepon wajib diisi';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Pesan wajib diisi';
        } else if (formData.message.trim().length < 20) {
            newErrors.message = 'Pesan minimal 20 karakter';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ topic: 'pertanyaan', name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }} />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">
                            Hubungi Kami
                        </h1>
                        <p className="text-lg md:text-xl text-white/80">
                            Ada pertanyaan atau saran? Kami siap membantu Anda 24/7
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>

                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Check className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h3>
                                        <p className="text-gray-500 mb-6">
                                            Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
                                        </p>
                                        <button
                                            onClick={() => setIsSuccess(false)}
                                            className="text-primary-600 font-medium hover:underline"
                                        >
                                            Kirim pesan lagi
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Topic */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Topik Pesan
                                            </label>
                                            <div className="flex flex-wrap gap-3">
                                                {contactTopics.map(topic => (
                                                    <button
                                                        key={topic.id}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, topic: topic.id })}
                                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.topic === topic.id
                                                                ? 'bg-primary-600 text-white'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {topic.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Name & Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nama Lengkap <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                                                        }`}
                                                    placeholder="Nama Anda"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                                                        }`}
                                                    placeholder="email@example.com"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nomor Telepon <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                                                    }`}
                                                placeholder="08xxxxxxxxxx"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Pesan <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={5}
                                                className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all resize-none ${errors.message ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                                                    }`}
                                                placeholder="Tulis pesan Anda di sini..."
                                            />
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                            )}
                                        </div>

                                        {/* Submit */}
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Mengirim...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Kirim Pesan
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                const content = info.link ? (
                                    <a
                                        href={info.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:underline"
                                    >
                                        {info.content}
                                    </a>
                                ) : (
                                    <span className="text-gray-600">{info.content}</span>
                                );

                                return (
                                    <motion.div
                                        key={info.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-2xl p-5 shadow-sm"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 mb-1">{info.title}</div>
                                                {content}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-gray-200 rounded-3xl h-80 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p>Google Maps akan ditampilkan di sini</p>
                            <p className="text-sm">Jl. Raya Cipeng No. 123, Jakarta Timur</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-gray-500">
                            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan
                        </p>
                    </motion.div>

                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-primary-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Masih Ada Pertanyaan?
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi kami
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Chat via WhatsApp
                            </a>
                            <a
                                href="tel:+6281234567890"
                                className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-primary-500 hover:text-primary-600 transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                0812-3456-7890
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
