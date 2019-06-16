const CREATE = 'ACCOUNTS_CREATE'
const DESTROY = 'ACCOUNTS_DESTROY'
const UPDATE = 'ACCOUNTS_UPDATE'
const BROADCAST = 'ACCOUNTS_CHANGED'

module.exports = function (socket, client) {
  client.on(CREATE, () => { socket.sockets.emit(BROADCAST) })
  client.on(DESTROY, () => { socket.sockets.emit(BROADCAST) })
  client.on(UPDATE, () => { socket.sockets.emit(BROADCAST) })
}
