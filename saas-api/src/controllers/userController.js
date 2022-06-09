const User = require('../services/User')

const UserController = {

    async findEmail (req, res) {

        let email = req.body.email
        let pass = req.body.pass

        if(!email || !pass){
            res.json({data: 'E-mail/ou senha não enviado'})
            return
        }

        const user = await User.findByEmail(email)

        if(!user){
            res.json({data: 'Usuario não existe'})
            return
        }

        res.json({data: true})
    }

}

module.exports = UserController