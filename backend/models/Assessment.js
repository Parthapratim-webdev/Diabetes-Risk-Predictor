const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema(
  {
    assessmentId: {
      type: String,
      unique: true,
      index: true,
    },
    userId: {
      type: String,
      default: 'usr_guest',
      index: true,
    },
    status: {
      type: String,
      enum: ['Completed', 'Awaiting Prediction Service'],
      default: 'Completed',
    },
    serviceConnected: {
      type: Boolean,
      default: true,
    },
    measurements: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    predictionResult: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Assessment', assessmentSchema);
