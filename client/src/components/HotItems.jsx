import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';
import styles from './HotItems.module.css';

const HotItems = () => {
    const [items, setItems] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                setItems(data);
            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className={styles.hotItems} id="menu">
            <div className={`container ${styles.container}`}>
                <h3 className={styles.sectionSubtitle}>★ OUR FLAVORS ★</h3>
                <h2 className={styles.sectionTitle}>PICK YOUR BOX</h2>

                <div className={styles.grid}>
                    {items.map(item => (
                        <div key={item._id} className={styles.cardWrapper}>
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HotItems;
