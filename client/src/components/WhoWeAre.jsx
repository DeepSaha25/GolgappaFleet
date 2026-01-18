import styles from './WhoWeAre.module.css';
import aboutImg from '../assets/images/download (1).jpeg';

const WhoWeAre = () => {
    return (
        <section className={styles.whoWeAre} id="about">
            <div className={`container ${styles.container}`}>
                <div className={styles.imageBox}>
                    <img src={aboutImg} alt="Enjoying Food" />
                    <div className={styles.sticker}>YUM!</div>
                </div>

                <div className={styles.textBox}>
                    <h2>INDIA'S FIRST <br /> HYGIENIC FLEET</h2>
                    <p>We are digitizing the street food experience. No more questionable water. Only usage of Mineral Water and gloves, delivered to your doorstep.</p>

                    <div className={styles.features}>
                        <div className={styles.featureItem}>💧 Mineral Water</div>
                        <div className={styles.featureItem}>🧤 Contactless</div>
                        <div className={styles.featureItem}>🚀 10 Min Delivery</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
