import User from '../../models/userModel.js';
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
    const user = await User.create({
      name,
      email,
      password,
      otp: generateOTP(),
      otpExpires: new Date(Date.now() + 10 * 60 * 1000)
    });

    console.log(`OTP for ${email}: ${user.otp}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Verify OTP.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

export default registerUser;