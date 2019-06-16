const Koa = require('koa')                      //
const Router = require('koa-router')            //
const Logger = require('koa-logger')            //
const Cors = require('@koa/cors')               //  Nhúng các thư viện cần thiết
const BodyParser = require('koa-bodyparser')    //
const Helmet = require('koa-helmet')            //
const respond = require('koa-respond')          //
const mongoose = require('mongoose')            //

const app = new Koa()                           //  Khởi tạo server Koa
const router = new Router()

app.use(Helmet())                               //  Thiết lập các cấu hình cho server

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())

}

app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.use(require('koa-static')('./build'))

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

io.on('connection', socket => {

  console.log('New connection enstablished')

  require('./socketControllers')(io, socket)

  socket.on('disconnect', () => {
    console.log('Disconnected a connection')
  })

})

mongoose.connect('mongodb://localhost/networkMonitor', { useNewUrlParser: true })

module.exports = server
