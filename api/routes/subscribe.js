import express from 'express';
import { 
    getActiveSubscribe,
    createSubscribe,
    updateSubscribe,
    deleteSubscribe,
    handleSubscription
} from '../controllers/subscribe.js';

const router = express.Router();

// Get active subscribe section
router.get('/active', getActiveSubscribe);

// Create a new subscribe section
router.post('/create', createSubscribe);

// Update a subscribe section
router.put('/update/:id', updateSubscribe);

// Delete a subscribe section
router.delete('/delete/:id', deleteSubscribe);

// Add subscription handling route
router.post('/subscribe-email', handleSubscription);

export default router; 