import { useState } from 'react';

const AddressForm = ({ onSubmit, initialData = {}, onCancel }) => {
    const [formData, setFormData] = useState({
        label: initialData.label || 'Home',
        street: initialData.street || '',
        city: initialData.city || '',
        state: initialData.state || '',
        pincode: initialData.pincode || '',
        landmark: initialData.landmark || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
                type="text" name="label" placeholder="Label (e.g. Home, Work)"
                value={formData.label} onChange={handleChange} required
                className="p-2 border rounded"
            />
            <input
                type="text" name="street" placeholder="Street Address"
                value={formData.street} onChange={handleChange} required
                className="p-2 border rounded"
            />
            <div style={{ display: 'flex', gap: '12px' }}>
                <input
                    type="text" name="city" placeholder="City"
                    value={formData.city} onChange={handleChange} required
                    className="p-2 border rounded flex-1"
                />
                <input
                    type="text" name="pincode" placeholder="Pincode"
                    value={formData.pincode} onChange={handleChange} required
                    className="p-2 border rounded w-1/3"
                />
            </div>
            <input
                type="text" name="state" placeholder="State"
                value={formData.state} onChange={handleChange} required
                className="p-2 border rounded"
            />
            <input
                type="text" name="landmark" placeholder="Landmark (Optional)"
                value={formData.landmark} onChange={handleChange}
                className="p-2 border rounded"
            />
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="submit" className="bg-black text-white px-4 py-2 rounded flex-1">
                    Save Address
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="bg-gray-200 text-black px-4 py-2 rounded">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default AddressForm;
