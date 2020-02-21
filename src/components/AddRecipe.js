import React from 'react'
import useRecipes from '../hooks/useRecipes'
import {
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const AddRecipe = () => {
  const { add, get, onChange } = useRecipes()
  const [name, setName] = React.useState('')
  const [error, setError] = React.useState('')
  const [recipes, setRecipes] = React.useState('')
  const history = useHistory()

  React.useEffect(() => {
    get().then(r => {
      setRecipes(r)
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    onChange(_ => {
      get().then(r => setRecipes(r))
    })
    // eslint-disable-next-line
  }, [])

  const handleNameChange = (value) => {
    setName(value)
    if (recipes.filter(r => r.name === value).length > 0) {
      setError('Name taken')
    } else {
      error && setError('')
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (await add({ name })) {
      history.push('/recipes')
    }
  }

  return <Container maxWidth="sm">
    <Typography variant="h4">New Recipe</Typography>
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <TextField
        required
        fullWidth
        autoFocus
        label="Name"
        value={name}
        onChange={event => handleNameChange(event.target.value.toLowerCase())}
      />
      <div style={{ textAlign: 'right', margin: '10px 0' }}>
        <Button color="primary" href="/recipes">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={Boolean(error)}>
          Save
        </Button>
      </div>
    </form>
  </Container>
}

export default AddRecipe
