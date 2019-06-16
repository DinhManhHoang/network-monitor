const User = require('../models/user')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const { groupDetails } = ctx.query
    let userQuery = User.findById(id)
    if (groupDetails == 'true') {
      userQuery = userQuery.populate('role')
    }
    const user = await userQuery
    ctx.body = user
    return user
  } catch (e) {
    ctx.status = 500
  }
}

async function findAll(ctx) {
  try {
    const { groupDetails, group } = ctx.query
    let usersQuery =  User.find({})
    if (group !== undefined) {
      usersQuery.where('role', group)
    }
    if (groupDetails == 'true') {
      usersQuery = usersQuery.populate('role')
    }
    const users = await usersQuery
    ctx.body = users
    return users
  } catch (e) {
    ctx.status = 500
  }
}

async function create(ctx) {
  try {
    const newUser = new User(ctx.request.body)
    const savedUser = await newUser.save()
    ctx.body = savedUser
    return savedUser
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const user = await User.findById(id)
    const deletedUser = await user.remove()
    ctx.body = deletedUser
    return deletedUser
  } catch (e) {
    ctx.status = 500
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const result = await User.updateOne(
      { _id: id },
      ctx.request.body,
      {
        runValidators: true,
      },
    )
    if (result.nModified === 1) {
      ctx.status = 200
    } else {
      throw new Error(`Cannot find user with _id = ${id}`)
    }
    return result
  } catch (e) {
    ctx.status = 500
  }
}

module.exports = {
  find,
  findAll,
  create,
  destroy,
  update,
}
