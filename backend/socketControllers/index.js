const accountsCtrl = require('./accounts')
const accountGroupsCtrl = require('./accountGroups')
const alertGroupsCtrl = require('./alertGroups')
const alertMessagesCtrl = require('./alertMessages')
const websitesCtrl = require('./websites')

module.exports = function (socket, client) {
  accountsCtrl(socket, client)
  accountGroupsCtrl(socket, client)
  alertMessagesCtrl(socket, client)
  alertGroupsCtrl(socket, client)
  websitesCtrl(socket, client)
}
