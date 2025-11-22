import { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} from '../../services/productService.js';

// Create product
const createProductController = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      owner: req.user._id
    };

    const product = await createProduct(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
};

// Get all products
const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
};

// Get single product
const getProductController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
};

// Update product
const updateProductController = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
};

// Delete product
const deleteProductController = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
};

export {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController
};