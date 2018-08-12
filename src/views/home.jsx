import React, { Component } from 'react'

export default class home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      word: 'It\'s Home'
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
  }
  componentWillUpdate (nextProps, nextState) {
    console.log('componentWillUpdate')
  }
  componentDidUpdate (prevProps, prevState) {
    console.log('componentDidUpdate')
  }
  componentWillMount () {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillUnmount() {
      console.log('componentWillUnmount')
  }
  render () {
    return <div key='1'>{this.state.word}</div>
  }
}
