import { Routes, Route } from 'react-router-dom'
import AuthPrivate from '../middlewares/Auth'

import Login from '../pages/Login'
import Home from '../pages/Home'
import Clientes from '../pages/Clientes'
import Produtos from '../pages/Produtos'
import Colaborador from '../pages/Colaborador'
import Transportadora from '../pages/Transportadora'
import PainelProducao from '../pages/Painel-producao'
import EditarPedido from '../pages/Editar-pedido'

const Router = () => {

    return(
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/Home' element={<AuthPrivate><Home/></AuthPrivate>}/>
            <Route path='/Painel' element={<AuthPrivate><PainelProducao/></AuthPrivate>}/>
            <Route path='/Editar/:id' element={<AuthPrivate><EditarPedido/></AuthPrivate>}/>
            <Route path='/Cadastro/Clientes' element={<AuthPrivate><Clientes/></AuthPrivate>}/>
            <Route path='/Cadastro/Produtos' element={<AuthPrivate><Produtos/></AuthPrivate>}/>
            <Route path='/Cadastro/Colaborador' element={<AuthPrivate><Colaborador/></AuthPrivate>}/>
            <Route path='/Cadastro/Transportadora' element={<AuthPrivate><Transportadora/></AuthPrivate>}/>
        </Routes>
    )
}

export default Router