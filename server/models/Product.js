const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Classic', 'Sweet', 'Exotic', 'Beverage'],
        required: true
    },
    isSpicy: {
        type: Boolean,
        default: false
    },
    inventory_count: {
        type: Number,
        default: 0,
        required: true
    },
    low_stock_threshold: {
        type: Number,
        default: 10
    },
    rating_average: {
        type: Number,
        default: 0
    },
    rating_count: {
        type: Number,
        default: 0
    },
    is_available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
