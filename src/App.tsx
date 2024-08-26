import { useEffect } from 'react'
import './App.css'
import { NavBar, Footer } from './pages/layout.js'
import { Home } from './pages/home.js'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login.js'
import { useContext } from 'react'
import UserList from './pages/user/index.tsx'

import { UserContext } from './context/UserContext.jsx'
import UserForm from './pages/user/edit.tsx'
import { getAccessToken } from './lib/helpers/index.ts'
import ProtectedRoute from './components/core/protectedRoute.tsx'

function App() {
  const { loginContext } = useContext(UserContext)
  const Token = getAccessToken()
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      loginContext(
        localStorage.getItem('email'),
        localStorage.getItem('authToken'),
      )
    }
  }, [])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          element={<ProtectedRoute user={Token} redirectPath={'/login'} />}
        >
          <Route path="user" element={<UserList />} />
          <Route path="user/edit/:id" element={<UserForm />} />
          <Route path="user/add" element={<UserForm />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
