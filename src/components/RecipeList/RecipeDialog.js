// Libraries
import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import { DAYS } from '../../constants'

const RecipeDialog = ({ recipe: initialRecipe, update, onClose }) => {
  const [recipe, setRecipe] = React.useState(initialRecipe)

  const handleChange = event => {
    setRecipe({ ...recipe, day: +event.target.value })
  }

  const handleClose = async () => {
    if (!await update(recipe)) {
      console.error('something went wrong updating')
    }
    onClose()
  }

  React.useEffect(() => {
    if (recipe.day !== initialRecipe.day) {
      handleClose()
    }
    // eslint-disable-next-line
  }, [recipe, initialRecipe])

  return (<Dialog open={true} onClose={handleClose}>
    <DialogTitle style={{ padding: '20px 15px' }}>
      {recipe.name}
      <IconButton edge="end"
        aria-label="edit"
        component={Link}
        to={`recipes/${recipe.name}`}
        style={{ float: 'right', marginRight: '-12px', marginTop: '-12px' }}
        title="Edit">
        <EditIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent style={{ padding: '8px 15px' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Day</FormLabel>
        <RadioGroup aria-label="position" name="position" value={typeof recipe.day === 'number' ? recipe.day : null} onChange={handleChange} row>
          {DAYS.map((day, index) => (<FormControlLabel
            key={index}
            value={index}
            style={{ margin: 0 }}
            control={<Radio color="primary" size="small" />}
            label={day[0]}
            labelPlacement="bottom"
            title={day}
          />))}
        </RadioGroup>
      </FormControl>
      {recipe.url &&
            <FormControl style={{ margin: '15px 0' }}>
              <FormLabel style={{ marginBottom: '5px' }}>Recipe Url</FormLabel>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>{recipe.url}</a>
            </FormControl>
      }

    </DialogContent>
  </Dialog>)
}

export default RecipeDialog
