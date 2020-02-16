import React from 'react'
import { Button, TextField, Typography, Container } from '@material-ui/core'
import { AuthenticationContext } from '../contexts/AuthenticationContext'
import useQuery from '../hooks/useQuery'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const context = React.useContext(AuthenticationContext)
  const history = useHistory()
  const queryParams = useQuery()
  const returnUrl = queryParams.get('returnUrl') || '/'
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { loggedIn, login, logout, error } = context

  React.useEffect(() => {
    // Logout on initial visit to page if logged in.
    loggedIn && logout()
    // eslint-disable-next-line
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    if (await login(username, password)) {
      history.push(returnUrl)
    }
  }

  return <Container maxWidth="sm">
    <Typography variant="h2" gutterBottom>
        Log in
    </Typography>
    {error && <Typography variant="body1" style={{ color: 'red' }}>{error}</Typography>}
    <form onSubmit={handleLogin}
      style={{ display: 'flex', flexDirection: 'column' }}
      autoComplete="off"
      noValidate>
      <TextField
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        label="Username"
        type="text"
        variant="outlined"
        margin="normal"
      />
      <TextField
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" size="large" style={{ marginTop: '15px' }}>
        Login
      </Button>
    </form>
  </Container>
}

export default Login
