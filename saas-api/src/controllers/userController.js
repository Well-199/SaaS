const User = require('../services/User')
const bcrypt = require('bcrypt')

const UserController = {

    async findEmail (req, res) {

        let email = req.body.email
        let pass = req.body.pass

        if(!email || !pass){
            res.json({data: 'E-mail/ou senha não enviado'})
            return
        }

        const user = await User.findByEmail(email)

        console.log(user)

        if(!user){
            res.json({data: 'Usuario não existe'})
            return
        }

        // Validando a senha
        const match = await bcrypt.compare(pass, user.password)
        if(!match){
            res.json({data: 'E-mail e/ou senha errados'})
            return
        }

        // Gera um token de sessão para o usuario logado
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        // insere um token na sessão
        await User.pushToken(token, user.id)

        res.json({data: true, token: token})
    }

}

module.exports = UserController