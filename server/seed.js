const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Note: In a real app, images would be hosted on Cloudinary or served statically.
// For this local setup, I'm assuming we will update the client to serve these or use these paths if configured.
// For now, I'll keep using Unsplash for the seeded data because the 'local' images are in the client folder 
// and the database stores strings. 
// BUT, since the user asked to replace ALL images, I'll update the logic in the Frontend Component to fallback/use local images if possible,
// OR I will simply accept that I should use these images if I can serve them.
// Let's stick to the URL for now for stability, but replacing the "Hero" one was the critical request.
// However, I will seed them with placeholder local paths that I can handle in the frontend if I wanted to,
// but for now I will keep the seed robust with URLs, and only update the specialized components as requested involving the hero.
// WAIT, the user said "Replace all burger images with all the images I have provided".
// I have download.jpeg, download (1).jpeg, download (2).jpeg.
// I will update the seed to use these filenames and update the frontend to import them dynamically?
// That's hard to seed into DB.
// I will update the seed effectively to use placeholder URLs for now, but really the user wants to SEE the images.
// I will copy the images to `client/public/images` instead of `src/assets` so they can be referenced by URL string "/images/..."
// This is the smart way to handle dynamic DB data images in a MERN app without cloud storage.

const products = [
    {
        name: 'The Classic Box',
        description: '50pcs of crispy semolina puri with Tikha & Meetha Pani. The OG experience.',
        price: 99,
        image: '/images/download.jpeg', // Using the local public path
        category: 'Classic',
        isSpicy: true
    },
    {
        name: 'Dahi Puri Blast',
        description: 'Crispy puri loaded with sweet hung curd, chutneys, and sev. Explosion of flavors.',
        price: 129,
        image: '/images/download (1).jpeg', 
        category: 'Sweet',
        isSpicy: false
    },
    {
        name: 'Vodka Pani Shots',
        description: 'The party starter. 10 shots of Vodka infused Pani with crispy Puris. (18+ Only).',
        price: 249,
        image: '/images/download (2).jpeg',
        category: 'Beverage',
        isSpicy: true
    },
    {
        name: 'Chocolate Golgappa',
        description: 'Dessert twist! Chocolate coated puri filled with vanilla ice cream and chocolate sauce.',
        price: 149,
        image: '/images/download (3).jpeg',
        category: 'Exotic',
        isSpicy: false
    },
    {
        name: 'Mint Mojo',
        description: 'Extra minty, extra refreshing. For those who love the "thanda" sensation.',
        price: 119,
        image: '/images/download.jpeg',
        category: 'Classic',
        isSpicy: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/golgappafleet');
        console.log('Connected to DB');
        
        await Product.deleteMany({});
        console.log('Cleared Products');
        
        await Product.insertMany(products);
        console.log('Seeded Products');
        
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

seedDB();
