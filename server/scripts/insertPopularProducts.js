import mongoose from 'mongoose';
import PopularProduct from '../models/PopularProduct.js';
import dotenv from 'dotenv';

dotenv.config();

const popularProducts = [
    {
        title: "Our Popular Products",
        description: "Experience top-notch quality and style with our sought-after selections. Discover a world of comfort, design, and value",
        imgURL: "https://res.cloudinary.com/dc0oesxvf/image/upload/v1733000448/shoe4_chd5iw.png",
        name: "Nike Air Jordan-01",
        price: "$200.20",
        rating: 5.0,
        order: 1,
        active: true
    },
    {
        title: "Our Popular Products",
        description: "Experience top-notch quality and style with our sought-after selections. Discover a world of comfort, design, and value",
        imgURL: "https://res.cloudinary.com/dc0oesxvf/image/upload/v1733000448/shoe5_ipt4z2.png",
        name: "Nike Air Jordan-10",
        price: "$210.20",
        rating: 4.5,
        order: 2,
        active: true
    },
    {
        title: "Our Popular Products",
        description: "Experience top-notch quality and style with our sought-after selections. Discover a world of comfort, design, and value",
        imgURL: "https://res.cloudinary.com/dc0oesxvf/image/upload/v1733000447/shoe6_l7tduo.png",
        name: "Nike Air Jordan-100",
        price: "$220.20",
        rating: 3.5,
        order: 3,
        active: true
    },
    {
        title: "Our Popular Products",
        description: "Experience top-notch quality and style with our sought-after selections. Discover a world of comfort, design, and value",
        imgURL: "https://res.cloudinary.com/dc0oesxvf/image/upload/v1733000447/shoe7_rveyox.png",
        name: "Nike Air Jordan-001",
        price: "$230.20",
        rating: 3.5,
        order: 4,
        active: true
    }
];

const insertPopularProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        // Delete existing products (optional)
        await PopularProduct.deleteMany({});
        console.log("Cleared existing products");

        // Insert new products
        const inserted = await PopularProduct.insertMany(popularProducts);
        console.log("Inserted products:", inserted);

        console.log("All products inserted successfully!");
    } catch (error) {
        console.error("Error inserting products:", error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
};

// Run the insertion
insertPopularProducts(); 