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
                    separado_data, observacoes, conf_motorista, data_entrega 
                ) 
            values
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
            [
                obj.nomeCliente, obj.vale, obj.notaFiscal, obj.numPedido,
                obj.qtdVolumes, obj.peso, obj.uniMedida, obj.valorPedido, 
                obj.tipoFaturamento, obj.separadoPor, obj.separadoData,
                obj.observacoes, obj.confMotorista, obj.dataEntrega
            ]
        )
        return rows[0]
    },

}

module.exports = Pedidos