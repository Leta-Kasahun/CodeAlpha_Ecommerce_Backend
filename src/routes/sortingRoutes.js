import express from 'express';
import { sortProductsController } from '../controllers/product/sortingControllers.js';
const router = express.Router();
router.get('/products', sortProductsController);
export default router;