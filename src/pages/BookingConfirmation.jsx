import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle,
    Clock,
    Copy,
    Check,
    Download,
    RefreshCw,
    Bus,
    Calendar,
    MapPin,
    Users,
    CreditCard,
    ArrowRight
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

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

const BookingConfirmation = () => {
    const navigate = useNavigate();
    const { booking, confirmPayment, resetBooking } = useBooking();
    const [copied, setCopied] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    // Redirect if no booking
    if (!booking) {
        navigate('/pesan-tiket');
        return null;
    }

    const handleCopyCode = () => {
        navigator.clipboard.writeText(booking.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConfirmPayment = async () => {
        setIsConfirming(true);
        await confirmPayment();
        setIsConfirming(false);
    };

    const handleNewBooking = () => {
        resetBooking();
        navigate('/pesan-tiket');
    };

    const isPaid = booking.status === 'paid';

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-2xl mx-auto px-4">
                {/* Success Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${isPaid ? 'bg-green-100' : 'bg-orange-100'
                            }`}
                    >
                        {isPaid ? (
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        ) : (
                            <Clock className="w-10 h-10 text-orange-600" />
                        )}
                    </motion.div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {isPaid ? 'Pembayaran Berhasil!' : 'Menunggu Pembayaran'}
                    </h1>
                    <p className="text-gray-500">
                        {isPaid
                            ? 'Tiket Anda sudah siap. Silakan download e-ticket.'
                            : 'Silakan selesaikan pembayaran sesuai instruksi.'
                        }
                    </p>
                </motion.div>

                {/* Booking Code */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-sm p-6 mb-6 text-center"
                >
                    <div className="text-sm text-gray-500 mb-2">Kode Booking</div>
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-3xl md:text-4xl font-bold text-gray-900 tracking-wider">
                            {booking.code}
                        </span>
                        <button
                            onClick={handleCopyCode}
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                            {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                        </button>
                    </div>
                    {copied && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-green-600 text-sm mt-2"
                        >
                            Kode berhasil disalin!
                        </motion.p>
                    )}
                </motion.div>

                {/* Payment Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`rounded-2xl p-4 mb-6 ${isPaid ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${isPaid ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`} />
                        <span className={`font-medium ${isPaid ? 'text-green-700' : 'text-orange-700'}`}>
                            Status: {isPaid ? 'Lunas' : 'Menunggu Pembayaran'}
                        </span>
                    </div>
                </motion.div>

                {/* Booking Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm p-6 mb-6"
                >
                    <h3 className="font-bold text-gray-900 mb-4">Detail Pemesanan</h3>

                    <div className="space-y-4">
                        {/* Route */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Rute</div>
                                <div className="font-medium text-gray-900">
                                    {booking.bus.from?.name} → {booking.bus.to?.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {booking.bus.from?.terminal} → {booking.bus.to?.terminal}
                                </div>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Tanggal & Waktu</div>
                                <div className="font-medium text-gray-900">
                                    {formatDate(booking.bus.date)}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {booking.bus.departureTime} - {booking.bus.arrivalTime} ({booking.bus.duration})
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
                                <div className="font-medium text-gray-900">{booking.bus.name}</div>
                                <div className="text-sm text-gray-500">{booking.bus.className}</div>
                            </div>
                        </div>

                        {/* Seats */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Kursi</div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {booking.seats.map(seat => (
                                        <span
                                            key={seat}
                                            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-lg text-sm font-medium"
                                        >
                                            {seat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Passengers */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <CreditCard className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-2">Penumpang</div>
                                {booking.passengers.map((passenger, index) => (
                                    <div key={index} className="flex justify-between text-sm py-1">
                                        <span className="text-gray-900">{passenger.fullName}</span>
                                        <span className="text-gray-500">Kursi {passenger.seatId}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="mt-6 pt-4 border-t">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="text-gray-900">{formatPrice(booking.payment.subtotal)}</span>
                            </div>
                            {booking.payment.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Diskon ({booking.payment.promoCode})</span>
                                    <span>-{formatPrice(booking.payment.discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-bold pt-2">
                                <span className="text-gray-900">Total</span>
                                <span className="text-primary-600">{formatPrice(booking.payment.total)}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                >
                    {isPaid ? (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30"
                        >
                            <Download className="w-5 h-5" />
                            Download E-Ticket
                        </motion.button>
                    ) : (
                        <motion.button
                            onClick={handleConfirmPayment}
                            disabled={isConfirming}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30 disabled:opacity-70"
                        >
                            {isConfirming ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Mengkonfirmasi...
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-5 h-5" />
                                    Cek Status Pembayaran
                                </>
                            )}
                        </motion.button>
                    )}

                    <motion.button
                        onClick={handleNewBooking}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:border-primary-500 hover:text-primary-600 transition-all"
                    >
                        Pesan Tiket Lagi
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    <Link
                        to="/"
                        className="block text-center text-gray-500 hover:text-gray-700 py-2"
                    >
                        Kembali ke Beranda
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
