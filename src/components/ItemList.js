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

import useItems from '../hooks/useItems'

const ItemList = () => {
  const { get, add, error, onChange } = useItems()

  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    get()
      .then(i => setItems(i))
  }, [get])

  React.useEffect(() => {
    onChange(change => {
      const newItems = items.filter(i => i._id !== change.id)
      if (!change.deleted) {
        newItems.push(change.doc)
      }
      setItems(newItems)
    })
  })

  return (
    <Container maxWidth="sm">
      <Items items={items} />
      <Input addItem={add} error={error} />
    </Container>
  )
}

const Items = ({ items }) =>
  <List>
    {items.length > 0
      ? items.map(item => {
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
      })
      : <span>Nothing added yet!</span>}
  </List>

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

export default ItemList
