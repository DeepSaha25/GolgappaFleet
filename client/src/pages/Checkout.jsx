import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/AddressForm';

const Checkout = () => {
    const { cart, total, clearCart } = useContext(CartContext);
    const { user, addAddress } = useContext(AuthContext);
    const navigate = useNavigate();

    const [selectedAddress, setSelectedAddress] = useState(user?.addresses?.[0]?._id);
    const [addingAddress, setAddingAddress] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [loading, setLoading] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please select a delivery address');
            return;
        }

        setLoading(true);
        try {
            const address = user.addresses.find(a => a._id === selectedAddress);

            const orderData = {
                items: cart.map(item => ({
                    product: item._id,
                    quantity: item.quantity
                })),
                delivery_address: address,
                paymentMethod,
                coupon_code: coupon
            };

            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                clearCart();
                navigate('/order-success');
            } else {
                const data = await res.json();
                alert(data.msg || 'Order failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server Error');
        }
        setLoading(false);
    };

    const handleAddAddress = async (data) => {
        await addAddress(data);
        setAddingAddress(false);
    };

    if (cart.length === 0) {
        return <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
            <h2>Your cart is empty</h2>
            <button onClick={() => navigate('/')} className="mt-4 bg-black text-white px-6 py-2 rounded">Start Shopping</button>
        </div>;
    }

    return (
        <div className="container" style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                <div className="left-section">

                    {/* Address Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">1. Delivery Address</h2>
                        {user?.addresses?.length > 0 && !addingAddress ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.addresses.map(addr => (
                                    <div
                                        key={addr._id}
                                        onClick={() => setSelectedAddress(addr._id)}
                                        className={`p-4 border rounded cursor-pointer ${selectedAddress === addr._id ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                                    >
                                        <div className="font-bold">{addr.label}</div>
                                        <div className="text-sm text-gray-600">
                                            {addr.street}, {addr.city} - {addr.pincode}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setAddingAddress(true)}
                                    className="p-4 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 hover:border-black hover:text-black"
                                >
                                    + Add New Address
                                </button>
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded">
                                <h3 className="mb-4 font-bold">Add New Address</h3>
                                <AddressForm onSubmit={handleAddAddress} onCancel={() => setAddingAddress(false)} />
                            </div>
                        )}
                    </div>

                    {/* Payment Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">2. Payment Method</h2>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio" name="payment" value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                <span>Cash on Delivery</span>
                            </label>
                            <label className="flex items-center space-x-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio" name="payment" value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={() => setPaymentMethod('online')}
                                />
                                <span>Online Payment (Razorpay/Stripe)</span>
                            </label>
                            <label className="flex items-center space-x-3 p-4 border rounded cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio" name="payment" value="wallet"
                                    checked={paymentMethod === 'wallet'}
                                    onChange={() => setPaymentMethod('wallet')}
                                />
                                <span>Wallet Balance (₹{user?.wallet_balance || 0})</span>
                            </label>
                        </div>
                    </div>

                </div>

                <div className="right-section">
                    <div className="bg-gray-50 p-6 rounded sticky top-24">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span>-₹{discount}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                <span>Total</span>
                                <span>₹{total - discount}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className={`w-full mt-6 bg-black text-white py-3 rounded font-bold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                        >
                            {loading ? 'Processing...' : `Pay ₹${total - discount}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
