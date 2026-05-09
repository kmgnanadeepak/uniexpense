import mongoose from '../config/db.js';

const CustomerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firebaseUid: { type: String, required: true },
    defaultAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true },
);

const CustomerProfile = mongoose.model('CustomerProfile', CustomerProfileSchema);

export default CustomerProfile;

