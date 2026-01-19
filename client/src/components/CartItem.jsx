import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="cart-item" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid #eee',
            gap: '16px'
        }}>
            <img
                src={item.image || 'https://via.placeholder.com/80'}
                alt={item.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
            />

            <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#666' }}>₹{item.price}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                }}>
                    <button
                        onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                        style={{ padding: '4px 12px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >-</button>
                    <span style={{ padding: '0 8px' }}>{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                        style={{ padding: '4px 12px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >+</button>
                </div>

                <button
                    onClick={() => removeFromCart(item._id || item.id)}
                    style={{ color: '#ff4444', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    Remove
                </button>
            </div>

            <div style={{ width: '80px', textAlign: 'right', fontWeight: 'bold' }}>
                ₹{item.price * item.quantity}
            </div>
        </div>
    );
};

export default CartItem;
