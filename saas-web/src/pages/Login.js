import React, { useState} from 'react'
import '../styles/login.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function isVerify(){
        console.log(email)
        console.log(password)
        window.location.href='/Home'
    }

    return(
        <div className='login-container'>
            <div className='login-main'>
                <input type='email' value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input type='password' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={isVerify}>ENTRAR</button>
            </div>
        </div>
    )
}

export default Login
