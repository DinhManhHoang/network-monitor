
const AlertGroup = require('../models/alertGroup')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const { accounts } = ctx.query
    const alertGroupQuery = AlertGroup.findById(id)
    if (accounts == 'true') {
      alertGroupQuery.populate({
        path: 'accounts',
      })
    }
    const alertGroup = await alertGroupQuery
    ctx.body = alertGroup
    return alertGroup
  } catch (e) {
    ctx.status = 500
  }
}

async function findAll(ctx) {
  try {
    const { accounts } = ctx.query
    const alertGroupsQuery = AlertGroup.find({})
    if (accounts == 'true') {
      alertGroupsQuery.populate({
        path: 'accounts',
      })
    }
    const alertGroups = await alertGroupsQuery
    ctx.body = alertGroups
    return alertGroups
  } catch (e) {
    ctx.status = 500
  }
}

async function create(ctx) {
  try {
    const newAlertGroup = new AlertGroup(ctx.request.body)
    const savedAlertGroup = await newAlertGroup.save()
    ctx.body = savedAlertGroup
    return savedAlertGroup
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const alertGroup = await AlertGroup.findById(id)
    const deletedAlertGroup = await alertGroup.remove()
    ctx.body = deletedAlertGroup
    return deletedAlertGroup
  } catch (e) {
    ctx.status = 500
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const alertGroup = await AlertGroup.findByIdAndUpdate(
      id,
      ctx.request.body,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      },
    )
    ctx.body = alertGroup
    return alertGroup
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
