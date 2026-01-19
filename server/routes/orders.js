const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// Create Order
router.post('/', auth, async (req, res) => {
    try {
        const { items, delivery_address, paymentMethod, coupon_code } = req.body;
        
        let totalAmount = 0;
        const processedItems = [];

        // Validate items and calculate total
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ msg: `Product ${item.product} not found` });
            
            if (product.inventory_count < item.quantity) {
                return res.status(400).json({ msg: `Insufficient stock for ${product.name}` });
            }

            processedItems.push({
                product: product._id,
                quantity: item.quantity,
                // product_snapshot could go here
            });
            totalAmount += product.price * item.quantity;
            
            // Decrement inventory
            product.inventory_count -= item.quantity;
            await product.save();
        }

        let discount_amount = 0;
        if (coupon_code) {
            const coupon = await Coupon.findOne({ code: coupon_code, is_active: true });
            if (coupon) {
                // Simplified validation logic
                if (coupon.discount_type === 'percentage') {
                    discount_amount = (totalAmount * coupon.discount_value) / 100;
                } else {
                    discount_amount = coupon.discount_value;
                }
                
                // Track usage
                coupon.used_count += 1;
                await coupon.save();
            }
        }

        const final_amount = totalAmount - discount_amount;

        const newOrder = new Order({
            user: req.user.id,
            items: processedItems,
            totalAmount,
            discount_amount,
            final_amount,
            delivery_address,
            paymentMethod,
            coupon_code,
            status_history: [{ status: 'Pending', updated_by: req.user.id }]
        });

        const order = await newOrder.save();
        res.json(order);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Orders
router.get('/', auth, async (req, res) => {
    try {
        let orders;
        if (req.user.role === 'admin') {
            orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
        } else {
            orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        }
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Single Order
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product')
            .populate('user', 'name email');
        
        if (!order) return res.status(404).json({ msg: 'Order not found' });
        
        // Authorization check
        if (req.user.role !== 'admin' && order.user._id.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Status (Admin)
router.put('/:id/status', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.status = status;
        order.status_history.push({
            status,
            updated_by: req.user.id
        });

        if (status === 'Delivered') {
            order.delivered_at = Date.now();
            order.payment_status = 'completed'; // Assuming COD/Paid
        }

        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Cancel Order
router.put('/:id/cancel', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        if (req.user.role !== 'admin' && order.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        if (order.status === 'Delivered') {
            return res.status(400).json({ msg: 'Cannot cancel delivered order' });
        }

        order.status = 'Cancelled';
        order.cancellation_reason = req.body.reason || 'Cancelled by user';
        order.status_history.push({
            status: 'Cancelled',
            updated_by: req.user.id
        });

        // Restore inventory
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { inventory_count: item.quantity }
            });
        }

        await order.save();
        res.json(order);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
