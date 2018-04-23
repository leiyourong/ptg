import { DELETE_ITEM, DELETE_ITEM_SUC, DELETE_ITEM_FAIL, DELETE_ITEM_PEDDING } from '../actions/index'
import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const initState = {
  books: [{
    id: 1,
    name: 'JAVA',
    price: 20
  }, {
    id: 2,
    name: 'JS',
    price: 21
  }]
}

const items = handleActions({
  DELETE_ITEM: (state, action) => {
    let books = state.books
    books = books.filter(book => (book.id !== action.payload.res))
    return Object.assign({}, state, { books })
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
