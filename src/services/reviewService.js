import Review from '../models/reviewModel.js';

export const createReview = async (reviewData) => {
  const review = await Review.create(reviewData);
  return await review.populate('user', 'name');
};

export const getReviewsByProduct = async (productId) => {
  const reviews = await Review.find({ product: productId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  return reviews;
};

export const getReviewById = async (reviewId) => {
  const review = await Review.findById(reviewId).populate('user', 'name');
  return review;
};

export const updateReview = async (reviewId, updateData) => {
  const review = await Review.findByIdAndUpdate(
    reviewId,
    updateData,
    { new: true, runValidators: true }
  ).populate('user', 'name');
  return review;
};

export const deleteReview = async (reviewId) => {
  const review = await Review.findByIdAndDelete(reviewId);
  return review;
};