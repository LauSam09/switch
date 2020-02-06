import React from 'react'
import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_DATABASE_URL

const useAuthentication = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const login = async (username, password) => {
    setError('')
    try {
      await axios.post('_session', {
        username: username,
        password: password
      })
    } catch (err) {
      console.error(err)
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }

    setLoggedIn(true)
    return true
  }

  const logout = async () => {
    setError('')
    try {
      await axios.delete('_session')
    } catch (err) {
      console.error(err)
      return false
    }

    setLoggedIn(false)
    return true
  }

  return { loggedIn, loading, login, logout, error }
}

export default useAuthentication
