import styles from './PromoBanner.module.css';
import promoImg from '../assets/images/download (3).jpeg';

const PromoBanner = () => {
    return (
        <section className={styles.promo}>
            <div className={`container ${styles.promoContainer}`}>
                <div className={styles.text}>
                    <h3>Get Up To</h3>
                    <h2>50% OFF</h2>
                    <h4>On Your 2 Order's</h4>
                    <button className={styles.btnOrder}>Order Now</button>
                    <div className={styles.dashedLine}></div>
                </div>
                <div className={styles.image}>
                    {/* Placeholder for Combo Meal Image */}
                    <img src={promoImg} alt="Discount Meal" />
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;
