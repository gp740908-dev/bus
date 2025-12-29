import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    MapPin,
    Package,
    Bus,
    Users,
    Truck,
    ArrowRight,
    X,
    Check,
    Phone,
    Mail,
    Clock,
    ChevronRight
} from 'lucide-react';

const services = [
    {
        id: 'antar-jemput',
        icon: MapPin,
        title: 'Antar Jemput',
        shortDesc: 'Layanan antar jemput penumpang dari dan ke terminal',
        description: 'Nikmati kemudahan layanan antar jemput dari rumah ke terminal dan sebaliknya. Kami menyediakan armada yang nyaman dan sopir yang berpengalaman untuk memastikan perjalanan Anda aman dan tepat waktu.',
        features: [
            'Penjemputan dari rumah/kantor',
            'Tersedia di area Jakarta, Bandung, Semarang, Surabaya, dan Yogyakarta',
            'Booking minimal H-1',
            'Armada bersih dan nyaman',
            'Sopir profesional dan ramah',
        ],
        pricing: 'Mulai dari Rp 50.000 (tergantung jarak)',
        howToOrder: [
            'Hubungi customer service kami via telepon atau WhatsApp',
            'Informasikan lokasi penjemputan dan tujuan',
            'Konfirmasi waktu dan jumlah penumpang',
            'Lakukan pembayaran',
            'Tunggu armada di lokasi yang ditentukan',
        ],
        terms: [
            'Pembatalan gratis H-2 sebelum keberangkatan',
            'Pembatalan H-1 dikenakan biaya 50%',
            'Area layanan terbatas pada radius 25km dari terminal',
        ],
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        id: 'paket',
        icon: Package,
        title: 'Paket/Parcel',
        shortDesc: 'Pengiriman paket antar kota dengan cepat dan aman',
        description: 'Layanan pengiriman paket eksklusif dengan armada bus kami. Paket Anda akan sampai dengan cepat dan aman bersamaan dengan jadwal keberangkatan bus reguler.',
        features: [
            'Pengiriman same day untuk rute tertentu',
            'Tracking real-time',
            'Asuransi pengiriman',
            'Pickup dan delivery tersedia',
            'Maksimal berat 30kg per paket',
        ],
        pricing: 'Mulai dari Rp 25.000/kg (minimum Rp 50.000)',
        howToOrder: [
            'Drop paket ke terminal/agen terdekat atau request pickup',
            'Isi formulir pengiriman dengan lengkap',
            'Bayar biaya pengiriman',
            'Dapatkan nomor resi untuk tracking',
            'Penerima mengambil di terminal/agen tujuan atau delivery',
        ],
        terms: [
            'Barang terlarang tidak diterima',
            'Klaim maksimal 10x biaya kirim',
            'Pickup dikenakan biaya tambahan',
        ],
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600',
    },
    {
        id: 'charter',
        icon: Bus,
        title: 'Charter Bus',
        shortDesc: 'Sewa bus untuk keperluan group atau acara khusus',
        description: 'Layanan sewa bus eksklusif untuk kebutuhan group. Cocok untuk study tour, gathering perusahaan, ziarah, atau acara keluarga. Tersedia berbagai pilihan armada sesuai kebutuhan Anda.',
        features: [
            'Pilihan armada Ekonomi hingga VIP',
            'Sopir berpengalaman',
            'Rute fleksibel sesuai kebutuhan',
            'Tersedia untuk dalam dan luar kota',
            'Fasilitas lengkap sesuai kelas bus',
        ],
        pricing: 'Mulai dari Rp 2.500.000/hari (Ekonomi)',
        howToOrder: [
            'Hubungi tim marketing kami',
            'Konsultasikan kebutuhan dan rute perjalanan',
            'Pilih armada yang sesuai',
            'Tanda tangani kontrak sewa',
            'Bayar DP minimal 50%',
        ],
        terms: [
            'Booking minimal H-3',
            'Pelunasan H-1 sebelum keberangkatan',
            'BBM, tol, dan parkir ditanggung penyewa',
            'Overtime dikenakan biaya tambahan',
        ],
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        id: 'wisata',
        icon: Users,
        title: 'Sewa Bus Pariwisata',
        shortDesc: 'Paket wisata lengkap dengan bus nyaman',
        description: 'Paket wisata lengkap dengan transportasi bus yang nyaman. Kami menyediakan berbagai destinasi wisata populer dengan harga terjangkau dan pelayanan prima.',
        features: [
            'Paket wisata ke berbagai destinasi',
            'Include tiket masuk wisata',
            'Pemandu wisata profesional (opsional)',
            'Dokumentasi perjalanan',
            'Snack dan air mineral',
        ],
        pricing: 'Mulai dari Rp 350.000/orang (paket 1 hari)',
        howToOrder: [
            'Pilih paket wisata yang tersedia',
            'Konfirmasi tanggal dan jumlah peserta',
            'Bayar DP untuk booking',
            'Pelunasan H-3 sebelum keberangkatan',
            'Kumpul di meeting point yang ditentukan',
        ],
        terms: [
            'Minimal 20 peserta untuk keberangkatan',
            'Pembatalan dikenakan biaya sesuai ketentuan',
            'Jadwal dapat berubah sesuai kondisi',
        ],
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
    },
    {
        id: 'travel',
        icon: MapPin,
        title: 'Travel Door to Door',
        shortDesc: 'Layanan travel langsung dari pintu ke pintu',
        description: 'Perjalanan nyaman dengan layanan penjemputan dan pengantaran langsung dari alamat ke alamat. Lebih praktis, lebih personal, dengan armada executive.',
        features: [
            'Penjemputan dari rumah/kantor',
            'Pengantaran sampai alamat tujuan',
            'Armada executive (max 12 seat)',
            'AC, WiFi, dan USB charger',
            'Jadwal keberangkatan fleksibel',
        ],
        pricing: 'Bervariasi sesuai rute (hubungi CS)',
        howToOrder: [
            'Booking via aplikasi atau customer service',
            'Pilih rute dan jadwal keberangkatan',
            'Informasikan alamat penjemputan dan tujuan',
            'Lakukan pembayaran',
            'Tunggu konfirmasi dan armada akan menjemput',
        ],
        terms: [
            'Booking minimal H-1',
            'Reschedule gratis maksimal H-2',
            'Area layanan terbatas',
        ],
        color: 'from-teal-500 to-teal-600',
        bgColor: 'bg-teal-50',
        iconColor: 'text-teal-600',
    },
    {
        id: 'kargo',
        icon: Truck,
        title: 'Kargo',
        shortDesc: 'Pengiriman barang besar antar kota',
        description: 'Layanan pengiriman kargo untuk barang berukuran besar. Kami menyediakan armada khusus untuk pengiriman yang aman dan terpercaya dengan harga kompetitif.',
        features: [
            'Kapasitas hingga 10 ton',
            'Pengiriman antar pulau',
            'Asuransi pengiriman',
            'Layanan bongkar muat',
            'Tracking pengiriman',
        ],
        pricing: 'Berdasarkan volume dan berat (hubungi CS)',
        howToOrder: [
            'Hubungi tim kargo kami',
            'Informasikan jenis dan ukuran barang',
            'Dapatkan penawaran harga',
            'Konfirmasi dan jadwalkan pickup',
            'Lakukan pembayaran',
        ],
        terms: [
            'Minimal berat 100kg atau 0.5 kubik',
            'Barang berbahaya tidak diterima',
            'Packaging menjadi tanggung jawab pengirim',
        ],
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-600',
    },
];

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

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
                            Layanan Kami
                        </h1>
                        <p className="text-lg md:text-xl text-white/80">
                            PO. Cipeng menyediakan berbagai layanan transportasi untuk memenuhi kebutuhan perjalanan dan pengiriman Anda
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-2xl shadow-sm p-6 md:p-8 group"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={`w-7 h-7 ${service.iconColor}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                            <p className="text-gray-500 mb-4">{service.shortDesc}</p>
                                            <motion.button
                                                onClick={() => setSelectedService(service)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="inline-flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all"
                                            >
                                                Selengkapnya
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Butuh Bantuan?
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Tim customer service kami siap membantu Anda 24/7
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="tel:+6281234567890"
                                className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                0812-3456-7890
                            </a>
                            <a
                                href="mailto:info@pocipeng.com"
                                className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-primary-500 hover:text-primary-600 transition-all"
                            >
                                <Mail className="w-5 h-5" />
                                info@pocipeng.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto my-8"
                        >
                            {/* Header */}
                            <div className={`p-6 bg-gradient-to-r ${selectedService.color} text-white rounded-t-3xl relative`}>
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                                        <selectedService.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedService.title}</h2>
                                        <p className="text-white/80">{selectedService.shortDesc}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Description */}
                                <div>
                                    <p className="text-gray-600 leading-relaxed">{selectedService.description}</p>
                                </div>

                                {/* Features */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Fitur Layanan</h3>
                                    <ul className="space-y-2">
                                        {selectedService.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Pricing */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm text-gray-500">Harga</span>
                                    </div>
                                    <span className="font-bold text-lg text-primary-600">{selectedService.pricing}</span>
                                </div>

                                {/* How to Order */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Cara Pemesanan</h3>
                                    <ol className="space-y-3">
                                        {selectedService.howToOrder.map((step, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-600">{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>

                                {/* Terms */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Syarat & Ketentuan</h3>
                                    <ul className="space-y-2">
                                        {selectedService.terms.map((term, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-gray-500">
                                                <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                {term}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA */}
                                <div className="flex gap-3 pt-4">
                                    <a
                                        href="tel:+6281234567890"
                                        className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Hubungi Kami
                                    </a>
                                    <Link
                                        to="/pesan-tiket"
                                        onClick={() => setSelectedService(null)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:border-primary-500 hover:text-primary-600"
                                    >
                                        Pesan Sekarang
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Services;
