import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IntlCurrencyInput from "react-intl-currency-input"
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import url from '../services/api'
import '../styles/adicionar-pedido.css'

const AdicionarPedido = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

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

    // Inseri um novo pedido no banco de dados
    async function addItem () {

        const req = await fetch(`${url}/add-item`, {
            method: 'POST',
            body: JSON.stringify({
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
                'Authorization': user.token
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

    // pega o valor em float do input peso
    const pesoHandleChange = (event, value, maskedValue) => {
        event.preventDefault()
        setPeso(value)
    }

    // pega o valor em float do input valor do pedido
    const handleChange = (event, value, maskedValue) => {
        event.preventDefault()
        setValorPedido(value)
    }

    // Formatação de moeda pt-br
    const currencyConfig = {
        locale: "pt-BR",
            formats: {
                number: {
                    BRL: {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    }

    // Formatação de Peso
    const pesoConfig = {
        locale: "en-US",
            formats: {
                number: {
                    BRL: {
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    }

    const addCanceled = () => {
        setNomeCliente('')
        setVale('')
        setNotaFiscal('')
        setNumPedido('')
        setQtdVolumes('')
        setPeso('')
        setValorPedido('')
        setTipoFaturamento('')
        setSeparadoPor('')
        setSeparadoData('')
        setObservacoes('')
        setRoteiro('')
        setDataEntrega('')

        navigate('/Painel')
    }

    return(
        <div className='addContainer'>
            <Header/>

            <div className='addMain'>

                <label>Nome Cliente</label>
                <input type="text" 
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value.toUpperCase())}
                />

                <label>Vale</label>
                <input type="number" onChange={(e) => setVale(e.target.value)}/>

                <label>Nota Fiscal</label>
                <input type="number" onChange={(e) => setNotaFiscal(e.target.value)}/>

                <label>Nº Pedido Cliente</label>
                <input type="number" onChange={(e) => setNumPedido(e.target.value)}/>

                <label>QTD Volumes</label>
                <input type="number" onChange={(e) => setQtdVolumes(e.target.value)}/>

                <label>Peso</label>
                <IntlCurrencyInput 
                    currency="BRL" 
                    config={pesoConfig}
                    value={peso}
                    onChange={pesoHandleChange} 
                />

                <label>Uni Med</label>
                <input type="text" value="KG" disabled/>

                <label>Valor Pedido</label>
                <IntlCurrencyInput 
                    currency="BRL" 
                    config={currencyConfig}
                    value={valorPedido}
                    onChange={handleChange} 
                />

                <label>Tipo Faturamento</label>
                <input type="text" 
                    value={tipoFaturamento}
                    onChange={(e) => setTipoFaturamento(e.target.value.toUpperCase())}
                />

                <label>Separado Por</label>
                <input type="text" 
                    value={separadoPor}
                    onChange={(e) => setSeparadoPor(e.target.value.toUpperCase())}
                />

                <label>Data Separação</label>
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

                <label>Data Entrega</label>
                <input type="date" 
                    value={dataEntrega}
                    onChange={(e) => setDataEntrega(e.target.value)}
                />

                <div className='modalButtons'>
                    <button onClick={addItem}>SALVAR</button>
                    <button onClick={addCanceled}>CANCELAR</button>
                </div>
            </div>
        </div>
    )
}

export default AdicionarPedido