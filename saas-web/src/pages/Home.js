import React, { useState, useEffect } from 'react'
import '../styles/home.css'
import logoInput from '../images/input-output.png'
import url from '../services/api'

const Home = () => {

    const [name, setName] = useState('')
    const [company, setCompany] = useState('')

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

    return(
        <div className='home-container'>
            <header className='home-header'>

                <div className='home-logo'>
                    <img src={logoInput} alt="logo"/>
                </div>

                <div className='home-menu'>
                    Aqui vai ser o menu
                </div>

                <div className='home-welcome'>
                    <p className='home-username'>Olá! {name}</p>
                    <p className='home-company'>{company}</p>
                </div>

            </header>

            <header className='home-header-teste'>

                <div className='home-logo-teste'>
                    <img src={logoInput} alt="logo"/>
                </div>

                <div className='home-menu-teste'>
                    Aqui vai ser o menu
                </div>

                <div className='home-welcome-teste'>
                    <p className='home-username-teste'>Olá! {name}</p>
                    <p className='home-company-teste'>{company}</p>
                </div>

            </header>
        </div>
    )
}

export default Home