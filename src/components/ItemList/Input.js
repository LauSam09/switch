import React from 'react'
import {
  TextField
} from '@material-ui/core'

const Input = ({ addItem, error }) => {
  const [value, setValue] = React.useState('')
  const [displayError, setDisplayError] = React.useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    await addItem({ _id: value })
      ? setValue('')
      : setDisplayError(true)
  }

  const handleChange = (event) => {
    displayError && setDisplayError(false)
    setValue(event.target.value)
  }

  return <form onSubmit={handleSubmit}>
    {
      error && displayError && <span style={{ color: 'red' }}>{error}</span>
    }
    <TextField
      error={Boolean(error) && displayError}
      autoCapitalize="off"
      autoFocus={false}
      fullWidth
      label="Add an item..."
      value={value}
      onChange={handleChange}
      margin="normal"
    />
  </form>
}

export default Input
