// controllers/popularProductsController.js ../models/PopularProducts.js
import PopularProducts from '../models/ModelLandingPagePopularSection.js';

// Create a new Popular Products section
export const createPopularProducts = async (req, res) => {
  try {
    const popularProducts = new PopularProducts(req.body);
    await popularProducts.save();
    res.status(201).json(popularProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Popular Products sections
export const getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await PopularProducts.find();
    res.json(popularProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Popular Products section by ID
export const getPopularProductsById = async (req, res) => {
  try {
    const popularProducts = await PopularProducts.findById(req.params.id);
    if (!popularProducts) return res.status(404).json({ message: 'Popular Products section not found' });
    res.json(popularProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Popular Products section by ID
export const updatePopularProducts = async (req, res) => {
  try {
    const popularProducts = await PopularProducts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!popularProducts) return res.status(404).json({ message: 'Popular Products section not found' });
    res.json(popularProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Popular Products section by ID
export const deletePopularProducts = async (req, res) => {
  try {
    const popularProducts = await PopularProducts.findByIdAndDelete(req.params.id);
    if (!popularProducts) return res.status(404).json({ message: 'Popular Products section not found' });
    res.json({ message: 'Popular Products section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
