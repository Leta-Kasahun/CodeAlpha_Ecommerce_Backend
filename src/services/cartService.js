import Cart from '../models/cartModel.js';

export const getCartByUser = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], total: 0 });
  }
  return cart;
};

export const addToCart = async (userId, productId, quantity = 1) => {
  let cart = await Cart.findOne({ user: userId });
  
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], total: 0 });
  }

  const existingItem = cart.items.find(item => 
    item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.qty += quantity;
  } else {
    cart.items.push({ product: productId, qty: quantity });
  }

  await cart.save();
  return await cart.populate('items.product');
};

export const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;

  const item = cart.items.find(item => 
    item.product.toString() === productId
  );

  if (item) {
    item.qty = quantity;
    await cart.save();
  }

  return await cart.populate('items.product');
};

export const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;

  cart.items = cart.items.filter(item => 
    item.product.toString() !== productId
  );

  await cart.save();
  return await cart.populate('items.product');
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;

  cart.items = [];
  cart.total = 0;
  await cart.save();
  return cart;
};