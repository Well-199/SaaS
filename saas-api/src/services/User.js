const db = require('../config/connection')

const User = {

    // Busca um restaurante pelo id
    findByEmail: async (email) => {
        const { rows } = await db.query(`
            SELECT * FROM users WHERE(email=$1)`, [email])
        return rows[0]
    },

    // Busca o usuario pelo token
    findByToken: async (token) => {
        const { rows } = await db.query(`
            SELECT * FROM users WHERE(token=$1)`, [token])
        return rows[0]
    },

    // inseri o token na sessao do usuario
    pushToken: async (token, id) => {
        const { rows } = await db.query(`
            UPDATE users SET token=$1 WHERE (id=$2)`, [token, id])
        return rows
    },

    // Cadastra um novo colaborador
    cadastroUsuario: async (obj) => {
        const { rows } = await db.query(`
            INSERT INTO users 
                (
                    nome, email, password, empresa, empresa_id, celular, cargo
                ) 
            values
                ($1, $2, $3, $4, $5, $6, $7)`,
            [
                obj.nome, obj.email, obj.password, obj.empresa,
                obj.empresa_id, obj.celular, obj.cargo
            ]
        )
        return rows[0]
    },

}

module.exports = User