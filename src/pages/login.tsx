import { useContext, useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.jsx'
import { baseRequest } from '../clients/core/axiosConfig.js'

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
      const response = await baseRequest(
        'http://127.0.0.1:8000/api/login',
        'POST',
        {
          username,
          password,
        },
      )
      loginContext(username, response.access_token, response.refresh_token)
      navigator('/')
    } catch (err: any) {
      // Handle login errors
      if (err) {
        error.current = err.message
        console.log(error.current)
      } else {
        error.current = 'unknow error'
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
