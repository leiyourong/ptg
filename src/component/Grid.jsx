import React, { Component } from 'react'
import { Table, Button } from 'antd'
import './style/grid.css'

export default class Grid extends Component {
  render () { 
    const buttons = this.props.buttons && this.props.buttons.map(
      (btn, index) => (<Button key={index} className={`r-grid-btn ${btn.type || ''}`} onClick={ btn.action }>{ btn.name }</Button>)
    )
    return (
      <div className='r-grid'>
        { buttons }
        <Table columns={ this.props.columns } dataSource={ this.props.items } rowKey='id' />
      </div>
    )
  }
}
