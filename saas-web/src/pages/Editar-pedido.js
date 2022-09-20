import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import url from '../services/api'
import { useNavigate } from 'react-router-dom'
import '../styles/editar-pedido.css'

const EditarPedido = () => {

    const params = useParams()
    const navigate = useNavigate()

    const [id, setId] = useState('')
    const [dataReceb, setDataReceb] = useState('')
    const [horaReceb, setHoraReceb] = useState('')
    const [nomeCliente, setNomeCliente] = useState('')
    const [vale, setVale] = useState('')
    const [notaFiscal, setNotaFiscal] = useState('')
    const [numPedido, setNumPedido] = useState('')
    const [qtdVolumes, setQtdVolumes] = useState('')
    const [peso, setPeso] = useState('')
    const [valorPedido, setValorPedido] = useState('')
    const [tipoFaturamento, setTipoFaturamento] = useState('')
    const [separadoPor, setSeparadoPor] = useState('')
    const [separadoData, setSeparadoData] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [roteiro, setRoteiro] = useState('')
    const [dataEntrega, setDataEntrega] = useState('')

    // Busca um unico pedido pelo id
    async function pedidoInfo () {

        const req = await fetch(`${url}/findById`, {
            method: 'POST',
            body: JSON.stringify({
                id: params.id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('systemToken')
            }
        })
        const res = await req.json()

        if(res.data==true){
            
            setId(res.result.id)
            setDataReceb(res.result.data_receb)
            setHoraReceb(res.result.hora_receb)
            setNomeCliente(res.result.cliente)
            setVale(res.result.vale)
            setNotaFiscal(res.result.nota_fiscal)
            setNumPedido(res.result.numero_pedido)
            setQtdVolumes(res.result.qtd_volumes)
            setPeso(res.result.peso)
            setValorPedido(res.result.valor_pedido)
            setTipoFaturamento(res.result.tipo_faturamento)
            setSeparadoPor(res.result.separado_por)
            setSeparadoData(res.result.separado_data)
            setObservacoes(res.result.observacoes)
            setRoteiro(res.result.roteiro)
            setDataEntrega(res.result.data_entrega)

        }
    }

    //Edita o pedido
    async function edit () {

        const req = await fetch(`${url}/edit`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                nomeCliente: nomeCliente,
                vale: vale,
                notaFiscal: notaFiscal,
                numPedido: numPedido,
                qtdVolumes: qtdVolumes,
                peso: peso,
                valorPedido: valorPedido,
                tipoFaturamento: tipoFaturamento,
                separadoPor: separadoPor,
                separadoData: separadoData,
                observacoes: observacoes,
                roteiro: roteiro,
                dataEntrega: dataEntrega
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('systemToken')
            }
        })
        const res = await req.json()

        if(res.data==true){
            navigate('/Painel')
            return
        }

        if(res.data==false){
            alert(`${res.msg}`)
        }

    }

    useEffect(() => {
        pedidoInfo()
    }, [])

    return(
        <div className='editContainer'>
            <Header/>

            <div className='editMain'>

                <label>Data de recebimento</label>
                <input 
                    type="date" 
                    value={dataReceb}
                    disabled
                />

                <label>Hora de recebimento</label>
                <input 
                    type="time" 
                    value={horaReceb}
                    disabled
                />

                <label>Nome Cliente</label>
                <input type="text" 
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value.toUpperCase())}
                />

                <label>Vale</label>
                <input type="number" 
                    value={vale}
                    onChange={(e) => setVale(e.target.value)}
                />

                <label>Nota Fiscal</label>
                <input type="number" 
                    value={notaFiscal}
                    onChange={(e) => setNotaFiscal(e.target.value)}
                />

                <label>Nº Pedido Cliente</label>
                <input type="number" 
                    value={numPedido}
                    onChange={(e) => setNumPedido(e.target.value)}
                />

                <label>Quantidade de Volumes</label>
                <input type="text" 
                    value={qtdVolumes}
                    onChange={(e) => setQtdVolumes(e.target.value)}
                />

                <label>Peso</label>
                <input type="text" 
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                />

                <label>Unidade de Medida</label>
                <input type="text" value="KG" disabled/>

                <label>Valor do Pedido</label>
                <input type="text" 
                    value={valorPedido}
                    onChange={(e) => setValorPedido(e.target.value)}
                />

                <label>Tipo de Faturamento</label>
                <input type="text" 
                    value={tipoFaturamento}
                    onChange={(e) => setTipoFaturamento(e.target.value.toUpperCase())}
                />

                <label>Separado Por</label>
                <input type="text" 
                    value={separadoPor}
                    onChange={(e) => setSeparadoPor(e.target.value.toUpperCase())}
                />
                
                <label>Data de Separação</label>
                <input type="date" 
                    value={separadoData}
                    onChange={(e) => setSeparadoData(e.target.value)}
                />

                <label>Observaçoes</label>
                <input type="text" 
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value.toUpperCase())}
                />

                <label>Roteiro</label>
                <input type="text" 
                    value={roteiro}
                    onChange={(e) => setRoteiro(e.target.value.toUpperCase())}
                />

                <label>Data de Entrega</label>
                <input type="date" 
                    value={dataEntrega}
                    onChange={(e) => setDataEntrega(e.target.value)}
                />

                <div className='editButtons'>
                    <button onClick={edit}>SALVAR</button>
                    <button onClick={() => navigate('/Painel')}>CANCELAR</button>
                </div>
            </div>
        </div>
    )
}

export default EditarPedido