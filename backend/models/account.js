/* models/account.js */
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const ObjectId = mongoose.Schema.Types.ObjectId

// Declare Schema
const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
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
    permission: {
      type: ObjectId,
      ref: 'Permission',
    }
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
const Account = mongoose.model('Account', AccountSchema)

// Export Model to be used in Node
module.exports = mongoose.model('Account')
