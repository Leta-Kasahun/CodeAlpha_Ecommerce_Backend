import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus
} from '../../services/orderService.js';

// Create order from cart
const createOrderController = async (req, res) => {
  try {
    const order = await createOrder(req.user._id, req.body);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get user orders
const getOrdersController = async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.user._id);
    
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
};

// Get single order
const getOrderController = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order'
    });
  }
};

// Update order status
const updateOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await updateOrderStatus(req.params.id, status);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
};

export {
  createOrderController,
  getOrdersController,
  getOrderController,
  updateOrderStatusController
};