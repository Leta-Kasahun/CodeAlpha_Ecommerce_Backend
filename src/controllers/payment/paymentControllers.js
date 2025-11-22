import {
  createPayment,
  processPayment,
  getPaymentByOrder,
  getUserPayments
} from '../../services/paymentService.js';

// Create payment for order
const createPaymentController = async (req, res) => {
  try {
    const paymentData = {
      ...req.body,
      user: req.user._id
    };

    const payment = await createPayment(paymentData);
    
    res.status(201).json({
      success: true,
      message: 'Payment initiated successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment'
    });
  }
};

// Process payment (simulate success/failure)
const processPaymentController = async (req, res) => {
  try {
    const { status } = req.body; // 'success' or 'failed'
    const { paymentId } = req.params;

    const payment = await processPayment(paymentId, status);
    
    res.json({
      success: true,
      message: `Payment ${status}`,
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing payment'
    });
  }
};

// Get payment by order
const getPaymentByOrderController = async (req, res) => {
  try {
    const payment = await getPaymentByOrder(req.params.orderId);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found for this order'
      });
    }

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment'
    });
  }
};

// Get user payment history
const getUserPaymentsController = async (req, res) => {
  try {
    const payments = await getUserPayments(req.user._id);
    
    res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment history'
    });
  }
};

export {
  createPaymentController,
  processPaymentController,
  getPaymentByOrderController,
  getUserPaymentsController
};