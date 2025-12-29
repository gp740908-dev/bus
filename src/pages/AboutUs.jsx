import { motion } from 'framer-motion';
import {
    Target,
    Eye,
    Heart,
    Shield,
    Clock,
    Users,
    Award,
    TrendingUp,
    Bus,
    MapPin,
    Star,
    Zap
} from 'lucide-react';

const milestones = [
    {
        year: '2005',
        title: 'Awal Mula',
        description: 'PO. Cipeng didirikan dengan 5 unit bus untuk melayani rute Jakarta-Bandung.',
    },
    {
        year: '2010',
        title: 'Ekspansi Pertama',
        description: 'Membuka rute baru ke Semarang dan Yogyakarta dengan penambahan 15 unit armada.',
    },
    {
        year: '2015',
        title: 'Modernisasi Armada',
        description: 'Upgrade seluruh armada dengan bus berkelas Eksekutif dan VIP untuk kenyamanan maksimal.',
    },
    {
        year: '2020',
        title: 'Digitalisasi',
        description: 'Meluncurkan platform booking online dan sistem e-ticketing terintegrasi.',
    },
    {
        year: '2024',
        title: 'Pemimpin Industri',
        description: 'Menjadi salah satu PO bus terbesar dengan 50+ armada dan 20+ rute di Jawa.',
    },
];

const values = [
    {
        icon: Shield,
        title: 'Keamanan',
        description: 'Keselamatan penumpang adalah prioritas utama dengan standar keamanan tertinggi.',
        color: 'bg-blue-100 text-blue-600',
    },
    {
        icon: Clock,
        title: 'Ketepatan Waktu',
        description: 'Komitmen untuk selalu tepat waktu dalam setiap perjalanan.',
        color: 'bg-green-100 text-green-600',
    },
    {
        icon: Heart,
        title: 'Pelayanan',
        description: 'Melayani dengan sepenuh hati untuk kepuasan pelanggan.',
        color: 'bg-red-100 text-red-600',
    },
    {
        icon: TrendingUp,
        title: 'Inovasi',
        description: 'Terus berinovasi untuk memberikan pengalaman perjalanan terbaik.',
        color: 'bg-purple-100 text-purple-600',
    },
];

const achievements = [
    { number: '50+', label: 'Armada Bus' },
    { number: '20+', label: 'Rute Perjalanan' },
    { number: '500K+', label: 'Penumpang/Tahun' },
    { number: '19', label: 'Tahun Pengalaman' },
];

const team = [
    {
        name: 'Budi Santoso',
        position: 'Direktur Utama',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        name: 'Siti Rahma',
        position: 'Direktur Operasional',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        name: 'Ahmad Wijaya',
        position: 'Direktur Keuangan',
        image: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    {
        name: 'Linda Kusuma',
        position: 'Direktur Pemasaran',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
];

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="pt-24 pb-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }} />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">
                            Tentang PO. Cipeng
                        </h1>
                        <p className="text-lg md:text-xl text-white/80">
                            Perjalanan nyaman, tepat waktu, dan aman bersama mitra transportasi terpercaya sejak 2005
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Company Profile */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Mitra Perjalanan Anda
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    PO. Cipeng adalah perusahaan otobus yang telah melayani masyarakat Indonesia
                                    selama hampir dua dekade. Berawal dari sebuah mimpi untuk menyediakan
                                    transportasi darat yang aman, nyaman, dan terjangkau.
                                </p>
                                <p>
                                    Dengan armada modern yang terus diperbarui dan tim profesional yang
                                    berpengalaman, kami berkomitmen untuk memberikan pengalaman perjalanan
                                    terbaik bagi setiap penumpang.
                                </p>
                                <p>
                                    Saat ini kami melayani lebih dari 20 rute di Pulau Jawa dengan 50+
                                    armada bus dari kelas Ekonomi hingga VIP Sleeper.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center">
                                <Bus className="w-32 h-32 text-gray-400" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6">
                                <div className="text-4xl font-bold text-primary-600">19+</div>
                                <div className="text-gray-500">Tahun Pengalaman</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white"
                        >
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                <Eye className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Visi</h3>
                            <p className="text-white/90 leading-relaxed">
                                Menjadi perusahaan transportasi darat terdepan di Indonesia yang
                                memberikan layanan berkualitas tinggi, aman, dan inovatif untuk
                                menghubungkan masyarakat di seluruh Nusantara.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-50 rounded-3xl p-8"
                        >
                            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <span>Menyediakan armada modern dengan standar keselamatan tinggi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <span>Memberikan pelayanan prima dengan harga terjangkau</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <span>Mengembangkan SDM profesional dan berdedikasi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <span>Berinovasi dalam teknologi untuk kemudahan pelanggan</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Perjalanan Kami</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Dari awal yang sederhana hingga menjadi salah satu PO bus terkemuka di Jawa
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

                        <div className="space-y-8 lg:space-y-0">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={milestone.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`lg:grid lg:grid-cols-2 lg:gap-8 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                                        }`}
                                >
                                    <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:order-2'}`}>
                                        <div className={`bg-white rounded-2xl p-6 shadow-sm inline-block ${index % 2 === 0 ? 'lg:ml-auto' : ''
                                            }`}>
                                            <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                                            <p className="text-gray-500">{milestone.description}</p>
                                        </div>
                                    </div>
                                    <div className={`hidden lg:flex ${index % 2 === 0 ? 'justify-start' : 'justify-end lg:order-1'}`}>
                                        <div className="w-4 h-4 bg-primary-600 rounded-full relative top-8" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Prinsip yang menjadi landasan setiap layanan yang kami berikan
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="bg-gray-50 rounded-2xl p-6 text-center"
                                >
                                    <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                    <p className="text-gray-500 text-sm">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {achievements.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                                    {item.number}
                                </div>
                                <div className="text-gray-400">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Penghargaan</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Apresiasi atas komitmen kami dalam memberikan layanan terbaik
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'Bus Teraman 2023', org: 'Kementerian Perhubungan', icon: Shield },
                            { title: 'Customer Service Excellence', org: 'Indonesia Service Awards', icon: Star },
                            { title: 'Best PO Bus Jawa', org: 'Travel Awards 2024', icon: Award },
                        ].map((award, index) => {
                            const Icon = award.icon;
                            return (
                                <motion.div
                                    key={award.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm text-center border border-gray-100"
                                >
                                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-amber-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1">{award.title}</h3>
                                    <p className="text-sm text-gray-500">{award.org}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Manajemen</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Profesional berpengalaman yang memimpin perjalanan kami
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="text-center"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="font-bold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.position}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
