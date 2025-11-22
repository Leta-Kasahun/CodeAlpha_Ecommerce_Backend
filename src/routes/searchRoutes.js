import express from 'express';
import {
  searchProductsController,
  getSearchSuggestionsController,
  getPopularSearchesController
} from '../controllers/product/searchControllers.js';

const router = express.Router();

// Search routes
router.get('/products', searchProductsController);
router.get('/suggestions', getSearchSuggestionsController);
router.get('/popular', getPopularSearchesController);

export default router;