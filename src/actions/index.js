// import { createActions } from 'redux-actions'
import {getBooks, deleteBooks, addBook, editBook} from '../services/index';
import {DELETE_ITEM, ADD_ITEM, GET_ITEM, EDIT_ITEM} from '../constants/index';

// const { deleteItem, editItem } = createActions({
//   DELETE_ITEM: payload => deleteBooks(payload),
//   GET_ITEM: () => getBooks(),
//   ADD_ITEM: payload => addBook(payload),
//   EDIT_ITEM: payload => editBook(payload)
// })

export default {
  deleteItem: payload => async dispatch => {
    const book = await deleteBooks(payload);
    dispatch({
      type: DELETE_ITEM,
      data: book,
    })
  },
  getItem: () => async dispatch => {
    const books = await getBooks();
    dispatch({
      type: GET_ITEM,
      data: books,
    })
  },
  addItem: payload => async dispatch => {
    const book = await addBook(payload);
    dispatch({
      type: ADD_ITEM,
      data: book,
    })
  },
  editItem: payload => async dispatch => {
    const book = await editBook(payload);
    dispatch({
      type: EDIT_ITEM,
      data: book,
    })
  }
}
