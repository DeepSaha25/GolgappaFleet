const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const { MongoMemoryServer } = require('mongodb-memory-server');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/coupons', require('./routes/coupons'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/delivery', require('./routes/delivery'));

// Basic Route
app.get('/', (req, res) => {
    res.send('GolgappaFleet Server is Running with Auth & Products');
});

const seedData = require('./seeder');

const startServer = async () => {
    let mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/golgappafleet';
    
    try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
        console.log('MongoDB Connected (Standard)');
        await seedData();
    } catch (err) {
        console.log('Standard MongoDB connection failed. Starting In-Memory DB...');
        try {
            const mongod = await MongoMemoryServer.create({
                instance: {
                    port: 27017,
                }
            });
            mongoUri = mongod.getUri();
            console.log(`In-Memory DB started at ${mongoUri}`);
            await mongoose.connect(mongoUri);
            console.log('In-Memory MongoDB Connected');
            await seedData();
        } catch (memErr) {
            console.error('Failed to start In-Memory DB on 27017, trying fallback:', memErr);
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
            console.log(`In-Memory DB started on fallback URI: ${mongoUri}`);
            await mongoose.connect(mongoUri);
            await seedData();
        }
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
