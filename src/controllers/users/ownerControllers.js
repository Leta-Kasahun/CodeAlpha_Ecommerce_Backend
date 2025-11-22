import { upgradeToOwner, getOwnerProfile, updateOwnerProfile } from '../../services/ownerService.js';

// Upgrade to owner with shop details
const upgradeToOwnerController = async (req, res) => {
  try {
    const { shopName, phoneForOrders, shopAddress, demoPayoutNumber, bankName } = req.body;

    const result = await upgradeToOwner(req.user._id, {
      shopName,
      phoneForOrders,
      shopAddress,
      demoPayoutNumber,
      bankName
    });

    res.json({
      success: true,
      message: 'Successfully upgraded to owner with shop profile',
      user: result.user,
      sellerProfile: result.sellerProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error upgrading to owner'
    });
  }
};

// Get owner profile
const getOwnerProfileController = async (req, res) => {
  try {
    const sellerProfile = await getOwnerProfile(req.user._id);
    
    if (!sellerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Owner profile not found'
      });
    }

    res.json({
      success: true,
      sellerProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching owner profile'
    });
  }
};

// Update owner profile
const updateOwnerProfileController = async (req, res) => {
  try {
    const sellerProfile = await updateOwnerProfile(req.user._id, req.body);
    
    res.json({
      success: true,
      message: 'Owner profile updated successfully',
      sellerProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating owner profile'
    });
  }
};

export {
  upgradeToOwnerController,
  getOwnerProfileController,
  updateOwnerProfileController
};