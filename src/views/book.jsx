import React from 'react'
import Grid from '../component/Grid'
import Form from '../component/Form'
import { Prompt, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { DELETE_ITEM, ADD_ITEM, GET_ITEM, EDIT_ITEM, GET_AUTHOR, SET_AUTHOR } from '../constants/index'

const { useState, useEffect, useReducer } = React

const useBooks = (initState) => {
  return useReducer((state, action) => {
    let books = []
    switch (action.type) {
      case GET_ITEM:
        return Object.assign({}, state, { books })
      case ADD_ITEM:
        return Object.assign({}, state, { books: [ ...state.books, { ...action.data, id: Date.now() } ] })
      case DELETE_ITEM:
        books = state.books.filter(book => (book.id !== action.data))
        return Object.assign({}, state, { books })
      case EDIT_ITEM:
        const { id, name, price } = action.data
        books = state.books.map(book => {
          if (book.id === id) {
            Object.assign(book, { name, price })
          }
          return book
        })
        return Object.assign({}, state, { books })
      case GET_AUTHOR:
        return Object.assign({}, state, { author: action.data })
      case SET_AUTHOR:
        return Object.assign({}, state, { author: action.data })
    }
    return state
  }, initState)
}

export default () => {
  const [authorState, setAuthorState] = useState('text')
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState({})
  const [state, dispatch] = useBooks({
    books: [],
    author: 'nobody'
  })

  useEffect(() => {
    // 本来应该 mock get
    // dispatch({
    //   type: GET_ITEM
    // })
    // dispatch({
    //   type: GET_AUTHOR
    // })
  }, [])

  const handleSubmit = ({ method, ...data }) => {
    if (method === 'edit') {
      dispatch({
        type: EDIT_ITEM,
        data
      })
    } else {
      dispatch({
        type: ADD_ITEM,
        data
      })
    }

    setModalVisible(false)
    setData({})
  }

  const handleCancel = () => {
    setModalVisible(false)
    setData({})
  }

  const deleteItem = (id) => {
    dispatch({
      type: DELETE_ITEM,
      data: id
    })
  }

  const editItem = (id) => {
    showDialog(state.books.find(item => +item.id === +id))
  }

  const showDialog = (data) => {
    setModalVisible(true)
    setData(data)
  }

  const handleClick = () => setAuthorState('input')

  const handleBlur = (e) => {
    dispatch({
      type: SET_AUTHOR,
      data: e.target.value || ''
    })
    setAuthorState('text')
  }

  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href='javascript:;'>{text}</a>
  }, {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    className: 'nameCell'
  }, {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    className: 'priceCell'
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <div>
        <span style={{ display: 'inline-block', paddingRight: '10px' }}>
          <a className='del' href='javascript:;' onClick={ deleteItem.bind(this, text.id) }>删除</a>
        </span>
        <span style={{ display: 'inline-block', paddingRight: '10px' }}>
          <a className='edit' href='javascript:;' onClick={ editItem.bind(this, text.id) }>编辑</a>
        </span>
      </div>
    )
  }]
  const buttons = [{
    name: '新增',
    action: showDialog.bind(this),
    type: 'add'
  }]
  const formItems = [{
    label: '名字',
    name: 'name',
    required: '请输入名字'
  }, {
    label: '价格',
    name: 'price',
    required: '请输入价格'
  }]

  const EditText = styled.div`
    text-align: center;
    margin: 10px 0;
    font-size: 24px;
    color: red;
  `
  const author = authorState === 'text'
    ? <EditText onClick={handleClick}>{state.author}</EditText>
    : (
      <EditText>
        <input onBlur={handleBlur} autoFocus defaultValue={state.author} />
      </EditText>
    )
  return (
    <div className='booksContainer'>
      {author}
      <Grid buttons={buttons} columns={ columns } items={ state.books } ></Grid>
      <Form
        isModal={ true }
        visible={ modalVisible }
        data={ data }
        title='新增书本'
        handleCancel={ handleCancel }
        handleSubmit={ handleSubmit }
        items={ formItems }>
      </Form>
      <Prompt message='哈哈，5%的几率出现' when={Math.random() > 1} />
      <Route path='/book/sub' render={() => { return (<div>ReactRouter4-subRoute</div>) }} />
      <Link to='/book/sub'><div className='menuItem'>subRouter</div></Link>
    </div>
  )
}
