import App from '../App.jsx'
import { connect } from 'react-redux'
import { deleteItem, getItem, addItem, editItem } from '../actions/index'

const mapStateToProps = state => {
  return {
    items: state.items.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: payload => dispatch(deleteItem(payload)),
    getItems: payload => dispatch(getItem(payload)),
    addItem: payload => dispatch(addItem(payload)),
    editItem: payload => dispatch(editItem(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
