import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  getCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController
} from '../controllers/product/cartControllers.js';
const router = express.Router();
router.use(protect);
router.get('/', getCartController);
router.post('/add', addToCartController);
router.put('/update/:productId', updateCartItemController);
router.delete('/remove/:productId', removeFromCartController);
router.delete('/clear', clearCartController);
export default router;