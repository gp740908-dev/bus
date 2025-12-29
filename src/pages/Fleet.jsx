import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bus,
    Users,
    X,
    ChevronLeft,
    ChevronRight,
    Wifi,
    Wind,
    Tv,
    Usb,
    Coffee,
    Bath,
    Armchair,
    Bed,
    Plug,
    Music,
    ShieldCheck,
    MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const busClasses = [
    { id: 'all', name: 'Semua' },
    { id: 'ekonomi', name: 'Ekonomi' },
    { id: 'bisnis', name: 'Bisnis' },
    { id: 'eksekutif', name: 'Eksekutif' },
    { id: 'vip', name: 'VIP' },
];

const facilityIcons = {
    ac: { icon: Wind, name: 'AC' },
    wifi: { icon: Wifi, name: 'WiFi' },
    toilet: { icon: Bath, name: 'Toilet' },
    usb: { icon: Usb, name: 'USB Charger' },
    tv: { icon: Tv, name: 'TV/Entertainment' },
    snack: { icon: Coffee, name: 'Snack & Minuman' },
    blanket: { icon: Bed, name: 'Selimut & Bantal' },
    recliner: { icon: Armchair, name: 'Reclining Seat' },
    power: { icon: Plug, name: 'Stop Kontak' },
    audio: { icon: Music, name: 'Audio System' },
    safety: { icon: ShieldCheck, name: 'Safety Belt' },
    gps: { icon: MapPin, name: 'GPS Tracking' },
};

const fleetData = [
    {
        id: 1,
        name: 'Cipeng Ekonomi AC',
        class: 'ekonomi',
        capacity: 48,
        priceRange: [80000, 150000],
        facilities: ['ac', 'recliner', 'safety'],
        images: ['/bus-ekonomi-1.jpg', '/bus-ekonomi-2.jpg', '/bus-ekonomi-3.jpg'],
        description: 'Bus ekonomi dengan fasilitas dasar yang nyaman untuk perjalanan jarak menengah dan jauh.',
        specs: { engine: 'Hino RK8', year: 2022, seatConfig: '2-2' },
    },
    {
        id: 2,
        name: 'Cipeng Bisnis Plus',
        class: 'bisnis',
        capacity: 40,
        priceRange: [150000, 250000],
        facilities: ['ac', 'wifi', 'usb', 'recliner', 'safety', 'snack'],
        images: ['/bus-bisnis-1.jpg', '/bus-bisnis-2.jpg', '/bus-bisnis-3.jpg'],
        description: 'Bus bisnis dengan kenyamanan ekstra, cocok untuk perjalanan bisnis dan keluarga.',
        specs: { engine: 'Mercedes-Benz OH 1526', year: 2023, seatConfig: '2-2' },
    },
    {
        id: 3,
        name: 'Cipeng Eksekutif Premium',
        class: 'eksekutif',
        capacity: 32,
        priceRange: [250000, 400000],
        facilities: ['ac', 'wifi', 'toilet', 'usb', 'tv', 'snack', 'blanket', 'recliner', 'power', 'safety'],
        images: ['/bus-eksekutif-1.jpg', '/bus-eksekutif-2.jpg', '/bus-eksekutif-3.jpg'],
        description: 'Bus eksekutif dengan kursi lega dan fasilitas lengkap untuk kenyamanan maksimal.',
        specs: { engine: 'Scania K410', year: 2023, seatConfig: '2-2' },
    },
    {
        id: 4,
        name: 'Cipeng VIP Sleeper',
        class: 'vip',
        capacity: 24,
        priceRange: [400000, 600000],
        facilities: ['ac', 'wifi', 'toilet', 'usb', 'tv', 'snack', 'blanket', 'recliner', 'power', 'audio', 'safety', 'gps'],
        images: ['/bus-vip-1.jpg', '/bus-vip-2.jpg', '/bus-vip-3.jpg'],
        description: 'Bus VIP dengan kursi sleeper yang bisa rebah 180 derajat untuk pengalaman perjalanan istimewa.',
        specs: { engine: 'Volvo B11R', year: 2024, seatConfig: '1-2' },
    },
    {
        id: 5,
        name: 'Cipeng Ekonomi Standard',
        class: 'ekonomi',
        capacity: 52,
        priceRange: [70000, 120000],
        facilities: ['ac', 'recliner', 'safety'],
        images: ['/bus-ekonomi-std-1.jpg', '/bus-ekonomi-std-2.jpg', '/bus-ekonomi-std-3.jpg'],
        description: 'Bus ekonomi standar dengan kapasitas besar untuk perjalanan hemat.',
        specs: { engine: 'Hino RN8', year: 2021, seatConfig: '2-3' },
    },
    {
        id: 6,
        name: 'Cipeng Bisnis Executive',
        class: 'bisnis',
        capacity: 36,
        priceRange: [180000, 280000],
        facilities: ['ac', 'wifi', 'usb', 'tv', 'recliner', 'snack', 'safety', 'power'],
        images: ['/bus-bisnis-exec-1.jpg', '/bus-bisnis-exec-2.jpg', '/bus-bisnis-exec-3.jpg'],
        description: 'Bus bisnis executive dengan hiburan lengkap dan kursi ergonomis.',
        specs: { engine: 'Mercedes-Benz OH 1626', year: 2023, seatConfig: '2-2' },
    },
];

