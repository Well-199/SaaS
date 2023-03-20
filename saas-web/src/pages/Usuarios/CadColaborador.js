import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TelefoneBrasileiroInput from "react-telefone-brasileiro";
import '../../styles/cadastro.css'
import Header from '../../components/Header'
import api from '../../services/api'

const CadastroColaborador = () => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.user)

    const [nomeCompleto, setNomeCompleto] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [celular, setCelular] = useState('')
    const [cargo, setCargo] = useState('')

    async function cadastrarNovoColaborador() {

        const req = await fetch(`${api}/cadastro/novoColaborador`, {
            method: 'POST',
            body: JSON.stringify({
                nomeCompleto: nomeCompleto,
                email: email,
                senha: senha,
                celular: celular,
                cargo: cargo,
                empresa: user.company,
                empresa_id: user.company_id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.token
            }
        })
        const res = await req.json()
        console.log(res)
        if(res.data===true){
            navigate('/painel')
        }

    }

    function validaDados () {

        let campoValido = false
        let nomeSobrenome = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi
        let emailValido = /\S+@\S+\.\S+/
        let celularValido = celular.replace('(', '').replace(')', '').replace('-', '').trim() 

        if(!nomeSobrenome.test(nomeCompleto) || nomeSobrenome==''){
            campoValido = nomeSobrenome.test(nomeCompleto)
            document.querySelector('.error1').style.display = 'flex'
        }
        else{
            campoValido = true
            document.querySelector('.error1').style.display = 'none'
        }

        if(emailValido.test(email)==false){
            campoValido = emailValido.test(email)
            document.querySelector('.error2').style.display = 'flex'
        }
        else{
            campoValido = true
            document.querySelector('.error2').style.display = 'none'
        }

        if(senha.length < 8){
            campoValido = false
            document.querySelector('.error3').style.display = 'flex'
        }
        else{
            campoValido = true
            document.querySelector('.error3').style.display = 'none'
        }

        if(confirmarSenha!==senha){
            campoValido = false
            document.querySelector('.error4').style.display = 'flex'
        }
        else{
            campoValido = true
            document.querySelector('.error4').style.display = 'none'
        }

        if(celularValido.length < 11){
            campoValido = false
            document.querySelector('.error5').style.display = 'flex'
        }
        else{
            campoValido = true
            document.querySelector('.error5').style.display = 'none'
        }

        if(cargo==''){
            campoValido = false
            document.querySelector('.error6').style.display = 'flex'
        }
        else{
            campoValido = true
            document.querySelector('.error6').style.display = 'none'
        }

        if(campoValido){
            cadastrarNovoColaborador()
        }
    }

    return(
        <div className='cadContainer'>
            <Header/>

            <div className='cadMain'>
                
                <label>Nome Completo</label>
                <input 
                    type="text" 
                    value={nomeCompleto}
                    placeholder="Nome e sobrenome"
                    onChange={(e) => setNomeCompleto(e.target.value)}
                />
                <p className='error1'>*Digite o nome e sobrenome</p>

                <label>E-mail</label>
                <input 
                    type="email" 
                    value={email}
                    placeholder="Digite um email valido"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className='error2'>*Digite um e-mail valido</p>

                <label>Senha</label>
                <input type="password" 
                    value={senha}
                    placeholder="Digite a senha"
                    onChange={(e) => setSenha(e.target.value)}
                />
                <p className='error3'>*Digite uma senha com minimo de 8 caracteres</p>

                <label>Confirmar Senha</label>
                <input type="password" 
                    value={confirmarSenha}
                    placeholder="Confirme a senha"
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />
                <p className='error4'>*Confirmação de senha diferente da senha</p>

                <label>Empresa</label>
                <input type="text" 
                    value={user.company}
                    disabled
                />

                <label>Celular</label>
                <TelefoneBrasileiroInput
                    value={celular}
                    placeholder="Numero de telefone celular"
                    onChange={(e) => setCelular(e.target.value)}
                    temDDD
                />
                <p className='error5'>*Numero invalido</p>

                <label>Cargo</label>
                <select 
                    value={cargo}
                    onChange={(e) => {
                        if(e.target.value!==""){
                            setCargo(e.target.value)
                            document.querySelector('.error6').style.display = 'none'
                        }
                    }}
                >
                    <option value="">Selecione</option>
                    <option value="admin">Administrador</option>
                </select>
                <p className='error6'>*Selecione um cargo</p>

                <div className='cadButtons'>
                    <button onClick={validaDados}>SALVAR</button>
                    <button onClick={() => navigate('/painel')}>CANCELAR</button>
                </div>

            </div>
            
        </div>
    )
}

export default CadastroColaborador