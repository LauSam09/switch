import React from 'react'
import useAuthentication from '../hooks/useAuthentication'

export const AuthenticationContext = React.createContext({
  loggedIn: false,
  login: () => {},
  logout: () => {}
})

export const AuthenticationContextConsumer = AuthenticationContext.Consumer

// eslint-disable-next-line react/prop-types
export const AuthenticationContextProvider = ({ children }) => {
  const {
    loggedIn,
    loading,
    login,
    logout
  } = useAuthentication()

  return (
    <AuthenticationContext.Provider value={{
      loggedIn,
      loading,
      login,
      logout
    }}>{children}</AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider