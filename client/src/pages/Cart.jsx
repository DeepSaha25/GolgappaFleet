import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
    const { cart, removeFromCart, total, clearCart } = useContext(CartContext);

    return (
        <div className={styles.container}>
            <div className={styles.cartBox}>
                <h2>YOUR STASH 🛒</h2>

                {cart.length === 0 ? (
                    <p>Your fleet stash is empty. Go add some crunch!</p>
                ) : (
                    <div className={styles.itemList}>
                        {cart.map(item => (
                            <div key={item._id || item.id} className={styles.item}>
                                <div className={styles.itemInfo}>
                                    <h4>{item.name}</h4>
                                    <p>₹{item.price} x {item.quantity}</p>
                                </div>
                                <button onClick={() => removeFromCart(item._id || item.id)}>🗑️</button>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className={styles.summary}>
                        <h3>TOTAL: ₹{total}</h3>
                        <button className={styles.checkoutBtn} onClick={() => alert('Proceeding to Payment Gateway...')}>CHECKOUT 💳</button>
                        <button className={styles.clearBtn} onClick={clearCart}>CLEAR ALL</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
