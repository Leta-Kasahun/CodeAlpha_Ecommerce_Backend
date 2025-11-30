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
import userProfileRoutes from './routes/userProfileRoutes.js';
import orderHistoryRoutes from './routes/orderHistoryRoutes.js';
import sellerOrderRoutes from './routes/sellerOrderRoutes.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://shopsphere.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

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
app.use('/api/user-profile', userProfileRoutes);
app.use('/api/order-history', orderHistoryRoutes);
app.use('/api/seller', sellerOrderRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));