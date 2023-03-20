const db = require('../config/connection')

const Empresas = {

    // Busca uma empresa pelo id
    findByCompany: async (empresa_id) => {
        const { rows } = await db.query(`
            SELECT * FROM empresas WHERE(id=$1)`, [empresa_id])
        return rows[0]
    },

}

module.exports = Empresas