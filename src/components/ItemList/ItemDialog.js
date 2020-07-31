import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, List, ListItem, ListItemText, TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'

import { CATEGORIES } from '../../constants'

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'inline-block'
  },
  actions: {
    float: 'right',
    margin: '5px 5px 0 0'
  },
  input: {
    width: '90%',
    margin: 'auto'
  },
  save: {
    color: theme.palette.primary.light
  }
}))

const ItemDialog = ({ initialName, initialCategory, update, cancel }) => {
  const classes = useStyles()
  const [name, setName] = React.useState(initialName)
  const [itemCategory, setItemCategory] = React.useState(initialCategory)

  const onSubmit = (event) => {
    event && event.preventDefault()
    update(name, itemCategory)
  }

  return (<Dialog open={true}
    onClose={cancel}
    maxWidth={'sm'}
  >
    <div>
      <DialogTitle className={classes.title}>Update {initialName}</DialogTitle>
      <IconButton
        aria-label="save"
        className={classes.actions}
        title="Save"
        onClick={onSubmit}
      >
        <SaveIcon className={classes.save} />
      </IconButton>
    </div>
    <form onSubmit={onSubmit}
      className={classes.input}>
      <TextField
        fullWidth
        autoFocus
        label="Name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </form>
    <List>
      {CATEGORIES.map((category, index) => (
        <ListItem
          divider
          button
          key={index}
          selected={index === itemCategory}
          onClick={() => update(name, index) }
        >
          <ListItemText
            style={{
              backgroundColor: category.color
            }}
          >
            <span
              className="title"
              style={{
                color: 'white',
                padding: '5px 10px'
              }}
            >
              {category.name}
            </span>
          </ListItemText>
        </ListItem>

      ))}
    </List>
  </Dialog>)
}

export default ItemDialog
