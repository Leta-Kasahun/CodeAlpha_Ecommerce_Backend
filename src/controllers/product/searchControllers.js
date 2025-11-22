import { 
  searchProducts, 
  getSearchSuggestions, 
  getPopularSearches 
} from '../../services/searchService.js';

// Main search with filters
const searchProductsController = async (req, res) => {
  try {
    const result = await searchProducts(req.query);
    
    res.json({
      success: true,
      message: 'Search completed successfully',
      ...result
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error performing search'
    });
  }
};

// Get search suggestions
const getSearchSuggestionsController = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.json({
        success: true,
        suggestions: []
      });
    }

    const suggestions = await getSearchSuggestions(q);
    
    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching search suggestions'
    });
  }
};

// Get popular searches
const getPopularSearchesController = async (req, res) => {
  try {
    const popularSearches = await getPopularSearches();
    
    res.json({
      success: true,
      popularSearches
    });
  } catch (error) {
    console.error('Popular searches error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching popular searches'
    });
  }
};

export {
  searchProductsController,
  getSearchSuggestionsController,
  getPopularSearchesController
};