
const AlertMessage = require('../models/alertMessage')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const { groupDetails } = ctx.query
    let alertMessageQuery = AlertMessage.findById(id)
    if (groupDetails == 'true') {
      alertMessageQuery.populate('group')
    }
    const alertMessage = await alertMessageQuery
    ctx.body = alertMessage
    return alertMessage
  } catch (e) {
    ctx.status = 500
  }
}

async function findAll(ctx) {
  try {
    const { groupDetails, group } = ctx.query
    let alertMessagesQuery = AlertMessage.find({})
    if (group != undefined) {
      alertMessagesQuery = alertMessagesQuery.where('group', group)
    }
    if (groupDetails == 'true') {
      alertMessagesQuery.populate('group')
    }
    const alertMessages = await alertMessagesQuery
    ctx.body = alertMessages
    return alertMessages
  } catch (e) {
    ctx.status = 500
  }
}

async function create(ctx) {
  try {
    const newAlertMessage = new AlertMessage(ctx.request.body)
    const savedAlertMessage = await newAlertMessage.save()
    ctx.body = savedAlertMessage
    return savedAlertMessage
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const alertMessage = await AlertMessage.findById(id)
    const deletedAlertMessage = await alertMessage.remove()
    ctx.body = deletedAlertMessage
    return deletedAlertMessage
  } catch (e) {
    ctx.status = 500
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const alertMessage = await AlertMessage.findByIdAndUpdate(
      id,
      ctx.request.body,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      },
    )
    ctx.body = alertMessage
    return alertMessage
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
