import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Ticket,
    CheckCircle,
    Clock,
    XCircle,
    MapPin,
    Calendar,
    Bus,
    Users,
    Download,
    Printer,
    X,
    Phone,
    Mail
} from 'lucide-react';

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

// Mock booking data
const mockBookings = {
    'CPG12345678': {
        code: 'CPG12345678',
        status: 'paid',
        createdAt: '2024-12-28T10:00:00',
        phone: '081234567890',
        email: 'john@example.com',
        bus: {
            name: 'Cipeng Eksekutif 3',
            className: 'Eksekutif',
            from: { name: 'Jakarta', terminal: 'Terminal Pulogebang' },
            to: { name: 'Surabaya', terminal: 'Terminal Purabaya' },
            date: '2024-12-30',
            departureTime: '20:00',
            arrivalTime: '06:00',
            duration: '10j',
        },
        seats: ['5A', '5B'],
        passengers: [
            { fullName: 'John Doe', idNumber: '3201234567890001', seatId: '5A' },
            { fullName: 'Jane Doe', idNumber: '3201234567890002', seatId: '5B' },
        ],
        payment: {
            subtotal: 700000,
            discount: 70000,
            total: 630000,
        },
    },
    'CPG87654321': {
        code: 'CPG87654321',
        status: 'pending',
        createdAt: '2024-12-29T08:00:00',
        phone: '089876543210',
        email: 'test@example.com',
        bus: {
            name: 'Cipeng Bisnis 2',
            className: 'Bisnis',
            from: { name: 'Bandung', terminal: 'Terminal Leuwi Panjang' },
            to: { name: 'Yogyakarta', terminal: 'Terminal Giwangan' },
            date: '2024-12-31',
            departureTime: '08:00',
            arrivalTime: '16:00',
            duration: '8j',
        },
        seats: ['3C'],
        passengers: [
            { fullName: 'Test User', idNumber: '3201234567890003', seatId: '3C' },
        ],
        payment: {
            subtotal: 330000,
            discount: 0,
            total: 330000,
        },
    },
};

const CheckTicket = () => {
    const [bookingCode, setBookingCode] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!bookingCode.trim()) {
            setError('Masukkan kode booking');
            return;
        }
        if (!contactInfo.trim()) {
            setError('Masukkan nomor telepon atau email');
            return;
        }

        setError('');
        setIsSearching(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const booking = mockBookings[bookingCode.toUpperCase()];

        if (booking && (booking.phone === contactInfo || booking.email === contactInfo)) {
            setSearchResult(booking);
        } else {
            setError('Tiket tidak ditemukan. Pastikan kode booking dan kontak sudah benar.');
            setSearchResult(null);
        }

        setIsSearching(false);
    };

    const handleCancelBooking = async () => {
        // Simulate cancel
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSearchResult(prev => ({ ...prev, status: 'cancelled' }));
        setShowCancelModal(false);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'paid':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Lunas
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        Menunggu Pembayaran
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        <XCircle className="w-4 h-4" />
                        Dibatalkan
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                        <Ticket className="w-8 h-8 text-primary-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Cek Tiket</h1>
                    <p className="text-gray-500">
                        Masukkan kode booking untuk melihat detail tiket Anda
                    </p>
                </motion.div>

                {/* Search Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8"
                >
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kode Booking
                            </label>
                            <input
                                type="text"
                                value={bookingCode}
                                onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
                                placeholder="Contoh: CPG12345678"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white transition-all uppercase"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nomor Telepon atau Email
                            </label>
                            <input
                                type="text"
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}
                                placeholder="Masukkan nomor telepon atau email"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white transition-all"
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={isSearching}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all disabled:opacity-70"
                        >
                            {isSearching ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Mencari...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Cari Tiket
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-4">
                        Demo: Coba kode <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">CPG12345678</span> dengan telepon <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">081234567890</span>
                    </p>
                </motion.div>

                {/* Search Result */}
                <AnimatePresence>
                    {searchResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden"
                        >
                            {/* Status Header */}
                            <div className="p-6 border-b flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Kode Booking</div>
                                    <div className="text-2xl font-bold text-gray-900">{searchResult.code}</div>
                                </div>
                                {getStatusBadge(searchResult.status)}
                            </div>

                            {/* Trip Details */}
                            <div className="p-6 space-y-6">
                                {/* Route */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Rute</div>
                                        <div className="font-medium text-gray-900">
                                            {searchResult.bus.from.name} → {searchResult.bus.to.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {searchResult.bus.from.terminal} → {searchResult.bus.to.terminal}
                                        </div>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Tanggal & Waktu</div>
                                        <div className="font-medium text-gray-900">
                                            {formatDate(searchResult.bus.date)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {searchResult.bus.departureTime} - {searchResult.bus.arrivalTime}
                                        </div>
                                    </div>
                                </div>

                                {/* Bus */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Bus className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Bus</div>
                                        <div className="font-medium text-gray-900">{searchResult.bus.name}</div>
                                        <div className="text-sm text-gray-500">{searchResult.bus.className}</div>
                                    </div>
                                </div>

                                {/* Passengers */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-500 mb-2">Penumpang</div>
                                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                            {searchResult.passengers.map((passenger, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <div>
                                                        <div className="font-medium text-gray-900">{passenger.fullName}</div>
                                                        <div className="text-sm text-gray-500">ID: {passenger.idNumber}</div>
                                                    </div>
                                                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-medium">
                                                        Kursi {passenger.seatId}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span>{formatPrice(searchResult.payment.subtotal)}</span>
                                    </div>
                                    {searchResult.payment.discount > 0 && (
                                        <div className="flex justify-between text-sm mb-2 text-green-600">
                                            <span>Diskon</span>
                                            <span>-{formatPrice(searchResult.payment.discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                                        <span>Total</span>
                                        <span className="text-primary-600">{formatPrice(searchResult.payment.total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-6 bg-gray-50 border-t flex flex-wrap gap-3">
                                {searchResult.status === 'paid' && (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
                                        >
                                            <Download className="w-5 h-5" />
                                            Download E-Ticket
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-gray-300"
                                        >
                                            <Printer className="w-5 h-5" />
                                            Print
                                        </motion.button>
                                    </>
                                )}
                                {searchResult.status === 'pending' && (
                                    <motion.button
                                        onClick={() => setShowCancelModal(true)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-medium hover:bg-red-100"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Batalkan Pesanan
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Cancel Modal */}
                <AnimatePresence>
                    {showCancelModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                            onClick={() => setShowCancelModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl p-6 max-w-md w-full"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold">Batalkan Pesanan?</h3>
                                    <button onClick={() => setShowCancelModal(false)}>
                                        <X className="w-6 h-6 text-gray-400" />
                                    </button>
                                </div>
                                <p className="text-gray-600 mb-6">
                                    Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini tidak dapat dibatalkan.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowCancelModal(false)}
                                        className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium"
                                    >
                                        Tidak
                                    </button>
                                    <button
                                        onClick={handleCancelBooking}
                                        className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium"
                                    >
                                        Ya, Batalkan
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

export default CheckTicket;
