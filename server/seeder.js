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
                description: 'Timeless crispy puris filled with spicy mint water, mashed potatoes, and chickpeas.',
                price: 50,
                category: 'Classic',
                image: '/images/classic-pani-puri.jpeg',
                isSpicy: true,
                inventory_count: 100,
                rating_average: 4.8,
                rating_count: 120
            },
            {
                name: 'Dahi Puri',
                description: 'Puris stuffed with spiced potatoes, topped with sweetened yogurt, tamarind chutney, and tons of sev.',
                price: 70,
                category: 'Sweet',
                image: '/images/dahi-puri.jpeg',
                isSpicy: false,
                inventory_count: 80,
                rating_average: 4.9,
                rating_count: 95
            },
             {
                name: 'Mumbai Sev Puri',
                description: 'Flat puris loaded with diced potatoes, onions, three types of chutneys and separate layer of thin sev.',
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
                description: 'Crushed puris mixed with hot piping ragda curry, onions, and special spice mix.',
                price: 65,
                category: 'Spicy',
                image: '/images/spicy-masala-puri.jpeg',
                isSpicy: true,
                inventory_count: 40,
                rating_average: 4.6,
                rating_count: 45
            },
            {
                name: 'Chocolate Golgappa',
                description: 'The ultimate dessert! Chocolate coated puris filled with chocolate mousse and sprinkles.',
                price: 80,
                category: 'Fusion',
                image: '/images/chocolate-golgappa.jpeg',
                isSpicy: false,
                inventory_count: 20,
                rating_average: 4.2,
                rating_count: 15
            },
            {
                name: 'Unlimited Family Pack',
                description: 'Party pack containing 100 Puris, 2 Liters of Spicy & Sweet Pani, and 1kg Masala loading.',
                price: 499,
                category: 'Combo',
                image: '/images/unlimited-family-pack.jpeg',
                is_available: true,
                inventory_count: 10,
                rating_average: 5.0,
                rating_count: 8
            },
            {
                name: 'Vodka Pani Puri Shots',
                description: 'Adults only! Crispy puris served with a shot of vodka-infused spicy pani. (Contains Alcohol)',
                price: 150,
                category: 'Fusion',
                image: 'https://img.freepik.com/premium-photo/pani-puri-vodka-shots-indian-street-food-twist_931553-62580.jpg',
                isSpicy: true,
                inventory_count: 15,
                rating_average: 4.8,
                rating_count: 30
            },
            {
                name: 'Pizza Golgappa',
                description: 'Fusion delight! Puris stuffed with cheese, pizza sauce, corn, and jalapeños, baked to perfection.',
                price: 120,
                category: 'Fusion',
                image: 'https://i.ytimg.com/vi/H1G9kCq1lEc/maxresdefault.jpg',
                isSpicy: false,
                inventory_count: 25,
                rating_average: 4.5,
                rating_count: 42
            },
             {
                name: 'Fire Golgappa',
                description: 'A theatrical experience! Golgappas set aflame briefly for a smoky flavor and dramatic entrance.',
                price: 100,
                category: 'Fusion',
                image: 'https://i.ytimg.com/vi/l2V5Y6jZ5i0/maxresdefault.jpg',
                isSpicy: true,
                inventory_count: 20,
                rating_average: 4.9,
                rating_count: 55
            },
            {
                name: 'Avocado & Cream Cheese',
                description: 'Gourmet style. Puris filled with creamy avocado guacamole and a hint of cream cheese.',
                price: 180,
                category: 'Fusion',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07k1u3qd22C-v7l6_J35g-z6m0_29Y2_Zg&s',
                isSpicy: false,
                inventory_count: 10,
                rating_average: 4.3,
                rating_count: 12
            },
            {
                name: 'Gelato Golgappa',
                description: 'Dessert special. Puris filled with a scoop of vanilla bean gelato and drizzled with honey.',
                price: 90,
                category: 'Sweet',
                image: 'https://thumbs.dreamstime.com/b/ice-cream-golgappa-panipuri-puchka-gupchup-crispy-fried-puff-ball-filled-potato-mixture-flavoured-water-dahi-puri-sev-231362035.jpg',
                isSpicy: false,
                inventory_count: 30,
                rating_average: 4.7,
                rating_count: 28
            },
            {
                name: 'Hing Jeera Pani Puri',
                description: 'Good for digestion! Puris with a strong punch of Asafoetida (Hing) and Cumin (Jeera) water.',
                price: 55,
                category: 'Classic',
                image: 'https://www.flavourstreat.com/wp-content/uploads/2020/02/jal-jeera-recipe-01.jpg',
                isSpicy: true,
                inventory_count: 80,
                rating_average: 4.6,
                rating_count: 65
            }
        ];

        await Product.insertMany(products);

        console.log('Data Imported Successfully!');
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedData;
