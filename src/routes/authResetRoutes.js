import express from 'express';
import { forgotPassword, verifyResetOTP, resetPassword } from '../controllers/auth/passwordResetController.js';
const router = express.Router();
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOTP);
router.post('/reset-password', resetPassword);
export default router;