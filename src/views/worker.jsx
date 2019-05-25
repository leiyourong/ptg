import React, { Component } from 'react'
import { Button } from 'antd'

export default class worker extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      result: props.result || 0
    }
  }

  noWebWork = () => {
    var t = Date.now()
    var result = []
    fetch('http://localhost:3000').then(data => {

      return `insideFetch: ${Date.now() - t}`
    })
    // 耗时操作-start 寻找1000000个随机数中的中位数
    for (let index = 0; index < 1000000; index++) {
      result.push(Math.random() * 1000000)
    }
    result.sort()
    result = result[Math.floor(result.length / 2)]
    // 耗时操作-结束
    this.setState({
      result
    })
  }

  onlyAjax = () => {
    // 耗时操作-结束
    var t = Date.now()
    fetch('http://localhost:3000').then(data => {
      const time = Date.now() - t;
      this.setState({
        result: time
      })
      return `insideFetch: ${time}`
    })
    // 耗时操作-结束
    this.setState({
      result: 111
    })
    console.log(this.state.result)
  }

  withWebWork = () => {
    if (!Worker) {
      return
    }
    var t = Date.now()
    var self = this
    var work = new Worker('worker.js')
    fetch('http://localhost:3000').then(data => {
      return `insideFetch: ${Date.now() - t}`
    })
    work.onmessage = e => {
      console.log(`insideMsg: ${Date.now() - t}`)
      self.setState({
        result: e.data
      }, () => {
        work.terminate()
      })
    }
  }
 
  render () {
    return <React.Fragment>
      <div className='result' style={{width: '240px', textAlign: 'center'}}>{this.state.result}</div>
      <Button style={{margin: '10px'}} type='primary' onClick={this.noWebWork}>NoWebWork</Button>
      <Button style={{margin: '10px'}} type='primary' onClick={this.withWebWork}>WithWebWork</Button>
      <Button className='onlyAjax' type='primary' onClick={this.onlyAjax}>onlyAjax</Button>
    </React.Fragment>
  }
}
