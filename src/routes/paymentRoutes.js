import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  createPaymentController,
  processPaymentController,
  getPaymentByOrderController,
  getUserPaymentsController
} from '../controllers/payment/paymentControllers.js';

const router = express.Router();

router.use(protect);

router.post('/', createPaymentController);
router.get('/history', getUserPaymentsController);
router.get('/order/:orderId', getPaymentByOrderController);
router.put('/:paymentId/process', processPaymentController);

export default router;