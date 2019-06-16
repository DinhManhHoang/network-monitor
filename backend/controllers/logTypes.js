
const LogType = require('../models/logType')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const logType = await LogType.findById(id)
    ctx.body = logType
    return logType
  } catch (e) {
    ctx.status = 500
  }
}

async function findAll(ctx) {
  try {
    const logTypes = await LogType.find({})
    ctx.body = logTypes
    return logTypes
  } catch (e) {
    ctx.status = 500
  }
}

async function create(ctx) {
  try {
    const newLogType = new LogType(ctx.request.body)
    const savedLogType = await newLogType.save()
    ctx.body = savedLogType
    return savedLogType
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const logType = await LogType.findById(id)
    const deletedLogType = await logType.remove()
    ctx.body = deletedLogType
    return deletedLogType
  } catch (e) {
    ctx.status = 500
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const result = await LogType.findByIdAndUpdate(
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
  }
}

module.exports = {
  find,
  findAll,
  create,
  destroy,
  update,
}
