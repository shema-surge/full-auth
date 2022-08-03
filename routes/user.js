const express = require('express')
const {getUsers} = require('../controllers/user')
const userModel = require('../models/users')
const {authenticated} = require('../middlewares/auth')

const router = express.Router()

router.route('/').get(authenticated(),getUsers())

module.exports = router