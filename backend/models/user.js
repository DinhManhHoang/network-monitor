/* models/user.js */
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const ObjectId = mongoose.Schema.Types.ObjectId

// Declare Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      first: String,
      last: String,
    },
    dateOfBirth: Date,
    address: String,
    email: {
      type: String,
      validate: {
        validator: emailValidator,
        message: 'Invalid email',
      },
    },
    phone: {
      type: String,
      validate: {
        validator: phoneValidator,
        message: 'Invalid phone number',
      },
    },
    role: {
      type: ObjectId,
      ref: 'UserGroup',
    },
  },
  {
    timestamps: true,
  }
);

function emailValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string().email() },
  )
  if (result.error !== null) {
    return false
  } else {
    return true
  }
}

function phoneValidator(value) {
  const result = Joi.validate(
    { value },
    { value: Joi.string().regex(/^[0-9]+$/) },
  )
  if (result.error !== null) {
    return false
  } else {
    return true
  }
}

// Declare Model to mongoose with Schema
const User = mongoose.model('User', UserSchema)

// Export Model to be used in Node
module.exports = mongoose.model('User')
