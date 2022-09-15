const express = require('express')
const router = express.Router()

const Auth = require('../middlewares/Auth')

const UserController = require('../controllers/userController')
const PedidosController = require('../controllers/pedidosController')

router.post('/login', UserController.login)

router.get('/user', Auth.private, UserController.userData)

router.post('/listAll', Auth.private, PedidosController.listAll)

router.post('/add-item', Auth.private, PedidosController.addItem)

module.exports = router
