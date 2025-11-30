import {
  getSellerOrders,
  updateSellerOrderStatus,
  deleteSellerOrder
} from '../services/sellerOrderService.js';

export const getSellerOrdersController = async (req, res) => {
  try {
    const result = await getSellerOrders(req.user._id, req.query);
    
    res.json({
      success: true,
      message: 'Seller orders retrieved successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateSellerOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const order = await updateSellerOrderStatus(orderId, req.user._id, status);
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteSellerOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await deleteSellerOrder(orderId, req.user._id);
    
    res.json({
      success: true,
      message: 'Order deleted successfully',
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};