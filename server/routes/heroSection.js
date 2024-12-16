import express from 'express';
import { 
    getActiveHeroSection,
    getAllHeroSections, 
    getHeroSectionById,
    createHeroSection,
    updateHeroSection,
    deleteHeroSection 
} from '../controllers/heroSection.js';

const router = express.Router();

// Get the currently active hero section
router.get('/', getActiveHeroSection);

// Get all hero sections
router.get('/all-herosections', getAllHeroSections);

// Get a specific hero section by ID
router.get('/:id', getHeroSectionById);

// Create a new hero section
router.post('/new', createHeroSection);

// Update a hero section
router.put('/:id', updateHeroSection);

// Delete a hero section
router.delete('/:id', deleteHeroSection);

export default router; 