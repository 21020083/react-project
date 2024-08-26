import { useEffect } from 'react'
import './App.css'
import { NavBar, Footer } from './pages/layout.js'
import { Home } from './pages/home.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login.js'
import React from 'react'
import { useContext } from 'react'
import UserList from './pages/user/index.tsx'

import { UserContext } from './context/UserContext.jsx'
import UserForm from './pages/user/edit.tsx'

function App() {
  const { loginContext } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      loginContext(
        localStorage.getItem('email'),
        localStorage.getItem('authToken')
      )
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user" element={<UserList />} />
          <Route path="login" element={<Login />} />
          <Route path="user/edit/:id" element={<UserForm />} />
          <Route path="user/add" element={<UserForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
