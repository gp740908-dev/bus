import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Info,
    Check
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const SeatSelection = () => {
    const navigate = useNavigate();
    const {
        selectedBus,
        seats,
        selectedSeats,
        toggleSeatSelection,
        calculateTotalPrice,
        searchData,
    } = useBooking();

    // Redirect if no bus selected
    if (!selectedBus) {
        navigate('/pesan-tiket');
        return null;
    }

    // Group seats by rows
    const seatsByRow = seats.reduce((acc, seat) => {
        if (!acc[seat.row]) acc[seat.row] = [];
        acc[seat.row].push(seat);
        return acc;
    }, {});

    const getSeatColor = (seat) => {
        if (seat.isBooked) return 'bg-gray-300 cursor-not-allowed';
        if (selectedSeats.includes(seat.id)) return 'bg-primary-600 text-white';
        return 'bg-gray-100 hover:bg-primary-100 cursor-pointer';
    };

    const handleContinue = () => {
        if (selectedSeats.length === 0) return;
        // Navigate to passenger details (Part 2)
        navigate('/pesan-tiket/detail-penumpang');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-32">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <button
                        onClick={() => navigate('/pesan-tiket/hasil')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Pilih Kursi</h1>
                        <p className="text-gray-500">{selectedBus.name} • {selectedBus.className}</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Seat Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
                            {/* Legend */}
                            <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                                    <span className="text-sm text-gray-600">Tersedia</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-primary-600 rounded-lg" />
                                    <span className="text-sm text-gray-600">Dipilih</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-lg" />
                                    <span className="text-sm text-gray-600">Terisi</span>
                                </div>
                            </div>

                            {/* Bus Front */}
                            <div className="text-center mb-6">
                                <div className="inline-block bg-gray-200 text-gray-600 px-6 py-2 rounded-t-3xl text-sm font-medium">
                                    Depan Bus / Sopir
                                </div>
                            </div>

                            {/* Seat Grid */}
                            <div className="max-w-md mx-auto">
                                {/* Column Headers */}
                                <div className="grid grid-cols-[1fr_40px_1fr_40px_1fr_40px_1fr] gap-2 mb-4">
                                    <div className="text-center text-sm font-medium text-gray-500">A</div>
                                    <div className="text-center text-sm font-medium text-gray-500">B</div>
                                    <div /> {/* Aisle */}
                                    <div className="text-center text-sm font-medium text-gray-500">C</div>
                                    <div className="text-center text-sm font-medium text-gray-500">D</div>
                                </div>

                                {/* Seat Rows */}
                                <div className="space-y-2">
                                    {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => (
                                        <div
                                            key={rowNum}
                                            className="grid grid-cols-[1fr_1fr_40px_1fr_1fr] gap-2 items-center"
                                        >
                                            {/* Left side seats (A, B) */}
                                            {rowSeats.slice(0, 2).map(seat => (
                                                <motion.button
                                                    key={seat.id}
                                                    whileHover={{ scale: seat.isBooked ? 1 : 1.05 }}
                                                    whileTap={{ scale: seat.isBooked ? 1 : 0.95 }}
                                                    onClick={() => toggleSeatSelection(seat.id)}
                                                    disabled={seat.isBooked}
                                                    className={`h-12 rounded-lg font-medium text-sm flex items-center justify-center transition-all ${getSeatColor(seat)}`}
                                                >
                                                    {selectedSeats.includes(seat.id) ? (
                                                        <Check className="w-5 h-5" />
                                                    ) : (
                                                        seat.id
                                                    )}
                                                </motion.button>
                                            ))}

                                            {/* Aisle with row number */}
                                            <div className="text-center text-xs text-gray-400 font-medium">
                                                {rowNum}
                                            </div>

                                            {/* Right side seats (C, D) */}
                                            {rowSeats.slice(2, 4).map(seat => (
                                                <motion.button
                                                    key={seat.id}
                                                    whileHover={{ scale: seat.isBooked ? 1 : 1.05 }}
                                                    whileTap={{ scale: seat.isBooked ? 1 : 0.95 }}
                                                    onClick={() => toggleSeatSelection(seat.id)}
                                                    disabled={seat.isBooked}
                                                    className={`h-12 rounded-lg font-medium text-sm flex items-center justify-center transition-all ${getSeatColor(seat)}`}
                                                >
                                                    {selectedSeats.includes(seat.id) ? (
                                                        <Check className="w-5 h-5" />
                                                    ) : (
                                                        seat.id
                                                    )}
                                                </motion.button>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Bus Back */}
                                <div className="text-center mt-6">
                                    <div className="inline-block bg-gray-200 text-gray-600 px-6 py-2 rounded-b-3xl text-sm font-medium">
                                        Belakang Bus
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex items-start gap-3 mt-8 p-4 bg-blue-50 rounded-xl">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-800">
                                    Pilih {searchData.passengers} kursi sesuai jumlah penumpang.
                                    Anda dapat memilih kursi yang berbeda jika ingin mengganti pilihan.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Booking Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-3xl shadow-sm p-6 sticky top-28">
                            <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pemesanan</h3>

                            {/* Bus Info */}
                            <div className="pb-4 mb-4 border-b">
                                <div className="text-sm text-gray-500 mb-1">{selectedBus.from?.name} → {selectedBus.to?.name}</div>
                                <div className="font-medium text-gray-900">{selectedBus.name}</div>
                                <div className="text-sm text-gray-500">{selectedBus.departureTime} - {selectedBus.arrivalTime}</div>
                            </div>

                            {/* Selected Seats */}
                            <div className="pb-4 mb-4 border-b">
                                <div className="text-sm text-gray-500 mb-2">Kursi Dipilih</div>
                                {selectedSeats.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSeats.map(seatId => (
                                            <span
                                                key={seatId}
                                                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-medium"
                                            >
                                                {seatId}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">Belum ada kursi dipilih</p>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="pb-4 mb-4 border-b">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-500">Harga per kursi</span>
                                    <span className="text-gray-900">{formatPrice(selectedBus.price)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Jumlah kursi</span>
                                    <span className="text-gray-900">{selectedSeats.length} kursi</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="font-medium text-gray-700">Total</span>
                                <span className="text-2xl font-bold text-primary-600">
                                    {formatPrice(calculateTotalPrice())}
                                </span>
                            </div>

                            {/* Continue Button */}
                            <motion.button
                                onClick={handleContinue}
                                disabled={selectedSeats.length === 0}
                                whileHover={{ scale: selectedSeats.length > 0 ? 1.02 : 1 }}
                                whileTap={{ scale: selectedSeats.length > 0 ? 0.98 : 1 }}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-lg transition-all ${selectedSeats.length > 0
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 hover:bg-primary-700'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Lanjutkan
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>

                            {selectedSeats.length === 0 && (
                                <p className="text-center text-sm text-gray-500 mt-3">
                                    Pilih minimal 1 kursi untuk melanjutkan
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
