import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

export default class Home extends Component {
  addNum = () => {
    this.props.addNum(1)
  }

  render () {
    const HomePage = styled.div`
      margin: 50px;
      font: 30px;
      color: red;
    `
    return (
      <HomePage>
        <div>{this.props.num}</div>
        <Button onClick={this.addNum}>Add</Button>
      </HomePage>
    )
  }
}
