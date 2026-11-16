const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
    avatarInitials: {
      type: String,
      default: 'U',
    },
    notifications: {
      emailReports: { type: Boolean, default: true },
      healthTips: { type: Boolean, default: true },
      reminders: { type: Boolean, default: false },
    },
    privacySettings: {
      shareTelemetry: { type: Boolean, default: false },
      demoModeActive: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
