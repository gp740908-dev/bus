import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

// Mock data for cities and buses
export const cities = [
    { id: 'jkt', name: 'Jakarta', terminal: 'Terminal Pulogebang' },
    { id: 'bdg', name: 'Bandung', terminal: 'Terminal Leuwi Panjang' },
    { id: 'sby', name: 'Surabaya', terminal: 'Terminal Purabaya' },
    { id: 'smg', name: 'Semarang', terminal: 'Terminal Terboyo' },
    { id: 'ygk', name: 'Yogyakarta', terminal: 'Terminal Giwangan' },
    { id: 'mlg', name: 'Malang', terminal: 'Terminal Arjosari' },
    { id: 'solo', name: 'Solo', terminal: 'Terminal Tirtonadi' },
    { id: 'crb', name: 'Cirebon', terminal: 'Terminal Harjamukti' },
];

export const busClasses = [
    { id: 'ekonomi', name: 'Ekonomi', priceMultiplier: 1 },
    { id: 'bisnis', name: 'Bisnis', priceMultiplier: 1.5 },
    { id: 'eksekutif', name: 'Eksekutif', priceMultiplier: 2 },
];

export const facilities = [
    { id: 'ac', name: 'AC', icon: 'Wind' },
    { id: 'wifi', name: 'WiFi', icon: 'Wifi' },
    { id: 'toilet', name: 'Toilet', icon: 'Bath' },
    { id: 'usb', name: 'USB', icon: 'Usb' },
    { id: 'tv', name: 'TV', icon: 'Tv' },
    { id: 'snack', name: 'Snack', icon: 'Coffee' },
    { id: 'blanket', name: 'Selimut', icon: 'Bed' },
    { id: 'recliner', name: 'Reclining Seat', icon: 'Armchair' },
];

export const paymentMethods = [
    {
        id: 'bank_transfer',
        name: 'Transfer Bank',
        options: [
            { id: 'bca', name: 'BCA', account: '1234567890', holder: 'PT Cipeng Transport' },
            { id: 'mandiri', name: 'Mandiri', account: '0987654321', holder: 'PT Cipeng Transport' },
            { id: 'bri', name: 'BRI', account: '1122334455', holder: 'PT Cipeng Transport' },
            { id: 'bni', name: 'BNI', account: '5544332211', holder: 'PT Cipeng Transport' },
        ],
    },
    {
        id: 'ewallet',
        name: 'E-Wallet',
        options: [
            { id: 'gopay', name: 'GoPay' },
            { id: 'ovo', name: 'OVO' },
            { id: 'dana', name: 'DANA' },
            { id: 'shopeepay', name: 'ShopeePay' },
        ],
    },
    {
        id: 'va',
        name: 'Virtual Account',
        options: [
            { id: 'va_bca', name: 'VA BCA', vaNumber: '80777' },
            { id: 'va_mandiri', name: 'VA Mandiri', vaNumber: '88908' },
            { id: 'va_bri', name: 'VA BRI', vaNumber: '88908' },
        ],
    },
    {
        id: 'qris',
        name: 'QRIS',
        options: [{ id: 'qris', name: 'Scan QRIS' }],
    },
];

// Generate booking code
const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'CPG';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

