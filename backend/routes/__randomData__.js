const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/__randomData__')

router.post('/', Ctrl.__randomData__)

module.exports = router.routes()
