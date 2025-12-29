import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Clock,
    Users,
    Filter,
    SortAsc,
    ChevronDown,
    ChevronUp,
    X,
    Wifi,
    Wind,
    Tv,
    Usb,
    Coffee,
    Bath,
    Armchair,
    Bed,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const facilityIcons = {
    ac: Wind,
    wifi: Wifi,
    toilet: Bath,
    usb: Usb,
    tv: Tv,
    snack: Coffee,
    blanket: Bed,
    recliner: Armchair,
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const BusListResults = () => {
    const navigate = useNavigate();
    const { searchData, searchResults, selectBus, cities, busClasses, facilities } = useBooking();

    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('time');
    const [filters, setFilters] = useState({
        priceRange: [0, 1000000],
        departureTime: [],
        busClass: [],
        facilities: [],
    });

    // Redirect if no search data
    if (!searchData.from || !searchData.to || !searchData.date) {
        navigate('/pesan-tiket');
        return null;
    }

    const fromCity = cities.find(c => c.id === searchData.from);
    const toCity = cities.find(c => c.id === searchData.to);

    // Time filter options
    const timeFilters = [
        { id: 'pagi', label: 'Pagi (06:00 - 12:00)', start: 6, end: 12 },
        { id: 'siang', label: 'Siang (12:00 - 18:00)', start: 12, end: 18 },
        { id: 'malam', label: 'Malam (18:00 - 24:00)', start: 18, end: 24 },
    ];

    // Filter and sort results
    const filteredResults = useMemo(() => {
        let results = [...searchResults];

        // Filter by price
        results = results.filter(
            bus => bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]
        );

        // Filter by departure time
        if (filters.departureTime.length > 0) {
            results = results.filter(bus => {
                const hour = parseInt(bus.departureTime.split(':')[0]);
                return filters.departureTime.some(timeId => {
                    const timeFilter = timeFilters.find(t => t.id === timeId);
                    return hour >= timeFilter.start && hour < timeFilter.end;
                });
            });
        }

        // Filter by bus class
        if (filters.busClass.length > 0) {
            results = results.filter(bus => filters.busClass.includes(bus.class));
        }

        // Filter by facilities
        if (filters.facilities.length > 0) {
            results = results.filter(bus =>
                filters.facilities.every(f => bus.facilities.includes(f))
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'time':
                results.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
                break;
            case 'duration':
                results.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
                break;
            default:
                break;
        }

        return results;
    }, [searchResults, filters, sortBy]);

    const handleSelectBus = (bus) => {
        selectBus(bus);
        navigate('/pesan-tiket/pilih-kursi');
    };

    const toggleFilter = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter(v => v !== value)
                : [...prev[type], value],
        }));
    };

    const clearFilters = () => {
        setFilters({
            priceRange: [0, 1000000],
            departureTime: [],
            busClass: [],
            facilities: [],
        });
    };

    const hasActiveFilters =
        filters.departureTime.length > 0 ||
        filters.busClass.length > 0 ||
        filters.facilities.length > 0;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Search Summary */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-6"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-center md:text-left">
                                <div className="text-lg font-bold text-gray-900">{fromCity?.name}</div>
                                <div className="text-sm text-gray-500">{fromCity?.terminal}</div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <div className="w-8 h-px bg-gray-300" />
                                <ArrowRight className="w-5 h-5" />
                                <div className="w-8 h-px bg-gray-300" />
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-lg font-bold text-gray-900">{toCity?.name}</div>
                                <div className="text-sm text-gray-500">{toCity?.terminal}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-500">{formatDate(searchData.date)}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">{searchData.passengers} Penumpang</span>
                            <button
                                onClick={() => navigate('/pesan-tiket')}
                                className="text-primary-600 font-medium hover:underline"
                            >
                                Ubah Pencarian
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar - Desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:block w-72 flex-shrink-0"
                    >
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900">Filter</h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-primary-600 hover:underline"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>

                            {/* Departure Time */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-700 mb-3">Waktu Keberangkatan</h4>
                                <div className="space-y-2">
                                    {timeFilters.map(time => (
                                        <label key={time.id} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.departureTime.includes(time.id)}
                                                onChange={() => toggleFilter('departureTime', time.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-primary-600"
                                            />
                                            <span className="text-sm text-gray-600">{time.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Bus Class */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-700 mb-3">Kelas Bus</h4>
                                <div className="space-y-2">
                                    {busClasses.map(bc => (
                                        <label key={bc.id} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.busClass.includes(bc.id)}
                                                onChange={() => toggleFilter('busClass', bc.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-primary-600"
                                            />
                                            <span className="text-sm text-gray-600">{bc.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Facilities */}
                            <div>
                                <h4 className="font-medium text-gray-700 mb-3">Fasilitas</h4>
                                <div className="space-y-2">
                                    {facilities.slice(0, 6).map(f => (
                                        <label key={f.id} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.facilities.includes(f.id)}
                                                onChange={() => toggleFilter('facilities', f.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-primary-600"
                                            />
                                            <span className="text-sm text-gray-600">{f.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results */}
                    <div className="flex-1">
                        {/* Sort & Filter Bar */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-gray-500">
                                {filteredResults.length} bus ditemukan
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium"
                                >
                                    <Filter className="w-4 h-4" />
                                    Filter
                                    {hasActiveFilters && (
                                        <span className="w-5 h-5 bg-primary-600 text-white rounded-full text-xs flex items-center justify-center">
                                            {filters.departureTime.length + filters.busClass.length + filters.facilities.length}
                                        </span>
                                    )}
                                </button>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white rounded-lg shadow-sm px-4 py-2 pr-10 text-sm font-medium cursor-pointer"
                                    >
                                        <option value="time">Waktu Berangkat</option>
                                        <option value="price-low">Harga Terendah</option>
                                        <option value="price-high">Harga Tertinggi</option>
                                        <option value="duration">Durasi Tercepat</option>
                                    </select>
                                    <SortAsc className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Bus Cards */}
                        <div className="space-y-4">
                            <AnimatePresence>
                                {filteredResults.map((bus, index) => (
                                    <motion.div
                                        key={bus.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ y: -4 }}
                                        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
                                    >
                                        <div className="p-5 md:p-6">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                {/* Left - Bus Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <h3 className="font-bold text-gray-900">{bus.name}</h3>
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${bus.class === 'eksekutif'
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : bus.class === 'bisnis'
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : 'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {bus.className}
                                                        </span>
                                                    </div>

                                                    {/* Time */}
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div>
                                                            <div className="text-2xl font-bold text-gray-900">{bus.departureTime}</div>
                                                            <div className="text-sm text-gray-500">{fromCity?.name}</div>
                                                        </div>
                                                        <div className="flex-1 flex items-center gap-2">
                                                            <div className="flex-1 border-t-2 border-dashed border-gray-200" />
                                                            <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                                                <Clock className="w-3 h-3" />
                                                                {bus.duration}
                                                            </div>
                                                            <div className="flex-1 border-t-2 border-dashed border-gray-200" />
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-gray-900">{bus.arrivalTime}</div>
                                                            <div className="text-sm text-gray-500">{toCity?.name}</div>
                                                        </div>
                                                    </div>

                                                    {/* Facilities */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {bus.facilities.slice(0, 5).map(facilityId => {
                                                            const Icon = facilityIcons[facilityId];
                                                            const facility = facilities.find(f => f.id === facilityId);
                                                            return (
                                                                <div
                                                                    key={facilityId}
                                                                    className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                                                                >
                                                                    {Icon && <Icon className="w-3 h-3" />}
                                                                    {facility?.name}
                                                                </div>
                                                            );
                                                        })}
                                                        {bus.facilities.length > 5 && (
                                                            <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                                                +{bus.facilities.length - 5} lainnya
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right - Price & CTA */}
                                                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-6 border-gray-100">
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                                            <Users className="w-4 h-4" />
                                                            {bus.availableSeats} kursi tersedia
                                                        </div>
                                                        <div className="text-2xl font-bold text-primary-600">
                                                            {formatPrice(bus.price)}
                                                        </div>
                                                        <div className="text-xs text-gray-500">/kursi</div>
                                                    </div>
                                                    <motion.button
                                                        onClick={() => handleSelectBus(bus)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                                                    >
                                                        Pilih
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {filteredResults.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white rounded-2xl p-12 text-center"
                                >
                                    <div className="text-gray-400 mb-4">
                                        <Filter className="w-16 h-16 mx-auto" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Tidak ada bus yang sesuai
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        Coba ubah filter atau pencarian Anda
                                    </p>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-primary-600 font-medium hover:underline"
                                        >
                                            Reset Filter
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Modal */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            onClick={() => setShowFilters(false)}
                        >
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto"
                            >
                                <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
                                    <h3 className="font-bold text-lg">Filter</h3>
                                    <button onClick={() => setShowFilters(false)}>
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-4 space-y-6">
                                    {/* Time Filters */}
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3">Waktu Keberangkatan</h4>
                                        <div className="space-y-2">
                                            {timeFilters.map(time => (
                                                <label key={time.id} className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.departureTime.includes(time.id)}
                                                        onChange={() => toggleFilter('departureTime', time.id)}
                                                        className="w-4 h-4 rounded border-gray-300 text-primary-600"
                                                    />
                                                    <span className="text-sm text-gray-600">{time.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bus Class */}
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3">Kelas Bus</h4>
                                        <div className="space-y-2">
                                            {busClasses.map(bc => (
                                                <label key={bc.id} className="flex items-center gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.busClass.includes(bc.id)}
                                                        onChange={() => toggleFilter('busClass', bc.id)}
                                                        className="w-4 h-4 rounded border-gray-300 text-primary-600"
                                                    />
                                                    <span className="text-sm text-gray-600">{bc.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Facilities */}
                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-3">Fasilitas</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {facilities.map(f => (
                                                <label key={f.id} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.facilities.includes(f.id)}
                                                        onChange={() => toggleFilter('facilities', f.id)}
                                                        className="w-4 h-4 rounded border-gray-300 text-primary-600"
                                                    />
                                                    <span className="text-sm text-gray-600">{f.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="sticky bottom-0 bg-white p-4 border-t flex gap-3">
                                    <button
                                        onClick={clearFilters}
                                        className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-medium"
                                    >
                                        Terapkan
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BusListResults;
