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

const Items = ({ items, toggleComplete }) =>
  <List>
    {items.length > 0
      ? items.map(item => {
        return <ListItem key={item._id} onClick={() => toggleComplete(item)} dense button>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={item.completed || false}
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

export default Items
