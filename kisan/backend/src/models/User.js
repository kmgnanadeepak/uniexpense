import mongoose from '../config/db.js';

const UserSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, index: true },
    role: {
      type: String,
      enum: ['farmer', 'customer', 'merchant', 'logistics', 'admin'],
      default: 'farmer',
    },
    displayName: { type: String },
    phone: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;

