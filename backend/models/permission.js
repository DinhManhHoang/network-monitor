/* models/permission.js */
const mongoose = require('mongoose')

// Declare Schema
const PermissionSchema = new mongoose.Schema(
  {
    dashboard: {
      type: String,
      required: true,
      enum: ['0', '1', '2'],
      default: '2',
    },
    user: {
      type: String,
      required: true,
      enum: ['0', '1', '2'],
      default: '2',
    },
    log: {
      type: String,
      required: true,
      enum: ['0', '1', '2'],
      default: '2',
    },
    alert: {
      type: String,
      required: true,
      enum: ['0', '1', '2'],
      default: '2',
    },
    permission: {
      type: String,
      required: true,
      enum: ['0', '1', '2'],
      default: '2',
    },
  },
  {
    timestamps: true,
  }
);

// Declare Model to mongoose with Schema
const Permission = mongoose.model('Permission', PermissionSchema)

// Export Model to be used in Node
module.exports = mongoose.model('Permission')
