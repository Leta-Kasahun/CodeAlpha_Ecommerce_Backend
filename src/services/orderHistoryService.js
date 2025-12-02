import Order from '../models/orderModel.js';

export const getOrderHistory = async (userId, filters = {}) => {
  const {
    status = '',
    startDate = '',
    endDate = '',
    minPrice = 0,
    maxPrice = 999999,
    page = 1,
    limit = 10
  } = filters;

  
  let query = { user: userId };

  
  if (status) {
    query.orderStatus = status;
  }

 
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

 
  if (minPrice || maxPrice) {
    query.totalPrice = {
      $gte: Number(minPrice),
      $lte: Number(maxPrice)
    };
  }


  const skip = (page - 1) * limit;

  const orders = await Order.find(query)
    .populate('orderItems.product')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Order.countDocuments(query);

  return {
    orders,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    limit: Number(limit),
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1
  };
};