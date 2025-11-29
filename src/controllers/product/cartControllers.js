import {
  getCartByUser,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../../services/cartService.js';

// Get user cart
const getCartController = async (req, res) => {
  try {
    const cart = await getCartByUser(req.user._id);
    
    res.json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart'
    });
  }
};

// Add item to cart
const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const cart = await addToCart(req.user._id, productId, quantity);
    
    res.json({
      success: true,
      message: 'Item added to cart',
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart'
    });
  }
};

// Update cart item quantity
const updateCartItemController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    const cart = await updateCartItem(req.user._id, productId, quantity);
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    res.json({
      success: true,
      message: 'Cart updated',
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart'
    });
  }
};

// Remove item from cart
const removeFromCartController = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await removeFromCart(req.user._id, productId);
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart'
    });
  }
};


const clearCartController = async (req, res) => {
  try {
    const cart = await clearCart(req.user._id);
    
    res.json({
      success: true,
      message: 'Cart cleared',
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
};

export {
  getCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController
};