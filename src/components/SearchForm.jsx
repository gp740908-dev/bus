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
        <section id="search" className="relative py-20 bg-white">
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] p-8 md:p-12 border border-gray-100 -mt-24"
                >
                    {/* Header - Minimalist */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Book Your Journey
                        </h2>
                        <p className="text-gray-400 font-light text-sm tracking-wide uppercase">
                            Premium Travel Experience
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_1fr_1fr] gap-6 items-center">
                            {/* From */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                                    From
                                </label>
                                <div className="relative group">
                                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <select
                                        value={formData.from}
                                        onChange={(e) =>
                                            setFormData({ ...formData, from: e.target.value })
                                        }
                                        className="w-full pl-8 pr-10 py-3 bg-transparent border-b border-gray-200 focus:border-gray-900 outline-none appearance-none cursor-pointer transition-colors font-medium text-lg text-gray-900 placeholder-gray-300 rounded-none"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Swap Button - Minimal Circle */}
                            <motion.button
                                type="button"
                                onClick={handleSwap}
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                className="hidden lg:flex items-center justify-center w-10 h-10 border border-gray-200 rounded-full text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all mx-auto mt-6"
                            >
                                <ArrowRightLeft className="w-4 h-4" />
                            </motion.button>

                            {/* To */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                                    To
                                </label>
                                <div className="relative group">
                                    <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <select
                                        value={formData.to}
                                        onChange={(e) =>
                                            setFormData({ ...formData, to: e.target.value })
                                        }
                                        className="w-full pl-8 pr-10 py-3 bg-transparent border-b border-gray-200 focus:border-gray-900 outline-none appearance-none cursor-pointer transition-colors font-medium text-lg text-gray-900 placeholder-gray-300 rounded-none"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                                    Date
                                </label>
                                <div className="relative group">
                                    <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, date: e.target.value })
                                        }
                                        className="w-full pl-8 pr-4 py-3 bg-transparent border-b border-gray-200 focus:border-gray-900 outline-none transition-colors font-medium text-lg text-gray-900 rounded-none"
                                    />
                                </div>
                            </div>

                            {/* Passengers */}
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                                    Passengers
                                </label>
                                <div className="relative group">
                                    <Users className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                    <select
                                        value={formData.passengers}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                passengers: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full pl-8 pr-10 py-3 bg-transparent border-b border-gray-200 focus:border-gray-900 outline-none appearance-none cursor-pointer transition-colors font-medium text-lg text-gray-900 rounded-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Person{num > 1 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Search Button - Wide and Minimal */}
                        <div className="pt-4 flex justify-end">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full md:w-auto min-w-[240px] flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-base tracking-wide hover:bg-black transition-all shadow-xl shadow-gray-200"
                            >
                                <Search className="w-4 h-4" />
                                Search Tickets
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default SearchForm;
