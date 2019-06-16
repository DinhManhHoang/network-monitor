/* models/logCounter.js */
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const ObjectId = mongoose.Schema.Types.ObjectId

// Declare Schema
const LogCounterSchema = new mongoose.Schema(
  {
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
    count: {
      type: Number,
      require: true,
    },
    groupType: {
      type: String,
      require: true,
      enum: [
        '0',  // = 1000 ms
        '1',  // = 5000 ms
        '2',  // = 25000 ms
        '3',  // = 125000 ms
        '4',  // = 625000 ms
        '5',  // = 3125000 ms
        '6',  // = 15625000 ms
        '7',  // = 78125000 ms
        '8',  // = 390625000 ms
        '9',  // = 1953125000 ms
        '10', // = 9765625000 ms
      ],
      index: true,
    },
    startDate: {
      type: Date,
      require: true,
    }
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
const LogCounter = mongoose.model('LogCounter', LogCounterSchema)

// Export Model to be used in Node
module.exports = mongoose.model('LogCounter')
