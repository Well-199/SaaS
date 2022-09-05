import { Navigate } from 'react-router-dom'

const AuthPrivate = ({children}) => {

    // Buscar no local storage e comparar hash com o banco
    const isAuth = localStorage.getItem('token')

    if(isAuth==null){
        return <Navigate to="/"/>
    }
    
    return children
}

export default AuthPrivate