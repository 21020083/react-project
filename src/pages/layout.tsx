import { useContext } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAccessToken } from '../lib/helpers/index'

export function NavBar() {
  const { user, logout } = useContext(UserContext)
  const navigator = useNavigate()

  const handleLogout = () => {
    //toast.success('logout');
    logout()
    navigator('/login')
  }
  if (!getAccessToken()) {
    return null
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom box-shadow py-3 mb-3">
      <div className="container">
        <ToastContainer />
        <Link className="navbar-brand" to="/">
          Web
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {((user && user.auth) || window.location.pathname !== '/login') && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/user">
                    User
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {user.email && <span className="nav-link">{user.email}</span>}
            <NavDropdown title="Setting">
              {getAccessToken() ? (
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              )}
            </NavDropdown>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="container p-3 nt-5 border-top">
        <small className="d-block text-muted text-center"> Wev-App</small>
      </div>
    </footer>
  )
}
