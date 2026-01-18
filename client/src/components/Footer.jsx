import styles from './Footer.module.css';
import logo from '../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className={styles.footer} id="contact">
            <div className={`container ${styles.container}`}>
                {/* Brand */}
                <div className={styles.brand}>
                    <div className={styles.logo}>
                        <span>🥙 GolgappaFleet</span>
                    </div>
                    <p>India's First Hygienic Pani Puri Delivery Fleet. Delivering crunch and flavor to your doorstep in minutes.</p>
                    <div className={styles.contactInfo}>
                        <p>+91 9876543210</p>
                        <p>mail@golgappafleet.com</p>
                    </div>
                </div>

                {/* Service */}
                <div className={styles.column}>
                    <h4>Service</h4>
                    <ul>
                        <li><a href="#">Fleet</a></li>
                        <li><a href="#">Menu</a></li>
                        <li><a href="#">Hot Items</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                    </ul>
                </div>

                {/* Follow Us */}
                <div className={styles.column}>
                    <h4>Follow Us</h4>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Linked In</a></li>
                        <li><a href="#">Tweeter</a></li>
                        <li><a href="#">Whatsapp</a></li>
                    </ul>
                </div>

                {/* Subscribe */}
                <div className={styles.subscribe}>
                    <h4>Subscribe For New Update</h4>
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder="Enter Email..." />
                        <button>→</button>
                    </div>
                    <div className={styles.copyright}>
                        GolgappaFleet©All Right Reserved
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
