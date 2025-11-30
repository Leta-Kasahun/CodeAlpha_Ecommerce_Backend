import express from 'express';
import { protect, isSeller } from '../middlewares/authMiddleware.js';
import {
  getSellerOrdersController,
  updateSellerOrderStatusController,
  deleteSellerOrderController
} from '../controllers/sellerOrderControllers.js';

const router = express.Router();

router.use(protect);
router.use(isSeller);

router.get('/orders', getSellerOrdersController);
router.put('/orders/:orderId/status', updateSellerOrderStatusController);
router.delete('/orders/:orderId', deleteSellerOrderController);

export default router;