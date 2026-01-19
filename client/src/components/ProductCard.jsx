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
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            transition: 'all 0.2s',
            background: 'var(--surface)',
            position: 'relative',
            boxShadow: 'var(--shadow-card)'
        }}>
            <div className="image-container" style={{ position: 'relative', paddingTop: '70%' }}>
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
                            background: 'rgba(255,255,255,0.9)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            cursor: 'pointer',
                            color: isFavorite ? '#e23744' : '#b2bec3',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        ♥
                    </button>
                )}
            </div>

            <div className="content" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: '0 0 8px', fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: '700' }}>{product.name}</h3>
                    {product.isSpicy && <span title="Spicy">🌶️</span>}
                </div>

                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: '0 0 16px', height: '40px', overflow: 'hidden' }}>
                    {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-main)' }}>₹{product.price}</span>

                    {product.inventory_count > 0 ? (
                        <button
                            onClick={() => addToCart(product)}
                            className="add-btn"
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                padding: '8px 20px',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
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
                    ) : (
                        <span className="text-red-500 font-bold text-sm">Out of Stock</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
