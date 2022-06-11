const router = require('express').Router()


router.use('/users',require('./users'))
router.use('/banner',require('./banner'))
router.use('/person',require('./person'))
module.exports = router