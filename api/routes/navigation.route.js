// routes/navigation.route.js

import express from 'express';
import {
  getNavigationItems,
  getNavigationItemById,
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem,
} from '../controllers/navigation.controller.js';

const router = express.Router();

router.get('/navigation', getNavigationItems); // Get all navigation items
router.get('/navigation/:id', getNavigationItemById); // Get navigation item by ID
router.post('/navigation', createNavigationItem); // Create a new navigation item
router.put('/navigation/:id', updateNavigationItem); // Update a navigation item by ID
router.delete('/navigation/:id', deleteNavigationItem); // Delete a navigation item by ID

export default router;
