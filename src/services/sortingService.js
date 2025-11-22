import Product from '../models/productModel.js';

export const sortProducts = async (sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10) => {
  // Sort options
  const sortOptions = {};
  
  switch(sortBy) {
    case 'price':
      sortOptions.price = sortOrder === 'asc' ? 1 : -1;
      break;
    case 'name':
      sortOptions.name = sortOrder === 'asc' ? 1 : -1;
      break;
    case 'rating':
      sortOptions.rating = sortOrder === 'asc' ? 1 : -1;
      break;
    default: // createdAt
      sortOptions.createdAt = sortOrder === 'asc' ? 1 : -1;
  }

  // Pagination
  const skip = (page - 1) * limit;

  const products = await Product.find({ isAvailable: true })
    .populate('owner', 'name email')
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments({ isAvailable: true });

  return {
    products,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    limit: Number(limit),
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1,
    sortBy,
    sortOrder
  };
};