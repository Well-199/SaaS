import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logoInput from '../images/input-output.png'
import url from '../services/api'
import '../styles/login.css'

const Login = () => {

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
            
            localStorage.setItem('token', res.token)
            navigate('/Home')
            return

        }
        
        setError(res.data)
        
        setTimeout(() => {
            setError('')
        }, 1500)
    }

    return(
        <div className='login-container'>

            <div className='login-main'>
                
                <div className='logo'>
                    <img src={logoInput} alt="logo"/>
                </div>
                
                <input type='email' value={email} 
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />

                <input type='password' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <p id='error-login'>{error}</p>

                <button onClick={isVerify}>ENTRAR</button>
            </div>
        </div>
    )
}

export default Login
