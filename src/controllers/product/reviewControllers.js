import {
  createReview,
  getReviewsByProduct,
  getReviewById,
  updateReview,
  deleteReview
} from '../../services/reviewService.js';

// Create review
const createReviewController = async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      user: req.user._id
    };

    const review = await createReview(reviewData);
    
    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating review'
    });
  }
};

// Get reviews for a product
const getProductReviewsController = async (req, res) => {
  try {
    const reviews = await getReviewsByProduct(req.params.productId);
    
    res.json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews'
    });
  }
};

// Get single review
const getReviewController = async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review'
    });
  }
};

// Update review
const updateReviewController = async (req, res) => {
  try {
    const review = await updateReview(req.params.id, req.body);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating review'
    });
  }
};

// Delete review
const deleteReviewController = async (req, res) => {
  try {
    const review = await deleteReview(req.params.id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review'
    });
  }
};

export {
  createReviewController,
  getProductReviewsController,
  getReviewController,
  updateReviewController,
  deleteReviewController
};