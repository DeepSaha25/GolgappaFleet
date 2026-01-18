import styles from './Hero.module.css';
import heroImg from '../assets/images/download (2).jpeg';

const Hero = () => {
    return (
        <section className={styles.hero} id="home">
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.content}>
                    <div className={styles.badgeWrapper}>
                        <div className={styles.reviewBadge}>
                            <span className={styles.star}>★</span>
                            <span>No.1 Pani Puri in Town</span>
                        </div>
                    </div>

                    <h1 className={styles.title}>
                        THE <span className={styles.outline}>ULTIMATE</span> <br />
                        <span className={styles.highlight}>CRUNCH</span>
                    </h1>

                    <p className={styles.subtitle}>
                        Experience the explosive taste of authentic, hygiene-first Golgappas.
                        <br className={styles.break} />
                        Delivered at hyper-speed.
                    </p>

                    <div className={styles.buttons}>
                        <button className={styles.btnPrimary}>ORDER BOX 🥙</button>
                        <button className={styles.btnSecondary}>SEE MENU ▶</button>
                    </div>
                </div>

                <div className={styles.imageWrapper}>
                    <div className={styles.blob}></div>
                    <img
                        src={heroImg}
                        alt="Delicious Golgappa Plate"
                        className={styles.heroImage}
                    />

                    {/* Floating Cards / Emojis */}
                    <div className={`${styles.floatingEmoji} ${styles.emoji1}`}>🌶️</div>
                    <div className={`${styles.floatingEmoji} ${styles.emoji2}`}>🍋</div>
                    <div className={`${styles.floatingEmoji} ${styles.emoji3}`}>💣</div>

                    <div className={`${styles.floatingCard} ${styles.card1}`}>
                        <span className={styles.emoji}>🔥</span>
                        <div>
                            <strong>Tikha Pani</strong>
                            <small>Handle the heat?</small>
                        </div>
                    </div>

                    <div className={`${styles.floatingCard} ${styles.card2}`}>
                        <span className={styles.emoji}>💧</span>
                        <div>
                            <strong>Pudina Shot</strong>
                            <small>Fresh Mint Blast</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.marquee}>
                <div className={styles.marqueeContent}>
                    <span>CRUNCHY PURI • TIKHA PANI • MEETHA CHUTNEY • 100% HYGIENIC • CRUNCHY PURI • TIKHA PANI • MEETHA CHUTNEY • 100% HYGIENIC •</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
