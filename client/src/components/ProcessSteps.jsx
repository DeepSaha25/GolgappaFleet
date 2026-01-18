import styles from './ProcessSteps.module.css';

const ProcessSteps = () => {
    const steps = [
        { id: 1, title: 'SELECT YOUR ATTACK', icon: '🎯', desc: 'Choose your weapon of choice: Classic Pani, Vodka Shots, or Chocolate Bombs. Load up the cart.' },
        { id: 2, title: 'WE FLEET IT', icon: '🚀', desc: 'Our hyper-speed sanitation squad preps your box and races to your location. 10 mins or less.' },
        { id: 3, title: 'CRUNCH TIME', icon: '🤤', desc: 'Receive the box. Assemble the Puri. Pour the Pani. Experience spiritual enlightenment.' },
    ];

    return (
        <section className={styles.process}>
            <div className={`container ${styles.container}`}>
                <h3 className={styles.sectionSubtitle}>★ THE GAME PLAN ★</h3>
                <h2 className={styles.sectionTitle}>HOW TO GOLGAPPA</h2>
                <div className={styles.grid}>
                    {steps.map((step, index) => (
                        <div key={step.id} className={`${styles.card} ${styles[`card${index + 1}`]}`}>
                            <div className={styles.iconBox}>
                                {step.icon}
                            </div>
                            <h4>{step.title}</h4>
                            <p>{step.desc}</p>
                            <div className={styles.stepNumber}>{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSteps;
