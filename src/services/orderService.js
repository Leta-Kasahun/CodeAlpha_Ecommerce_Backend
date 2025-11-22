import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

export const createOrder = async (userId, orderData) => {
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    qty: item.qty,
    price: item.product.price
  }));

  const totalPrice = orderItems.reduce((total, item) => total + (item.price * item.qty), 0);

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress: orderData.shippingAddress,
    totalPrice,
    paymentMethod: orderData.paymentMethod || 'card'
  });

  // Clear cart after order
  await Cart.findOneAndUpdate(
    { user: userId },
    { items: [], total: 0 }
  );

  return await order.populate('orderItems.product');
};

export const getOrdersByUser = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate('orderItems.product')
    .sort({ createdAt: -1 });
  return orders;
};

export const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId).populate('orderItems.product');
  return order;
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus: status },
    { new: true }
  ).populate('orderItems.product');
  return order;
};