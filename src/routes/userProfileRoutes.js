import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  updateProfileController,
  getProfileController
} from '../controllers/users/userProfileControllers.js';
const router = express.Router();
router.use(protect);
router.get('/', getProfileController);
router.put('/', updateProfileController);

export default router;