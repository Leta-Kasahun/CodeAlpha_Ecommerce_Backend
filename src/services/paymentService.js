// paymentService: create and process payments. Only clear user's cart after payment succeeds.
import Payment from '../models/paymentModel.js';
import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

export const createPayment = async (paymentData) => {
  // Create payment record; do NOT mark order paid here.
  const payment = await Payment.create(paymentData);

  // Leave Order.paymentStatus as-is (pending) until processPayment confirms success.
  return await payment.populate('user', 'name email');
};

export const processPayment = async (paymentId, status) => {
  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    { 
      status,
      transactionNumber: status === 'success' ? `TXN${Date.now()}` : null
    },
    { new: true }
  ).populate('user', 'name email');

  if (!payment) return null;

  if (status === 'success') {
    // Mark the order as paid
    await Order.findByIdAndUpdate(
      payment.order,
      { paymentStatus: 'paid' }
    );

    // Clear the user's cart only after successful payment
    const userId = payment.user && payment.user._id ? payment.user._id : payment.user;
    if (userId) {
      await Cart.findOneAndUpdate(
        { user: userId },
        { items: [], total: 0 }
      );
    }
  } else {
    // On failure, do not clear cart; you may add retry logic or notify user
  }

  return payment;
};

export const getPaymentByOrder = async (orderId) => {
  const payment = await Payment.findOne({ order: orderId })
    .populate('user', 'name email')
    .populate('order');
  return payment;
};

export const getUserPayments = async (userId) => {
  const payments = await Payment.find({ user: userId })
    .populate('order')
    .sort({ createdAt: -1 });
  return payments;
};