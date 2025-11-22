import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController
} from '../controllers/product/productControllers.js';

const router = express.Router();
// Public routes
router.get('/', getProductsController);
router.get('/:id', getProductController);
// Protected routes
router.post('/', protect, createProductController);
router.put('/:id', protect, updateProductController);
router.delete('/:id', protect, deleteProductController);
export default router;