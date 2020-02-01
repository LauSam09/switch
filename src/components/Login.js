import React from 'react'
import { Button } from '@material-ui/core'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

const Login = () => {
  const context = React.useContext(AuthenticationContext)

  React.useEffect(() => {
    // Logout on initial visit to page if logged in.
    context.loggedIn && context.logout()
  }, [])

  return <>
    <div>Login Placeholder
    </div>
    <Button onClick={() => context.login('', '')} color="primary" variant="contained" style={{ marginTop: '10px' }}>Login</Button></>
}

export default Login
