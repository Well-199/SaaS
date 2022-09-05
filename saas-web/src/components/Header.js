import React, { useState, useEffect } from 'react'
import '../styles/header.css'
import { useNavigate, Link } from 'react-router-dom'
import logoInput from '../images/logo.png'
import url from '../services/api'

const Header = () => {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [company, setCompany] = useState('')
    const [selectValue] = useState('Cadastro')

    async function getUser() {

        const req = await fetch(`${url}/user`, {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
        const res = await req.json()

        setName(res.data.name)
        setCompany(res.data.company)
    
    }

    useEffect(() => {
        getUser()
    }, [])

    const cadOptions = (option) => {

        // Caso selecionar cadastro volta para Home
        if(option==='Cadastro'){
            navigate('/Home')
            return
        }

        navigate(`/Cadastro/${option}`)
    }

    return(
        <header className='home-header'>

            <div className='home-logo'>
                <Link to="/Home"><img src={logoInput} alt="logo"/></Link>
            </div>

            <div className='home-menu'>
                <ul>
                    <li>
                        <select value={selectValue} 
                            className='select-cadastro' onChange={(e) => cadOptions(e.target.value)}
                        >
                            <option value="Cadastro">Cadastro</option>
                            <option value="Clientes">Clientes</option>
                            <option value="Produtos">Produtos</option>
                            <option value="Colaborador">Colaborador</option>
                            <option value="Transportadora">Transportadora</option>
                        </select>
                    </li>
                    <li>Gestão</li>
                    <li>Financeiro</li>
                    <li>Compras</li>
                    <li>Vendas</li>
                </ul>
            </div>

            <div className='home-welcome'>
                <p className='home-username'>Olá! {name}</p>
                <p className='home-company'>{company}</p>
            </div>

        </header>
    )
}

export default Header