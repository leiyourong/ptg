import React, { Component } from 'react'
import '../style/grid'

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  deleteItem (id) {
    if (this.props.deleteItem) {
      this.props.deleteItem(id)
    }
  }

  render () {
    return (
      <div>
        <table className='grid'>
          <thead>
            <tr>
            {
              this.props.headers.map((header, index) => (
                  <th key={ index }>{ header }</th>
              ))
            }
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
              {
                this.props.items.map(item => (
                  <tr key={ item.id }>
                    <td>{ item.id }</td>
                    <td>{ item.name }</td>
                    <td>{ item.price }</td>
                    <td className='operation' onClick={ this.deleteItem.bind(this, item.id) }>删除</td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    )
  }
}
