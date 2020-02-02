import React from 'react'
import { Button } from '@material-ui/core'
import { AuthenticationContext } from '../contexts/AuthenticationContext'
import useQuery from '../hooks/useQuery'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const context = React.useContext(AuthenticationContext)
  const history = useHistory()
  const queryParams = useQuery()
  const returnUrl = queryParams.get('returnUrl') || '/'

  React.useEffect(() => {
    // Logout on initial visit to page if logged in.
    context.loggedIn && context.logout()
    // eslint-disable-next-line
  }, [])

  const handleLogin = async () => {
    if (await context.login('admin', 'admin')) {
      history.push(returnUrl)
    }
  }

  return <>
    <div>Login Placeholder
    </div>
    <Button onClick={handleLogin} color="primary" variant="contained" style={{ marginTop: '10px' }}>Login</Button></>
}

export default Login
