import { createActions } from 'redux-actions'
import { getBooks, deleteBooks, addBook, editBook } from '../services/index'
export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const GET_ITEM = 'GET_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'

const { deleteItem, getItem, addItem, editItem } = createActions({
  DELETE_ITEM: payload => deleteBooks(payload),
  GET_ITEM: () => getBooks(),
  ADD_ITEM: payload => addBook(payload),
  EDIT_ITEM: payload => editBook(payload)
})

export default {
  deleteItem,
  getItem,
  addItem,
  editItem
}
