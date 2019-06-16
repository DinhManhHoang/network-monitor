
const Log = require('../models/log')
const LogCounter = require('../models/logCounter')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const enumDateRange = {
  '0': 1000,
  '1': 60 * 1000,
  '2': 60 * 60 * 1000,
  '3': 24 * 60 * 60 * 1000,
  '4': 7 * 24 * 60 * 60 * 1000,
  '5': 30 * 24 * 60 * 60 * 1000,
};

async function find(ctx) {
  try {
    const id = ctx.params.id
    const { cityDetails, typeDetails } = ctx.query
    let logQuery = Log.findById(id)
    if (cityDetails == 'true') {
      logQuery = logQuery.populate('city')
    }
    if (typeDetails == 'true') {
      logQuery = logQuery.populate('type')
    }
    const log = await logQuery
    ctx.body = log
    return log
  } catch (e) {
    ctx.status = 500
  }
}

async function findAll(ctx) {
  try {
    const { type, city, start, end, page, rowsPerPage, cityDetails, typeDetails } = ctx.query
    let logsQuery = Log.countDocuments()
    if (type != null) {
      logsQuery = logsQuery.where('type', type)
    }
    if (city != null) {
      logsQuery = logsQuery.where('city', city)
    }
    if (start != null) {
      const dateRangeNum = enumDateRange[0]
      const startDate = new Date(Math.floor(parseInt(start) / dateRangeNum) * dateRangeNum)
      logsQuery = logsQuery.gte('data.datetime', startDate)
    }
    if (end != null) {
      const dateRangeNum = enumDateRange[0]
      const endDate = new Date(Math.floor(parseInt(end) / dateRangeNum) * dateRangeNum)
      logsQuery = logsQuery.lte('data.datetime', endDate)
    }
    const total = await logsQuery.countDocuments()
    if ((page != null) && (rowsPerPage != null)) {
      logsQuery = logsQuery.skip(parseInt(page) * parseInt(rowsPerPage)).limit(parseInt(rowsPerPage))
    } else {
      logsQuery = logsQuery.limit(100)
    }
    if (cityDetails == 'true') {
      logsQuery = logsQuery.populate('city')
    }
    if (typeDetails == 'true') {
      logsQuery = logsQuery.populate('type')
    }
    const logs = await logsQuery.find({})
    ctx.body = {
      logs,
      total,
    }
    return {
      logs,
      total,
    }
  } catch (e) {
    ctx.status = 500
  }
}

async function countLog(ctx) {
  try {
    const { type, city, start, end, cityDetails, typeDetails } = ctx.query
    let logCounterQuery = LogCounter.countDocuments()
    if (type != null) {
      logCounterQuery = logCounterQuery.where('type', type)
    }
    if (city != null) {
      logCounterQuery = logCounterQuery.where('city', city)
    }
    if (start != null) {
      const dateRangeNum = enumDateRange[0]
      const startDate = new Date(Math.floor(parseInt(start) / dateRangeNum) * dateRangeNum)
      logCounterQuery = logCounterQuery.gte('startDate', startDate)
    }
    if (end != null) {
      const dateRangeNum = enumDateRange[0]
      const endDate = new Date(Math.floor(parseInt(end) / dateRangeNum) * dateRangeNum)
      logCounterQuery = logCounterQuery.lte('startDate', endDate)
    }
    if (cityDetails == 'true') {
      logCounterQuery = logCounterQuery.populate('city')
    }
    if (typeDetails == 'true') {
      logCounterQuery = logCounterQuery.populate('type')
    }
    for (let dateRange in enumDateRange) {
      const countResult = await logCounterQuery.where('groupType', dateRange)
      if ((countResult < 500)) {
        const result = await logCounterQuery.where('groupType', dateRange).find({})
        result.sort((a, b) => a.startDate - b.startDate)
        ctx.body = result
        break;
      }
    }
    ctx.status = 200
  } catch (e) {
    ctx.status = 500
  }
}

async function create(ctx) {
  try {
    const newLog = new Log(ctx.request.body)
    const savedLog = await newLog.save()
    for (let dateRange in enumDateRange) {
      const dateRangeNum = enumDateRange[dateRange]
      const startDate = new Date(Math.floor(savedLog.createdAt.getTime() / dateRangeNum) * dateRangeNum)
      const getLogCounter = await LogCounter.where({
        city: savedLog.city,
        type: savedLog.type,
        groupType: dateRange,
        startDate: startDate,
      }).findOne({})
      if (getLogCounter === null) {
        const newLogCounter = new LogCounter({
          city: savedLog.city,
          type: savedLog.type,
          groupType: dateRange,
          startDate: startDate,
          count: 1,
        })
        const savedLogCounter = await newLogCounter.save()
      } else {
        const id = getLogCounter._id
        const result = await LogCounter.updateOne({ _id: id }, { $inc: { count: 1 } })
      }
    }
    ctx.body = savedLog
    return savedLog
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const log = await Log.findById(id)
    const deletedLog = await log.remove()
    for (let dateRange in enumDateRange) {
      const dateRangeNum = enumDateRange[dateRange]
      const startDate = new Date(Math.floor(deletedLog.createdAt.getTime() / dateRangeNum) * dateRangeNum)
      const getLogCounter = await LogCounter.where({
        city: deletedLog.city,
        type: deletedLog.type,
        groupType: dateRange,
        startDate: startDate,
      }).findOne({})
      if (getLogCounter !== null) {
        const id = getLogCounter._id
        const result = await LogCounter.updateOne({ _id: id }, { $inc: { count: -1 } })
      }
    }
    ctx.body = deletedLog
    return deletedLog
  } catch (e) {
    ctx.status = 500
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const result = await Log.findByIdAndUpdate(
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
  countLog,
}
