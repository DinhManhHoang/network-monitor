/* models/userGroup.js */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Declare Schema
const UserGroupSchema = new mongoose.Schema(
  {
    groupname: {
      type: String,
      required: true,
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

// Declare Model to mongoose with Schema
const UserGroup = mongoose.model('UserGroup', UserGroupSchema)

// Export Model to be used in Node
module.exports = mongoose.model('UserGroup')
