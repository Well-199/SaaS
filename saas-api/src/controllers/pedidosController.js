const Pedidos = require('../services/Pedidos')
const moment = require('moment')

moment.locale('pt-br')

const PedidosController = {

    async listAll (req, res) {

        const pedidos = await Pedidos.findAll()

        let json = []

        for(let i in pedidos){

            let data_recebimento = moment(pedidos[i].data_receb).format('YYYY-MM-DD')
            let hora_recebimento = moment(pedidos[i].data_receb).format('LT')

            json.push({
                id: pedidos[i].id,
                data_receb: data_recebimento,
                hora_receb: hora_recebimento,
                cliente: pedidos[i].cliente,
                vale: (pedidos[i].vale==0 ? '' : parseInt(pedidos[i].vale)),
                nota_fiscal: (pedidos[i].nota_fiscal==0 ? '' : parseInt(pedidos[i].nota_fiscal)), 
                numero_pedido: (pedidos[i].numero_pedido==0 ? '' : parseInt(pedidos[i].numero_pedido)), 
                qtd_volumes: (pedidos[i].qtd_volumes==0 ? '' : parseInt(pedidos[i].qtd_volumes)), 
                peso: (pedidos[i].peso==0 ? '' : parseFloat(pedidos[i].peso)),
                uni_med: pedidos[i].uni_med, 
                valor_pedido: (pedidos[i].valor_pedido==0 ? '' : parseFloat(pedidos[i].valor_pedido)), 
                tipo_faturamento: pedidos[i].tipo_faturamento, 
                separado_por: pedidos[i].separado_por, 
                separado_data: (pedidos[i].separado_data==null ? '' : moment(pedidos[i].separado_data).format('YYYY-MM-DD')),
                observacoes: pedidos[i].observacoes, 
                conf_motorista: (pedidos[i].conf_motorista==true ? 'SIM' : 'NÃO'),
                data_entrega: (pedidos[i].data_entrega==null ? '' : moment(pedidos[i].data_entrega).format('YYYY-MM-DD'))
            })
        }

        res.json({data: true, result: json})
    },

    async addItem (req, res) {

        let nomeCliente = req.body.nomeCliente
        let vale = req.body.vale
        let notaFiscal = req.body.notaFiscal
        let numPedido = req.body.numPedido
        let qtdVolumes = req.body.qtdVolumes
        let peso = req.body.peso
        let uniMedida = req.body.uniMedida
        let valorPedido = req.body.valorPedido
        let tipoFaturamento = req.body.tipoFaturamento
        let separadoPor = req.body.separadoPor
        let separadoData = req.body.separadoData
        let observacoes = req.body.observacoes
        let confMotorista = req.body.confMotorista
        let dataEntrega = req.body.dataEntrega

        if(nomeCliente==""){
            res.json({data: false, msg: 'Preencha o nome do cliente'})
            return
        }

        if(uniMedida==""){
            res.json({data: false, msg: 'Selecione unidade de medida'})
            return
        }

        if(confMotorista==""){
            res.json({data: false, msg: 'Selecione Conferido Motorista'})
            return
        }

        // monta o objeto que vai ser enviado pra o banco
        let obj = {
            nomeCliente: nomeCliente,
            vale: (vale=='' ? 0 : parseInt(vale)),
            notaFiscal: (notaFiscal=='' ? 0 : parseInt(notaFiscal)),
            numPedido: (numPedido=='' ? 0 : parseInt(numPedido)),
            qtdVolumes: (qtdVolumes=='' ? 0 : parseInt(qtdVolumes)),
            peso: (peso=='' ? 0 : parseFloat(peso)),
            uniMedida: uniMedida,
            valorPedido: (valorPedido=='' ? 0 : parseFloat(valorPedido)),
            tipoFaturamento: tipoFaturamento,
            separadoPor: separadoPor,
            separadoData: (separadoData=='' ? null : moment(separadoData).format('YYYY-MM-DD')),
            observacoes: observacoes,
            confMotorista: Boolean(confMotorista),
            dataEntrega: (dataEntrega=='' ? null : moment(dataEntrega).format('YYYY-MM-DD'))
        }

        await Pedidos.add(obj) 

        res.json({data: true, msg: 'Pedido adicionado com sucesso'})
    },

    async dateFilter (req, res) {

        let table = req.body.optionFilter
        let startDate = moment(req.body.startDate).format('YYYY-MM-DD 00:00:00')
        let endDate = moment(req.body.endDate).format('YYYY-MM-DD 23:59:59')

        const pedidos = await Pedidos.filterDate(table, startDate, endDate)

        let json = []

        for(let i in pedidos){

            let data_recebimento = moment(pedidos[i].data_receb).format('YYYY-MM-DD')
            let hora_recebimento = moment(pedidos[i].data_receb).format('LT')

            json.push({
                id: pedidos[i].id,
                data_receb: data_recebimento,
                hora_receb: hora_recebimento,
                cliente: pedidos[i].cliente,
                vale: (pedidos[i].vale==0 ? '' : parseInt(pedidos[i].vale)),
                nota_fiscal: (pedidos[i].nota_fiscal==0 ? '' : parseInt(pedidos[i].nota_fiscal)), 
                numero_pedido: (pedidos[i].numero_pedido==0 ? '' : parseInt(pedidos[i].numero_pedido)), 
                qtd_volumes: (pedidos[i].qtd_volumes==0 ? '' : parseInt(pedidos[i].qtd_volumes)), 
                peso: (pedidos[i].peso==0 ? '' : parseFloat(pedidos[i].peso)),
                uni_med: pedidos[i].uni_med, 
                valor_pedido: (pedidos[i].valor_pedido==0 ? '' : parseFloat(pedidos[i].valor_pedido)), 
                tipo_faturamento: pedidos[i].tipo_faturamento, 
                separado_por: pedidos[i].separado_por, 
                separado_data: (pedidos[i].separado_data==null ? '' : moment(pedidos[i].separado_data).format('YYYY-MM-DD')),
                observacoes: pedidos[i].observacoes, 
                conf_motorista: (pedidos[i].conf_motorista==true ? 'SIM' : 'NÃO'),
                data_entrega: (pedidos[i].data_entrega==null ? '' : moment(pedidos[i].data_entrega).format('YYYY-MM-DD'))
            })
        }

        res.json({data: true, result: json})
    }

}

module.exports = PedidosController