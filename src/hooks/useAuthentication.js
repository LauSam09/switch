import React from 'react'

const useAuthentication = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const login = (_username, _password) => {
    setLoggedIn(true)
    setLoading(false)
  }

  const logout = () => {
    setLoggedIn(false)
  }

  return { loggedIn, loading, login, logout }
}

export default useAuthentication
