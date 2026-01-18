const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Admin Dashboard Stats
router.get('/dashboard', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'Pending' });
        const lowStockProducts = await Product.find({ $expr: { $lte: ["$inventory_count", "$low_stock_threshold"] } });
        
        // Calculate Revenue (simple aggregation)
        const revenueAgg = await Order.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            { $group: { _id: null, total: { $sum: "$final_amount" } } }
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        res.json({
            totalOrders,
            pendingOrders,
            lowStockCount: lowStockProducts.length,
            totalRevenue,
            lowStockItems: lowStockProducts
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
