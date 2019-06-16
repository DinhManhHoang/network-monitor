/* models/city.js */
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

// Declare Schema
const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coordinates: {
      x: {
        type: Number,
        require: true,
      },
      y: {
        type: Number,
        require: true,
      },
    },
    location: String,
    ip: [{
      type: String,
      validate: {
        validator: ipValidator,
        message: 'Invalid ip address',
      },
    }],
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
const City = mongoose.model('City', CitySchema)

// Export Model to be used in Node
module.exports = mongoose.model('City')
