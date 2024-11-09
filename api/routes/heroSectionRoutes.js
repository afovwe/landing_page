import express from 'express';
import {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  getActiveHeroSectionById,
  updateHeroSection,
  getActiveHeroSection ,
  deleteHeroSection,
  getInactiveHeroSections
} from '../controllers/heroSection.controller.js';

const router = express.Router();

// Get all Define routes
router.get('/', getActiveHeroSection);  // This is correct
router.post('/new', createHeroSection);
router.get('/all-herosections', getAllHeroSections);
router.get('/inactive', getInactiveHeroSections); // New route for inactive hero sections
router.get('/:id', getHeroSectionById);
router.get('/active/:id', getActiveHeroSectionById); // This is for dynamic id params
router.put('/edit/:id', updateHeroSection);
router.delete('/delete/:id', deleteHeroSection);

export default router;
