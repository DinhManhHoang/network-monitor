const CREATE = 'WEBSITES_CREATE'
const DESTROY = 'WEBSITES_DESTROY'
const UPDATE = 'WEBSITES_UPDATE'
const BROADCAST = 'WEBSITES_CHANGED'

module.exports = function (socket, client) {
  client.on(CREATE, () => { socket.sockets.emit(BROADCAST) })
  client.on(DESTROY, () => { socket.sockets.emit(BROADCAST) })
  client.on(UPDATE, () => { socket.sockets.emit(BROADCAST) })
}
