import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  createOrderController,
  getOrdersController,
  getOrderController,
  updateOrderStatusController
} from '../controllers/product/orderControllers.js';
const router = express.Router();
router.use(protect);
router.post('/', createOrderController);
router.get('/', getOrdersController);
router.get('/:id', getOrderController);
router.put('/:id/status', updateOrderStatusController);
export default router;