import React, { useState, useEffect } from 'react'
import '../styles/cadastro.css'
import Header from '../components/Header'

const Produtos = () => {

    return(
        <div>
            <Header/>
            
            <div className='cadastro-container'>
                <div className='cadastro-title'>
                    <h1>Cadastro de Produtos</h1>
                </div>

            </div>

        </div>
    )
}

export default Produtos