const CREATE = 'ALERT_GROUPS_CREATE'
const DESTROY = 'ALERT_GROUPS_DESTROY'
const UPDATE = 'ALERT_GROUPS_UPDATE'
const BROADCAST = 'ALERT_GROUPS_CHANGED'

module.exports = function (socket, client) {
  client.on(CREATE, () => { socket.sockets.emit(BROADCAST) })
  client.on(DESTROY, () => { socket.sockets.emit(BROADCAST) })
  client.on(UPDATE, () => { socket.sockets.emit(BROADCAST) })
}
