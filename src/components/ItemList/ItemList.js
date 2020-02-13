import React from 'react'
import { Container } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { red } from '@material-ui/core/colors'

import List from './List'
import Input from './Input'

import useItems from '../../hooks/useItems'

const ItemList = () => {
  const { get, add, update, bulkUpdate, error, onChange } = useItems()
  const [items, setItems] = React.useState([])
  const inputRef = React.useRef()

  React.useEffect(() => {
    get()
      .then(i => setItems(i))
  // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    onChange((_) => {
      get()
        .then(i => setItems(i))
    })
  // eslint-disable-next-line
  }, [])

  const focusInput = () => {
    inputRef.current.scrollIntoView({ behaviour: 'smooth' })
    inputRef.current.focus()
  }

  const clear = async () => {
    await bulkUpdate(items.filter(i => i.completed).map(c => ({ ...c, completed: false, added: false })))
  }

  return (
    <Container maxWidth="sm">
      <div style={{ textAlign: 'right' }}>
        <IconButton aria-label="add" onClick={focusInput} >
          <AddIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={clear}>
          <DeleteIcon style={{ color: red[700] }} />
        </IconButton>
      </div>
      <List items={items} toggleComplete={(item) => update({ ...item, completed: !item.completed })} />
      <Input addItem={add} error={error} ref={inputRef} />
    </Container>
  )
}

export default ItemList
