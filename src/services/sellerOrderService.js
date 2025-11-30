import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const getSellerOrders = async (sellerId, filters = {}) => {
  const { status = '', page = 1, limit = 10 } = filters;

  // Get seller's product IDs
  const sellerProducts = await Product.find({ owner: sellerId }).distinct('_id');
  
  if (sellerProducts.length === 0) {
    return { orders: [], total: 0, page: 1, pages: 0, limit: 10 };
  }

  let query = { 'orderItems.product': { $in: sellerProducts } };

  if (status) query.orderStatus = status;

  const skip = (page - 1) * limit;

  // Get ALL orders that contain seller's products
  const orders = await Order.find(query)
    .populate('user', 'name email')
    .populate({
      path: 'orderItems.product',
      select: 'name price owner'
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  // FIX: Don't filter out orders, just show seller's items within them
  const sellerOrders = orders.map(order => {
    // Only show items that belong to this seller
    const sellerItems = order.orderItems.filter(item => 
      item.product && sellerProducts.includes(item.product._id.toString())
    );

    const sellerOrderTotal = sellerItems.reduce((total, item) => 
      total + (item.price * item.qty), 0
    );

    // Return the order with only seller's items
    return {
      ...order.toObject(),
      orderItems: sellerItems,
      sellerOrderTotal
    };
  });

  const total = await Order.countDocuments(query);

  return {
    orders: sellerOrders,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    limit: Number(limit)
  };
};

export const updateSellerOrderStatus = async (orderId, sellerId, status) => {
  const sellerProducts = await Product.find({ owner: sellerId }).distinct('_id');
  
  // Check if order contains seller's products
  const order = await Order.findOne({
    _id: orderId,
    'orderItems.product': { $in: sellerProducts }
  });

  if (!order) throw new Error('No products found for this seller in the order');

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus: status },
    { new: true }
  )
  .populate('user', 'name email')
  .populate({
    path: 'orderItems.product',
    select: 'name price owner'
  });

  return updatedOrder;
};

export const deleteSellerOrder = async (orderId, sellerId) => {
  const sellerProducts = await Product.find({ owner: sellerId }).distinct('_id');
  
  const order = await Order.findOne({
    _id: orderId,
    'orderItems.product': { $in: sellerProducts }
  });
  
  if (!order) throw new Error('No products found for this seller in the order');

  const deletedOrder = await Order.findByIdAndDelete(orderId);
  return deletedOrder;
};