import crypto from 'crypto';
import User from '../models/userModel.js';
import sendOTPEmail from '../utils/emailService.js'; // your existing email service

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESET_TOKEN_TTL_MS = 10 * 60 * 1000; // 10 minutes

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * sendResetOTP(email)
 * - Creates otpReset + expiry and sends OTP to user email.
 * - Returns a generic success message whether user exists or not.
 */
export async function sendResetOTP(email) {
  if (!email) return { success: false, status: 400, message: 'Email is required' };

  const user = await User.findOne({ email });
  if (!user) {
    // do not reveal existence
    return { success: true, message: 'If an account with that email exists, you will receive an OTP shortly' };
  }

  const otp = generateOTP();
  user.otpReset = otp;
  user.otpResetExpires = new Date(Date.now() + OTP_TTL_MS);
  await user.save();

  try {
    // sendOTPEmail(email, otp, name, subject)
    await sendOTPEmail(user.email, otp, user.name, 'CA‑Ecommerce Password Reset Code');
  } catch (err) {
    console.error('passwordResetService.sendResetOTP: sendOTPEmail failed:', err && err.message ? err.message : err);
    // cleanup if send fails
    user.otpReset = undefined;
    user.otpResetExpires = undefined;
    await user.save().catch(() => {});
    return { success: false, status: 500, message: 'Failed to send OTP email. Please try again later.' };
  }

  return { success: true, message: 'If an account with that email exists, you will receive an OTP shortly' };
}

export async function verifyResetOTP(email, otp) {
  if (!email || !otp) return { success: false, status: 400, message: 'Email and OTP are required' };

  const user = await User.findOne({
    email,
    otpReset: otp,
    otpResetExpires: { $gt: new Date() }
  });

  if (!user) return { success: false, status: 400, message: 'Invalid or expired OTP' };

  const rawResetToken = crypto.randomBytes(32).toString('hex');
  const hashed = crypto.createHash('sha256').update(rawResetToken).digest('hex');

  user.passwordResetToken = hashed;
  user.passwordResetExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
  user.otpReset = undefined;
  user.otpResetExpires = undefined;
  await user.save();

  return { success: true, resetToken: rawResetToken };
}

export async function resetPassword(email, resetToken, newPassword, confirmPassword) {
  if (!email || !resetToken || !newPassword || !confirmPassword) {
    return { success: false, status: 400, message: 'Missing required fields' };
  }
  if (newPassword !== confirmPassword) {
    return { success: false, status: 400, message: 'Passwords do not match' };
  }

  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const user = await User.findOne({
    email,
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() }
  });

  if (!user) return { success: false, status: 400, message: 'Invalid or expired reset token' };

  user.password = newPassword; // will be hashed by pre-save
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.isVerified = true; // optional
  await user.save();

  return { success: true, message: 'Password has been reset successfully' };
}

export default {
  sendResetOTP,
  verifyResetOTP,
  resetPassword
};