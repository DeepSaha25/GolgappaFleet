const mongoose = require('mongoose');

const DeliveryPersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    vehicle_number: {
        type: String,
        required: true
    },
    is_available: {
        type: Boolean,
        default: true
    },
    current_orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DeliveryPerson', DeliveryPersonSchema);
