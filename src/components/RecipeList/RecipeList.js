import React from 'react'
import {
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
// import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
// import { red } from '@material-ui/core/colors'

import AddRecipe from './AddRecipe'
import useRecipes from '../../hooks/useRecipes'

const RecipeList = () => {
  const { get, add, onChange } = useRecipes()
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    get()
      .then(r => {
        setRecipes(r)
        setLoading(false)
      })
  // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    onChange(_ => {
      get()
        .then(r => setRecipes(r))
    })
  }, [])

  const handleAdd = async (recipe) => {
    setError('')
    if (recipes.filter(r => r._id === recipe._id).length > 0) {
      setError(`Recipe '${recipe._id}' already added`)
    } else {
      await add(recipe)
      setAddDialogOpen(false)
    }
  }

  if (loading) {
    return <div style={{ textAlign: 'center' }}><CircularProgress /></div>
  }

  return (
    <Container maxWidth="sm">
      <AddRecipe open={addDialogOpen} add={handleAdd} error={error} close={() => setAddDialogOpen(false) }/>
      <div style={{ textAlign: 'right' }}>
        <IconButton aria-label="add" title="Add" onClick={() => setAddDialogOpen(true)} >
          <AddIcon />
        </IconButton>
        {/* <IconButton aria-label="delete" title="Clear selected">
          <DeleteIcon style={{ color: red[700] }} />
        </IconButton> */}
      </div>
      <List>
        {recipes.length > 0
          ? recipes.map(recipe => {
            return <ListItem key={recipe._id} button>
              <ListItemText primary={recipe._id} />
            </ListItem>
          })
          : <span>Nothing added yet!</span>}
      </List>
    </Container>
  )
}

export default RecipeList
