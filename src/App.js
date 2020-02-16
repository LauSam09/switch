import React from 'react'
import { Container, Paper } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

import NavBar from './components/NavBar'
import ItemList from './components/ItemList/ItemList'
import RecipeList from './components/RecipeList/RecipeList'
import Login from './components/Login'
import AuthenticationContextProvider from './contexts/AuthenticationContext'
import NotFound from './components/NotFound'

const App = () => <>
  <Router>
    <AuthenticationContextProvider>
      <NavBar />
      <Container maxWidth="lg">
        <Paper variant="outlined" className="content-container">
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/'>
              <ItemList />
            </Route>
            <Route path='/recipes'>
              <RecipeList />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Paper>
      </Container>
    </AuthenticationContextProvider>
  </Router>
</>

export default App
