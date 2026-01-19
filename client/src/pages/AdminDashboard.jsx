import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const DashboardOverview = () => {
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, lowStockCount: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/admin/dashboard', {
                headers: { 'x-auth-token': token }
            });
            if (res.ok) setStats(await res.json());
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className={styles.statCard}>
                    <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                    <p className="text-2xl font-bold mt-2">₹{stats.totalRevenue}</p>
                </div>
                <div className={styles.statCard}>
                    <h3 className="text-gray-500 text-sm">Total Orders</h3>
                    <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
                </div>
                <div className={styles.statCard}>
                    <h3 className="text-gray-500 text-sm">Pending Orders</h3>
                    <p className="text-2xl font-bold mt-2 text-yellow-600">{stats.pendingOrders}</p>
                </div>
                <div className={styles.statCard}>
                    <h3 className="text-gray-500 text-sm">Low Stock Items</h3>
                    <p className="text-2xl font-bold mt-2 text-red-600">{stats.lowStockCount}</p>
                </div>
            </div>
        </div>
    );
};

const OrdersManager = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/orders', {
            headers: { 'x-auth-token': token }
        });
        if (res.ok) setOrders(await res.json());
    };

    const updateStatus = async (id, status) => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/orders/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({ status })
        });
        fetchOrders();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Order Management</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>#{order._id.slice(-6)}</td>
                                <td>{order.user?.name || 'Unknown'}</td>
                                <td>{order.items.length} items</td>
                                <td>₹{order.final_amount}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                        className="p-1 border rounded text-sm"
                                        disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="text-blue-600 text-sm hover:underline">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ProductsManager = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/api/products');
        setProducts(await res.json());
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Product Inventory</h2>
                <button className="bg-black text-white px-4 py-2 rounded">+ Add Product</button>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="font-medium">{product.name}</td>
                                <td>{product.category}</td>
                                <td>₹{product.price}</td>
                                <td className={product.inventory_count < 10 ? 'text-red-600 font-bold' : ''}>
                                    {product.inventory_count}
                                </td>
                                <td>{product.rating_average?.toFixed(1) || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const location = useLocation();

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className="mb-8 px-4">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                <nav>
                    <Link to="/admin" className={`${styles.navItem} ${location.pathname === '/admin' ? styles.active : ''}`}>
                        Dashboard
                    </Link>
                    <Link to="/admin/orders" className={`${styles.navItem} ${location.pathname === '/admin/orders' ? styles.active : ''}`}>
                        Orders
                    </Link>
                    <Link to="/admin/products" className={`${styles.navItem} ${location.pathname === '/admin/products' ? styles.active : ''}`}>
                        Products
                    </Link>
                    {/* Add Coupons, etc. */}
                </nav>
            </aside>

            <main className={styles.content}>
                <Routes>
                    <Route path="/" element={<DashboardOverview />} />
                    <Route path="/orders" element={<OrdersManager />} />
                    <Route path="/products" element={<ProductsManager />} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminDashboard;
