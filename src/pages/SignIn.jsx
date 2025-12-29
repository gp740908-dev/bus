import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';

const SignIn = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.identifier.trim()) {
            newErrors.identifier = 'Email atau nomor telepon wajib diisi';
        }

        if (!formData.password) {
            newErrors.password = 'Password wajib diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);

        console.log('Sign in:', formData);
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
                        <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
                            Selamat Datang Kembali
                        </h1>
                        <p className="text-gray-500">
                            Masuk ke akun Anda untuk melanjutkan
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
                                    value={formData.identifier}
                                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                    placeholder="Masukkan email atau nomor telepon"
                                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors.identifier
                                            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'
                                        }`}
                                />
                            </div>
                            {errors.identifier && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    {errors.identifier}
                                </motion.p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Masukkan password"
                                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors.password
                                            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                                            : 'border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    {errors.password}
                                </motion.p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-600">Ingat saya</span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                                Lupa Password?
                            </Link>
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
                                'Masuk'
                            )}
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-gray-600 mt-8">
                        Belum punya akun?{' '}
                        <Link
                            to="/sign-up"
                            className="text-primary-600 hover:text-primary-700 font-semibold"
                        >
                            Daftar Sekarang
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;
