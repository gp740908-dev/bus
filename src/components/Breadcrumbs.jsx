import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
    return (
        <nav className="flex items-center gap-2 text-sm py-4 overflow-x-auto">
            <Link
                to="/"
                className="flex items-center gap-1 text-gray-500 hover:text-primary-600 transition-colors whitespace-nowrap"
            >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Beranda</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    {item.href ? (
                        <Link
                            to={item.href}
                            className="text-gray-500 hover:text-primary-600 transition-colors whitespace-nowrap"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium whitespace-nowrap">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
