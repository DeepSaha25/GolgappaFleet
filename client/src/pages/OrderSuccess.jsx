import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{
            padding: '120px 20px',
            textAlign: 'center',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ fontSize: '5rem', color: '#4CAF50', marginBottom: '20px' }}>✓</div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Order Placed Successfully!</h1>
            <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '40px' }}>
                Thank you for your order. We are preparing it with love ❤️
            </p>

            <div style={{ display: 'flex', gap: '20px' }}>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                    Track Order
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="border border-black px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
