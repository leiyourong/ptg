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
      action: this.addItem.bind(this)
    }]

    this.formItems = [{
      label: '名字',
      name: 'name',
      required: true
    }, {
      label: '价格',
      name: 'price',
      required: true
    }]

    this.state = {
      modalVisible: false,
      name: '',
      price: 0
    }
  }

  handleSubmit () {
    console.log(arguments)
    this.setState({
      modalVisible: false
    })
  }

  handleCancel () {
    this.setState({
      modalVisible: false
    })
  }

  componentDidMount() {
    this.props.getItems()
  }

  componentWillUnmount() {
      console.log('componentWillUnmount')
  }

  deleteItem (id) {
    this.props.deleteItem(id)
  }

  addItem () {
    this.setState({
      modalVisible: true
    })
    // this.props.addItem({ name, price })
  }

  // // 注意入参
  // shouldComponentUpdate(nextProps, nextState) {
  //    return this.props.items.length !== nextProps.items.length
  // }

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
