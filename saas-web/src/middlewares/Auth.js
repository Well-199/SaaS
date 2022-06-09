import { Navigate } from 'react-router-dom'

const AuthPrivate = ({children}) => {

    // Buscar no local storage e comparar hash com o banco

    const isAuth = false

    if(isAuth){
        return children
    }
    else{
        return <Navigate to="/"/>
    }

}

export default AuthPrivate