import PouchDB from 'pouchdb-browser'
import { BASE_URL } from '../constants'

export const db = new PouchDB('recipes')
export const remoteDb = new PouchDB(`${BASE_URL}/recipes`)

const useItems = () => {
  const get = async () =>
    (await db.allDocs({ include_docs: true })).rows.map(row => row.doc)

  const add = async recipe => {
    recipe.name = recipe.name.toLowerCase().trim()
    recipe.url = recipe.url.trim()
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

  const update = async recipe => {
    recipe.name = recipe.name.toLowerCase().trim()
    recipe.url = recipe.url && recipe.url.trim()
    try {
      await db.put(recipe)
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
