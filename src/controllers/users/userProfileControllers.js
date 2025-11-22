import { updateUserProfile, getUserProfile } from '../../services/userService.js';

// Update user profile (name, phone, address)
const updateProfileController = async (req, res) => {
  try {
    const user = await updateUserProfile(req.user._id, req.body);
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
};

// Get user profile
const getProfileController = async (req, res) => {
  try {
    const user = await getUserProfile(req.user._id);
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
};
export {
  updateProfileController,
  getProfileController
};