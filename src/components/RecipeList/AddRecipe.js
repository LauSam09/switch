import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core'

const AddRecipe = ({ open, add, error, close }) => {
  const [name, setName] = React.useState('')

  const handleSubmit = event => {
    event.preventDefault()
    add(name)
  }

  return <Dialog open={open}
    fullWidth={true}
    maxWidth={'xs'}>
    <DialogTitle>Add a recipe</DialogTitle>
    <DialogContent>
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          autoFocus
          label="Name"
          value={name}
          onChange={event => setName(event.target.value.toLowerCase())}
        />
        <Button fullWidth type="submit" variant="contained" color="primary" size="large" style={{ marginTop: '15px' }}>
              Save
        </Button>
      </form>
    </DialogContent>
  </Dialog>
}

export default AddRecipe
