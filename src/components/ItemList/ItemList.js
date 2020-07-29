import React from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

import List from './List'
import Input from './Input'

import useItems from '../../hooks/useItems'
import CategoryPicker from './CategoryPicker'

const useStyles = makeStyles((theme) => ({
  actions: {
    textAlign: 'right'
  },
  delete: {
    color: theme.palette.error.light
  }
}))

const ItemList = () => {
  const classes = useStyles()
  const { get, add, update, bulkUpdate, error, onChange } = useItems()
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [selectedItem, setSelectedItem] = React.useState(null)
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
    onChange(_ => {
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

  const updateItem = (name, category) => {
    update({ ...selectedItem, name, category })
    setSelectedItem(null)
  }

  if (loading) {
    return <div style={{ textAlign: 'center' }}><CircularProgress /></div>
  }

  return (
    <Container maxWidth="sm">
      {
        selectedItem &&
          <CategoryPicker
            initialName={selectedItem.name || selectedItem._id}
            initialCategory={selectedItem.category || 0}
            update={updateItem}
            cancel={() => setSelectedItem(null)}
          />
      }
      <div className={classes.actions}>
        <IconButton aria-label="add" onClick={focusInput} title="Add" >
          <AddIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={clear} title="Clear completed">
          <DeleteIcon className={classes.delete} />
        </IconButton>
      </div>
      <List items={items.sort((item1, item2) => item1.category - item2.category)}
        toggleComplete={(item) => update({ ...item, completed: !item.completed })}
        openCategoryPicker={(item) => setSelectedItem(item)} />
      <Input addItem={add} error={error} ref={inputRef} />
    </Container>
  )
}

export default ItemList
