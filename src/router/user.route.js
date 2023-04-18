const Router = require('koa-router')
const router = new Router({prefix: '/user'})

const {register, login} = require('../controller/use.controller')

router.get('/register',register)
router.get('/login',login)

module.exports = router
