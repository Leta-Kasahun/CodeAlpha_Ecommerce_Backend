import User from '../../models/userModel.js';
import sendOTPEmail from '../../utils/emailService.js';

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all fields'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user with OTP
    const otp = generateOTP();
    const user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000) 
    });

    
    try {
      await sendOTPEmail(email, user.otp, user.name);
    } catch (sendErr) {
     
      try {
        await User.deleteOne({ _id: user._id });
      } catch (delErr) {
        console.error('Failed to delete user after email send failure:', delErr);
      }
      console.error('Failed to send OTP email:', sendErr);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email. Please try again later.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful. Check your email for OTP.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

export default registerUser;