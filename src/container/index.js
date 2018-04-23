import App from '../App.jsx'
import { connect } from 'react-redux'
import { deleteItem } from '../actions/index'

const mapStateToProps = state => {
  return {
    items: state.items.books
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: payload => dispatch(deleteItem(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
