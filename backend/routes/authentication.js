const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/authentication')

router.get('/logout', Ctrl.logout)
router.post('/login', Ctrl.login)
router.post('/register', Ctrl.register)

module.exports = router.routes()
