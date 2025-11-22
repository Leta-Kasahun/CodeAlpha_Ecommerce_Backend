import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  createReviewController,
  getProductReviewsController,
  getReviewController,
  updateReviewController,
  deleteReviewController
} from '../controllers/product/reviewControllers.js';
const router = express.Router();
// Public routes
router.get('/product/:productId', getProductReviewsController);
router.get('/:id', getReviewController);
// Protected routes
router.post('/', protect, createReviewController);
router.put('/:id', protect, updateReviewController);
router.delete('/:id', protect, deleteReviewController);
export default router;