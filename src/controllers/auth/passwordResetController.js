import passwordResetService from '../../services/passwordResetService.js';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await passwordResetService.sendResetOTP(email);
    return res.status(result.status || 200).json({ success: result.success, message: result.message });
  } catch (err) {
    console.error('forgotPassword controller error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await passwordResetService.verifyResetOTP(email, otp);
    if (!result.success) return res.status(result.status || 400).json(result);
    // send raw resetToken once to client
    return res.status(200).json({ success: true, message: 'OTP verified', resetToken: result.resetToken });
  } catch (err) {
    console.error('verifyResetOTP controller error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword, confirmPassword } = req.body;
    const result = await passwordResetService.resetPassword(email, resetToken, newPassword, confirmPassword);
    if (!result.success) return res.status(result.status || 400).json(result);
    return res.status(200).json(result);
  } catch (err) {
    console.error('resetPassword controller error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default { forgotPassword, verifyResetOTP, resetPassword };