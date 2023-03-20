import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../../styles/cadastro.css'
import Header from '../../components/Header'

const CadastroColaborador = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const [nomeCompleto, setNomeCompleto] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [confirmarSenha, setConfirmarSenha] = useState()
    const [celular, setCelular] = useState()
    const [cargo, setCargo] = useState()

    async function cadastrarNovoColaborador() {
        console.log(nomeCompleto)
        console.log(email)
        console.log(senha)
        console.log(confirmarSenha)
        console.log(celular)
        console.log(cargo)
        console.log(user.company)
        console.log(user.company_id)
    }

    return(
        <div className='cadContainer'>
            <Header/>

            <div className='cadMain'>
                
                <label>Nome Completo</label>
                <input 
                    type="text" 
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                />

                <label>E-mail</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Senha</label>
                <input type="password" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <label>Confirmar Senha</label>
                <input type="password" 
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />

                <label>Empresa</label>
                <input type="text" 
                    value={user.company}
                    disabled
                />

                <label>Celular</label>
                <input type="text" 
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                />

                <label>Cargo</label>
                <select 
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                >
                    <option value="">Selecione</option>
                    <option value="admin">Administrador</option>
                </select>

                <div className='cadButtons'>
                    <button onClick={cadastrarNovoColaborador}>SALVAR</button>
                    <button onClick={() => navigate('/painel')}>CANCELAR</button>
                </div>

            </div>
            
        </div>
    )
}

export default CadastroColaborador