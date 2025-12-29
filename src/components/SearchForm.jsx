import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Calendar,
    Users,
    Search,
    ArrowRightLeft,
    ChevronDown,
} from 'lucide-react';

const cities = [
    'Jakarta',
    'Bandung',
    'Surabaya',
    'Semarang',
    'Yogyakarta',
    'Malang',
    'Solo',
    'Cirebon',
];

const SearchForm = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: '',
        passengers: 1,
    });

    const handleSwap = () => {
        setFormData((prev) => ({
            ...prev,
            from: prev.to,
            to: prev.from,
        }));
    };

    return (
        <section id="search" className="relative py-20 bg-gray-50">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 -mt-32"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Cari Tiket Bus
                        </h2>
                        <p className="text-gray-500">
                            Temukan jadwal dan pesan tiket untuk perjalanan Anda
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                            {/* From */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="relative lg:col-span-1"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Dari
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" />
                                    <select
                                        value={formData.from}
                                        onChange={(e) =>
                                            setFormData({ ...formData, from: e.target.value })
                                        }
                                        className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 appearance-none cursor-pointer transition-all"
                                    >
                                        <option value="">Pilih Kota</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </motion.div>

                            {/* Swap Button */}
                            <motion.button
                                type="button"
                                onClick={handleSwap}
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                className="hidden lg:flex items-center justify-center w-12 h-12 bg-primary-50 rounded-full text-primary-600 hover:bg-primary-100 transition-colors mx-auto mb-2"
                            >
                                <ArrowRightLeft className="w-5 h-5" />
                            </motion.button>

                            {/* To */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="relative lg:col-span-1"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ke
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-500" />
                                    <select
                                        value={formData.to}
                                        onChange={(e) =>
                                            setFormData({ ...formData, to: e.target.value })
                                        }
                                        className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 appearance-none cursor-pointer transition-all"
                                    >
                                        <option value="">Pilih Kota</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </motion.div>

                            {/* Date */}
                            <motion.div whileHover={{ scale: 1.01 }} className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, date: e.target.value })
                                        }
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
                                    />
                                </div>
                            </motion.div>

                            {/* Passengers */}
                            <motion.div whileHover={{ scale: 1.01 }} className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Penumpang
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        value={formData.passengers}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                passengers: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 appearance-none cursor-pointer transition-all"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Penumpang
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Search Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full md:w-auto md:min-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all mx-auto"
                        >
                            <Search className="w-5 h-5" />
                            Cari Tiket
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default SearchForm;
