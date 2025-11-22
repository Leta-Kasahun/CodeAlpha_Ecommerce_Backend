import User from '../models/userModel.js';
import SellerProfile from '../models/sellerProfileModel.js';

const upgradeToOwner = async (userId, ownerData) => {
  // Update user role
  const user = await User.findByIdAndUpdate(
    userId,
    { role: 'owner' },
    { new: true }
  ).select('-password');

  // Create seller profile
  const sellerProfile = await SellerProfile.create({
    user: userId,
    ...ownerData
  });

  return { user, sellerProfile };
};

const getOwnerProfile = async (userId) => {
  const sellerProfile = await SellerProfile.findOne({ user: userId })
    .populate('user', 'name email');
  return sellerProfile;
};

const updateOwnerProfile = async (userId, updateData) => {
  const sellerProfile = await SellerProfile.findOneAndUpdate(
    { user: userId },
    updateData,
    { new: true, runValidators: true }
  ).populate('user', 'name email');
  return sellerProfile;
};

export {
  upgradeToOwner,
  getOwnerProfile,
  updateOwnerProfile
};