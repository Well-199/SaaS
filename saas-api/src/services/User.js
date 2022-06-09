const db = require('../config/database')

const User = {

    // Busca um restaurante pelo id
    findByEmail: async (email) => {
        const { rows } = await db.query(`
            SELECT * FROM users WHERE(email=$1)`, [email])
        return rows[0]
    },

}

module.exports = User