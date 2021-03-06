import React from 'react'
import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import { db as itemsDb, remoteDb as remoteItemsDb } from './useItems'
import { db as recipesDb, remoteDb as remoteRecipesDb } from './useRecipes'

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/database' : '/'
axios.defaults.withCredentials = true

const useAuthentication = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const location = useLocation()
  const history = useHistory()

  const [itemsSyncHandler, setItemsSyncHandler] = React.useState(null)
  const [recipesSyncHandler, setRecipesSyncHandler] = React.useState(null)

  React.useEffect(() => {
    axios.interceptors.response.use(
      resp => resp,
      err => {
        if (err.response && err.response.status === 401) {
          if (loggedIn) {
            setLoggedIn(false)
          }

          if (location.pathname !== '/login') {
            history.push('/login')
          }
        }
        return Promise.reject(err)
      }
    )

    axios
      .get('_session')
      .then(resp => {
        if (resp.data.userCtx.name) {
          onLogin()
        }
      })
      .catch(err => console.error(err))
    // eslint-disable-next-line
  }, [])

  const onLogin = () => {
    setItemsSyncHandler(
      itemsDb.sync(remoteItemsDb, {
        live: true,
        retry: true
      })
    )
    setRecipesSyncHandler(
      recipesDb.sync(remoteRecipesDb, {
        live: true,
        retry: true
      })
    )

    setLoggedIn(true)
  }

  const onLogout = () => {
    itemsSyncHandler && itemsSyncHandler.cancel()
    setItemsSyncHandler(null)
    recipesSyncHandler && recipesSyncHandler.cancel()
    setRecipesSyncHandler(null)
    setLoggedIn(false)
  }

  const login = async (username, password) => {
    setError('')
    setLoading(true)
    try {
      await axios.post('_session', {
        username: username,
        password: password
      })
      onLogin()
      return true
    } catch (err) {
      console.error(err)
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setError('')
    try {
      await axios.delete('_session')
    } catch (err) {
      console.error(err)
      return false
    }

    onLogout()
    return true
  }

  return { loggedIn, loading, login, logout, error }
}

export default useAuthentication
