const db = require('../config/connection')

const Pedidos = {

    // Traz todos os pedidos por data
    findAll: async (email) => {
        const { rows } = await db.query(`
            SELECT * FROM pedidos`)
        return rows
    },

    // Inseri um novo pedido no banco de dados
    add: async (obj) => {
        const { rows } = await db.query(`
            INSERT INTO pedidos 
                (
                    cliente, vale, nota_fiscal, numero_pedido, qtd_volumes, peso,
                    uni_med, valor_pedido, tipo_faturamento, separado_por,
                    separado_data, observacoes, data_entrega 
                ) 
            values
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [
                obj.nomeCliente, obj.vale, obj.notaFiscal, obj.numPedido,
                obj.qtdVolumes, obj.peso, obj.uniMedida, obj.valorPedido, 
                obj.tipoFaturamento, obj.separadoPor, obj.separadoData,
                obj.observacoes, obj.dataEntrega
            ]
        )
        return rows[0]
    },

    // filtra por data
    filterDate: async (table, startDate, endDate) => {
        const { rows } = await db.query(`
            SELECT * FROM pedidos WHERE(${table} >=$1 AND ${table} <=$2)`, [startDate, endDate])
        return rows
    },

    // Busca um unico pedido
    find: async (id) => {
        const { rows } = await db.query(`
            SELECT * FROM pedidos WHERE(id=$1)`, [id])
        return rows[0]
    },

    // Altera dados do pedido pelo id 
    editar: async (obj) => {
        const { rows } = await db.query(`
            UPDATE 
                pedidos 
            SET 
                cliente=$1, vale=$2, nota_fiscal=$3, numero_pedido=$4, qtd_volumes=$5, 
                peso=$6, uni_med=$7, valor_pedido=$8, tipo_faturamento=$9, separado_por=$10,
                separado_data=$11, observacoes=$12, data_entrega=$13,
                modified=current_timestamp
            WHERE 
                (id=$14)`, 
            [
                obj.nomeCliente, obj.vale, obj.notaFiscal, obj.numPedido,
                obj.qtdVolumes, obj.peso, obj.uniMedida, obj.valorPedido, 
                obj.tipoFaturamento, obj.separadoPor, obj.separadoData,
                obj.observacoes, obj.dataEntrega, obj.id
            ])
        return rows[0]
    },

}

module.exports = Pedidos