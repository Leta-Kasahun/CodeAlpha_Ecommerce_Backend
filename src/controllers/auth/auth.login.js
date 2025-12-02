import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../../models/userModel.js';
import generateToken from '../../utils/generateToken.js';
import sendOTPEmail from '../../utils/emailService.js';

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  } catch (error) {
    console.error('loginUser error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {

      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, you will receive an OTP shortly'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    user.otpReset = otp;
    user.otpResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    try {
      await sendOTPEmail(user.email, otp, user.name, 'Your CA‑Ecommerce Password Reset Code');
    } catch (sendErr) {
      console.error('forgotPassword: failed to send email', sendErr);
      // cleanup OTP if send fails
      user.otpReset = undefined;
      user.otpResetExpires = undefined;
      await user.save().catch(() => {});
      return res.status(500).json({ success: false, message: 'Failed to send OTP email. Please try again later.' });
    }

    return res.status(200).json({
      success: true,
      message: 'If an account with that email exists, you will receive an OTP shortly'
    });
  } catch (err) {
    console.error('forgotPassword error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const user = await User.findOne({
      email,
      otpReset: otp,
      otpResetExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

   
    const rawResetToken = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.createHash('sha256').update(rawResetToken).digest('hex');

    user.passwordResetToken = hashed;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.otpReset = undefined;
    user.otpResetExpires = undefined;
    await user.save();

    
    return res.status(200).json({
      success: true,
      message: 'OTP verified',
      resetToken: rawResetToken
    });
  } catch (err) {
    console.error('verifyResetOTP error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword, confirmPassword } = req.body;
    if (!email || !resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
      email,
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    // Hash and set new password (the model's pre-save will also hash if configured)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

   
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.isVerified = true; 
    await user.save();

    return res.status(200).json({ success: true, message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('resetPassword error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default loginUser;
export { loginUser, forgotPassword, verifyResetOTP, resetPassword };