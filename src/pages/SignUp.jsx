import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Phone, Mail, Lock, Eye, EyeOff, CreditCard, Check } from 'lucide-react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        idNumber: '',
        agreeTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Nama lengkap wajib diisi';
        } else if (formData.fullName.length < 3) {
            newErrors.fullName = 'Nama minimal 3 karakter';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Nomor telepon wajib diisi';
        } else if (!/^(\+62|62|0)[0-9]{9,12}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Format nomor telepon tidak valid';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!formData.password) {
            newErrors.password = 'Password wajib diisi';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password harus mengandung huruf besar, huruf kecil, dan angka';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password tidak cocok';
        }

        if (!formData.idNumber.trim()) {
            newErrors.idNumber = 'Nomor KTP wajib diisi';
        } else if (!/^\d{16}$/.test(formData.idNumber)) {
            newErrors.idNumber = 'Nomor KTP harus 16 digit';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);

        console.log('Sign up:', formData);
    };

    const InputField = ({ label, name, type = 'text', icon: Icon, placeholder, showToggle, isPassword }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type={isPassword ? (showToggle ? 'text' : 'password') : type}
                    value={formData[name]}
                    onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
                    placeholder={placeholder}
                    className={`w-full pl-12 ${isPassword ? 'pr-12' : 'pr-4'} py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all ${errors[name]
                            ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                            : 'border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'
                        }`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => name === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showToggle ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {errors[name] && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                >
                    {errors[name]}
                </motion.p>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-lg"
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
                            Buat Akun Baru
                        </h1>
                        <p className="text-gray-500">
                            Daftar untuk menikmati kemudahan pemesanan tiket
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="Nama Lengkap"
                            name="fullName"
                            icon={User}
                            placeholder="Masukkan nama lengkap"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Nomor Telepon"
                                name="phone"
                                type="tel"
                                icon={Phone}
                                placeholder="08xxxxxxxxxx"
                            />
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="email@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Password"
                                name="password"
                                icon={Lock}
                                placeholder="Min. 8 karakter"
                                isPassword
                                showToggle={showPassword}
                            />
                            <InputField
                                label="Konfirmasi Password"
                                name="confirmPassword"
                                icon={Lock}
                                placeholder="Ulangi password"
                                isPassword
                                showToggle={showConfirmPassword}
                            />
                        </div>

                        <InputField
                            label="Nomor KTP"
                            name="idNumber"
                            icon={CreditCard}
                            placeholder="16 digit nomor KTP"
                        />

                        {/* Terms & Conditions */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <div className="relative mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeTerms}
                                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${formData.agreeTerms
                                            ? 'bg-primary-600 border-primary-600'
                                            : errors.agreeTerms
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}>
                                        {formData.agreeTerms && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600">
                                    Saya menyetujui{' '}
                                    <a href="#" className="text-primary-600 hover:underline">Syarat & Ketentuan</a>
                                    {' '}dan{' '}
                                    <a href="#" className="text-primary-600 hover:underline">Kebijakan Privasi</a>
                                </span>
                            </label>
                            {errors.agreeTerms && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-2"
                                >
                                    {errors.agreeTerms}
                                </motion.p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6"
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
                                'Daftar Sekarang'
                            )}
                        </motion.button>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center text-gray-600 mt-8">
                        Sudah punya akun?{' '}
                        <Link
                            to="/sign-in"
                            className="text-primary-600 hover:text-primary-700 font-semibold"
                        >
                            Masuk
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
