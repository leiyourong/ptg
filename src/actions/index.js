export const DELETE_ITEM = 'DELETE_ITEM'
export const DELETE_ITEM_SUC = 'DELETE_ITEM_SUC'
export const DELETE_ITEM_FAIL = 'DELETE_ITEM_FAIL'
export const ADD_ITEM = 'ADD_ITEM'
export const ADD_ITEM_SUC = 'ADD_ITEM_SUC'
export const ADD_ITEM_FAIL = 'ADD_ITEM_FAIL'
export const GET_ITEM = 'GET_ITEM'
export const GET_ITEM_SUC = 'GET_ITEM_SUC'
export const GET_ITEM_FAIL = 'GET_ITEM_FAIL'
import { createAction } from 'redux-actions'
import { getBooks, deleteBooks, addBook } from '../services/index'

export const deleteItem = createAction(DELETE_ITEM, payload => {
  return deleteBooks(payload).then(data => ({
    type: DELETE_ITEM_SUC,
    data
  })).catch(data => ({
    type: DELETE_ITEM_FAIL,
    data
  }))
})

export const getItem = createAction(GET_ITEM, payload => {
  return getBooks().then(data => ({
    type: GET_ITEM_SUC,
    data
  })).catch(data => ({
    type: GET_ITEM_FAIL,
    data
  }))
})

export const addItem = createAction(ADD_ITEM, payload => {
  return addBook(payload).then(data => ({
    type: ADD_ITEM_SUC,
    data
  })).catch(data => ({
    type: ADD_ITEM_FAIL,
    data
  }))
})
