import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

const toastTypes = {
    success: {
        icon: CheckCircle,
        bg: 'bg-green-50',
        border: 'border-green-200',
        iconColor: 'text-green-600',
        textColor: 'text-green-800',
    },
    error: {
        icon: XCircle,
        bg: 'bg-red-50',
        border: 'border-red-200',
        iconColor: 'text-red-600',
        textColor: 'text-red-800',
    },
    warning: {
        icon: AlertCircle,
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        iconColor: 'text-orange-600',
        textColor: 'text-orange-800',
    },
    info: {
        icon: Info,
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        iconColor: 'text-blue-600',
        textColor: 'text-blue-800',
    },
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success', duration = 4000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const toast = {
        success: (message, duration) => addToast(message, 'success', duration),
        error: (message, duration) => addToast(message, 'error', duration),
        warning: (message, duration) => addToast(message, 'warning', duration),
        info: (message, duration) => addToast(message, 'info', duration),
    };

    return (
        <ToastContext.Provider value={{ toast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, removeToast }) => (
    <div className="fixed top-4 right-4 z-[100] space-y-3 pointer-events-none">
        <AnimatePresence>
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
            ))}
        </AnimatePresence>
    </div>
);

const Toast = ({ id, message, type, onClose }) => {
    const config = toastTypes[type];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${config.bg} ${config.border} max-w-sm`}
        >
            <Icon className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`} />
            <p className={`text-sm font-medium flex-1 ${config.textColor}`}>{message}</p>
            <button
                onClick={onClose}
                className={`p-1 hover:bg-black/5 rounded-full transition-colors ${config.textColor}`}
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context.toast;
};

export default ToastContext;
