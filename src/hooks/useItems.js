import React from 'react'
import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import { BASE_URL } from '../constants'

PouchDB.plugin(PouchDBFind)

export const db = new PouchDB('items', { auto_compaction: true })
export const remoteDb = new PouchDB(`${BASE_URL}/items`)

db.createIndex({
  index: { fields: ['added'] }
})

db.createIndex({
  index: { fields: ['_id', 'name'] }
})

const useItems = () => {
  const [error, setError] = React.useState('')

  const get = async () => {
    return (await db.find({
      selector: {
        added: true
      }
    })).docs.map(item => ({ ...item, name: item.name || item._id }))
  }

  const add = async (item) => {
    const name = item.name.trim()
    item.name = name

    const query = {
      selector: {
        $or: [
          {
            _id: name
          },
          {
            name: name
          }
        ]
      },
      limit: 1
    }

    const existingItems = (await db.find(query)).docs

    if (existingItems.length > 0) {
      console.debug('existing item found')
      let exs = existingItems[0]

      if (exs.added) {
        setError(`Item '${name}' already added.`)
        return false
      } else {
        exs = { ...exs, added: true }
      }

      // v1 - replace with v2.
      if (exs.name === undefined) {
        console.debug('replacing v1')
        await db.remove(exs)
        delete exs._id
        delete exs._rev
        await db.post({ ...exs, name, added: true })
      } else {
        await db.put({ ...exs, added: true })
      }
      return true
    }

    await db.post({ ...item, added: true, category: 0 })
    return true
  }

  const onChange = (handleChange) => {
    db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', handleChange)
  }

  const update = async (item) => {
    item.name = item.name.trim()
    const name = item.name

    const query = {
      selector: {
        $or: [
          {
            _id: name
          },
          {
            name: name
          }
        ]
      }
    }

    const existingItems = (await db.find(query)).docs.filter(i => i._id !== item._id)

    if (existingItems.length > 0) {
      console.debug('removing existing items found with same name')
      existingItems.forEach(async i => {
        await db.remove(i)
      })
    }

    if (item.name === undefined) {
      console.debug('replacing v1')
      await db.remove(item)
      delete item._id
      delete item._rev
      await db.post({ ...item, name })
      return
    }

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
