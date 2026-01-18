const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    discount_type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discount_value: {
        type: Number,
        required: true
    },
    min_order_amount: {
        type: Number,
        default: 0
    },
    max_discount: {
        type: Number
    },
    valid_from: {
        type: Date,
        required: true
    },
    valid_until: {
        type: Date,
        required: true
    },
    usage_limit: {
        type: Number,
        default: null
    },
    used_count: {
        type: Number,
        default: 0
    },
    is_active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Coupon', CouponSchema);
