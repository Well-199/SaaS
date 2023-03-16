import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthPrivate = ({children}) => {

    const user = useSelector((state) => state.user)

    if(user.token==null || user.token=='null'){
        return <Navigate to="/"/>
    }
    
    return children
}

export default AuthPrivate