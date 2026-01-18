import styles from './Testimonials.module.css';

const Testimonials = () => {
    return (
        <section className={styles.testimonials}>
            <div className="container">
                <h3 className={styles.sectionSubtitle}>— WHAT OUR CUSTOMER SAYS —</h3>

                <div className={styles.slider}>
                    {/* Just showing one active slide for MVP */}
                    <div className={styles.card}>
                        <div className={styles.quoteIcon}>“</div>
                        <p className={styles.quote}>
                            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua
                        </p>
                        <div className={styles.stars}>★★★★★</div>
                        <div className={styles.author}>
                            <h5>Mandy Oza</h5>
                            <span>Xyz Company Ceo</span>
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button className={styles.arrowInfo}>&lt;</button>
                    <button className={styles.arrowInfo}>&gt;</button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
