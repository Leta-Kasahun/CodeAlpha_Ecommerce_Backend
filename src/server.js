import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import authResetRoutes from './routes/authResetRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import sortingRoutes from './routes/sortingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// Connect Database
connectDB();
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', authResetRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/sort', sortingRoutes);
app.use('/api/payments', paymentRoutes);
// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));