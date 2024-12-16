import express from 'express';
import { 
    getAllUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser, 
    getMe,
    updatePassword,
    changeUserPassword
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Routes accessible by all authenticated users
router.get('/me', getMe);
router.patch('/password', updatePassword);

// Routes restricted to admin and superadmin
router.use(restrictTo('admin', 'superadmin'));

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

// Route restricted to superadmin only
router.patch('/:id/password', restrictTo('superadmin'), changeUserPassword);

export default router;