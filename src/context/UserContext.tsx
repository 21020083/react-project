import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../lib/helpers'
import React, { useState } from 'react'

interface User {
  email: string
  auth: boolean
}
interface CurrentUserContextType {
  user: User
  loginContext: any
  logout: () => void
}

const UserContext = React.createContext<CurrentUserContextType>(
  {} as CurrentUserContextType,
)

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({ email: '', auth: false })

  const loginContext = (
    email: string,
    access_token: string,
    refresh_token: string,
  ) => {
    setUser(() => ({
      email: email,
      auth: true,
    }))
    setAccessToken(access_token)
    setRefreshToken(refresh_token)
  }

  const logout = () => {
    removeRefreshToken()
    removeAccessToken()

    setUser(() => ({
      email: '',
      auth: false,
    }))
  }

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContext, UserProvider }
