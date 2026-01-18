const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Connect to DB
const Product = require('./models/Product');
const User = require('./models/User');

const seedData = async () => {
    try {
        const count = await Product.countDocuments();
        if (count > 0) return; // Already seeded

        console.log('Seeding Data...');
        await Product.deleteMany({});
        await User.deleteMany({});

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const userPassword = await bcrypt.hash('user123', salt);

        await User.create({
            name: 'Golu Admin',
            email: 'admin@golgappa.com',
            password: adminPassword,
            role: 'admin',
            phone: '9999999999'
        });

        await User.create({
            name: 'Hungry Customer',
            email: 'user@gmail.com',
            password: userPassword,
            role: 'user',
            phone: '8888888888'
        });

        // Create Products
        const products = [
            {
                name: 'Classic Pani Puri',
                description: 'Crispy puris filled with spicy mint water and potatoes.',
                price: 50,
                category: 'Classic',
                image: 'https://media.istockphoto.com/id/1325356942/photo/pani-puri-golgappa-indian-snack.jpg?s=612x612&w=0&k=20&c=L_A5zSioq1J4h4qW4QZqgV-_qQOQGgQ_qQOQGgQ_qQ=',
                isSpicy: true,
                inventory_count: 100,
                rating_average: 4.8,
                rating_count: 120
            },
            {
                name: 'Dahi Puri',
                description: 'Puris topped with sweetened yogurt, chutneys, and sev.',
                price: 70,
                category: 'Sweet',
                image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2010/07/dahi-puri-recipe-1.jpg',
                isSpicy: false,
                inventory_count: 80,
                rating_average: 4.9,
                rating_count: 95
            },
            {
                name: 'Sew Puri',
                description: 'Flat puris loaded with veggies, chutneys, and lots of sev.',
                price: 60,
                category: 'Snacks',
                image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/sev-puri-recipe.jpg',
                isSpicy: true,
                inventory_count: 50,
                rating_average: 4.7,
                rating_count: 60
            },
            {
                name: 'Spicy Masala Puri',
                description: 'Crushed puris mixed with hot ragda curry and spices.',
                price: 65,
                category: 'Spicy',
                image: 'https://i.ytimg.com/vi/zZQ_qQOQGgQ/maxresdefault.jpg', // Placeholder
                isSpicy: true,
                inventory_count: 40,
                rating_average: 4.6,
                rating_count: 45
            },
            {
                name: 'Chocolate Golgappa',
                description: 'A modern twist with chocolate coated puris and filling.',
                price: 80,
                category: 'Fusion',
                image: 'https://i.pinimg.com/736x/zZ/Q_q/QO/zZQ_qQOQGgQ.jpg', // Placeholder
                isSpicy: false,
                inventory_count: 20,
                rating_average: 4.2,
                rating_count: 15
            },
            {
                name: 'Unlimited Family Pack',
                description: 'Kit of 100 Puris, 2L Pani, and 1kg Masala.',
                price: 499,
                category: 'Combo',
                image: 'https://m.media-amazon.com/images/I/zZQ_qQOQGgQ.jpg', // Placeholder
                is_available: true,
                inventory_count: 10,
                rating_average: 5.0,
                rating_count: 8
            }
        ];

        await Product.insertMany(products);

        console.log('Data Imported Successfully!');
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedData;
