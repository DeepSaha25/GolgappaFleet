import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const HERO_IMAGES = [
    "https://t4.ftcdn.net/jpg/04/39/21/28/360_F_439212879_hPq9N9fN9fN9fN9fN9fN9fN9fN9fN9f.jpg", // Placeholder high quality
    "https://media.istockphoto.com/id/1325356942/photo/pani-puri-golgappa-indian-snack.jpg?s=612x612&w=0&k=20&c=L_A5zSioq1J4h4qW4QZqgV-_qQOQGgQ_qQOQGgQ_qQ=",
    "https://thumbs.dreamstime.com/b/pani-puri-golgappa-indian-snack-1325356942.jpg" // Placeholder
];

// Note: In a real app, I'd use the local high-res images from assets, 
// using generic URLs for demo to ensure they load.

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.hero} id="home">
            {HERO_IMAGES.map((img, index) => (
                <div
                    key={index}
                    className={`${styles.heroSlide} ${index === currentImage ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}
            <div className={styles.overlay}></div>

            <div className={styles.heroContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>GolgappaFleet</h1>
                    <h2 className={styles.subtitle}>Superfast delivery of India's favorite street food</h2>

                    <div className={styles.searchContainer}>
                        <div className={styles.locationWrapper}>
                            <span className={styles.locationIcon}>📍</span>
                            <input
                                type="text"
                                className={styles.locationInput}
                                placeholder="Kolkata, WB"
                                defaultValue="Kolkata, WB"
                            />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.searchWrapper}>
                            <span className={styles.searchIcon}>🔍</span>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search for dishes, restaurants..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