// Generate mock buses for search results
const generateMockBuses = (from, to, date) => {
    const departureTimes = ['06:00', '08:00', '10:00', '13:00', '15:00', '18:00', '20:00', '22:00'];
    const basePrice = {
        'jkt-bdg': 80000,
        'jkt-sby': 350000,
        'jkt-smg': 250000,
        'jkt-ygk': 280000,
        'jkt-mlg': 380000,
        'jkt-solo': 260000,
        'jkt-crb': 120000,
        'bdg-sby': 300000,
        'bdg-smg': 200000,
        'bdg-ygk': 220000,
        'default': 200000,
    };

    const routeKey = `${from}-${to}`;
    const reverseRouteKey = `${to}-${from}`;
    const price = basePrice[routeKey] || basePrice[reverseRouteKey] || basePrice.default;

    const buses = [];
    departureTimes.forEach((time, index) => {
        busClasses.forEach((busClass) => {
            const duration = Math.floor(Math.random() * 4) + 4;
            const [hours, minutes] = time.split(':').map(Number);
            const arrivalHours = (hours + duration) % 24;
            const arrivalTime = `${arrivalHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            const busFacilities = facilities
                .filter(() => Math.random() > 0.3)
                .map(f => f.id);

            if (!busFacilities.includes('ac')) busFacilities.unshift('ac');

            buses.push({
                id: `bus-${index}-${busClass.id}`,
                name: `Cipeng ${busClass.name} ${index + 1}`,
                class: busClass.id,
                className: busClass.name,
                departureTime: time,
                arrivalTime: arrivalTime,
                duration: `${duration}j`,
                price: Math.round(price * busClass.priceMultiplier),
                availableSeats: Math.floor(Math.random() * 20) + 5,
                totalSeats: busClass.id === 'eksekutif' ? 32 : busClass.id === 'bisnis' ? 40 : 48,
                facilities: busFacilities,
                from: cities.find(c => c.id === from),
                to: cities.find(c => c.id === to),
                date: date,
            });
        });
    });

    return buses.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
};

// Generate seat layout
const generateSeatLayout = (totalSeats, bookedPercentage = 0.3) => {
    const seats = [];
    const columns = 4;
    const rows = Math.ceil(totalSeats / columns);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const seatNumber = row * columns + col + 1;
            if (seatNumber > totalSeats) break;

            const columnLetter = ['A', 'B', 'C', 'D'][col];
            const seatId = `${row + 1}${columnLetter}`;

            seats.push({
                id: seatId,
                number: seatNumber,
                row: row + 1,
                column: col,
                columnLetter,
                isBooked: Math.random() < bookedPercentage,
                isSelected: false,
            });
        }
    }

    return seats;
};

export const BookingProvider = ({ children }) => {
    // Search state
    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        date: '',
        passengers: 1,
    });

    // Search results
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Selected bus
    const [selectedBus, setSelectedBus] = useState(null);

    // Seats
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Passenger details
    const [passengers, setPassengers] = useState([]);

    // Promo code
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);

    // Payment
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

    // Booking
    const [booking, setBooking] = useState(null);

    // Search for buses
    const searchBuses = async (data) => {
        setIsSearching(true);
        setSearchData(data);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const results = generateMockBuses(data.from, data.to, data.date);
        setSearchResults(results);
        setIsSearching(false);

        return results;
    };

    // Select a bus
    const selectBus = (bus) => {
        setSelectedBus(bus);
        const seatLayout = generateSeatLayout(bus.totalSeats);
        setSeats(seatLayout);
        setSelectedSeats([]);
    };

    // Toggle seat selection
    const toggleSeatSelection = (seatId) => {
        const seat = seats.find(s => s.id === seatId);
        if (!seat || seat.isBooked) return;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(prev => prev.filter(id => id !== seatId));
        } else {
            if (selectedSeats.length >= searchData.passengers) {
                setSelectedSeats(prev => [...prev.slice(1), seatId]);
            } else {
                setSelectedSeats(prev => [...prev, seatId]);
            }
        }
    };

    // Initialize passengers based on selected seats
    const initializePassengers = () => {
        const passengerList = selectedSeats.map((seatId, index) => ({
            id: index + 1,
            seatId,
            fullName: '',
            idType: 'ktp',
            idNumber: '',
            phone: index === 0 ? '' : '',
            email: index === 0 ? '' : '',
        }));
        setPassengers(passengerList);
    };

    // Update passenger
    const updatePassenger = (index, field, value) => {
        setPassengers(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    // Apply promo code
    const applyPromoCode = (code) => {
        const promoCodes = {
            'HEMAT10': 0.1,
            'CIPENG20': 0.2,
            'NEWUSER': 0.15,
        };

        const discount = promoCodes[code.toUpperCase()];
        if (discount) {
            setPromoCode(code.toUpperCase());
            setPromoDiscount(discount);
            return true;
        }
        return false;
    };

    // Calculate total price
    const calculateSubtotal = () => {
        if (!selectedBus || selectedSeats.length === 0) return 0;
        return selectedBus.price * selectedSeats.length;
    };

    const calculateDiscount = () => {
        return Math.round(calculateSubtotal() * promoDiscount);
    };

    const calculateTotalPrice = () => {
        return calculateSubtotal() - calculateDiscount();
    };

    // Create booking
    const createBooking = async () => {
        const bookingData = {
            code: generateBookingCode(),
            status: 'pending',
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
            bus: selectedBus,
            seats: selectedSeats,
            passengers: passengers,
            payment: {
                method: selectedPaymentMethod,
                option: selectedPaymentOption,
                subtotal: calculateSubtotal(),
                discount: calculateDiscount(),
                promoCode: promoCode,
                total: calculateTotalPrice(),
            },
        };

        await new Promise(resolve => setTimeout(resolve, 1000));
        setBooking(bookingData);
        return bookingData;
    };

    // Confirm payment (mock)
    const confirmPayment = async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setBooking(prev => ({ ...prev, status: 'paid' }));
        return true;
    };

    // Reset booking
    const resetBooking = () => {
        setSelectedBus(null);
        setSeats([]);
        setSelectedSeats([]);
        setPassengers([]);
        setPromoCode('');
        setPromoDiscount(0);
        setSelectedPaymentMethod(null);
        setSelectedPaymentOption(null);
        setBooking(null);
    };

    const value = {
        // Search
        searchData,
        setSearchData,
        searchResults,
        isSearching,
        searchBuses,

        // Bus selection
        selectedBus,
        selectBus,

        // Seats
        seats,
        selectedSeats,
        toggleSeatSelection,

        // Passengers
        passengers,
        initializePassengers,
        updatePassenger,

        // Promo
        promoCode,
        promoDiscount,
        applyPromoCode,

        // Payment
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedPaymentOption,
        setSelectedPaymentOption,
        paymentMethods,

        // Booking
        booking,
        createBooking,
        confirmPayment,

        // Helpers
        calculateSubtotal,
        calculateDiscount,
        calculateTotalPrice,
        resetBooking,

        // Static data
        cities,
        busClasses,
        facilities,
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};

export default BookingContext;
