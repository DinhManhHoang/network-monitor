/* models/logType.js */
const mongoose = require('mongoose')

// Declare Schema
const LogTypeSchema = new mongoose.Schema(
  {
    typename: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Declare Model to mongoose with Schema
const LogType = mongoose.model('LogType', LogTypeSchema)

// Export Model to be used in Node
module.exports = mongoose.model('LogType')
