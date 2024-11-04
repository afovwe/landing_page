import express from 'express';
import {
  createHeroSection,
  getAllHeroSections,
  getHeroSectionById,
  updateHeroSection,
  deleteHeroSection
} from '../controllers/heroSection.controller.js';

const router = express.Router();

router
  .route('/hero-section')
  .get(getAllHeroSections)       // Get all hero sections
  .post(createHeroSection);       // Create a new hero section

router
  .route('/hero-section/:id')
  .get(getHeroSectionById)        // Get a single hero section by ID
  .put(updateHeroSection)         // Update a hero section by ID
  .delete(deleteHeroSection);     // Delete a hero section by ID

export default router;
