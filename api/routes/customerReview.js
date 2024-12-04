import express from 'express';
import { 
    getActiveReviews,
    createReviewSection,
    addReview,
    updateSection,
    deleteReview
} from '../controllers/customerReview.js';

const router = express.Router();

// Get active review section
router.get('/active', getActiveReviews);

// Create new section with title and description
router.post('/section/create', createReviewSection);

// Add a new review to active section
router.post('/review/add', addReview);

// Update section title and description
router.put('/section/update/:id', updateSection);

// Delete a specific review
router.delete('/section/:sectionId/review/:reviewId', deleteReview);

export default router; 