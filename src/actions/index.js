export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const GET_ITEM = 'GET_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'
import { createActions } from 'redux-actions'
import { deleteBooks, editBook } from '../services/index'

const { deleteItem, getItem, addItem, editItem } = createActions({
  DELETE_ITEM: payload => deleteBooks(payload),
  EDIT_ITEM: payload => editBook(payload)
})

module.exports = {
  deleteItem,
  getItem: () => ({ type: 'GET_ITEM_REQUEST' }),
  addItem: payload => ({ type: 'ADD_ITEM_REQUEST', ...payload }),
  editItem
}
