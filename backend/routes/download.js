const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/download')

router.get('/', Ctrl.downloadExcel)

module.exports = router.routes()
