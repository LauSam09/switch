import React from 'react'
import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import { REMOTE_DATABASE } from '../constants'

PouchDB.plugin(PouchDBFind)

export const db = new PouchDB('items')
export const remoteDb = new PouchDB(`${REMOTE_DATABASE}/items`)

db.createIndex({
  index: { fields: ['added'] }
})

const useItems = () => {
  const [error, setError] = React.useState('')

  const get = async () => {
    return (await db.find({
      selector: {
        added: true
      }
    })).docs
  }

  const add = async (item) => {
    try {
      const existing = await db.get(item._id)
      if (existing.added) {
        setError(`Item '${item._id}' already added.`)
        return false
      } else {
        await db.put({ ...existing, added: true })
        return true
      }
    } catch (err) {
      await db.put({ ...item, added: true, category: 0 })
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
      console.error(err)
    }
  }

  const bulkUpdate = async (items) => {
    try {
      await db.bulkDocs(items)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    get,
    add,
    update,
    bulkUpdate,
    error,
    onChange
  }
}

export default useItems
