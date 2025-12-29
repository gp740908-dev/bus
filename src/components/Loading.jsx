import { motion } from 'framer-motion';

// Bus Card Skeleton
export const BusCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
        <div className="p-5 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-6 w-40 bg-gray-200 rounded" />
                        <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    </div>
                    {/* Time */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-8 w-16 bg-gray-200 rounded" />
                        <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 h-0.5 bg-gray-200" />
                            <div className="h-6 w-12 bg-gray-200 rounded" />
                            <div className="flex-1 h-0.5 bg-gray-200" />
                        </div>
                        <div className="h-8 w-16 bg-gray-200 rounded" />
                    </div>
                    {/* Facilities */}
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-6 w-16 bg-gray-200 rounded" />
                        ))}
                    </div>
                </div>
                {/* Price */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l lg:pl-6 border-gray-100">
                    <div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                        <div className="h-8 w-28 bg-gray-200 rounded" />
                    </div>
                    <div className="h-12 w-24 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    </div>
);

// Fleet Card Skeleton
export const FleetCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200" />
        <div className="p-5">
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
            <div className="flex gap-2 mb-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-6 w-16 bg-gray-200 rounded" />
                ))}
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-6 w-24 bg-gray-200 rounded" />
            </div>
            <div className="h-12 w-full bg-gray-200 rounded-xl" />
        </div>
    </div>
);

// Booking Card Skeleton
export const BookingCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm p-5 animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-5 w-20 bg-gray-200 rounded-full" />
                </div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
                <div className="flex items-center gap-4">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div>
                    <div className="h-3 w-10 bg-gray-200 rounded mb-1" />
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-10 w-10 bg-gray-200 rounded-lg" />
            </div>
        </div>
    </div>
);

// Generic Content Skeleton
export const ContentSkeleton = ({ lines = 3 }) => (
    <div className="animate-pulse space-y-3">
        {[...Array(lines)].map((_, i) => (
            <div
                key={i}
                className={`h-4 bg-gray-200 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
            />
        ))}
    </div>
);

// Spinner
export const Spinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
    };

    return (
        <svg
            className={`animate-spin ${sizes[size]} ${className}`}
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
};

// Page Loading
export const PageLoading = () => (
    <div className="min-h-screen flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
        >
            <Spinner size="xl" className="text-primary-600 mx-auto mb-4" />
            <p className="text-gray-500">Memuat...</p>
        </motion.div>
    </div>
);

// Progress Steps
export const ProgressSteps = ({ steps, currentStep }) => (
    <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
            <div key={index} className="flex items-center">
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${index < currentStep
                            ? 'bg-green-500 text-white'
                            : index === currentStep
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                >
                    {index < currentStep ? '✓' : index + 1}
                </div>
                {index < steps.length - 1 && (
                    <div
                        className={`w-12 h-1 mx-1 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                    />
                )}
            </div>
        ))}
    </div>
);

export default {
    BusCardSkeleton,
    FleetCardSkeleton,
    BookingCardSkeleton,
    ContentSkeleton,
    Spinner,
    PageLoading,
    ProgressSteps,
};
