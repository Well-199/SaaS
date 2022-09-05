const express = require('express')
const router = express.Router()

const Auth = require('../middlewares/Auth')

const UserController = require('../controllers/userController')

router.post('/login', UserController.login)

router.get('/user', Auth.private, UserController.userData)

module.exports = router
