// Libraries
import React from 'react'
import {
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'
import { makeStyles } from '@material-ui/core/styles'

import RecipeDialog from './RecipeDialog'
import useRecipes from '../../hooks/useRecipes'
import { DAYS } from '../../constants'

const useStyles = makeStyles((theme) => ({
  loading: {
    textAlign: 'center'
  },
  actions: {
    textAlign: 'right'
  },
  delete: {
    color: theme.palette.warning.light
  },
  dayChip: {
    marginRight: '5px'
  },
  label: {
    overflow: 'hidden'
  }
}))

const RecipeList = () => {
  const classes = useStyles()
  const { get, update, bulkUpdate, onChange } = useRecipes()
  const [recipes, setRecipes] = React.useState([])
  const [selectedRecipe, setSelectedRecipe] = React.useState(null)
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

  const handleUntagDay = async (recipe) => {
    const updatedRecipe = { ...recipe }
    delete updatedRecipe.day
    await update(updatedRecipe)
  }

  const handleClearDays = async () => {
    const recipesWithDay = recipes.filter(r => typeof r.day === 'number')
    const updatedRecipes = recipesWithDay.map(r => {
      const updatedRecipe = { ...r }
      delete updatedRecipe.day
      return updatedRecipe
    })
    await bulkUpdate(updatedRecipes)
  }

  const sortRecipes = (recipe1, recipe2) => {
    // first recipe has a day
    if (typeof recipe1.day === 'number') {
      if (typeof recipe2.day === 'number') {
        // same day then sort by name
        if (recipe1.day === recipe2.day) {
          return recipe1.name > recipe2.name
        }
        // otherwise sort by day
        return recipe1.day > recipe2.day
          ? 1
          : -1
      }
      // second recipe does not have a day, it is lower in the sort.
      return -1
    } else if (typeof recipe2.day === 'number') {
      // second recipe has a day then it is higher in the sort.
      return 1
    } else {
      // neither recipe has a day then evaluate by name
      return recipe1.name > recipe2.name
        ? 1
        : -1
    }
  }

  const handleDownload = () => {
    const json = JSON.stringify(recipes.map(recipe => ({ name: recipe.name, url: recipe.url })))
    const url = window.URL.createObjectURL(new Blob([json], { type: 'text/json' }))
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'switch-recipes.json'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Container maxWidth="sm">
      {selectedRecipe && <RecipeDialog recipe={selectedRecipe}
        update={update}
        onClose={() => setSelectedRecipe(null)} />}
      <div className={classes.actions}>
        <IconButton
          aria-label="add"
          title="Add"
          href="recipes/new"
        >
          <AddIcon />
        </IconButton>
        <IconButton aria-label="delete" title="Clear days" onClick={handleClearDays}>
          <DeleteIcon className={classes.delete} />
        </IconButton>
        <IconButton aria-label="download" title="Download" onClick={handleDownload}>
          <GetAppIcon />
        </IconButton>
      </div>
      <List>
        {recipes.length > 0 ? (
          recipes.sort(sortRecipes).map(recipe => {
            return (
              <ListItem key={recipe._id} onClick={() => setSelectedRecipe(recipe)} button>
                {typeof recipe.day === 'number' &&
                  <Chip
                    label={DAYS[recipe.day].slice(0, 3).toUpperCase()}
                    onDelete={() => handleUntagDay(recipe)}
                    className={classes.dayChip} />}
                <ListItemText primary={recipe.name}
                  component={Link}
                  to={`recipes/${recipe.name}`}
                  className={classes.label}
                  primaryTypographyProps={{ noWrap: true }} />
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
