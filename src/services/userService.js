import User from '../models/userModel.js';

export const updateUserProfile = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { 
      name: updateData.name,
      phone: updateData.phone,
      address: updateData.address 
    },
    { new: true, runValidators: true }
  ).select('-password');
  return user;
};
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};