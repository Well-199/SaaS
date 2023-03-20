const Empresas = require('../../services/Empresas')
const User = require('../../services/User')
const bcrypt = require('bcrypt')

const CadastroController = {

    async cadastroColaborador (req, res) {

        let nomeCompleto = req.body.nomeCompleto
        let email = req.body.email
        let senha = req.body.senha
        let celular = req.body.celular
        let cargo = req.body.cargo
        let empresa = req.body.empresa
        let empresa_id = req.body.empresa_id

        if(!nomeCompleto){
            res.json({data: false, message: "Nome não enviado"})
            return
        }

        if(!email){
            res.json({data: false, message: "E-mail não enviado"})
            return
        }

        if(!senha){
            res.json({data: false, message: "Senha não enviado"})
            return
        }

        if(!celular){
            res.json({data: false, message: "Celular não enviado"})
            return
        }

        if(!cargo){
            res.json({data: false, message: "Cargo não enviado"})
            return
        }

        if(!empresa){
            res.json({data: false, message: "Nome da não enviado não enviado"})
            return
        }

        if(!empresa_id){
            res.json({data: false, message: "ID da empresa não enviado não enviado"})
            return
        }

        // Verifica se a empresa existe
        const company = await Empresas.findByCompany(parseInt(empresa_id))

        if(!company){
            res.json({data: false, message: "Empresa não encontrada"})
            return
        }

        // confirma se o nome da empresa é o mesmo enviado no cadastro
        if(company.nome_fantasia.trim()!==empresa.trim()){
            res.json({data: false, message: "Empresa não encontrada"})
            return
        }

        const usuario = await User.findByEmail(email.trim()) 

        // verifica se o usuario ja tem e-mail cadastrado
        if(usuario){
            res.json({data: false, message: "E-mail ja cadastrado"})
            return
        }

        let telefoneCelular = celular.replace('(', '').replace(')', '').replace(' ', '').replace('-', '').trim()

        // cria a senha
        const passwordHash = await bcrypt.hash(senha.trim(), 10)

        // monta o objeto de cadastro
        let obj = {
            nome: nomeCompleto,
            email: email.trim(),
            password: passwordHash,
            empresa: company.nome_fantasia,
            empresa_id: parseInt(empresa_id),
            celular: telefoneCelular,
            cargo: cargo.trim()
        }

        await User.cadastroUsuario(obj)

        res.json({ data: true })
    }

}

module.exports = CadastroController