import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

const initState = {
  books: []
}

const items = handleActions({
  DELETE_ITEM: (state, action) => {
    let books = state.books
    books = books.filter(book => (book.id !== action.payload.id))
    return Object.assign({}, state, { books })
  },
  GET_ITEM: (state, action) => {
    let books = action.payload.items
    return Object.assign({}, state, { books })
  },
  ADD_ITEM: (state, action) => {
    return Object.assign({}, state, { books: [ ...state.books, action.payload ] })
  },
  EDIT_ITEM: (state, action) => {
    let books = state.books
    const { id, name, price } = action.payload
    books = books.map(book => {
      if (book.id === id) {
        Object.assign(book, { name, price })
      }
      return book
    })
    return Object.assign({}, state, { books })
  }
}, initState)

export default combineReducers({
  items
})
