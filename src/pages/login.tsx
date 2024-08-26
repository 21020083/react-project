import { useContext, useEffect, useState, useRef } from 'react'
import {axiosInstance} from '../clients/core/axiosConfig.js'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'
import React from 'react'


export default function Login() {
  const navigator = useNavigate()
  const { loginContext } = useContext(UserContext)

  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [loading, setLoading] = useState(false)

  const error = useRef('')

  useEffect(() => {
    let token = localStorage.getItem('authToken')
    if (token) {
      // toast.success('thanh cong')
      navigator('/')
    }
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosInstance.post('/login', { username, password })
      loginContext(username, response.data.token)
      navigator('/')  
    } catch (err : any) {
      // Handle login errors
      if (err.response) {
        error.current = err.response.data.message
      } else {
        error.current = err.name
      }
      toast.error(error.current)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="w-50 mx-auto" onSubmit={handleSubmit}>
      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label">Username</label>
        <input
          type="username"
          id="LoginInputusername"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          required
          className="form-control"
        />
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <label className="form-label">Password</label>
        <input
          type="password"
          id="LoginInputPassword"
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
          placeholder="Password"
          required
          className="form-control"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !(username && password)}
        className="btn btn-primary btn-block mb-4"
      >
        {' '}
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
