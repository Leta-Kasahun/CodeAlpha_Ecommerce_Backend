import Product from '../models/productModel.js';
export const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
}
export const getProducts = async (filters = {}) => {
  const products = await Product.find(filters).populate('owner', 'name email');
  return products;
};
export const getProductById = async (productId) => {
  const product = await Product.findById(productId).populate('owner', 'name email');
  return product;
};
export const updateProduct = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(
    productId, 
    updateData, 
    { new: true, runValidators: true }
  );
  return product;
};

export const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);
  return product;
};
export const updateProductQuantity = async (productId, newQuantity) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    { quantity: newQuantity },
    { new: true }
  );
  return product;
};