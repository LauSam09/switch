import React from 'react'
import {
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { red } from '@material-ui/core/colors'

import AddRecipe from './AddRecipe'

const RecipeList = () => {
  const loading = false
  const recipes = [
    { _id: 'macaroni cheese' },
    { _id: 'lasagne' }
  ]
  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const [error, setError] = React.useState('')

  const add = (id) => {
    setError('')
    if (recipes.filter(recipe => recipe._id === id).length > 0) {
      setError(`Recipe '${id}' already added`)
    } else {
      recipes.push({ _id: id })
      setAddDialogOpen(false)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center' }}><CircularProgress /></div>
  }

  return (
    <Container maxWidth="sm">
      <AddRecipe open={addDialogOpen} add={add} error={error} />
      <div style={{ textAlign: 'right' }}>
        <IconButton aria-label="add" title="Add" onClick={() => setAddDialogOpen(true)} >
          <AddIcon />
        </IconButton>
        <IconButton aria-label="delete" title="Clear selected">
          <DeleteIcon style={{ color: red[700] }} />
        </IconButton>
      </div>
      <List>
        {recipes.length > 0
          ? recipes.map(recipe => {
            return <ListItem key={recipe._id} dense button>
              <ListItemText primary={recipe._id} />
            </ListItem>
          })
          : <span>Nothing added yet!</span>}
      </List>
    </Container>
  )
}

export default RecipeList
