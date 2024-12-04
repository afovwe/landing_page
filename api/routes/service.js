import express from 'express';
import { 
    getActiveServices,
    createService,
    updateService,
    deleteService
} from '../controllers/service.js';

const router = express.Router();

// Get all active services
router.get('/active', getActiveServices);

// Create a new service
router.post('/create', createService);

// Update a service
router.put('/update/:id', updateService);

// Delete a service
router.delete('/delete/:id', deleteService);

export default router; 