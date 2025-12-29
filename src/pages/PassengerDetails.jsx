import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    User,
    CreditCard,
    Phone,
    Mail,
    Tag,
    Check,
    X,
    ChevronDown
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

const idTypes = [
    { id: 'ktp', name: 'KTP' },
    { id: 'sim', name: 'SIM' },
    { id: 'passport', name: 'Passport' },
];

const PassengerDetails = () => {
    const navigate = useNavigate();
    const {
        selectedBus,
        selectedSeats,
        passengers,
        initializePassengers,
        updatePassenger,
        promoCode,
        promoDiscount,
        applyPromoCode,
        calculateSubtotal,
        calculateDiscount,
        calculateTotalPrice,
    } = useBooking();

    const [promoInput, setPromoInput] = useState('');
    const [promoError, setPromoError] = useState('');
    const [promoSuccess, setPromoSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedSeats.length > 0) {
            initializePassengers();
        }
    }, []);

    // Redirect if no bus/seats selected
    if (!selectedBus || selectedSeats.length === 0) {
        navigate('/pesan-tiket');
        return null;
    }

    const validateForm = () => {
        const newErrors = {};

        passengers.forEach((passenger, index) => {
            if (!passenger.fullName.trim()) {
                newErrors[`${index}-fullName`] = 'Nama lengkap wajib diisi';
            }
            if (!passenger.idNumber.trim()) {
                newErrors[`${index}-idNumber`] = 'Nomor identitas wajib diisi';
            } else if (passenger.idType === 'ktp' && !/^\d{16}$/.test(passenger.idNumber)) {
                newErrors[`${index}-idNumber`] = 'Nomor KTP harus 16 digit';
            }
            if (index === 0) {
                if (!passenger.phone.trim()) {
                    newErrors[`${index}-phone`] = 'Nomor telepon wajib diisi';
                }
                if (!passenger.email.trim()) {
                    newErrors[`${index}-email`] = 'Email wajib diisi';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
                    newErrors[`${index}-email`] = 'Format email tidak valid';
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleApplyPromo = () => {
        if (!promoInput.trim()) return;

        const success = applyPromoCode(promoInput);
        if (success) {
            setPromoSuccess(true);
            setPromoError('');
        } else {
            setPromoError('Kode promo tidak valid');
            setPromoSuccess(false);
        }
    };

    const handleContinue = () => {
        if (!validateForm()) return;
        navigate('/pesan-tiket/pembayaran');
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
                        onClick={() => navigate('/pesan-tiket/pilih-kursi')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Data Penumpang</h1>
                        <p className="text-gray-500">Isi data penumpang untuk tiket Anda</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Passenger Forms */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {passengers.map((passenger, index) => (
                            <div key={passenger.id} className="bg-white rounded-2xl shadow-sm p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Penumpang {index + 1}</h3>
                                        <p className="text-sm text-gray-500">Kursi {passenger.seatId}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={passenger.fullName}
                                            onChange={(e) => updatePassenger(index, 'fullName', e.target.value)}
                                            placeholder="Sesuai KTP/SIM/Passport"
                                            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors[`${index}-fullName`]
                                                    ? 'border-red-500'
                                                    : 'border-gray-200 focus:border-primary-500'
                                                }`}
                                        />
                                        {errors[`${index}-fullName`] && (
                                            <p className="text-red-500 text-sm mt-1">{errors[`${index}-fullName`]}</p>
                                        )}
                                    </div>

                                    {/* ID Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Identitas
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={passenger.idType}
                                                onChange={(e) => updatePassenger(index, 'idType', e.target.value)}
                                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:bg-white appearance-none cursor-pointer transition-all"
                                            >
                                                {idTypes.map(type => (
                                                    <option key={type.id} value={type.id}>{type.name}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* ID Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Identitas <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={passenger.idNumber}
                                                onChange={(e) => updatePassenger(index, 'idNumber', e.target.value)}
                                                placeholder="Masukkan nomor identitas"
                                                className={`w-full pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors[`${index}-idNumber`]
                                                        ? 'border-red-500'
                                                        : 'border-gray-200 focus:border-primary-500'
                                                    }`}
                                            />
                                        </div>
                                        {errors[`${index}-idNumber`] && (
                                            <p className="text-red-500 text-sm mt-1">{errors[`${index}-idNumber`]}</p>
                                        )}
                                    </div>

                                    {/* Contact info only for first passenger */}
                                    {index === 0 && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nomor Telepon <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="tel"
                                                        value={passenger.phone}
                                                        onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                                                        placeholder="08xxxxxxxxxx"
                                                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors[`${index}-phone`]
                                                                ? 'border-red-500'
                                                                : 'border-gray-200 focus:border-primary-500'
                                                            }`}
                                                    />
                                                </div>
                                                {errors[`${index}-phone`] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[`${index}-phone`]}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="email"
                                                        value={passenger.email}
                                                        onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                                                        placeholder="email@example.com"
                                                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors[`${index}-email`]
                                                                ? 'border-red-500'
                                                                : 'border-gray-200 focus:border-primary-500'
                                                            }`}
                                                    />
                                                </div>
                                                {errors[`${index}-email`] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[`${index}-email`]}</p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Promo Code */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-primary-600" />
                                Kode Promo
                            </h3>
                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={promoCode || promoInput}
                                        onChange={(e) => {
                                            setPromoInput(e.target.value.toUpperCase());
                                            setPromoError('');
                                        }}
                                        disabled={promoSuccess}
                                        placeholder="Masukkan kode promo"
                                        className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all ${promoError
                                                ? 'border-red-500'
                                                : promoSuccess
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 focus:border-primary-500'
                                            }`}
                                    />
                                    {promoSuccess && (
                                        <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                                    )}
                                </div>
                                <motion.button
                                    type="button"
                                    onClick={handleApplyPromo}
                                    disabled={promoSuccess}
                                    whileHover={{ scale: promoSuccess ? 1 : 1.02 }}
                                    whileTap={{ scale: promoSuccess ? 1 : 0.98 }}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all ${promoSuccess
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-primary-600 text-white hover:bg-primary-700'
                                        }`}
                                >
                                    {promoSuccess ? 'Berhasil' : 'Terapkan'}
                                </motion.button>
                            </div>
                            {promoError && (
                                <p className="text-red-500 text-sm mt-2">{promoError}</p>
                            )}
                            {promoSuccess && (
                                <p className="text-green-600 text-sm mt-2">
                                    Kode promo {promoCode} berhasil diterapkan! Diskon {promoDiscount * 100}%
                                </p>
                            )}
                            <p className="text-gray-500 text-xs mt-3">
                                Coba: HEMAT10, CIPENG20, atau NEWUSER
                            </p>
                        </div>
                    </motion.div>

                    {/* Booking Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                            <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pemesanan</h3>

                            {/* Route */}
                            <div className="pb-4 mb-4 border-b">
                                <div className="text-sm text-gray-500 mb-1">Rute</div>
                                <div className="font-medium text-gray-900">
                                    {selectedBus.from?.name} → {selectedBus.to?.name}
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="pb-4 mb-4 border-b">
                                <div className="text-sm text-gray-500 mb-1">Tanggal & Waktu</div>
                                <div className="font-medium text-gray-900">
                                    {formatDate(selectedBus.date)}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {selectedBus.departureTime} - {selectedBus.arrivalTime}
                                </div>
                            </div>

                            {/* Bus */}
                            <div className="pb-4 mb-4 border-b">
                                <div className="text-sm text-gray-500 mb-1">Bus</div>
                                <div className="font-medium text-gray-900">{selectedBus.name}</div>
                                <div className="text-sm text-gray-500">{selectedBus.className}</div>
                            </div>

                            {/* Seats */}
                            <div className="pb-4 mb-4 border-b">
                                <div className="text-sm text-gray-500 mb-2">Kursi</div>
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
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-2 pb-4 mb-4 border-b">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        {selectedSeats.length}x Tiket @ {formatPrice(selectedBus.price)}
                                    </span>
                                    <span className="text-gray-900">{formatPrice(calculateSubtotal())}</span>
                                </div>
                                {promoDiscount > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-600">Diskon ({promoDiscount * 100}%)</span>
                                        <span className="text-green-600">-{formatPrice(calculateDiscount())}</span>
                                    </div>
                                )}
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
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30 hover:bg-primary-700 transition-all"
                            >
                                Lanjutkan ke Pembayaran
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PassengerDetails;
