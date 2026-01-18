import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { toggleFavorite, user } = useContext(AuthContext);

    const isFavorite = user?.favorites?.includes(product._id);

    return (
        <div className="product-card" style={{
            border: '1px solid #eee',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'transform 0.2s',
            background: 'white',
            position: 'relative'
        }}>
            <div className="image-container" style={{ position: 'relative', paddingTop: '75%' }}>
                <img
                    src={product.image || 'https://via.placeholder.com/300x200?text=Golgappa'}
                    alt={product.name}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                {user && (
                    <button
                        onClick={() => toggleFavorite(product._id)}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(255,255,255,0.8)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            color: isFavorite ? 'red' : 'gray',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ♥
                    </button>
                )}
            </div>

            <div className="content" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>{product.name}</h3>
                    {product.isSpicy && <span title="Spicy">🌶️</span>}
                </div>

                <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 12px', height: '40px', overflow: 'hidden' }}>
                    {product.description}
                </p>

                <div style={{ marginBottom: '12px' }}>
                    <StarRating rating={product.rating_average || 0} readOnly={true} />
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>
                        ({product.rating_count || 0} reviews)
                    </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{product.price}</span>

                    {product.inventory_count > 0 ? (
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm"
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <span className="text-red-500 font-bold text-sm">Out of Stock</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
