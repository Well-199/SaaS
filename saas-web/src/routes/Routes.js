import { Routes, Route } from 'react-router-dom'
import AuthPrivate from '../middlewares/Auth'

import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Clientes from '../pages/Usuarios/Clientes'
import Produtos from '../pages/Produtos/Produtos'
import Colaborador from '../pages/Usuarios/Colaborador'
import Transportadora from '../pages/Transportes/Transportadora'
import PainelProducao from '../pages/Home/Painel-producao'
import EditarPedido from '../pages/Pedidos/Editar'
import AdicionarPedido from '../pages/Pedidos/Adicionar'

const Router = () => {

    return(
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<AuthPrivate><Home/></AuthPrivate>}/>
            <Route path='/painel' element={<AuthPrivate><PainelProducao/></AuthPrivate>}/>
            <Route path='/adicionar' element={<AuthPrivate><AdicionarPedido/></AuthPrivate>}/>
            <Route path='/editar/:id' element={<AuthPrivate><EditarPedido/></AuthPrivate>}/>
            <Route path='/cadastro/clientes' element={<AuthPrivate><Clientes/></AuthPrivate>}/>
            <Route path='/cadastro/produtos' element={<AuthPrivate><Produtos/></AuthPrivate>}/>
            <Route path='/cadastro/colaborador' element={<AuthPrivate><Colaborador/></AuthPrivate>}/>
            <Route path='/cadastro/transportadora' element={<AuthPrivate><Transportadora/></AuthPrivate>}/>
        </Routes>
    )
}

export default Router