import React, { Component } from 'react'
import { Button } from 'antd'

export default class home extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      result: 0
    }
  }

  noWebWork = () => {
    var t = Date.now()
    var result = []
    console.log(`startFetch: ${Date.now() - t}`)
    fetch('http://localhost:1215').then(data => {
      console.log(`insideFetch: ${Date.now() - t}`)
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
    var t = Date.now()
    var result = []
    console.log(`startFetch: ${Date.now() - t}`)
    fetch('http://localhost:1215').then(data => {
      console.log(`insideFetch: ${Date.now() - t}`)
    })
    // 耗时操作-结束
    this.setState({
      result: 0
    })
  }

  withWebWork = () => {
    if (!Worker) {
      return
    }
    var t = Date.now()
    var self = this
    var work = new Worker('worker.js')
    console.log(`afterFor: ${Date.now() - t}`)
    console.log(`startFetch: ${Date.now() - t}`)
    fetch('http://localhost:1215').then(data => {
      console.log(`insideFetch: ${Date.now() - t}`)
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
    return <div>
      <div style={{width: '240px', textAlign: 'center'}}>{this.state.result}</div>
      <Button style={{margin: '10px'}} type='primary' onClick={this.noWebWork}>NoWebWork</Button>
      <Button style={{margin: '10px'}} type='primary' onClick={this.withWebWork}>WithWebWork</Button>
      <Button type='primary' onClick={this.onlyAjax}>onlyAjax</Button>
    </div>
  }
}
