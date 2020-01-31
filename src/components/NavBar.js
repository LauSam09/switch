import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

const NavBar = () => (
  <AppBar position="sticky">
    <Container maxWidth="lg">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Link to="/">
          <Typography variant="h6">Switch</Typography>
        </Link>
      </Toolbar>
    </Container>
  </AppBar>
)

export default NavBar
