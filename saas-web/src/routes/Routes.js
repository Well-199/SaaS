import { Routes, Route } from 'react-router-dom'
import AuthPrivate from '../middlewares/Auth'
import Login from '../pages/Login'
import Home from '../pages/Home'

const Router = () => {

    return(
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Home' element={<AuthPrivate><Home/></AuthPrivate>}/>
        </Routes>
    )
}

export default Router