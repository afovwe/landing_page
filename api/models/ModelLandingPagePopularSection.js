// models/PopularProducts.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  imgURL: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const popularProductsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  products: [productSchema], // Array of products
});
//PopularProducts
const PopularProducts = mongoose.model('PopularProducts', popularProductsSchema);

export default PopularProducts;
