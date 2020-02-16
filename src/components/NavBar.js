import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Container, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

const NavBar = () => {
  const context = React.useContext(AuthenticationContext)
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null)
  const open = Boolean(profileAnchorEl)
  const [mainAnchorEl, setMainAnchorEl] = React.useState(null)
  const mainOpen = Boolean(mainAnchorEl)

  const handleProfileMenu = event => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleMainMenu = event => {
    setMainAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setProfileAnchorEl(null)
  }

  const handleMainClose = () => {
    setMainAnchorEl(null)
  }

  return <AppBar position="sticky" color="primary">
    <Container maxWidth="lg">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMainMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={mainAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={mainOpen}
          onClose={handleMainClose}
        >
          <MenuItem component={Link} to="/" onClick={handleMainClose}>Items</MenuItem>
          <MenuItem component={Link} to="/recipes" onClick={handleMainClose}>Recipes</MenuItem>
        </Menu>
        <Link to="/" style={{ flexGrow: 1 }}>
          <Typography variant="h6">Switch</Typography>
        </Link>
        {context.loggedIn ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={profileAnchorEl}
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
              onClose={handleProfileClose}
            >
              {/* <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem> */}
              <MenuItem component={Link} to="/login" onClick={handleProfileClose}>Logout</MenuItem>
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
