import { DELETE_ITEM, DELETE_ITEM_SUC, DELETE_ITEM_FAIL, GET_ITEM, GET_ITEM_SUC, GET_ITEM_FAIL  } from '../actions/index'
import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const initState = {
  books: []
}

const items = handleActions({
  DELETE_ITEM: (state, action) => {
    let books = state.books
    books = books.filter(book => (book.id !== action.payload.data.id))
    return Object.assign({}, state, { books })
  },
  GET_ITEM: (state, action) => {
    let books = action.payload.data.items
    return Object.assign({}, state, { books })
  },
  ADD_ITEM: (state, action) => {
    return Object.assign({}, state, { books: [ ...state.books, action.payload.data] })
  }
}, initState)
// function items(state = initState, action) {
//   switch (action.type) {
//     case DELETE_ITEM_FAIL:
//       return state
//       break
//     case DELETE_ITEM_PEDDING:
//       return state
//       break
//     case DELETE_ITEM_SUC:
//     case DELETE_ITEM:
//       let books = state.books
//       books = books.filter(book => (book.id !== action.payload))
//       return Object.assign({}, state, { books })
//       break
//     default:
//       return state
//   }
// }

export default combineReducers({
  items
})
