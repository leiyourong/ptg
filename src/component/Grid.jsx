import React, { Component } from 'react'
import { Table, Button } from 'antd'
import './style/grid'

export default class Grid extends Component {
  render () {
    const buttons = this.props.buttons && this.props.buttons.map(
      (btn, index) => (<Button key={index} className='r-grid-btn' onClick={ btn.action }>{ btn.name }</Button>)
    )
    return (
      <div className='r-grid'>
        { buttons }
        <Table columns={ this.props.columns } dataSource={ this.props.items } rowKey='id' />
      </div>
    )
  }
}
