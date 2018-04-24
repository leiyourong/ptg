export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const GET_ITEM = 'GET_ITEM'
import { createActions } from 'redux-actions'
import { getBooks, deleteBooks, addBook } from '../services/index'

const { deleteItem, getItem, addItem } = createActions({
  DELETE_ITEM: payload => deleteBooks(payload),
  GET_ITEM: () => getBooks(),
  ADD_ITEM: payload => addBook(payload)
})

module.exports = {
  deleteItem,
  getItem,
  addItem
}
// export const deleteItem = createAction(DELETE_ITEM, payload => deleteBooks(payload))
// export const getItem = createAction(GET_ITEM, () => getBooks())
// export const addItem = createAction(ADD_ITEM, payload => addBook(payload))
