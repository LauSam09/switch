import React from 'react'
import PouchDB from 'pouchdb-browser'
import { REMOTE_DATABASE } from '../constants'

export const db = new PouchDB('items')
export const remoteDb = new PouchDB(`${REMOTE_DATABASE}/items`)

const useItems = () => {
  const [error, setError] = React.useState('')

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

  const onChange = (handleChange) => {
    db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', handleChange)
  }

  const update = async (item) => {
    try {
      await db.put(item)
    } catch (err) {
      console.err(err)
    }
  }

  return {
    get,
    add,
    update,
    error,
    onChange
  }
}

export default useItems
