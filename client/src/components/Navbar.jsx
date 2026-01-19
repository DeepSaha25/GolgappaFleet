import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.logo}>
                    <NavLink to="/">
                        <span>🥙 GolgappaFleet</span>
                    </NavLink>
                </div>
                <ul className={styles.navLinks}>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink></li>
                    <li><NavLink to="/menu" className={({ isActive }) => isActive ? styles.active : ''}>Menu</NavLink></li>

                    {user ? (
                        <>
                            {user.role === 'admin' && <li><NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ''}>Admin</NavLink></li>}
                            <li><NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : ''}>Profile</NavLink></li>
                        </>
                    ) : (
                        <li><NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ''}>Login</NavLink></li>
                    )}
                    <li>
                        <NavLink to="/cart" className={styles.cartLink}>
                            🛒 <span className={styles.cartCount}>{cart.length}</span>
                        </NavLink>
                    </li>
                </ul>
                <div className={styles.mobileMenu}>
                    <button>☰</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
