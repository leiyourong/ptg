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

  addItem () {
    this.props.addItem && this.props.addItem({
      name: this.refs.name.value,
      price: this.refs.price.value
    })
  }

  render () {
    return (
      <div className='grid-container'>
        <div className='actions'>
          <input className='action-add' type='button' value='新增' onClick={ this.addItem } />
        </div>
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
        <div className='dialog-form'>
          <div className='form-item'>
            <span className='form-item-title'>书名：</span>
            <input ref='name' type='text' />
          </div>
          <div className='form-item'>
            <span className='form-item-title'>价格：</span>
            <input ref='price' type='text' />
          </div>
          <input className='action-add' type='button' value='确定' onClick={ this.addItem.bind(this) } />
        </div>
      </div>
    )
  }
}
