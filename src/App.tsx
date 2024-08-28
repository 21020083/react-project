import { useEffect } from 'react'
import './App.css'
import { NavBar, Footer } from './pages/layout.js'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login.js'
import UserList from './pages/user/index.tsx'

import UserForm from './pages/user/edit.tsx'
import { getAccessToken } from './lib/helpers/index.ts'
import ProtectedRoute from './components/core/protectedRoute.tsx'
import MainLayout from './components/layout/MainLayout.tsx'
import { routes } from './routes/index.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
