import React, { ReactNode, useState } from 'react'


interface User {
  email: string, 
  auth: boolean
}
interface CurrentUserContextType {
  user: User,
  loginContext: any,
  logout: () => void
}

const UserContext = React.createContext<CurrentUserContextType>({} as CurrentUserContextType)

const UserProvider = ({ children } : any) => {
  const [user, setUser] = useState({email: '', auth: false})

  const loginContext = (email: string, token: string) => {
    setUser(() => ({
      email: email,
      auth: true,
    }))
    localStorage.setItem('authToken', token)
    localStorage.setItem('email', email)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('email')

    setUser(() => ({
      email: '',
      auth: true,
    }))
  }

  return (
    <UserContext.Provider value={{user, loginContext, logout}}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContext, UserProvider }
