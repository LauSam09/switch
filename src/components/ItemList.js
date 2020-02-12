import React from 'react'
import {
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'

const ItemList = () => {
  const [items, setItems] = React.useState([
    { _id: 'sweetcorn' },
    { _id: 'chocolate' }
  ])
  const [error, setError] = React.useState('')

  const addItem = item => {
    if (items.filter(i => i._id.toLowerCase() === item._id.toLowerCase()).length > 0) {
      setError(`Item '${item._id}' already added.`)
      return false
    }
    setItems([...items, item])
    setError('')
    return true
  }

  return (
    <Container maxWidth="sm">
      <Items items={items} />
      <Input addItem={addItem} error={error} clearError={() => setError('')} />
    </Container>
  )
}

const Items = ({ items }) =>
  <List>
    {items.map(item => {
      return <ListItem key={item._id} dense button>
        <ListItemIcon>
          <Checkbox
            edge="start"
            // checked={item.completed}
            style={{
              color: '#757575',
              backgroundColor: 'inherit'
            }}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={item._id} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            // style={{
            //     backgroundColor: category.color,
            //     color: category.fontColour
            // }}
            // onClick={() => setModalItem(index)}
          >
            <CommentIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    })}
  </List>

const Input = ({ addItem, error, clearError }) => {
  const [value, setValue] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addItem({ _id: value }) && setValue('')
  }

  const handleChange = (event) => {
    error && clearError()
    setValue(event.target.value)
  }

  return <form onSubmit={handleSubmit}>
    {
      error && <span style={{ color: 'red' }}>{error}</span>
    }
    <TextField
      error={Boolean(error)}
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

export default ItemList
