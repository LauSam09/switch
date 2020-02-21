import PouchDB from 'pouchdb-browser'
import { REMOTE_DATABASE } from '../constants'

export const db = new PouchDB('recipes')
export const remoteDb = new PouchDB(`${REMOTE_DATABASE}/recipes`)

const useItems = () => {
  const get = async () =>
    (await db.allDocs({ include_docs: true })).rows.map(row => row.doc)

  const add = async recipe => {
    try {
      await db.post(recipe)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const onChange = handleChange => {
    db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', handleChange)
  }

  const update = async item => {
    try {
      await db.put(item)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const bulkUpdate = async recipes => {
    try {
      await db.bulkDocs(recipes)
    } catch (err) {
      console.error(err)
    }
  }

  const remove = async recipe => {
    try {
      await db.remove(recipe)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    get,
    add,
    update,
    bulkUpdate,
    remove,
    onChange
  }
}

export default useItems
