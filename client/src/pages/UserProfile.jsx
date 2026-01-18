import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import AddressForm from '../components/AddressForm';
import styles from './UserProfile.module.css';

const UserProfile = () => {
    const { user, logout, updateProfile, addAddress, deleteAddress } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState([]);
    const [editingAddress, setEditingAddress] = useState(false);
    const [profileData, setProfileData] = useState({ name: '', phone: '' });

    useEffect(() => {
        if (user) {
            setProfileData({ name: user.name, phone: user.phone || '' });
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/orders', {
                headers: { 'x-auth-token': token }
            });
            if (res.ok) setOrders(await res.json());
        } catch (err) {
            console.error(err);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const res = await updateProfile(profileData);
        if (res.success) alert('Profile updated!');
        else alert('Update failed');
    };

    const handleAddAddress = async (data) => {
        const res = await addAddress(data);
        if (res.success) setEditingAddress(false);
    };

    return (
        <div className="container" style={{ padding: '80px 20px', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>My Account</h1>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 0 200px', maxWidth: '250px' }}>
                    <div className={styles.sidebar}>
                        <button
                            className={activeTab === 'profile' ? styles.active : ''}
                            onClick={() => setActiveTab('profile')}
                        >Profile</button>
                        <button
                            className={activeTab === 'orders' ? styles.active : ''}
                            onClick={() => setActiveTab('orders')}
                        >Orders</button>
                        <button
                            className={activeTab === 'addresses' ? styles.active : ''}
                            onClick={() => setActiveTab('addresses')}
                        >Addresses</button>
                        <button onClick={logout} style={{ color: 'red' }}>Logout</button>
                    </div>
                </div>

                <div style={{ flex: '3 0 300px' }}>
                    {activeTab === 'profile' && (
                        <div className={styles.card}>
                            <h2>Edit Profile</h2>
                            <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <input
                                    type="text" value={profileData.name}
                                    onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                                    placeholder="Name" className="p-2 border rounded"
                                />
                                <input
                                    type="text" value={profileData.phone}
                                    onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                                    placeholder="Phone" className="p-2 border rounded"
                                />
                                <input type="email" value={user?.email} disabled className="p-2 border rounded bg-gray-100" />
                                <button type="submit" className="bg-black text-white px-4 py-2 rounded">Update Profile</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div>
                            <h2>Order History</h2>
                            {orders.length === 0 ? <p>No orders yet.</p> : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {orders.map(order => (
                                        <div key={order._id} className={styles.card} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h4 style={{ margin: 0 }}>Order #{order._id.slice(-6)}</h4>
                                                <p style={{ margin: '5px 0', color: '#666' }}>
                                                    {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                                                </p>
                                                <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontWeight: 'bold' }}>₹{order.final_amount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <h2>Saved Addresses</h2>
                                <button
                                    onClick={() => setEditingAddress(true)}
                                    className="bg-black text-white px-4 py-2 rounded"
                                >+ Add New</button>
                            </div>

                            {editingAddress && (
                                <div className={styles.card} style={{ marginBottom: '20px' }}>
                                    <h3>New Address</h3>
                                    <AddressForm onSubmit={handleAddAddress} onCancel={() => setEditingAddress(false)} />
                                </div>
                            )}

                            <div className={styles.grid}>
                                {user?.addresses?.map(addr => (
                                    <div key={addr._id} className={styles.card} style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => deleteAddress(addr._id)}
                                            style={{ position: 'absolute', top: '10px', right: '10px', color: 'red' }}
                                        >
                                            🗑
                                        </button>
                                        <h4 style={{ margin: '0 0 5px' }}>{addr.label}</h4>
                                        <p style={{ color: '#666', margin: 0 }}>
                                            {addr.street}<br />
                                            {addr.city}, {addr.state} - {addr.pincode}<br />
                                            {addr.landmark && <small>Landmark: {addr.landmark}</small>}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
