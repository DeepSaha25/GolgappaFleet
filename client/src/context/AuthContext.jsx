import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const res = await fetch('http://localhost:5000/api/auth/user', {
                        headers: { 'x-auth-token': token }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    } else {
                        logout();
                    }
                } catch (err) {
                    console.error("Auth Error:", err);
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                // User will be loaded by useEffect
                return { success: true };
            } else {
                return { success: false, msg: data.msg };
            }
        } catch (err) {
            return { success: false, msg: 'Server Error' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                return { success: true };
            } else {
                return { success: false, msg: data.msg };
            }
        } catch (err) {
            return { success: false, msg: 'Server Error' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const updateProfile = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(userData)
            });
            if (res.ok) {
                const updatedUser = await res.json();
                setUser(prev => ({ ...prev, ...updatedUser }));
                return { success: true };
            }
            return { success: false, msg: 'Update failed' };
        } catch (err) {
            return { success: false, msg: 'Server Error' };
        }
    };

    const addAddress = async (address) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(address)
            });
            if (res.ok) {
                const addresses = await res.json();
                setUser(prev => ({ ...prev, addresses }));
                return { success: true };
            }
        } catch (err) {
            console.error(err);
        }
        return { success: false };
    };

    const deleteAddress = async (addressId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/auth/address/${addressId}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            if (res.ok) {
                const addresses = await res.json();
                setUser(prev => ({ ...prev, addresses }));
                return { success: true };
            }
        } catch (err) {
            console.error(err);
        }
        return { success: false };
    };

    const toggleFavorite = async (productId) => {
        if (!user) return;
        const isFav = user.favorites.includes(productId);
        const method = isFav ? 'DELETE' : 'PUT';

        try {
            const res = await fetch(`http://localhost:5000/api/auth/favorites/${productId}`, {
                method: method,
                headers: { 'x-auth-token': token }
            });
            if (res.ok) {
                const favorites = await res.json();
                setUser(prev => ({ ...prev, favorites }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{
            user, token, loading, login, register, logout,
            updateProfile, addAddress, deleteAddress, toggleFavorite,
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </AuthContext.Provider>
    );
};
