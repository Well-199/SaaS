import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setName, setCompany, setToken } from '../redux/reducers/userReducer'
import logoInput from '../images/input-output.png'
import url from '../services/api'
import '../styles/login.css'

const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function isVerify(){

        const req = await fetch(`${url}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                pass: password
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const res = await req.json()

        if(res.data===true){
            dispatch( setName(res.nome) )
            dispatch( setCompany(res.empresa) )
            dispatch( setToken(res.token) )
            navigate('/Painel')
            return
        }
        
        setError(res.data)
        
        setTimeout(() => {
            setError('')
        }, 1500)
    }

    useEffect(() => {
        dispatch( setName('') )
        dispatch( setCompany('') )
        dispatch( setToken(null) )
    }, [])

    return(
        <div className='login-container'>

            <div className='login-main'>
                
                <div className='logo'>
                    <img src={logoInput} alt="logo"/>
                </div>
                
                <div className='login'>
                    <input type='email' value={email} 
                        placeholder=" Email"
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />

                    <input type='password' value={password}
                        placeholder=" Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p id='error-login'>{error}</p>

                    <button onClick={isVerify}>LOGIN</button>
                </div>

            </div>
        </div>
    )
}

export default Login
