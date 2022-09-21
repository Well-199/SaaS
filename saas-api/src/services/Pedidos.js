const db = require('../config/connection')

const Pedidos = {

    // Traz todos os pedidos por data
    findAll: async (startDate, endDate) => {
        const { rows } = await db.query(`
            SELECT * FROM pedidos WHERE(data_entrega >=$1 AND data_entrega <=$2) ORDER BY pedidos.data_receb ASC`,
            [startDate, endDate])
        return rows
    },

    // Inseri um novo pedido no banco de dados
    add: async (obj) => {
        const { rows } = await db.query(`
            INSERT INTO pedidos 
                (
                    cliente, vale, nota_fiscal, numero_pedido, qtd_volumes, peso,
                    uni_med, valor_pedido, tipo_faturamento, separado_por,
                    separado_data, observacoes, roteiro, data_entrega 
                ) 
            values
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
            [
                obj.nomeCliente, obj.vale, obj.notaFiscal, obj.numPedido,
                obj.qtdVolumes, obj.peso, 'KG', obj.valorPedido, 
                obj.tipoFaturamento, obj.separadoPor, obj.separadoData,
                obj.observacoes, obj.roteiro, obj.dataEntrega
            ]
        )
        return rows[0]
    },

    // filtra por data
    filterDate: async (table, startDate, endDate) => {
        const { rows } = await db.query(`
            SELECT * FROM pedidos WHERE(${table} >=$1 AND ${table} <=$2) ORDER BY pedidos.data_receb ASC`, 
            [startDate, endDate]
        )
        return rows
    },

    // busca por data e motorista
    filterDateRoute: async (table, roteiro, startDate, endDate) => {
        const { rows } = await db.query(`
            SELECT * FROM pedidos WHERE(roteiro ilike'%${roteiro}%' AND ${table} >=$1 AND ${table} <=$2) ORDER BY pedidos.data_receb ASC`, 
            [startDate, endDate]
        )
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
                peso=$6, valor_pedido=$7, tipo_faturamento=$8, separado_por=$9,
                separado_data=$10, observacoes=$11, roteiro=$12, data_entrega=$13,
                modified=current_timestamp
            WHERE 
                (id=$14)`, 
            [
                obj.nomeCliente, obj.vale, obj.notaFiscal, obj.numPedido,
                obj.qtdVolumes, obj.peso, obj.valorPedido, 
                obj.tipoFaturamento, obj.separadoPor, obj.separadoData,
                obj.observacoes, obj.roteiro, obj.dataEntrega, obj.id
            ])
        return rows[0]
    },

    // Altera o status de conf_nfe entre true e false
    statusChangeConfNfe: async (value, id) => {
        const { rows } = await db.query(`
            UPDATE pedidos SET conf_nfe=$1 WHERE(id=$2)`, [value, id])
        return rows
    },

    // exclui um pedido pelo id da linha
    del: async (id) => {
        const { rows } = await db.query(`
            DELETE FROM pedidos WHERE(id=$1)`, [id])
        return rows
    },

}

module.exports = Pedidos