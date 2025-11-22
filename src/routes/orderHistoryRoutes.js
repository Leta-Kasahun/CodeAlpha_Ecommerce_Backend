import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getOrderHistoryController } from '../controllers/order/orderHistoryControllers.js';
const router = express.Router();
router.use(protect);
router.get('/', getOrderHistoryController);
export default router;