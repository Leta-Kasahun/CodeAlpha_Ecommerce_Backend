import Product from '../models/productModel.js';

// Main search with filters, sorting, pagination
export const searchProducts = async (filters = {}) => {
  const {
    q = '',
    category = '',
    minPrice = 0,
    maxPrice = 999999,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 10
  } = filters;

 
  let query = {};

 
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } }, // 'i' for case insensitive
      { description: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } }
    ];
  }

 
  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }

  
  query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };


  const sortOptions = {};
  const sortField = sortBy === 'rating' ? 'rating' : 
                   sortBy === 'price' ? 'price' : 
                   sortBy === 'name' ? 'name' : 'createdAt';
  
  sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;

 
  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .populate('owner', 'name email')
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  return {
    products,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    limit: Number(limit),
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1
  };
};


export const getSearchSuggestions = async (query) => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.trim();

  
  const productSuggestions = await Product.find({
    name: { $regex: searchTerm, $options: 'i' }
  })
  .select('name category price images')
  .limit(5)
  .sort({ createdAt: -1 });

 
  const categorySuggestions = await Product.distinct('category', {
    category: { $regex: searchTerm, $options: 'i' }
  });

  const suggestions = [];

  
  productSuggestions.forEach(product => {
    suggestions.push({
      type: 'product',
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.images?.[0] || '',
      searchType: 'product'
    });
  });

  
  categorySuggestions.slice(0, 3).forEach(category => {
    suggestions.push({
      type: 'category',
      name: category,
      searchTerm: category,
      searchType: 'category'
    });
  });

  return suggestions;
};


export const getPopularSearches = async () => {
  const popularCategories = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 6 },
    { $project: { _id: 0, name: '$_id' } }
  ]);

  return popularCategories.map(item => item.name);
};