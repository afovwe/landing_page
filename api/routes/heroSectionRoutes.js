import express from 'express';
import {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  updateHeroSection,
  deleteHeroSection
} from '../controllers/heroSection.controller.js';

const router = express.Router();

// Route to create a new hero section
router.post('/hero-section', createHeroSection);

// Route to get all hero sections
router.get('/hero-section', getAllHeroSections);

// Route to get a single hero section by ID
router.get('/hero-section/:id', getHeroSectionById);

// Route to update a hero section by ID
router.put('/hero-section/:id', updateHeroSection);

// Route to delete a hero section by ID
router.delete('/hero-section/:id', deleteHeroSection);

export default router;
