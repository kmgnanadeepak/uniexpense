import mongoose from '../config/db.js';

const FarmerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firebaseUid: { type: String, required: true },
    farmName: { type: String },
    location: {
      village: String,
      district: String,
      state: String,
      country: String,
      lat: Number,
      lng: Number,
    },
    landSizeAcre: { type: Number },
    primaryCrops: [{ type: String }],
  },
  { timestamps: true },
);

const FarmerProfile = mongoose.model('FarmerProfile', FarmerProfileSchema);

export default FarmerProfile;

