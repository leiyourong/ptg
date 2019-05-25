// import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import {DELETE_ITEM, ADD_ITEM, GET_ITEM, EDIT_ITEM} from '../constants/index';

import Immutable from 'immutable';
const initState = {
  books: []
}

const items = (state = initState, payload) => {
  let books
  switch (payload.type) {
    case GET_ITEM: 
      books = payload.data.items;
      return Object.assign({}, state, { books });
    case ADD_ITEM: 
      return Object.assign({}, state, { books: [ ...state.books, payload.data ] })
    case DELETE_ITEM: 
      books = state.books.filter(book => (book.id !== payload.data.id))
      return Object.assign({}, state, { books })
    case EDIT_ITEM: 
      const { id, name, price } = payload.data
      books = state.books.map(book => {
        if (book.id === id) {
          Object.assign(book, { name, price })
        }
        return book
      })
      return Object.assign({}, state, { books })
  }
  return state;
}
// const items = handleActions({
//   DELETE_ITEM: (state, action) => {
//     let books = state.books
//     books = books.filter(book => (book.id !== action.payload.id))
//     return Object.assign({}, state, { books })
//   },
//   GET_ITEM: (state, action) => {
//     let books = action.payload.items
//     return Object.assign({}, state, { books })
//   },
//   ADD_ITEM: (state, action) => {
//     return Object.assign({}, state, { books: [ ...state.books, action.payload ] })
//   },
//   EDIT_ITEM: (state, action) => {
//     let books = state.books
//     const { id, name, price } = action.payload
//     books = books.map(book => {
//       if (book.id === id) {
//         Object.assign(book, { name, price })
//       }
//       return book
//     })
//     return Object.assign({}, state, { books })
//   }
// }, initState)

export default combineReducers({
  items
})
