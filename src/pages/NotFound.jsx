import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bus, Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-lg"
            >
                {/* Illustration */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="relative mb-8"
                >
                    <div className="text-[180px] font-bold text-gray-100 leading-none select-none">
                        404
                    </div>
                    <motion.div
                        animate={{
                            x: [0, 10, -10, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center">
                            <Bus className="w-16 h-16 text-primary-600" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Text */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Halaman Tidak Ditemukan
                </h1>
                <p className="text-gray-500 mb-8">
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                    Pastikan URL yang Anda masukkan sudah benar.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium"
                        >
                            <Home className="w-5 h-5" />
                            Kembali ke Beranda
                        </motion.button>
                    </Link>
                    <Link to="/pesan-tiket">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-primary-500 hover:text-primary-600"
                        >
                            <Search className="w-5 h-5" />
                            Cari Tiket
                        </motion.button>
                    </Link>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-8 text-gray-500 hover:text-gray-700 inline-flex items-center gap-2 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke halaman sebelumnya
                </button>
            </motion.div>
        </div>
    );
};

export default NotFound;
