import User from '../models/User.js';
import FarmerProfile from '../models/FarmerProfile.js';
import MerchantProfile from '../models/MerchantProfile.js';
import CustomerProfile from '../models/CustomerProfile.js';
import LogisticsProfile from '../models/LogisticsProfile.js';

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.mongoUserId).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, data: user });
  } catch (err) {
    return next(err);
  }
};

export const bootstrapProfile = async (req, res, next) => {
  try {
    const { role, profile } = req.body;

    if (!['farmer', 'customer', 'merchant', 'logistics'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.mongoUserId,
      { role },
      { new: true, runValidators: true },
    );

    let roleProfile = null;

    if (role === 'farmer') {
      roleProfile = await FarmerProfile.findOneAndUpdate(
        { user: user._id },
        {
          user: user._id,
          firebaseUid: user.firebaseUid,
          ...profile,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    } else if (role === 'merchant') {
      roleProfile = await MerchantProfile.findOneAndUpdate(
        { user: user._id },
        {
          user: user._id,
          firebaseUid: user.firebaseUid,
          ...profile,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    } else if (role === 'customer') {
      roleProfile = await CustomerProfile.findOneAndUpdate(
        { user: user._id },
        {
          user: user._id,
          firebaseUid: user.firebaseUid,
          ...profile,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    } else if (role === 'logistics') {
      roleProfile = await LogisticsProfile.findOneAndUpdate(
        { user: user._id },
        {
          user: user._id,
          firebaseUid: user.firebaseUid,
          ...profile,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
        profile: roleProfile,
      },
    });
  } catch (err) {
    return next(err);
  }
};

