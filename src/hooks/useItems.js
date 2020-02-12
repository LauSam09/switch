import React from 'react'
import PouchDB from 'pouchdb-browser'

const useItems = () => {
  const [error, setError] = React.useState('')
  const db = new PouchDB('items')

  const get = async () => {
    const response = await db.allDocs({
      include_docs: true
    })
    return response.rows.map(row => row.doc)
  }

  const add = async (item) => {
    try {
      await db.get(item._id)
      setError(`Item '${item._id}' already added.`)
      return false
    } catch (err) {
      await db.put(item)
      return true
    }
  }

  return {
    get,
    add,
    error
  }
}

export default useItems
