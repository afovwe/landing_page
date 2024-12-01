import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  imgURL: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
});

const PopularProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  products: [ProductSchema],
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const PopularProduct = mongoose.model("PopularProduct", PopularProductSchema);
export default PopularProduct; 