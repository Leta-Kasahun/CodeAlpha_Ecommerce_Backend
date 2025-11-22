import { sortProducts } from '../../services/sortingService.js';

const sortProductsController = async (req, res) => {
  try {
    const { sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = req.query;
    
    const result = await sortProducts(sortBy, sortOrder, page, limit);
    
    res.json({
      success: true,
      message: `Products sorted by ${sortBy} ${sortOrder}`,
      ...result
    });
  } catch (error) {
    console.error('Sort error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sorting products'
    });
  }
};

export { sortProductsController };