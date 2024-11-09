// routes/popularProductsRoutes.js
import express from 'express';
import {
  createPopularProducts,
  getPopularProducts,
  getPopularProductsById,
  updatePopularProducts,
  deletePopularProducts,
} from '../controllers/popularProducts.controller.js';
// ../controllers/popularProductsController.js
const router = express.Router();

// Create a new Popular Products section
router.post('/', createPopularProducts);

// Get all Popular Products sections
router.get('/all-popular-products', getPopularProducts);

// Get a single Popular Products section by ID
router.get('/:id', getPopularProductsById);

// Update a Popular Products section by ID
router.put('/:id', updatePopularProducts);

// Delete a Popular Products section by ID
router.delete('/:id', deletePopularProducts);

export default router;
