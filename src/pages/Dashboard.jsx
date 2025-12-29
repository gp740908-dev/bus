import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Ticket,
    User,
    Users,
    Bell,
    LogOut,
    Menu,
    X,
    ChevronRight,
    CheckCircle,
    Clock,
    XCircle,
    MapPin,
    Calendar,
    Eye,
    Download,
    Plus,
    Edit2,
    Trash2,
    Save,
    Lock,
    Mail,
    Phone,
    CreditCard
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
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

// Mock data
const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '081234567890',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const mockBookings = [
    {
        id: 1,
        code: 'CPG12345678',
        status: 'upcoming',
        bus: { name: 'Cipeng Eksekutif 3', from: 'Jakarta', to: 'Surabaya' },
        date: '2024-12-30',
        departureTime: '20:00',
        seats: ['5A', '5B'],
        total: 630000,
    },
    {
        id: 2,
        code: 'CPG87654321',
        status: 'pending',
        bus: { name: 'Cipeng Bisnis 2', from: 'Bandung', to: 'Yogyakarta' },
        date: '2024-12-31',
        departureTime: '08:00',
        seats: ['3C'],
        total: 330000,
    },
    {
        id: 3,
        code: 'CPG55667788',
        status: 'completed',
        bus: { name: 'Cipeng Ekonomi 5', from: 'Jakarta', to: 'Bandung' },
        date: '2024-12-15',
        departureTime: '10:00',
        seats: ['7A'],
        total: 80000,
    },
    {
        id: 4,
        code: 'CPG99001122',
        status: 'cancelled',
        bus: { name: 'Cipeng Eksekutif 1', from: 'Semarang', to: 'Jakarta' },
        date: '2024-12-10',
        departureTime: '22:00',
        seats: ['2A', '2B'],
        total: 500000,
    },
];

