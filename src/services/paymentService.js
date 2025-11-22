import Payment from '../models/paymentModel.js';
import Order from '../models/orderModel.js';

export const createPayment = async (paymentData) => {
  const payment = await Payment.create(paymentData);
  
  // Update order payment status
  await Order.findByIdAndUpdate(
    paymentData.order,
    { paymentStatus: 'paid' }
  );

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

  // Update order status based on payment
  if (status === 'success') {
    await Order.findByIdAndUpdate(
      payment.order,
      { paymentStatus: 'paid' }
    );
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