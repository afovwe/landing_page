import express from 'express';
import { getMobileNavigation, updateMobileNavigation, toggleMobileNavigation } from '../controllers/navigation.js';

const router = express.Router();

router.get('/mobile', getMobileNavigation);
router.put('/mobile', updateMobileNavigation);
router.post('/mobile/toggle', toggleMobileNavigation);

export default router; 