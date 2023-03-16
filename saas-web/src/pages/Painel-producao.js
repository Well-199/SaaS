import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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

// const socket = io('http://ec2-54-175-3-119.compute-1.amazonaws.com:8000')

const PainelProducao = () => {

    const user = useSelector((state) => state.user)

    const [pedidos, setPedidos] = useState([])

    const [optionFilter, setOptionFilter] = useState('data_entrega')
    const [startDate, setStartDate] = useState(moment().add(1, 'day').format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState(moment().add(1, 'day').format('YYYY-MM-DD'))
    const [roteiro, setRoteiro] = useState('')

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
                'Authorization': user.token
            }
        })
        const res = await req.json()

        if(res.data==true){
            setPedidos(res.result)
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
                'Authorization': user.token
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
                'Authorization': user.token
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
                    'Authorization': user.token
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

        // socket.on('pedido', (pedido) => {
            
        //     if(pedido.data==true){
        //         window.location.reload()
        //     }
        // })
        
    }, [])

    return(
        <div className='painel-producao-container'>
            <Header/>

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
            <div className='add'>
                <Link to="/Adicionar">
                    <img src={add} alt="add"/>
                </Link>
            </div>
        </div>
    )
}

export default PainelProducao