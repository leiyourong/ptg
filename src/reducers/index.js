// import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import {DELETE_ITEM, ADD_ITEM, GET_ITEM, EDIT_ITEM, GET_AUTHOR, SET_AUTHOR} from '../constants/index';

// import Immutable from 'immutable';
/**
 * 不用 immutable 是因为：要嘛频繁用 fromJS 跟 toJS 影响效率。
 * 或者就必须接收 state 为一个 Immutable.map，那么取值就要用 state.get('xxx') 
 * -.- 有点麻烦 
 */
const initState = {
  books: [],
  author: 'nobody'
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
    case GET_AUTHOR:
      return Object.assign({}, state, { author: payload.data })
    case SET_AUTHOR:
      return Object.assign({}, state, { author: payload.data })
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
