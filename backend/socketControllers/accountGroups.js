const CREATE = 'ACCOUNT_GROUPS_CREATE'
const DESTROY = 'ACCOUNT_GROUPS_DESTROY'
const UPDATE = 'ACCOUNT_GROUPS_UPDATE'
const BROADCAST = 'ACCOUNT_GROUPS_CHANGED'

module.exports = function (socket, client) {
  client.on(CREATE, () => { socket.sockets.emit(BROADCAST) })
  client.on(DESTROY, () => { socket.sockets.emit(BROADCAST) })
  client.on(UPDATE, () => { socket.sockets.emit(BROADCAST) })
}
