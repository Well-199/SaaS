import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { modalStyles, modalStylesMobile } from '../styles/modal'
import IntlCurrencyInput from "react-intl-currency-input"
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import add from '../images/add.png'
import url from '../services/api'
import edit from '../images/edit.png'
import del from '../images/delete.png'
import menu from '../images/menu.png'
import som from '../audios/som.mp3'
import moment from 'moment'
import { io } from 'socket.io-client'
import '../styles/painel-producao.css'
import '../styles/loader.css'

const ENDPOINT = "http://ec2-54-175-3-119.compute-1.amazonaws.com:8000"
const socket = io(ENDPOINT)

const PainelProducao = () => {

    const [pedidos, setPedidos] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)

    const [optionFilter, setOptionFilter] = useState('data_entrega')
    const [startDate, setStartDate] = useState(moment().add(1, 'day').format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(moment().add(1, 'day').format('YYYY-MM-DD'))

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

    const [audio] = useState(new Audio(som))
    const [playing, setPlaying] = useState(false)

    // Puxa os dados do pedidos (Colocar filtro de data)
    async function listAll () {

        const req = await fetch(`${url}/listAll`, {
            method: 'POST',
            body: JSON.stringify({
                optionFilter: optionFilter,
                startDate: startDate,
                endDate: endDate,
                roteiro: roteiro
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

    // filtra por data e tipo de data e motorista
    async function filterDate () {

        const req = await fetch(`${url}/dateFilter`, {
            method: 'POST',
            body: JSON.stringify({
                optionFilter: optionFilter,
                startDate: startDate,
                endDate: endDate,
                roteiro: roteiro
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

        if(window.innerWidth <= 980){
            menuMobile()
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
            listAll()
            return
        }

        alert('ERRO AO ALTERAR CONF NFE')
        listAll()
    }

    // exclui uma linha
    async function deleteLine(id){

        let confirm = window.confirm('Deseja realmente excluir esse pedido?')

        if(confirm){
            const req = await fetch(`${url}/delete`, {
                method: 'POST',
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('systemToken')
                }
            })
            const res = await req.json()

            if(res.data==true){
                listAll()
                return
            }
    
            alert('ERRO AO EXCLUIR')
        }

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
        listAll()
    }

    // abre o modal para receber os dados e criar uma nova linha
    function openModalList() {
        setIsOpen(true)
    }

    function colorChange(item){

        if(item.vale==''){
            return {'background':'rgb(253, 203, 110)'}
        }
        else if(item.vale!=='' && item.separado_por==''){
            return {'background':'#fe6160'}
        }
        else if(item.separado_por!==''){
            return {'background':'rgb(123, 237, 159)'}  
        }
    }

    function menuMobile (){

        const menu = document.querySelector('.filters')

        if(window.innerWidth <= 980 && menu.style.display=='' || menu.style.display=='none'){
            menu.style.display = 'flex'
            return
        }

        if(window.innerWidth <= 980 && menu.style.display=='flex'){
            menu.style.display = 'none'
            return
        }
    }

    useEffect(() => {
        listAll()

        socket.on('pedido', (pedido) => {
            
            if(pedido.data==true){
                window.location.reload()
            }
        })
        
    }, [])

    return(
        <div className='painel-producao-container'>
            <Header/>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={window.innerWidth > 980 ? modalStyles : modalStylesMobile}
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

            <img className='menuMobile' src={menu} alt="Menu" onClick={menuMobile}/>

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

                <input type="text" 
                    className='filterInputs'
                    value={roteiro}
                    placeholder="Motorista (opcional)"
                    onChange={(e) => setRoteiro(e.target.value.toUpperCase())}
                />

                <button className='filterInputs' onClick={filterDate}>BUSCAR</button>
            </div>
            
            {pedidos.length ? 
            <table id='main-table'>
                <tr>
                    <th style={{'background':'#FFFFFF'}} className="desktop">Data Receb.</th>
                    <th style={{'background':'#FFFFFF'}} className="desktop">Hora Receb.</th>
                    <th style={{'background':'#FFFFFF'}} className="mobile" id='mobile2'>Nome Cliente</th>
                    <th style={{'background':'#000000', 'color':'#FFFFFF'}} className="mobile">Vale</th>
                    <th style={{'background':'rgb(0, 206, 201)', 'color':'#FFFFFF'}} className="desktop">Nota Fiscal</th>
                    <th style={{'background':'#000000', 'color':'#FFFFFF'}} className="desktop">Nº Pedido Cliente</th>
                    <th style={{'background':'rgb(0, 206, 201)', 'color':'#FFFFFF'}} className="desktop">QTD Volumes</th>
                    <th style={{'background':'rgb(0, 206, 201)', 'color':'#FFFFFF'}} className="desktop">Peso</th>
                    <th style={{'background':'rgb(96, 163, 188)', 'color':'#FFFFFF'}} className="desktop">Uni Med</th>
                    <th style={{'background':'#000000', 'color':'#FFFFFF'}} className="desktop">Valor Pedido</th>
                    <th style={{'background':'#000000', 'color':'#FFFFFF'}} className="mobile">Tipo Faturamento</th>
                    <th style={{'background':'rgb(0, 206, 201)', 'color':'#FFFFFF'}} className="desktop">Separado Por</th>
                    <th style={{'background':'rgb(0, 206, 201)', 'color':'#FFFFFF'}} className="desktop">Data Separação</th>
                    <th style={{'background':'rgb(96, 163, 188)', 'color':'#FFFFFF'}} className="desktop">Observaçoes</th>
                    <th style={{'background':'rgb(0, 206, 201)', 'color':'#FFFFFF'}} className="desktop">Roteiro</th>
                    <th style={{'background':'rgb(0, 206, 201)', 'color':'#FFFFFF'}} className="desktop">Data Entrega</th>
                    <th style={{'background':'rgb(0, 206, 201)', 'color':'#FFFFFF'}} className="mobile">Conf Nfe</th>
                    <th style={{'background':'#a5a5a5', 'color':'#FFFFFF'}} className="desktop">Editar</th>
                    <th style={{'background':'#a5a5a5', 'color':'#FFFFFF'}} className="desktop">Excluir</th>
                </tr>
                {pedidos.map(item => 
                <tr key={item.id} style={colorChange(item)}>
                    <td className="desktop">{moment(item.data_receb).format('DD/MM/YYYY')}</td>
                    <td className="desktop">{item.hora_receb}</td>
                    <td className="mobile" id='mobile2'>{item.cliente}</td>
                    <td className="mobile">{item.vale}</td>
                    <td className="desktop">{item.nota_fiscal}</td>
                    <td className="desktop">{item.numero_pedido}</td>
                    <td className="desktop">{item.qtd_volumes}</td>
                    <td className="desktop">{item.peso}</td>
                    <td className="desktop">{item.uni_med}</td>
                    <td className="desktop">
                        {Number(item.valor_pedido).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                    </td>
                    <td className="mobile" id='mobile3'>{item.tipo_faturamento}</td>
                    <td className="desktop">{item.separado_por}</td>
                    <td className="desktop">
                        {item.separado_data=='' ? '' : moment(item.separado_data).format('DD/MM/YYYY')}
                    </td>
                    <td 
                        className="desktop"
                        style={item.observacoes!=='' ? {'background':'rgb(253, 121, 168)'} : colorChange(item)}>{item.observacoes}
                    </td>
                    <td className="desktop">{item.roteiro}</td>
                    <td className="desktop">
                        {item.data_entrega=='' ? '' : moment(item.data_entrega).format('DD/MM/YYYY')}
                    </td>
                    <td className="mobile">
                        <input type="checkbox" 
                            checked={item.conf_nfe}
                            onChange={(e) => isNfeConf(item.id, e.target.checked)}
                        />
                    </td>
                    <td className="desktop">
                        <Link to={`/Editar/${item.id}`}>
                            <img className='inputEdit' src={edit} alt="editar"/>
                        </Link>
                    </td>
                    <td className="desktop">
                        <img 
                            className='inputEdit' 
                            src={del} alt="excluir"
                            onClick={() => deleteLine(item.id)}
                        />
                    </td>
                </tr>
                )}
            </table>
            :
            <div class="loader"></div>
            }
            <div className='add' onClick={openModalList}>
                <img src={add} alt="add"/>
            </div>
        </div>
    )
}

export default PainelProducao
