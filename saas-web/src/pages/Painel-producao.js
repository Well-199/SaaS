import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { modalStyles } from '../styles/modal'
import IntlCurrencyInput from "react-intl-currency-input"
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import add from '../images/add.png'
import url from '../services/api'
import edit from '../images/edit.png'
import moment from 'moment'

import '../styles/painel-producao.css'

const PainelProducao = () => {

    const [pedidos, setPedidos] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)

    const [optionFilter, setOptionFilter] = useState('data_entrega')
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))

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

    // Puxa os dados do pedidos (Colocar filtro de data)
    async function listAll () {

        const req = await fetch(`${url}/listAll`, {
            method: 'POST',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('systemToken')
            }
        })
        const res = await req.json()

        if(res.data==true){
            setPedidos(res.result)
        }
    }

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
                'Authorization': localStorage.getItem('systemToken')
            }
        })
        const res = await req.json()

        if(res.data==true){
            alert(`${res.msg}`)
            window.location.reload()

            return
        }

        if(res.data==false){
            alert(`${res.msg}`)
        }

    }

    // filtra por data e tipo de data
    async function filterDate () {

        const req = await fetch(`${url}/dateFilter`, {
            method: 'POST',
            body: JSON.stringify({
                optionFilter: optionFilter,
                startDate: startDate,
                endDate: endDate
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('systemToken')
            }
        })
        const res = await req.json()

        if(res.data==true){
            setPedidos(res.result)
        }

    }

    // Alterar o valor do chebox
    async function isNfeConf (id, value) {

        const req = await fetch(`${url}/isConfNfe`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                value: value
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('systemToken')
            }
        })
        const res = await req.json()

        if(res.data==true){
            window.location.reload()
            return
        }

        alert('ERRO AO ALTERAR CONF NFE')
        window.location.reload()
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

    // pega o valor em float do input valor do pedido
    const handleChange = (event, value, maskedValue) => {
        event.preventDefault()
        setValorPedido(value)
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

    // pega o valor em float do input peso
    const pesoHandleChange = (event, value, maskedValue) => {
        event.preventDefault()
        setPeso(value)
    }

    // fecha o modal e limpa os states
    function closeModal() {
        setIsOpen(false)
        window.location.reload()
    }

    // abre o modal para receber os dados e criar uma nova linha
    function openModalList() {
        setIsOpen(true)
    }

    useEffect(() => {
        listAll()
    }, [])

    return(
        <div className='painel-producao-container'>
            <Header/>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Example Modal"
            >
                <div className='modalContainer'>

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
                        <button onClick={closeModal}>CANCELAR</button>
                    </div>
                </div>

            </Modal>

            <div className='filters'>
                <select className='filterInputs' value={optionFilter}
                    onChange={(e) => setOptionFilter(e.target.value)}>
                    <option value="data_entrega">Data de Entrega</option>
                    <option value="data_receb">Data de Receb</option>
                    <option value="separado_data">Data de Separação</option> 
                </select>

                <input type="date" 
                    className='filterInputs'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input type="date" 
                    className='filterInputs'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <button className='filterInputs' onClick={filterDate}>BUSCAR</button>
            </div>

            <table id='main-table'>
                <tr>
                    <th>Data Receb.</th>
                    <th>Hora Receb.</th>
                    <th>Nome Cliente</th>
                    <th>Vale</th>
                    <th>Nota Fiscal</th>
                    <th>Nº Pedido Cliente</th>
                    <th>QTD Volumes</th>
                    <th>Peso</th>
                    <th>Uni Med</th>
                    <th>Valor Pedido</th>
                    <th>Tipo Faturamento</th>
                    <th>Separado Por</th>
                    <th>Data Separação</th>
                    <th>Observaçoes</th>
                    <th>Roteiro</th>
                    <th>Data Entrega</th>
                    <th>Conf Nfe</th>
                    <th>Editar</th>
                </tr>
                {pedidos.map(item => 
                <tr key={item.id}>
                    <td>{moment(item.data_receb).format('DD/MM/YYYY')}</td>
                    <td>{item.hora_receb}</td>
                    <td>{item.cliente}</td>
                    <td>{item.vale}</td>
                    <td>{item.nota_fiscal}</td>
                    <td>{item.numero_pedido}</td>
                    <td>{item.qtd_volumes}</td>
                    <td>{item.peso}</td>
                    <td>{item.uni_med}</td>
                    <td>
                        {Number(item.valor_pedido).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                    </td>
                    <td>{item.tipo_faturamento}</td>
                    <td>{item.separado_por}</td>
                    <td>
                        {item.separado_data=='' ? '' : moment(item.separado_data).format('DD/MM/YYYY')}
                    </td>
                    <td>{item.observacoes}</td>
                    <td>{item.roteiro}</td>
                    <td>
                        {item.data_entrega=='' ? '' : moment(item.data_entrega).format('DD/MM/YYYY')}
                    </td>
                    <td>
                        <input type="checkbox" 
                            checked={item.conf_nfe}
                            onChange={(e) => isNfeConf(item.id, e.target.checked)}
                        />
                    </td>
                    <td>
                        <Link to={`/Editar/${item.id}`}>
                            <img className='inputEdit' src={edit} alt="editar"/>
                        </Link>
                    </td>
                </tr>
                )}
            </table>

            <div className='add' onClick={openModalList}>
                <img src={add} alt="add"/>
            </div>
        </div>
    )
}

export default PainelProducao
