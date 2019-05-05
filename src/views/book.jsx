import React, { Component } from 'react'
import Grid from '../component/Grid'
import Form from '../component/Form'
import { Button, Modal } from 'antd'
import { Prompt } from 'react-router-dom'
const FormItem = Form.Item
import { Route, Link } from 'react-router-dom'
export default class book extends Component {
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
        <div>
          <span style={{ display: 'inline-block', paddingRight: '10px' }}>
            <a href='javascript:;' onClick={ this.deleteItem.bind(this, text.id) }>删除</a>
          </span>
          <span style={{ display: 'inline-block', paddingRight: '10px' }}>
            <a href='javascript:;' onClick={ this.editItem.bind(this, text.id) }>编辑</a>
          </span>
        </div>
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
      data: {}
    }
  }

  handleSubmit ({ method, ...data }) {
    if (method === 'edit') {
      this.props.editItem({
        id: this.state.data.id,
        ...data
      })
    } else {
      this.props.addItem(data)
    }
    this.setState({
      modalVisible: false,
      data: {}
    })
  }

  handleCancel () {
    this.setState({
      modalVisible: false,
      data: {}
    })
  }

  componentWillReceiveProps (nextProps) {
    // 一般用于父组件props改变，通知子组件修改
  }
  componentWillUpdate (nextProps, nextState) {
    // 组件更新前渲染，不能用setState
  }
  componentDidUpdate (prevProps, prevState) {
    // 组件更新前渲染后
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

  editItem (id) {
    const data = this.props.items.find(item => +item.id === +id)
    this.showDialog(data)
  }

  showDialog (data) {
    this.setState({
      modalVisible: true,
      data
    })
  }

  // 注意入参
  shouldComponentUpdate(nextProps, nextState) {
     return true
     // return (this.props.items.length !== nextProps.items.length)
     // || this.state.modalVisible !== nextState.modalVisible
  }

  render () {
    return (
      <div>
        <Grid buttons={ this.buttons } columns={ this.columns } items={ this.props.items } ></Grid>
        <Form
          isModal={ true }
          visible={ this.state.modalVisible }
          data={ this.state.data }
          title='新增书本'  
          handleCancel={ this.handleCancel.bind(this) }
          handleSubmit={ this.handleSubmit.bind(this) }
          items={ this.formItems }>
         </Form>
         <Prompt message='哈哈，5%的几率出现' when={Math.random() > 0.95} />
         <Route path='/book/sub' render={() => { return (<div>ReactRouter4-subRoute</div>) }} />
         <Link to='/book/sub'><div className='menuItem'>subRouter</div></Link>
      </div>
    )
  }
}
