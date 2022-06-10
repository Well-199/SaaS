const User = require('../services/User')

const Auth = {

    async private (req, res, next) {

        // Se não veio no header nem no body nao existe token
        if(!req.headers.authorization){
            res.json({ data: 'token não enviado' })
            return
        }

        let token = req.headers.authorization

        // se o token que eu peguei ta vazio eu paro a requisição aqui
        if(token == ''){
            res.json({ data: 'Token vazio' })
            return
        }

        // verefica se existe usuario logado com pelo token
        const user = await User.findByToken(token)

        // se não foi encontrado um token no banco paro a requisiçao aqui
        if(!user){
            res.json({data: "token invalido"})
            return
        }

        // se foi encontrado um token valido no banco a rota prossegue
        next()
    }

}

module.exports = Auth