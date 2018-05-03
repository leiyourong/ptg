import React, { Component } from 'react'
import Grid from './component/Grid'
import Form from './component/Form'
import { Button, Modal } from 'antd'
import { deleteItem } from './actions/index'
const FormItem = Form.Item

export default class App extends Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <a href='javascript:;'>{text}</a>,
    }, {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href='javascript:;' onClick={ this.deleteItem.bind(this, text.id) }>删除</a>
        </span>
      ),
    }]

    this.buttons = [{
      name: '新增',
      action: this.showDialog.bind(this)
    }]

    this.formItems = [{
      label: '名字',
      name: 'name',
      required: '请输入名字'
    }, {
      label: '价格',
      name: 'price',
      required: '请输入价格'
    }]

    this.state = {
      modalVisible: false,
      name: '',
      price: 0
    }
  }

  handleSubmit (data) {
    this.props.addItem(data)
    this.setState({
      modalVisible: false
    })
  }

  handleCancel () {
    this.setState({
      modalVisible: false
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps')
    console.log(arguments)
  }
  componentWillUpdate () {
    console.log('componentWillUpdate')
    console.log(arguments)
  }
  componentDidUpdate () {
    console.log('componentDidUpdate')
    console.log(arguments)
  }
  componentWillMount () {
    // 不建议做异步操作，且组件还未渲染，即将被废弃
  }

  componentDidMount() {
    // 做异步请求和组件操作refs等
    this.props.getItems()
  }

  componentWillUnmount() {
      console.log('componentWillUnmount')
  }

  deleteItem (id) {
    this.props.deleteItem(id)
  }

  showDialog () {
    this.setState({
      modalVisible: true
    })
  }

  // 注意入参
  shouldComponentUpdate(nextProps, nextState) {
     console.log('shouldComponentUpdate')
     console.log(arguments)
     return (this.props.items.length !== nextProps.items.length)
     || this.state.modalVisible !== nextState.modalVisible
  }

  render () {
    return (
      <div>
        <Grid buttons={ this.buttons } columns={ this.columns } items={ this.props.items } ></Grid>
        <Form
          visible={ this.state.modalVisible }
          title='新增书本'
          handleCancel={this.handleCancel.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          items={ this.formItems }>
         </Form>
      </div>
    )
  }
}
