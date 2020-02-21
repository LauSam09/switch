import React from 'react'
import {
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
// import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
// import { red } from '@material-ui/core/colors'

import useRecipes from '../hooks/useRecipes'

const RecipeList = () => {
  const { get, onChange } = useRecipes()
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    get().then(r => {
      setRecipes(r)
      setLoading(false)
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    onChange(_ => {
      get().then(r => setRecipes(r))
    })
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Container maxWidth="sm">
      <div style={{ textAlign: 'right' }}>
        <IconButton
          aria-label="add"
          title="Add"
          href="recipes/new"
        >
          <AddIcon />
        </IconButton>
        {/* <IconButton aria-label="delete" title="Clear selected">
          <DeleteIcon style={{ color: red[700] }} />
        </IconButton> */}
      </div>
      <List>
        {recipes.length > 0 ? (
          recipes.sort((r1, r2) => r2.name < r1.name).map(recipe => {
            return (
              <ListItem key={recipe._id} component={Link} to={`recipes/${recipe.name}`} button>
                <ListItemText primary={recipe.name} />
              </ListItem>
            )
          })
        ) : (
          <span>Nothing added yet!</span>
        )}
      </List>
    </Container>
  )
}

export default RecipeList
