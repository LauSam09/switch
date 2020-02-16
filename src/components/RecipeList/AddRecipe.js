import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'

const AddRecipe = ({ open, add, error, close }) => {
  const [name, setName] = React.useState('')

  const handleSubmit = event => {
    event.preventDefault()
    add({ _id: name })
  }

  return <Dialog open={open}
    fullWidth={true}
    maxWidth={'xs'}>
    <DialogTitle>Add a recipe</DialogTitle>
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <DialogContent>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        <TextField
          required
          fullWidth
          autoFocus
          label="Name"
          value={name}
          onChange={event => setName(event.target.value.toLowerCase())}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={close}>
            Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" >
              Save
        </Button>
      </DialogActions>
    </form>
  </Dialog>
}

export default AddRecipe
