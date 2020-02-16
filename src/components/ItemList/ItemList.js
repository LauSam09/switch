import React from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { red } from '@material-ui/core/colors'

import List from './List'
import Input from './Input'

import useItems from '../../hooks/useItems'
import CategoryPicker from './CategoryPicker'

const ItemList = () => {
  const { get, add, update, bulkUpdate, error, onChange } = useItems()
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [categoryItem, setCategoryItem] = React.useState(null)
  const inputRef = React.useRef()

  React.useEffect(() => {
    get()
      .then(i => {
        setItems(i)
        setLoading(false)
      })
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

  const changeCategory = (category) => {
    update({ ...categoryItem, category })
    setCategoryItem(null)
  }

  if (loading) {
    return <div style={{ textAlign: 'center' }}><CircularProgress /></div>
  }

  return (
    <Container maxWidth="sm">
      {categoryItem && <CategoryPicker name={categoryItem._id}
        initialCategory={categoryItem.category || 0}
        selectCategory={changeCategory}
      />}
      <div style={{ textAlign: 'right' }}>
        <IconButton aria-label="add" onClick={focusInput} title="Add" >
          <AddIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={clear} title="Clear completed">
          <DeleteIcon style={{ color: red[700] }} />
        </IconButton>
      </div>
      <List items={items.sort((item1, item2) => item1.category - item2.category)}
        toggleComplete={(item) => update({ ...item, completed: !item.completed })}
        openCategoryPicker={(item) => setCategoryItem(item)} />
      <Input addItem={add} error={error} ref={inputRef} />
    </Container>
  )
}

export default ItemList
