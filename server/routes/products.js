const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const auth = require('../middleware/auth');
const Review = require('../models/Review');

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category) query.category = category;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create product (Admin only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Product (Admin only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Product Reviews
router.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.id }).populate('user', 'name');
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add Review
router.post('/:id/reviews', auth, async (req, res) => {
    try {
        const { rating, comment, orderId } = req.body;
        // Verify purchase logic could go here
        
        const newReview = new Review({
            user: req.user.id,
            product: req.params.id,
            order: orderId, // Assuming passed from frontend after checking purchase history
            rating,
            comment
        });

        const review = await newReview.save();
        
        // Update product rating
        const allReviews = await Review.find({ product: req.params.id });
        const avg = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;
        
        await Product.findByIdAndUpdate(req.params.id, {
            rating_average: avg,
            rating_count: allReviews.length
        });

        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
