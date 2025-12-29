import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search,
    Ticket,
    Users,
    FileQuestion,
    AlertCircle,
    RefreshCw
} from 'lucide-react';

// No Search Results
export const NoSearchResults = ({ onReset }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
            <Search className="w-12 h-12 text-gray-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
            Tidak Ada Bus Ditemukan
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Maaf, tidak ada bus yang tersedia untuk rute dan tanggal yang Anda pilih.
            Coba pilih tanggal lain atau rute berbeda.
        </p>
        {onReset && (
            <motion.button
                onClick={onReset}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
            >
                <RefreshCw className="w-5 h-5" />
                Cari Ulang
            </motion.button>
        )}
    </motion.div>
);

// No Bookings
export const NoBookings = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-white rounded-2xl"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
            <Ticket className="w-12 h-12 text-primary-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
            Belum Ada Pesanan
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Anda belum memiliki pesanan tiket. Mulai perjalanan Anda dengan memesan tiket sekarang!
        </p>
        <Link to="/pesan-tiket">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
            >
                Pesan Tiket Sekarang
            </motion.button>
        </Link>
    </motion.div>
);

// No Saved Passengers
export const NoSavedPassengers = ({ onAdd }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-white rounded-2xl"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
            <Users className="w-12 h-12 text-blue-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
            Belum Ada Data Penumpang
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Simpan data penumpang untuk mempercepat proses pemesanan tiket Anda.
        </p>
        {onAdd && (
            <motion.button
                onClick={onAdd}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
            >
                Tambah Penumpang
            </motion.button>
        )}
    </motion.div>
);

// Generic Empty State
export const EmptyState = ({
    icon: Icon = FileQuestion,
    title,
    description,
    action,
    actionLabel
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
            <Icon className="w-12 h-12 text-gray-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
        {action && (
            <motion.button
                onClick={action}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
            >
                {actionLabel || 'Coba Lagi'}
            </motion.button>
        )}
    </motion.div>
);

// Error State
export const ErrorState = ({
    message = 'Terjadi kesalahan. Silakan coba lagi.',
    onRetry
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
            <AlertCircle className="w-12 h-12 text-red-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Oops!</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">{message}</p>
        {onRetry && (
            <motion.button
                onClick={onRetry}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
            >
                <RefreshCw className="w-5 h-5" />
                Coba Lagi
            </motion.button>
        )}
    </motion.div>
);

export default {
    NoSearchResults,
    NoBookings,
    NoSavedPassengers,
    EmptyState,
    ErrorState,
};
