import { DETELE_ITEM } from '../actions/index'

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

function items(state = initState, action) {
  switch (action.type) {
    case DETELE_ITEM:
      let books = state.books
      books = books.filter(book => (book.id !== action.payload))
      return Object.assign({}, state, { books })
      break
    default:
      return state
  }
}

export default items
