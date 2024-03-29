const express = require('express')
const router = express.Router()

const Auth = require('../middlewares/Auth')

const UserController = require('../controllers/UsersControllers/LoginController')
const PedidosController = require('../controllers/pedidosController')
const CadastroController = require('../controllers/UsersControllers/CadastroController')

router.post('/login', UserController.login)

router.post('/cadastro/novoColaborador', CadastroController.cadastroColaborador)

router.get('/user', Auth.private, UserController.userData)

router.post('/listAll', Auth.private, PedidosController.listAll)

router.post('/add-item', Auth.private, PedidosController.addItem)

router.post('/dateFilter', Auth.private, PedidosController.dateFilter)

router.post('/findById', Auth.private, PedidosController.findById)

router.post('/edit', Auth.private, PedidosController.edit)

router.post('/isConfNfe', Auth.private, PedidosController.isConfNfe)

router.post('/delete', Auth.private, PedidosController.deleteItem)

module.exports = router
