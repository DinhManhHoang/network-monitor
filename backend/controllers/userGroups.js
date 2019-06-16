
const UserGroup = require('../models/userGroup')
const Permission = require('../models/permission')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const { permission } = ctx.query
    let userGroupQuery = UserGroup.findById(id)
    if (permission == 'true') {
      userGroupQuery = userGroupQuery.populate('permission')
    }
    const userGroup = await userGroupQuery
    ctx.body = userGroup
    return userGroup
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function findAll(ctx) {
  try {
    const { permission } = ctx.query
    let userGroupsQuery = UserGroup.find({})
    if (permission == 'true') {
      userGroupsQuery = userGroupsQuery.populate('permission')
    }
    const userGroups = await userGroupsQuery
    ctx.body = userGroups
    return userGroups
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function create(ctx) {
  try {
    const newPermission = new Permission()
    const savedPermission = await newPermission.save()
    const newUserGroup = new UserGroup({ ...ctx.request.body, permission: savedPermission._id })
    const savedUserGroup = await newUserGroup.save()
    ctx.body = savedUserGroup
    return savedUserGroup
  } catch (e) {
    ctx.status = 400
		ctx.error = e.messsage
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const userGroup = await UserGroup.findById(id)
    const deletedPermission = await Permission.findByIdAndRemove(userGroup.permission)
    const deletedUserGroup = await userGroup.remove()
    ctx.body = deletedUserGroup
    return deletedUserGroup
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const result = await UserGroup.findByIdAndUpdate(
      id,
      ctx.request.body,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      },
    )
    ctx.body = result
    return result
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

module.exports = {
  find,
  findAll,
  create,
  destroy,
  update,
}
