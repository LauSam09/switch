import React from 'react'
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core'
import { CATEGORIES } from '../../constants'

const CategoryPicker = ({ name, initialCategory, selectCategory }) => {
  return (<Dialog open={true}
    onClose={() => selectCategory(initialCategory)}
    fullWidth={true}
    maxWidth={'xs'}>
    <DialogTitle>Set category for {name}</DialogTitle>
    <List>
      {CATEGORIES.map((category, index) => (
        <ListItem
          button
          key={index}
          selected={index === initialCategory}
          onClick={() => selectCategory(index)}
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

export default CategoryPicker
