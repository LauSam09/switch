import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Container, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

const NavBar = () => {
  const context = React.useContext(AuthenticationContext)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return <AppBar position="sticky" color="primary">
    <Container maxWidth="lg">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Link to="/" style={{ flexGrow: 1 }}>
          <Typography variant="h6">Switch</Typography>
        </Link>
        {context.loggedIn ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component="a" href="/profile" onClick={handleClose}>Profile</MenuItem>
              <MenuItem component="a" href="/login" onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        )
          : <Link to="/login">
            <Typography variant="button">Login</Typography>
          </Link>}
      </Toolbar>
    </Container>
  </AppBar>
}

export default NavBar
