import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setName, setCompany, setToken } from '../redux/reducers/userReducer'
import '../styles/header.css'
import cadeado from '../images/cadeado.png'
import check from '../images/accept.png'
import sair from '../images/sair.png'
import logoInput from '../images/logo.png'

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    async function logout () {
        dispatch( setName('') )
        dispatch( setCompany('') )
        dispatch( setToken(null) )
        navigate('/')
    }

    return(
        <header className='home-header'>

            <div className='home-logo'>
                <Link to="/painel"><img src={logoInput} alt="logo"/></Link>
            </div>

            <div className='home-menu'>
                <ul>
                    <li><img className='block' src={cadeado} />Gestão</li>
                    <li><img className='block' src={cadeado} />Financeiro</li>
                    <li><img className='block' src={cadeado} />Compras</li>
                    <li><img className='block' src={check} />Cadastros</li>
                    <li><img className='payment' src={check} /><Link to="/painel" className='link'>Vendas</Link></li>
                </ul>
            </div>

            <div className='home-welcome'>
                <p className='home-username'>Olá! {user.name}</p>
                <p className='home-company'>{user.company}</p>
            </div>

            <div className='sair' onClick={logout}>
                <img src={sair} alt="sair" />
            </div>

        </header>
    )
}

export default Header