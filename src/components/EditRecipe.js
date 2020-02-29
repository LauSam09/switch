import React from 'react'
import useRecipes from '../hooks/useRecipes'
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography
} from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { red } from '@material-ui/core/colors'

const EditRecipe = () => {
  const { id } = useParams()
  const { update, get, remove, onChange } = useRecipes()
  const [error, setError] = React.useState('')
  const [nameError, setNameError] = React.useState('')
  const [recipe, setRecipe] = React.useState(null)
  const [recipes, setRecipes] = React.useState('')
  const history = useHistory()

  React.useEffect(() => {
    get().then(r => {
      setRecipes(r)
      const matchingRecipes = r.filter(r => r.name === id.toLowerCase())
      if (matchingRecipes.length === 1) {
        setRecipe(matchingRecipes[0])
      } else {
        setError('Recipe not found')
      }
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    onChange(_ => {
      get().then(r => setRecipes(r))
    })
    // eslint-disable-next-line
  }, [])

  const handleNameChange = (name) => {
    setRecipe({ ...recipe, name })
    if (recipes.filter(r => r.name === name && r._id !== recipe._id).length > 0) {
      setNameError('Name taken')
    } else {
      nameError && setNameError('')
    }
  }

  const handleRecipeUrlChange = (url) => {
    setRecipe({ ...recipe, url })
  }

  const handleRemove = async () => {
    try {
      await remove(recipe)
      history.push('/recipes')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (await update(recipe)) {
      history.push('/recipes')
    }
  }

  return <Container maxWidth="sm">
    <Typography variant="h4" style={{ marginBottom: '10px' }}>
      Edit Recipe
      {recipe && <IconButton style={{ float: 'right' }} onClick={handleRemove} aria-label="delete" title="Delete">
        <DeleteIcon style={{ color: red[700] }} />
      </IconButton>}
    </Typography>
    {
      recipe
        ? <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
          <TextField
            required
            fullWidth
            autoFocus
            label="Name"
            value={recipe.name}
            onChange={event => handleNameChange(event.target.value.toLowerCase())}
          />
          <TextField
            fullWidth
            label="Recipe Url"
            value={recipe.url}
            onChange={event => handleRecipeUrlChange(event.target.value)}
          />
          <div style={{ textAlign: 'right', margin: '10px 0' }}>
            <Button color="primary" href="/recipes">
            Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={Boolean(nameError)}>
            Save
            </Button>
          </div>
        </form>
        : error ? <Typography>{error}</Typography>
          : <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
    }

  </Container>
}

export default EditRecipe
