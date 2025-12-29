import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    Copy,
    Clock,
    ChevronDown,
    ChevronUp,
    Building,
    Smartphone,
    CreditCard,
    QrCode,
    AlertCircle
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const PaymentPage = () => {
    const navigate = useNavigate();
    const {
        selectedBus,
        selectedSeats,
        passengers,
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedPaymentOption,
        setSelectedPaymentOption,
        calculateTotalPrice,
        createBooking,
    } = useBooking();

    const [isLoading, setIsLoading] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
    const [copied, setCopied] = useState(false);

    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/pesan-tiket');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    // Redirect if no data
    if (!selectedBus || selectedSeats.length === 0 || passengers.length === 0) {
        navigate('/pesan-tiket');
        return null;
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        setSelectedPaymentOption(null);
    };

    const handlePaymentOptionSelect = (option) => {
        setSelectedPaymentOption(option);
    };

    const handleCopyAccount = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConfirmPayment = async () => {
        if (!selectedPaymentMethod || !selectedPaymentOption) return;

        setIsLoading(true);
        await createBooking();
        setIsLoading(false);
        navigate('/pesan-tiket/konfirmasi');
    };

    const getMethodIcon = (methodId) => {
        switch (methodId) {
            case 'bank_transfer': return Building;
            case 'ewallet': return Smartphone;
            case 'va': return CreditCard;
            case 'qris': return QrCode;
            default: return CreditCard;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-32">
            <div className="max-w-4xl mx-auto px-4">
                {/* Timer Warning */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${timeLeft < 300 ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'
                        }`}
                >
                    <Clock className="w-5 h-5" />
                    <div className="flex-1">
                        <span className="font-medium">Selesaikan pembayaran dalam </span>
                        <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
                    </div>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <button
                        onClick={() => navigate('/pesan-tiket/detail-penumpang')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
                        <p className="text-gray-500">Pilih metode pembayaran</p>
                    </div>
                </motion.div>

                {/* Mobile Summary Toggle */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowSummary(!showSummary)}
                    className="w-full lg:hidden bg-white rounded-xl p-4 mb-4 shadow-sm flex items-center justify-between"
                >
                    <div>
                        <span className="text-gray-500 text-sm">Total Pembayaran</span>
                        <div className="font-bold text-lg text-primary-600">
                            {formatPrice(calculateTotalPrice())}
                        </div>
                    </div>
                    {showSummary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </motion.button>

                {/* Mobile Summary */}
                <AnimatePresence>
                    {showSummary && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden bg-white rounded-xl p-4 mb-4 shadow-sm overflow-hidden"
                        >
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Rute</span>
                                    <span>{selectedBus.from?.name} → {selectedBus.to?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Bus</span>
                                    <span>{selectedBus.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Kursi</span>
                                    <span>{selectedSeats.join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Penumpang</span>
                                    <span>{passengers.length} orang</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Payment Methods */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        {paymentMethods.map((method) => {
                            const Icon = getMethodIcon(method.id);
                            const isSelected = selectedPaymentMethod?.id === method.id;

                            return (
                                <div key={method.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                    {/* Method Header */}
                                    <button
                                        onClick={() => handlePaymentMethodSelect(method)}
                                        className={`w-full p-5 flex items-center gap-4 text-left transition-colors ${isSelected ? 'bg-primary-50' : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{method.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {method.options.length} pilihan tersedia
                                            </p>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary-600 bg-primary-600' : 'border-gray-300'
                                            }`}>
                                            {isSelected && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    </button>

                                    {/* Method Options */}
                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t overflow-hidden"
                                            >
                                                <div className="p-5 space-y-3">
                                                    {method.options.map((option) => (
                                                        <button
                                                            key={option.id}
                                                            onClick={() => handlePaymentOptionSelect(option)}
                                                            className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 text-left transition-all ${selectedPaymentOption?.id === option.id
                                                                    ? 'border-primary-600 bg-primary-50'
                                                                    : 'border-gray-200 hover:border-gray-300'
                                                                }`}
                                                        >
                                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <span className="text-xs font-bold text-gray-600">
                                                                    {option.name.slice(0, 3).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="font-medium text-gray-900">{option.name}</div>
                                                                {option.account && (
                                                                    <div className="text-sm text-gray-500">
                                                                        {option.account}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentOption?.id === option.id
                                                                    ? 'border-primary-600 bg-primary-600'
                                                                    : 'border-gray-300'
                                                                }`}>
                                                                {selectedPaymentOption?.id === option.id && (
                                                                    <Check className="w-3 h-3 text-white" />
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Payment Instructions */}
                                                {selectedPaymentOption && (
                                                    <div className="px-5 pb-5">
                                                        <div className="bg-gray-50 rounded-xl p-4">
                                                            <h4 className="font-semibold text-gray-900 mb-3">
                                                                Instruksi Pembayaran
                                                            </h4>

                                                            {method.id === 'bank_transfer' && (
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                                                        <div>
                                                                            <div className="text-sm text-gray-500">Nomor Rekening</div>
                                                                            <div className="font-bold text-lg">{selectedPaymentOption.account}</div>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => handleCopyAccount(selectedPaymentOption.account)}
                                                                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                                                                        >
                                                                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                                                        </button>
                                                                    </div>
                                                                    <div className="p-3 bg-white rounded-lg">
                                                                        <div className="text-sm text-gray-500">Atas Nama</div>
                                                                        <div className="font-medium">{selectedPaymentOption.holder}</div>
                                                                    </div>
                                                                    <div className="p-3 bg-white rounded-lg">
                                                                        <div className="text-sm text-gray-500">Jumlah Transfer</div>
                                                                        <div className="font-bold text-lg text-primary-600">
                                                                            {formatPrice(calculateTotalPrice())}
                                                                        </div>
                                                                    </div>
                                                                    <ol className="text-sm text-gray-600 space-y-2 mt-4">
                                                                        <li>1. Transfer ke rekening di atas</li>
                                                                        <li>2. Transfer sesuai nominal yang tertera</li>
                                                                        <li>3. Simpan bukti transfer</li>
                                                                        <li>4. Klik tombol "Konfirmasi Pembayaran"</li>
                                                                    </ol>
                                                                </div>
                                                            )}

                                                            {(method.id === 'ewallet' || method.id === 'qris') && (
                                                                <div className="text-center">
                                                                    <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                                                                        <QrCode className="w-24 h-24 text-gray-400" />
                                                                    </div>
                                                                    <p className="text-sm text-gray-600">
                                                                        Scan QR code dengan aplikasi {selectedPaymentOption.name}
                                                                    </p>
                                                                    <div className="font-bold text-lg text-primary-600 mt-2">
                                                                        {formatPrice(calculateTotalPrice())}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {method.id === 'va' && (
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                                                        <div>
                                                                            <div className="text-sm text-gray-500">Nomor Virtual Account</div>
                                                                            <div className="font-bold text-lg">
                                                                                {selectedPaymentOption.vaNumber}0001234567
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => handleCopyAccount(`${selectedPaymentOption.vaNumber}0001234567`)}
                                                                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                                                                        >
                                                                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                                                        </button>
                                                                    </div>
                                                                    <div className="p-3 bg-white rounded-lg">
                                                                        <div className="text-sm text-gray-500">Jumlah Pembayaran</div>
                                                                        <div className="font-bold text-lg text-primary-600">
                                                                            {formatPrice(calculateTotalPrice())}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}

                        {/* Info */}
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800">
                                Pastikan jumlah transfer sesuai hingga digit terakhir agar pembayaran dapat diverifikasi secara otomatis.
                            </p>
                        </div>
                    </motion.div>

                    {/* Desktop Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:block lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                            <h3 className="font-bold text-gray-900 mb-4">Ringkasan</h3>

                            <div className="space-y-3 pb-4 mb-4 border-b text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Rute</span>
                                    <span className="text-right">{selectedBus.from?.name} → {selectedBus.to?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Bus</span>
                                    <span>{selectedBus.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Kursi</span>
                                    <span>{selectedSeats.join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Penumpang</span>
                                    <span>{passengers.length} orang</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-medium text-gray-700">Total</span>
                                <span className="text-2xl font-bold text-primary-600">
                                    {formatPrice(calculateTotalPrice())}
                                </span>
                            </div>

                            <motion.button
                                onClick={handleConfirmPayment}
                                disabled={!selectedPaymentMethod || !selectedPaymentOption || isLoading}
                                whileHover={{ scale: selectedPaymentOption ? 1.02 : 1 }}
                                whileTap={{ scale: selectedPaymentOption ? 0.98 : 1 }}
                                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${selectedPaymentOption && !isLoading
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 hover:bg-primary-700'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Memproses...
                                    </span>
                                ) : (
                                    'Konfirmasi Pembayaran'
                                )}
                            </motion.button>

                            {!selectedPaymentOption && (
                                <p className="text-center text-sm text-gray-500 mt-3">
                                    Pilih metode pembayaran untuk melanjutkan
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Mobile CTA */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden">
                    <motion.button
                        onClick={handleConfirmPayment}
                        disabled={!selectedPaymentMethod || !selectedPaymentOption || isLoading}
                        whileHover={{ scale: selectedPaymentOption ? 1.02 : 1 }}
                        whileTap={{ scale: selectedPaymentOption ? 0.98 : 1 }}
                        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${selectedPaymentOption && !isLoading
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                    >
                        {isLoading ? 'Memproses...' : 'Konfirmasi Pembayaran'}
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
