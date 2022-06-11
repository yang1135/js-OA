const router =require('express').Router()

const {testLogin} = require('../middleware/users')
const { login } = require('../controllers/users')

router.post('/login',testLogin,login)

module.exports = router