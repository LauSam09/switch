import React from 'react'
import { Container } from '@material-ui/core'

import List from './List'
import Input from './Input'

import useItems from '../../hooks/useItems'

const ItemList = () => {
  const { get, add, update, error, onChange } = useItems()

  const [items, setItems] = React.useState([])

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

  return (
    <Container maxWidth="sm">
      <List items={items} toggleComplete={(item) => update({ ...item, completed: !item.completed })} />
      <Input addItem={add} error={error} />
    </Container>
  )
}

export default ItemList
