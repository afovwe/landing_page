import express from 'express';
import { 
    getActiveSuperQuality,
    createSuperQuality,
    updateSuperQuality,
    deleteSuperQuality
} from '../controllers/superQuality.js';

const router = express.Router();

// Get active super quality section
router.get('/active', getActiveSuperQuality);

// Create a new super quality section
router.post('/create', createSuperQuality);

// Update a super quality section
router.put('/update/:id', updateSuperQuality);

// Delete a super quality section
router.delete('/delete/:id', deleteSuperQuality);

export default router; 