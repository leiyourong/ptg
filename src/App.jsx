import React, { Component } from 'react'
import Grid from './component/Grid'
import { deleteItem } from './actions/index'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      headers: ['ID', '名字', '价格']
    }
  }

  componentDidMount() {
    this.props.getItems()
  }

  componentWillUnmount() {
      console.log('componentWillUnmount')
  }

  deleteItem (id) {
    this.props.deleteItem(id)
  }

  addItem ({ name, price }) {
    this.props.addItem({ name, price })
  }

  // // 注意入参
  // shouldComponentUpdate(nextProps, nextState) {
  //    return this.props.items.length !== nextProps.items.length
  // }

  render () {
    return (
      <div>
        <Grid headers={ this.state.headers } items={ this.props.items } addItem={ this.addItem.bind(this) } deleteItem={ this.deleteItem.bind(this) } ></Grid>
      </div>
    )
  }
}
