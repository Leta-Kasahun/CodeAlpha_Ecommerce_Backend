import { getOrderHistory } from '../../services/orderHistoryService.js';

const getOrderHistoryController = async (req, res) => {
  try {
    const result = await getOrderHistory(req.user._id, req.query);
    
    res.json({
      success: true,
      message: 'Order history retrieved successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order history'
    });
  }
};

export { getOrderHistoryController };