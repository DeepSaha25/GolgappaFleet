import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id || item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    (item._id === product._id || item.id === product.id)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prev => prev.map(item =>
            (item._id === productId || item.id === productId)
                ? { ...item, quantity }
                : item
        ));
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item._id !== productId && item.id !== productId));
    };

    const clearCart = () => setCart([]);

    // Normalize price handling
    const getPrice = (price) => {
        if (typeof price === 'number') return price;
        return parseFloat(price.toString().replace('₹', ''));
    };

    const total = cart.reduce((acc, item) => acc + (getPrice(item.price) * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};
