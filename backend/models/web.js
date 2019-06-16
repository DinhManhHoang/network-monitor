/* models/web.js */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Declare Schema
const WebSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    data: {
      respondCode: String,
      lastChecked: String,
      respondTime: String,
    }
  },
  {
    timestamps: true,
  }
);

// Declare Model to mongoose with Schema
const Web = mongoose.model('Web', WebSchema)

// Export Model to be used in Node
module.exports = mongoose.model('Web')
