
const Permission = require('../models/permission')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const permission = await Permission.findById(id)
    ctx.body = permission
    return permission
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function findAll(ctx) {
  try {
    const permissions = await Permission.find({})
    ctx.body = permissions
    return ctx.body
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function create(ctx) {
  try {
    const newPermission = new Permission({
      ...ctx.request.body
    })
    const savedPermission = await newPermission.save()
    ctx.body = savedPermission
    return ctx.body
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const permission = await Permission.findById(id)
    const deletePermission = await permission.remove()
    ctx.body = deletePermission
    return ctx.body
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const result = await Permission.findByIdAndUpdate(
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
