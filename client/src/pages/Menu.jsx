
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
                        className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 ${filter === cat
                                ? 'bg-yellow-500 text-white shadow-lg'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-yellow-50 hover:text-yellow-600'
                            }`}
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
                        <Link key={product._id} to={`/product/${product._id}`}>
                            <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800 truncate">{product.name}</h3>
                                        <span className={`text-xs px-2 py-1 rounded ${product.isSpicy ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                            {product.isSpicy ? 'Spicy' : 'Sweet/Mild'}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                                        <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                                            View
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
