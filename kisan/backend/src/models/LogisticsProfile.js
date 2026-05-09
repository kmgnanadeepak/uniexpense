import mongoose from '../config/db.js';

const LogisticsProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firebaseUid: { type: String, required: true },
    companyName: { type: String },
    vehicleTypes: [{ type: String }],
    serviceAreaRadiusKm: { type: Number, default: 50 },
    baseLocation: {
      city: String,
      state: String,
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true },
);

const LogisticsProfile = mongoose.model('LogisticsProfile', LogisticsProfileSchema);

export default LogisticsProfile;