const mockSavedPassengers = [
    { id: 1, name: 'John Doe', idType: 'KTP', idNumber: '3201234567890001' },
    { id: 2, name: 'Jane Doe', idType: 'KTP', idNumber: '3201234567890002' },
    { id: 3, name: 'Baby Doe', idType: 'Passport', idNumber: 'A12345678' },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [bookingFilter, setBookingFilter] = useState('all');
    const [savedPassengers, setSavedPassengers] = useState(mockSavedPassengers);
    const [editingPassenger, setEditingPassenger] = useState(null);
    const [showAddPassenger, setShowAddPassenger] = useState(false);
    const [newPassenger, setNewPassenger] = useState({ name: '', idType: 'KTP', idNumber: '' });
    const [profileData, setProfileData] = useState(mockUser);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const tabs = [
        { id: 'bookings', name: 'Pesanan Saya', icon: Ticket },
        { id: 'profile', name: 'Profil', icon: User },
        { id: 'passengers', name: 'Data Penumpang', icon: Users },
        { id: 'notifications', name: 'Notifikasi', icon: Bell },
    ];

    const getStatusBadge = (status) => {
        const badges = {
            upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock, label: 'Akan Datang' },
            pending: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock, label: 'Belum Bayar' },
            completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'Selesai' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Dibatalkan' },
        };
        const badge = badges[status];
        const Icon = badge.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 ${badge.bg} ${badge.text} rounded-full text-xs font-medium`}>
                <Icon className="w-3 h-3" />
                {badge.label}
            </span>
        );
    };

    const filteredBookings = mockBookings.filter(b =>
        bookingFilter === 'all' || b.status === bookingFilter
    );

    const handleAddPassenger = () => {
        if (newPassenger.name && newPassenger.idNumber) {
            setSavedPassengers([...savedPassengers, { ...newPassenger, id: Date.now() }]);
            setNewPassenger({ name: '', idType: 'KTP', idNumber: '' });
            setShowAddPassenger(false);
        }
    };

    const handleDeletePassenger = (id) => {
        setSavedPassengers(savedPassengers.filter(p => p.id !== id));
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:block w-72 flex-shrink-0"
                    >
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                            {/* User Info */}
                            <div className="flex items-center gap-4 pb-6 border-b mb-6">
                                <img
                                    src={profileData.avatar}
                                    alt={profileData.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-gray-900">{profileData.name}</div>
                                    <div className="text-sm text-gray-500">{profileData.email}</div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-1">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id
                                                ? 'bg-primary-50 text-primary-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.name}</span>
                                        {tab.id === 'notifications' && (
                                            <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                                3
                                            </span>
                                        )}
                                    </button>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="font-medium">Keluar</span>
                                </button>
                            </nav>
                        </div>
                    </motion.aside>

                    {/* Mobile Header */}
                    <div className="lg:hidden">
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={profileData.avatar}
                                    alt={profileData.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-semibold">{profileData.name}</span>
                            </div>
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                {showMobileMenu ? <X /> : <Menu />}
                            </button>
                        </div>

                        <AnimatePresence>
                            {showMobileMenu && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
                                >
                                    <div className="p-2">
                                        {tabs.map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => {
                                                    setActiveTab(tab.id);
                                                    setShowMobileMenu(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === tab.id ? 'bg-primary-50 text-primary-600' : 'text-gray-600'
                                                    }`}
                                            >
                                                <tab.icon className="w-5 h-5" />
                                                {tab.name}
                                            </button>
                                        ))}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Keluar
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Content */}
                    <main className="flex-1">
                        {/* Bookings Tab */}
                        {activeTab === 'bookings' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">Pesanan Saya</h1>
                                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                                        {['all', 'upcoming', 'completed', 'cancelled'].map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => setBookingFilter(filter)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${bookingFilter === filter
                                                        ? 'bg-primary-600 text-white'
                                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {filter === 'all' ? 'Semua' : filter === 'upcoming' ? 'Akan Datang' : filter === 'completed' ? 'Selesai' : 'Dibatalkan'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {filteredBookings.map(booking => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="font-mono text-sm text-gray-500">{booking.code}</span>
                                                        {getStatusBadge(booking.status)}
                                                    </div>
                                                    <div className="font-semibold text-gray-900 mb-1">
                                                        {booking.bus.from} → {booking.bus.to}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(booking.date)}
                                                        </span>
                                                        <span>{booking.departureTime}</span>
                                                        <span>Kursi: {booking.seats.join(', ')}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-right">
                                                        <div className="text-sm text-gray-500">Total</div>
                                                        <div className="font-bold text-primary-600">{formatPrice(booking.total)}</div>
                                                    </div>
                                                    <Link
                                                        to={`/cek-tiket`}
                                                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Eye className="w-5 h-5 text-gray-600" />
                                                    </Link>
                                                    {booking.status === 'completed' && (
                                                        <button className="p-2 bg-primary-100 rounded-lg hover:bg-primary-200 transition-colors">
                                                            <Download className="w-5 h-5 text-primary-600" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {filteredBookings.length === 0 && (
                                        <div className="bg-white rounded-2xl p-12 text-center">
                                            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <h3 className="font-semibold text-gray-900 mb-2">Tidak ada pesanan</h3>
                                            <p className="text-gray-500 mb-4">Belum ada pesanan yang sesuai filter</p>
                                            <Link
                                                to="/pesan-tiket"
                                                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
                                            >
                                                Pesan Tiket
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil Saya</h1>

                                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <img
                                            src={profileData.avatar}
                                            alt={profileData.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">
                                            Ganti Foto
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    value={profileData.phone}
                                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-primary-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-6 flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
                                    >
                                        <Save className="w-5 h-5" />
                                        Simpan Perubahan
                                    </motion.button>
                                </div>

                                {/* Change Password */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <button
                                        onClick={() => setShowChangePassword(!showChangePassword)}
                                        className="flex items-center justify-between w-full"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Lock className="w-5 h-5 text-gray-600" />
                                            <span className="font-semibold text-gray-900">Ganti Password</span>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 transition-transform ${showChangePassword ? 'rotate-90' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {showChangePassword && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password Lama</label>
                                                        <input
                                                            type="password"
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                                                        <input
                                                            type="password"
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
                                                        <input
                                                            type="password"
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl"
                                                        />
                                                    </div>
                                                    <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium">
                                                        Perbarui Password
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}

                        {/* Saved Passengers Tab */}
                        {activeTab === 'passengers' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-2xl font-bold text-gray-900">Data Penumpang</h1>
                                    <motion.button
                                        onClick={() => setShowAddPassenger(true)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl font-medium"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Tambah
                                    </motion.button>
                                </div>

                                <div className="space-y-3">
                                    {savedPassengers.map(passenger => (
                                        <div
                                            key={passenger.id}
                                            className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-gray-500" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{passenger.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {passenger.idType}: {passenger.idNumber}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit2 className="w-5 h-5 text-gray-500" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePassenger(passenger.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5 text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Passenger Modal */}
                                <AnimatePresence>
                                    {showAddPassenger && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                                            onClick={() => setShowAddPassenger(false)}
                                        >
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.9, opacity: 0 }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="bg-white rounded-2xl p-6 max-w-md w-full"
                                            >
                                                <h3 className="text-lg font-bold mb-4">Tambah Penumpang</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                                        <input
                                                            type="text"
                                                            value={newPassenger.name}
                                                            onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Identitas</label>
                                                        <select
                                                            value={newPassenger.idType}
                                                            onChange={(e) => setNewPassenger({ ...newPassenger, idType: e.target.value })}
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl"
                                                        >
                                                            <option value="KTP">KTP</option>
                                                            <option value="SIM">SIM</option>
                                                            <option value="Passport">Passport</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Identitas</label>
                                                        <input
                                                            type="text"
                                                            value={newPassenger.idNumber}
                                                            onChange={(e) => setNewPassenger({ ...newPassenger, idNumber: e.target.value })}
                                                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-3 mt-6">
                                                    <button
                                                        onClick={() => setShowAddPassenger(false)}
                                                        className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium"
                                                    >
                                                        Batal
                                                    </button>
                                                    <button
                                                        onClick={handleAddPassenger}
                                                        className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-medium"
                                                    >
                                                        Simpan
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifikasi</h1>
                                <div className="space-y-3">
                                    {[
                                        { title: 'Pembayaran berhasil', desc: 'Tiket CPG12345678 sudah lunas', time: '2 jam lalu', read: false },
                                        { title: 'Promo Tahun Baru!', desc: 'Diskon 20% untuk semua rute', time: '1 hari lalu', read: false },
                                        { title: 'Pengingat Perjalanan', desc: 'Perjalanan Anda besok pukul 20:00', time: '2 hari lalu', read: true },
                                    ].map((notif, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white rounded-xl shadow-sm p-4 ${!notif.read ? 'border-l-4 border-primary-500' : ''}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-semibold text-gray-900">{notif.title}</div>
                                                    <div className="text-sm text-gray-500">{notif.desc}</div>
                                                </div>
                                                <span className="text-xs text-gray-400">{notif.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
