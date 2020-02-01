import React from 'react'
import { Container, Paper } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

import NavBar from './components/NavBar'
import ItemList from './components/ItemList'
import Login from './components/Login'
import AuthenticationContextProvider from './contexts/AuthenticationContext'

const App = () => <>
  <AuthenticationContextProvider>
    <Router>
      <NavBar />
      <Container maxWidth="lg">
        <Paper variant="outlined" className="content-container">
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/'>
              <ItemList />
            </Route>
          </Switch>
        </Paper>
      </Container>
    </Router>
  </AuthenticationContextProvider>
</>

export default App
