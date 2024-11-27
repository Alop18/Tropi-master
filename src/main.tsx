import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
import Login from './pages/auth/login/Login.tsx'
import Register from './pages/auth/register/Register.tsx'
import PublicProducts from './pages/PublicProducts/PublicProducts.tsx'
import ProfileAdmin from './pages/profile/admin/ProfileAdmin.tsx'
import ProtectedRouter from './components/ProtectedRouter.tsx'
import UserProfile from './pages/profile/user/UserProfile.tsx'
import PayMent from './pages/payments/PayMent.tsx'
import Acerca from './pages/acerca/Acerca.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Routes>

          <Route element={<ProtectedRouter requiredRole='admin' />}>
            <Route path='/admin' element={<ProfileAdmin />}></Route>
          </Route>
          <Route element={<ProtectedRouter requiredRole='user' />}>
            <Route path='/perfil' element={<UserProfile />}></Route>
            <Route path='/pagar' element={<PayMent />}></Route>
          </Route>
          <Route path='/acerca-de' element={<Acerca></Acerca>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>} />
          <Route path='/Register' element={<Register></Register>} />
          <Route path='/productos' element={<PublicProducts />}></Route>

        </Routes>
      </BrowserRouter>

    </NextUIProvider>

  </React.StrictMode>,
)
