import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { red } from '@material-ui/core/colors'

const EditRecipe = ({ recipe, update, remove, error, close }) => {
  const [name, setName] = React.useState(recipe.name)

  const handleSubmit = async event => {
    event.preventDefault()
    if (await update({ ...recipe, name })) {
      setName('')
    }
  }

  return (
    <Dialog open={true} fullWidth={true} maxWidth={'xs'}>
      <DialogTitle>Edit {recipe.name}
        <IconButton style={{ float: 'right' }} onClick={remove} aria-label="delete" title="Delete">
          <DeleteIcon style={{ color: red[700] }} />
        </IconButton>
      </DialogTitle>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <DialogContent>
          {error && <span style={{ color: 'red' }}>{error}</span>}
          <TextField
            required
            fullWidth
            autoFocus
            label="Name"
            value={name}
            style={{ marginTop: '5px' }}
            onChange={event => setName(event.target.value.toLowerCase())}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditRecipe
