import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        if (!email.trim()) {
            setError('Email atau nomor telepon wajib diisi');
            return false;
        }

        // Check if it's email or phone
        const isEmail = email.includes('@');
        if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Format email tidak valid');
            return false;
        }

        if (!isEmail && !/^(\+62|62|0)[0-9]{9,12}$/.test(email.replace(/\s/g, ''))) {
            setError('Format nomor telepon tidak valid');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);

        console.log('Forgot password:', email);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-100 px-6 py-3 rounded-full inline-block"
                            >
                                <span className="text-xl font-bold tracking-wide text-gray-900 uppercase">
                                    PO. Cipeng
                                </span>
                            </motion.div>
                        </Link>
                    </div>

                    {!isSubmitted ? (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Lupa Password?
                                </h1>
                                <p className="text-gray-500">
                                    Masukkan email atau nomor telepon Anda dan kami akan mengirimkan link untuk reset password.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email/Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email atau Nomor Telepon
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (error) setError('');
                                            }}
                                            placeholder="Masukkan email atau nomor telepon"
                                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${error
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                                    : 'border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'
                                                }`}
                                        />
                                    </div>
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 text-sm mt-2"
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                    className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
                                        'Kirim Link Reset'
                                    )}
                                </motion.button>
                            </form>
                        </>
                    ) : (
                        /* Success State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Cek Email Anda
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Kami telah mengirimkan link reset password ke{' '}
                                <span className="font-medium text-gray-700">{email}</span>.
                                Silakan cek inbox atau folder spam Anda.
                            </p>
                            <motion.button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setEmail('');
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="text-primary-600 font-medium hover:text-primary-700"
                            >
                                Kirim ulang email
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Back to Sign In */}
                    <div className="mt-8 text-center">
                        <Link
                            to="/sign-in"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali ke halaman masuk
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
