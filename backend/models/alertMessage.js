/* models/alertMessage.js */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Declare Schema
const AlertMessageSchema = new mongoose.Schema(
  {
    popupMes: {
      type: String,
    },
    emailMes: {
      type: String,
    },
    smsMes: {
      type: String,
    },
    sent: {
      type: String,
      enum: ["0", "1"],
      required: true,
    },
    group: {
      type: ObjectId,
      require: true,
      ref: 'AlertGroup',
    }
  },
  {
    timestamps: true,
  }
);

// Declare Model to mongoose with Schema
const AlertMessage = mongoose.model('AlertMessage', AlertMessageSchema)

// Export Model to be used in Node
module.exports = mongoose.model('AlertMessage')
