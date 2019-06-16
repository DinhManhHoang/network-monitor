/* models/log.js */
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const Mixed = mongoose.Schema.Types.Mixed
const ObjectId = mongoose.Schema.Types.ObjectId

// Declare Schema
const LogSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      require: true,
      validate: {
        validator: ipValidator,
        message: 'Invalid ip address',
      },
    },
    type: {
      type: ObjectId,
      require: true,
      ref: 'LogType',
      index: true,
    },
    city: {
      type: ObjectId,
      ref: 'City',
      require: true,
      index: true,
    },
    data: Mixed,
  },
  {
    timestamps: true,
  }
);

function ipValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string().ip() },
  )
  if (result.error !== null) {
    return false
  } else {
    return true
  }
}

// Declare Model to mongoose with Schema
const Log = mongoose.model('Log', LogSchema)

// Export Model to be used in Node
module.exports = mongoose.model('Log')
