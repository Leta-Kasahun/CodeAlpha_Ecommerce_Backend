import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied. Please login.' 
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false, 
        message: 'User not found. Please login again.'
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please login again.'
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please login again.'
    });
  }
};
// Optional: Check if user is seller
const isSeller = (req, res, next) => {
  if (req.user && req.user.role === 'owner') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Seller role required.'
    });
  }
};
export { protect, isSeller };