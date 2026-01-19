
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        // Optional: Show a toast notification here
        navigate('/cart');
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
        </div>
    );

    if (!product) return <div className="text-center py-20 text-2xl">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-12 mt-16">
            <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden max-w-6xl mx-auto">
                {/* Image Section */}
                <div className="md:w-1/2 h-96 md:h-auto relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    {product.isSpicy && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                            Spicy
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-yellow-600 font-semibold tracking-wider uppercase mb-2 text-sm">
                        {product.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <div className="flex items-center mb-6">
                        <span className="text-3xl text-gray-800 font-bold">₹{product.price}</span>
                        <span className="ml-4 text-green-600 bg-green-100 px-3 py-1 rounded-lg text-sm font-medium">
                            In Stock
                        </span>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center border-2 border-gray-200 rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                -
                            </button>
                            <span className="px-4 text-lg font-medium">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Add to Cart - ₹{product.price * quantity}
                        </button>
                    </div>

                    <div className="border-t border-gray-100 pt-6 mt-auto">
                        <h4 className="font-semibold text-gray-800 mb-2">Why you'll love it:</h4>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                            <li className="flex items-center">✨ Freshly made</li>
                            <li className="flex items-center">🌿 Premium Ingredients</li>
                            <li className="flex items-center">⚡ Super Fast Delivery</li>
                            <li className="flex items-center">❤️ Made with Love</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
