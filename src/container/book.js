import Book from '../views/book.jsx'
import { connect } from 'react-redux'
import action from '../actions/index'
const { deleteItem, getItem, addItem, editItem } = action;

const mapStateToProps = state => {
  return {
    items: state.items.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: payload => dispatch(deleteItem(payload)),
    getItems: () => dispatch(getItem()),
    addItem: payload => dispatch(addItem(payload)),
    editItem: payload => dispatch(editItem(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
