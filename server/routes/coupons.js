const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Coupon = require('../models/Coupon');

// Validate Coupon
router.post('/validate', async (req, res) => {
    try {
        const { code, amount } = req.body;
        const coupon = await Coupon.findOne({ code: code, is_active: true });

        if (!coupon) {
            return res.status(404).json({ msg: 'Invalid coupon code' });
        }

        if (new Date() > coupon.valid_until) {
            return res.status(400).json({ msg: 'Coupon expired' });
        }

        if (amount < coupon.min_order_amount) {
            return res.status(400).json({ msg: `Minimum order amount is ${coupon.min_order_amount}` });
        }

        let discount = 0;
        if (coupon.discount_type === 'percentage') {
            discount = (amount * coupon.discount_value) / 100;
            if (coupon.max_discount && discount > coupon.max_discount) {
                discount = coupon.max_discount;
            }
        } else {
            discount = coupon.discount_value;
        }

        res.json({
            valid: true,
            discount,
            coupon
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create Coupon (Admin)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const newCoupon = new Coupon(req.body);
        const coupon = await newCoupon.save();
        res.json(coupon);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// List Coupons (Admin)
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const coupons = await Coupon.find().sort({ createdAt: -1 });
        res.json(coupons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
