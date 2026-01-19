
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddressPage = () => {
    // Mock user for now since we don't have full auth state persistence in front-end yet
    // In a real app, this would come from AuthContext
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        label: 'Home',
        street: '',
        city: '',
        state: '',
        pincode: '',
        landmark: ''
    });
    const navigate = useNavigate();

    // Since we don't have a real backend endpoint for address yet (just schema), 
    // we'll mock the state locally or implement the backend route next.
    // For this step, I'll assume we'll store it locally/mock it to visualize the UI
    // OR calling an endpoint I am about to create. Let's create the UI first.

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here we would sync with backend
        // await axios.post('/api/user/address', formData, headers...)
        setAddresses([...addresses, { ...formData, _id: Date.now() }]);
        setShowForm(false);
        setFormData({ label: 'Home', street: '', city: '', state: '', pincode: '', landmark: '' });
    };

    const handleSelectAddress = (addr) => {
        // Proceed to payment (placeholder)
        alert(`Selected Address: ${addr.label}. Proceeding to Payment...`);
        // navigate('/payment'); 
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Select Delivery Address</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add New Address Card */}
                <div
                    onClick={() => setShowForm(true)}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 transition-all min-h-[200px]"
                >
                    <span className="text-4xl text-gray-400 mb-2">+</span>
                    <span className="text-gray-600 font-semibold">Add New Address</span>
                </div>

                {/* Existing Addresses */}
                {addresses.map(addr => (
                    <div key={addr._id} className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative bg-white">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                {addr.label}
                            </span>
                        </div>
                        <p className="font-medium text-gray-800 mb-1">{addr.street}</p>
                        <p className="text-gray-600 text-sm mb-4">
                            {addr.landmark ? `${addr.landmark}, ` : ''}{addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <button
                            onClick={() => handleSelectAddress(addr)}
                            className="w-full bg-yellow-400 text-white py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                        >
                            Deliver Here
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for Address Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Address</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Save As</label>
                                <div className="flex gap-4">
                                    {['Home', 'Work', 'Other'].map(type => (
                                        <button
                                            type="button"
                                            key={type}
                                            onClick={() => setFormData({ ...formData, label: type })}
                                            className={`flex-1 py-2 rounded-lg border ${formData.label === type ? 'bg-yellow-100 border-yellow-500 text-yellow-700' : 'border-gray-300 text-gray-600'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <input
                                name="street" value={formData.street} onChange={handleInputChange}
                                placeholder="Street / Flat No / Building"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    name="city" value={formData.city} onChange={handleInputChange}
                                    placeholder="City"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                                <input
                                    name="pincode" value={formData.pincode} onChange={handleInputChange}
                                    placeholder="Pincode"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>

                            <input
                                name="state" value={formData.state} onChange={handleInputChange}
                                placeholder="State"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />

                            <input
                                name="landmark" value={formData.landmark} onChange={handleInputChange}
                                placeholder="Landmark (Optional)"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-white font-bold py-3 rounded-xl hover:bg-yellow-500 transition-colors shadow-lg mt-6"
                            >
                                Save Address
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressPage;
