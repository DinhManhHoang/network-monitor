const Web = require('../models/web')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const web = await Web.findById(id)
    ctx.body = web
    return web
  } catch (e) {
    ctx.status = 500
  }
}

async function findAll(ctx) {
  try {
    const webs = await Web.find({})
    ctx.body = webs
    return webs
  } catch (e) {
    ctx.status = 500
  }
}

async function create(ctx) {
  try {
    const newWeb = new Web(ctx.request.body)
    const savedWeb = await newWeb.save()
    ctx.body = savedWeb
    return savedWeb
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const deletedWeb = await Web.findByIdAndRemove(id)
    ctx.body = deletedWeb
    return deletedWeb
  } catch (e) {
    ctx.status = 500
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const result = await Web.findByIdAndUpdate(
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
    console.log(e)
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
