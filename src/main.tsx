import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { UserProvider } from './context/UserContext.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const root = document.getElementById('root') as Element

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>
  </React.StrictMode>,
)
