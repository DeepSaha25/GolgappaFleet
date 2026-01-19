import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { user, login, logout } = useContext(AuthContext);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <NavLink to="/">
                        <i>GolgappaFleet</i>
                    </NavLink>
                </div>

                {/* Desktop Search Bar */}
                <div className={styles.searchBarWrapper}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search for 'Spicy Pani Puri' or 'Dahi Puri'..."
                        className={styles.searchBar}
                    />
                </div>

                <div className={styles.navLinks}>
                    <div className={styles.authButtons}>
                        {user ? (
                            <>
                                <NavLink to="/profile">{user.name}</NavLink>
                                <button onClick={logout} className={styles.loginBtn}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={styles.loginBtn}>Log in</Link>
                                <Link to="/login" className={styles.signupBtn}>Sign up</Link>
                            </>
                        )}
                    </div>

                    <NavLink to="/cart" className={styles.cartLink}>
                        🛒 <span className={styles.cartCount}>{cart.length}</span>
                    </NavLink>
                </div>

                <div className={styles.mobileMenu}>
                    <button>☰</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
