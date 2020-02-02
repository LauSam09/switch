import React from 'react'
import useAuthentication from '../hooks/useAuthentication'

export const AuthenticationContext = React.createContext({
  loggedIn: false,
  loading: false,
  login: async () => {},
  logout: async () => {},
  error: ''
})

export const AuthenticationContextConsumer = AuthenticationContext.Consumer

export const AuthenticationContextProvider = ({ children }) => {
  const {
    loggedIn,
    loading,
    login,
    logout,
    error
  } = useAuthentication()

  return (
    <AuthenticationContext.Provider value={{
      loggedIn,
      loading,
      login,
      logout,
      error
    }}>{children}</AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider
