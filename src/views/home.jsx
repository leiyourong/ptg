import React, { Component } from 'react'

export default class home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      num: 0
    }
  }
  // componentWillReceiveProps (nextProps) {
  //   console.log('componentWillReceiveProps')
  // }
  // componentWillUpdate (nextProps, nextState) {
  //   console.log('componentWillUpdate')
  // }
  componentDidUpdate (prevProps, prevState) {
    console.log('componentDidUpdate')
  }
  componentWillMount () {
    this.setState({
      num: 1
    })
    console.log('1----------' + this.state.num)
    setTimeout(() => {
      console.log('2----------' +this.state.num)
      this.setState({
        num: 2
      })
    }, 0)
    // console.log('componentWillMount')
  }

  componentDidMount() {
    this.setState({
      num: 3
    })
    console.log('3----------' + this.state.num)
    setTimeout(() => {
      console.log('4----------' + this.state.num)
      this.setState({
        num: 4
      })
      // console.log('5----------' + this.state.num)
    }, 0)
    console.log('componentDidMount')
  }

  componentWillUnmount() {
      console.log('componentWillUnmount')
  }
  render () {
    return <div key='1'>{this.state.num}</div>
  }
}