const Fleet = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedBus, setSelectedBus] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredFleet = activeFilter === 'all'
        ? fleetData
        : fleetData.filter(bus => bus.class === activeFilter);

    const getClassBadge = (busClass) => {
        const colors = {
            ekonomi: 'bg-gray-100 text-gray-700',
            bisnis: 'bg-blue-100 text-blue-700',
            eksekutif: 'bg-purple-100 text-purple-700',
            vip: 'bg-amber-100 text-amber-700',
        };
        return colors[busClass] || 'bg-gray-100 text-gray-700';
    };

    const handleBookBus = (bus) => {
        setSelectedBus(null);
        navigate('/pesan-tiket');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Armada Kami
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Jelajahi berbagai pilihan armada bus kami yang nyaman dan modern untuk perjalanan Anda
                    </p>
                </motion.div>

                {/* Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {busClasses.map(bc => (
                        <button
                            key={bc.id}
                            onClick={() => setActiveFilter(bc.id)}
                            className={`px-5 py-2.5 rounded-full font-medium transition-all ${activeFilter === bc.id
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                                }`}
                        >
                            {bc.name}
                        </button>
                    ))}
                </motion.div>

                {/* Fleet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredFleet.map((bus, index) => (
                            <motion.div
                                key={bus.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden group"
                            >
                                {/* Image */}
                                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Bus className="w-20 h-20 text-gray-400" />
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getClassBadge(bus.class)}`}>
                                            {busClasses.find(bc => bc.id === bus.class)?.name}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">{bus.name}</h3>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <Users className="w-4 h-4" />
                                        <span>{bus.capacity} kursi</span>
                                    </div>

                                    {/* Facilities */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {bus.facilities.slice(0, 4).map(facilityId => {
                                            const facility = facilityIcons[facilityId];
                                            if (!facility) return null;
                                            const Icon = facility.icon;
                                            return (
                                                <div
                                                    key={facilityId}
                                                    className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                                                >
                                                    <Icon className="w-3 h-3" />
                                                    {facility.name}
                                                </div>
                                            );
                                        })}
                                        {bus.facilities.length > 4 && (
                                            <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                                +{bus.facilities.length - 4} lainnya
                                            </div>
                                        )}
                                    </div>

                                    {/* Price Range */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm text-gray-500">Harga mulai</span>
                                        <span className="font-bold text-primary-600">
                                            {formatPrice(bus.priceRange[0])}
                                        </span>
                                    </div>

                                    {/* CTA */}
                                    <motion.button
                                        onClick={() => {
                                            setSelectedBus(bus);
                                            setCurrentImageIndex(0);
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-primary-600 hover:text-white transition-all"
                                    >
                                        Lihat Detail
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredFleet.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-2">Tidak ada armada</h3>
                        <p className="text-gray-500">Tidak ada bus yang sesuai filter</p>
                    </motion.div>
                )}
            </div>

            {/* Bus Detail Modal */}
            <AnimatePresence>
                {selectedBus && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={() => setSelectedBus(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
                        >
                            {/* Gallery */}
                            <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-200 to-gray-300">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Bus className="w-32 h-32 text-gray-400" />
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedBus(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Gallery Nav */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {selectedBus.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-white w-6' : 'bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Gallery Arrows */}
                                <button
                                    onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : selectedBus.images.length - 1)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setCurrentImageIndex(prev => prev < selectedBus.images.length - 1 ? prev + 1 : 0)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getClassBadge(selectedBus.class)}`}>
                                        {busClasses.find(bc => bc.id === selectedBus.class)?.name}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBus.name}</h2>
                                        <p className="text-gray-500">{selectedBus.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Harga mulai</div>
                                        <div className="text-2xl font-bold text-primary-600">
                                            {formatPrice(selectedBus.priceRange[0])}
                                        </div>
                                    </div>
                                </div>

                                {/* Specifications */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-gray-500 mb-1">Kapasitas</div>
                                        <div className="font-bold text-gray-900">{selectedBus.capacity} Kursi</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-gray-500 mb-1">Mesin</div>
                                        <div className="font-bold text-gray-900">{selectedBus.specs.engine}</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-gray-500 mb-1">Tahun</div>
                                        <div className="font-bold text-gray-900">{selectedBus.specs.year}</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <div className="text-sm text-gray-500 mb-1">Konfigurasi</div>
                                        <div className="font-bold text-gray-900">{selectedBus.specs.seatConfig}</div>
                                    </div>
                                </div>

                                {/* Seat Layout */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Layout Kursi</h3>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="max-w-xs mx-auto">
                                            <div className="text-center text-sm text-gray-500 mb-2">Depan Bus</div>
                                            <div className="grid grid-cols-4 gap-1">
                                                {[...Array(16)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-8 rounded ${selectedBus.specs.seatConfig === '1-2' && i % 4 === 0
                                                                ? 'bg-transparent'
                                                                : 'bg-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-center text-sm text-gray-500 mt-2">Belakang Bus</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Facilities */}
                                <div className="mb-8">
                                    <h3 className="font-semibold text-gray-900 mb-3">Fasilitas</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {selectedBus.facilities.map(facilityId => {
                                            const facility = facilityIcons[facilityId];
                                            if (!facility) return null;
                                            const Icon = facility.icon;
                                            return (
                                                <div
                                                    key={facilityId}
                                                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                                                >
                                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                        <Icon className="w-5 h-5 text-primary-600" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{facility.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* CTA */}
                                <motion.button
                                    onClick={() => handleBookBus(selectedBus)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-all"
                                >
                                    Pesan Bus Ini
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Fleet;
