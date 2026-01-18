const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DeliveryPerson = require('../models/DeliveryPerson');
const Order = require('../models/Order');

// @route   POST api/delivery
// @desc    Add new delivery person
// @access  Admin
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

        const { name, phone, email, vehicle_number } = req.body;
        const newPerson = new DeliveryPerson({
            name, phone, email, vehicle_number
        });
        await newPerson.save();
        res.json(newPerson);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/delivery
// @desc    Get all delivery personnel
// @access  Admin
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
        const personnel = await DeliveryPerson.find();
        res.json(personnel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/delivery/:id/assign
// @desc    Assign order to delivery person
// @access  Admin
router.put('/:id/assign', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

        const { orderId } = req.body;
        
        const deliveryPerson = await DeliveryPerson.findById(req.params.id);
        if (!deliveryPerson) return res.status(404).json({ msg: 'Delivery person not found' });

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.assigned_to = deliveryPerson._id;
        order.status = 'Out for Delivery';
        order.status_history.push({
            status: 'Out for Delivery',
            updated_by: req.user.id,
            comment: `Assigned to ${deliveryPerson.name}`
        });

        deliveryPerson.current_orders.push(order._id);
        deliveryPerson.is_available = false;

        await order.save();
        await deliveryPerson.save();

        res.json({ order, deliveryPerson });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
