import express from 'express';
import { 
    getPopularProducts, 
    createPopularProductSection, 
    updatePopularProductSection, 
    deletePopularProductSection 
} from '../controllers/popularProducts.js';

const router = express.Router();

// Add debug logging
router.use((req, res, next) => {
    console.log('Popular Products Route:', req.method, req.url);
    next();
});

// Get active popular products section
router.get('/active', getPopularProducts);

// Create a new popular products section
router.post('/section/create', (req, res, next) => {
    console.log('Received create request:', req.body);
    next();
}, createPopularProductSection);

// Update a popular products section
router.put('/section/update/:id', updatePopularProductSection);

// Delete a popular products section
router.delete('/section/delete/:id', deletePopularProductSection);

// Add this test route
router.get('/test', (req, res) => {
    res.json({ message: 'Popular products router is working' });
});

export default router; 