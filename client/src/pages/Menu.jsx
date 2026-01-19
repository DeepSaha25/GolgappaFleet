
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching menu:', err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];
    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Menu</h1>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '8px 24px',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            border: filter === cat ? 'none' : '1px solid var(--border)',
                            backgroundColor: filter === cat ? 'var(--primary)' : 'white',
                            color: filter === cat ? 'white' : 'var(--text-light)',
                            cursor: 'pointer',
                            boxShadow: filter === cat ? '0 4px 10px rgba(245, 158, 11, 0.3)' : 'none',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <Link key={product._id} to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                            <div style={{
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                overflow: 'hidden',
                                background: 'var(--surface)',
                                transition: 'all 0.3s ease',
                                boxShadow: 'var(--shadow-card)',
                                height: '100%'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 style={{
                                            fontSize: '1.2rem',
                                            fontWeight: '700',
                                            color: 'var(--text-main)',
                                            margin: 0
                                        }}>{product.name}</h3>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: product.isSpicy ? '#FEE2E2' : '#D1FAE5',
                                            color: product.isSpicy ? '#DC2626' : '#059669',
                                            fontWeight: '600'
                                        }}>
                                            {product.isSpicy ? 'Spicy' : 'Mild'}
                                        </span>
                                    </div>
                                    <p style={{
                                        color: 'var(--text-light)',
                                        fontSize: '0.9rem',
                                        marginBottom: '16px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>₹{product.price}</span>
                                        <button style={{
                                            backgroundColor: 'var(--primary)',
                                            color: 'white',
                                            padding: '8px 24px',
                                            borderRadius: '8px',
                                            fontWeight: '600',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary)'}
                                        >
                                            ADD
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;
