import Book from '../views/book.jsx'
import { connect } from 'react-redux'
import action from '../actions/index'
import {createSelector} from 'reselect';
const { deleteItem, getItem, addItem, editItem, getAuthor, setAuthor } = action;

const getbooksBase = state => state.items.books
const getAuthorBase = state => state.items.author

const getAuthorSelector = createSelector(
  [getAuthorBase],
  author => {
    // 假设有个很复杂的计算，那么就不需要每次要去计算
    return author.split('-').join(' | ')
  }
)

const getbooksSelector = createSelector(
  [getbooksBase],
  books => books
)

const mapStateToProps = state => {
  return {
    // 第一个其实有点多此一举
    items: getbooksSelector(state),
    author: getAuthorSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: payload => dispatch(deleteItem(payload)),
    getItems: () => dispatch(getItem()),
    addItem: payload => dispatch(addItem(payload)),
    editItem: payload => dispatch(editItem(payload)),
    getAuthor: () => dispatch(getAuthor()),
    setAuthor: (payload) => dispatch(setAuthor(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
