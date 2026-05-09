import mongoose from '../config/db.js';

const MerchantProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firebaseUid: { type: String, required: true },
    shopName: { type: String },
    gstNumber: { type: String },
    location: {
      address: String,
      lat: Number,
      lng: Number,
    },
    categories: [{ type: String }],
  },
  { timestamps: true },
);

const MerchantProfile = mongoose.model('MerchantProfile', MerchantProfileSchema);

export default MerchantProfile;

