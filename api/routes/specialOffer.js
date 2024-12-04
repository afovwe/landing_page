import express from 'express';
import { 
    getActiveSpecialOffer,
    createSpecialOffer,
    updateSpecialOffer,
    deleteSpecialOffer
} from '../controllers/specialOffer.js';

const router = express.Router();

// Get active special offer
router.get('/active', getActiveSpecialOffer);

// Create a new special offer
router.post('/create', createSpecialOffer);

// Update a special offer
router.put('/update/:id', updateSpecialOffer);

// Delete a special offer
router.delete('/delete/:id', deleteSpecialOffer);

export default router; 