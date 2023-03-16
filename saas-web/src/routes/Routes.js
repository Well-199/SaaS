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
import AdicionarPedido from '../pages/Adicionar-pedido'

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