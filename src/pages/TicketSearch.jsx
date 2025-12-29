import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Calendar,
    Users,
    Search,
    ArrowRightLeft,
    ChevronDown,
    Bus,
    ArrowRight
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const popularRoutes = [
    { from: 'jkt', to: 'bdg', fromName: 'Jakarta', toName: 'Bandung', price: 80000 },
    { from: 'jkt', to: 'sby', fromName: 'Jakarta', toName: 'Surabaya', price: 350000 },
    { from: 'jkt', to: 'ygk', fromName: 'Jakarta', toName: 'Yogyakarta', price: 280000 },
    { from: 'jkt', to: 'smg', fromName: 'Jakarta', toName: 'Semarang', price: 250000 },
    { from: 'bdg', to: 'sby', fromName: 'Bandung', toName: 'Surabaya', price: 300000 },
    { from: 'jkt', to: 'solo', fromName: 'Jakarta', toName: 'Solo', price: 260000 },
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const TicketSearch = () => {
    const navigate = useNavigate();
    const { cities, searchBuses } = useBooking();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: '',
        passengers: 1,
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.from) newErrors.from = 'Pilih kota asal';
        if (!formData.to) newErrors.to = 'Pilih kota tujuan';
        if (formData.from && formData.to && formData.from === formData.to) {
            newErrors.to = 'Kota tujuan harus berbeda';
        }
        if (!formData.date) newErrors.date = 'Pilih tanggal';

        // Check if date is not in the past
        if (formData.date) {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.date = 'Tanggal tidak boleh di masa lalu';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSwap = () => {
        setFormData(prev => ({
            ...prev,
            from: prev.to,
            to: prev.from,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        await searchBuses(formData);
        setIsLoading(false);

        navigate('/pesan-tiket/hasil');
    };

    const handlePopularRoute = (route) => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        const tomorrow = today.toISOString().split('T')[0];

        setFormData({
            from: route.from,
            to: route.to,
            date: tomorrow,
            passengers: 1,
        });
    };

    // Get tomorrow's date as minimum
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Pesan Tiket Bus
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Temukan dan pesan tiket bus ke berbagai kota di Indonesia dengan mudah dan cepat
                    </p>
                </motion.div>

                {/* Search Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12"
                >
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-start">
                            {/* From */}
                            <div className="lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Dari
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" />
                                    <select
                                        value={formData.from}
                                        onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                        className={`w-full pl-12 pr-10 py-4 bg-gray-50 border-2 rounded-xl focus:bg-white appearance-none cursor-pointer transition-all ${errors.from
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-primary-500'
                                            }`}
                                    >
                                        <option value="">Pilih Kota Asal</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.from && (
                                    <p className="text-red-500 text-sm mt-1">{errors.from}</p>
                                )}
                            </div>

                            {/* Swap Button */}
                            <div className="hidden lg:flex items-center justify-center lg:col-span-1 pt-8">
                                <motion.button
                                    type="button"
                                    onClick={handleSwap}
                                    whileHover={{ scale: 1.1, rotate: 180 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors"
                                >
                                    <ArrowRightLeft className="w-5 h-5" />
                                </motion.button>
                            </div>

                            {/* To */}
                            <div className="lg:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ke
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-500" />
                                    <select
                                        value={formData.to}
                                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                        className={`w-full pl-12 pr-10 py-4 bg-gray-50 border-2 rounded-xl focus:bg-white appearance-none cursor-pointer transition-all ${errors.to
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-primary-500'
                                            }`}
                                    >
                                        <option value="">Pilih Kota Tujuan</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.to && (
                                    <p className="text-red-500 text-sm mt-1">{errors.to}</p>
                                )}
                            </div>

                            {/* Date */}
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={formData.date}
                                        min={getMinDate()}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors.date
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-gray-200 focus:border-primary-500'
                                            }`}
                                    />
                                </div>
                                {errors.date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                                )}
                            </div>

                            {/* Passengers */}
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Penumpang
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        value={formData.passengers}
                                        onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                                        className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white appearance-none cursor-pointer transition-all"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Orang
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className="w-full md:w-auto md:min-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all mt-6 mx-auto disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Mencari...
                                </span>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Cari Bus
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Popular Routes */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Bus className="w-5 h-5 text-primary-600" />
                        Rute Populer
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {popularRoutes.map((route, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handlePopularRoute(route)}
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all text-left group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-gray-900">{route.fromName}</span>
                                        <ArrowRight className="w-4 h-4 text-gray-400" />
                                        <span className="font-semibold text-gray-900">{route.toName}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Mulai dari</span>
                                    <span className="text-primary-600 font-bold">{formatPrice(route.price)}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TicketSearch;
