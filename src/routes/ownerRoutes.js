import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  upgradeToOwnerController,
  getOwnerProfileController,
  updateOwnerProfileController
} from '../controllers/users/ownerControllers.js';
const router = express.Router();
router.use(protect);
router.post('/upgrade', upgradeToOwnerController);
router.get('/profile', getOwnerProfileController);
router.put('/profile', updateOwnerProfileController);
export default router;