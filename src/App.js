import React from 'react'
import { Container, Paper } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import ItemList from './components/ItemList/ItemList'
import RecipeList from './components/RecipeList/RecipeList'
import AddRecipe from './components/AddRecipe'
import Login from './components/Login'
import AuthenticationContextProvider from './contexts/AuthenticationContext'
import NotFound from './components/NotFound'
import EditRecipe from './components/EditRecipe'

import './App.css'

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
            <Route exact path='/recipes'>
              <RecipeList />
            </Route>
            <Route exact path='/recipes/new'>
              <AddRecipe />
            </Route>
            <Route exact path='/recipes/:id'>
              <EditRecipe />
            </Route>
            <Route exact path='/'>
              <ItemList />
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
