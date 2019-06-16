const XLSX = require('xlsx')
const Log = require('../models/log')

async function findAll({ type, city, start, end }) {
  try {
    let logsQuery = Log.countDocuments()
    if (type != null) {
      logsQuery = logsQuery.where('type', type)
    }
    if (city != null) {
      logsQuery = logsQuery.where('city', city)
    }
    if (start != null) {
      const startDate = new Date(parseInt(start))
      logsQuery = logsQuery.gte('data.datetime', startDate)
    }
    if (end != null) {
      const endDate = new Date(parseInt(end))
      logsQuery = logsQuery.lte('data.datetime', endDate)
    }
    logsQuery = logsQuery.limit(1000)
    const logs = await logsQuery.find({})
    return logs
  } catch (e) {
    return []
  }
}

function createExcel(logs) {
  const data = logs.map(log => ({...log.data, }))
  const wsLog = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, wsLog, 'Log');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
};


async function downloadExcel(ctx) {
  try {
    const { type, city, start, end } = ctx.query
    const logs = await findAll({ type, city, start, end })
    const excelFile = createExcel(logs)
    ctx.body = excelFile
  } catch (e) {
    ctx.status = 500
  }
}

module.exports = {
  downloadExcel,
}
