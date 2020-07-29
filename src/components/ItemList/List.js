import React from 'react'
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
import { CATEGORIES } from '../../constants'

const Items = ({ items, toggleComplete, openCategoryPicker }) =>
  <List>
    {items.length > 0
      ? items.map(item => {
        const category = item.category === undefined
          ? CATEGORIES[0]
          : CATEGORIES[item.category]
        return <ListItem key={item._id} onClick={() => openCategoryPicker(item)} dense button>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={item.completed || false}
              onClick={() => toggleComplete(item)}
              style={{
                color: '#757575',
                backgroundColor: 'inherit'
              }}
              tabIndex={-1}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText primary={item.name || item._id} style={{ textDecoration: item.completed ? 'line-through' : '' }} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              style={{
                backgroundColor: category.color,
                color: category.fontColour
              }}
              onClick={() => openCategoryPicker(item)}
            >
              <CommentIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      })
      : <span>Nothing added yet!</span>}
  </List>

export default Items
