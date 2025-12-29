import { motion } from 'framer-motion';
import { Shield, Wallet, Bus, HeadphonesIcon } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Safety First',
        description: 'Certified safety standards for your peace of mind.',
    },
    {
        icon: Wallet,
        title: 'Smart Pricing',
        description: 'Premium experience at competitive market rates.',
    },
    {
        icon: Bus,
        title: 'Modern Fleet',
        description: 'Latest coaches equipped with executive class amenities.',
    },
    {
        icon: HeadphonesIcon,
        title: '24/7 Support',
        description: 'Dedicated concierge team available around the clock.',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const Features = () => {
    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                            Why Choose<br />
                            <span className="text-gray-400 font-light">Cipeng Premium?</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:max-w-xs text-gray-500 text-sm leading-relaxed"
                    >
                        We redefine intercity travel by combining luxury, punctuality, and safety into one seamless experience.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-500">
                                <feature.icon className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-wide">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
