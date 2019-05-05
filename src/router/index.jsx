import React, { Component } from 'react'
import { Menu, Button, Affix } from 'antd'
import { HashRouter as Router, Route, Redirect, Switch, Link, Prompt, NavLink } from 'react-router-dom'
import Book from '../container/book'
import Home from '../views/home'
import Demo from '../views/react16/demo'
import '../styles/router'

export default class router extends Component {
  render () {
    return (
      <Router className='defRouter'>
        <div>
          <div className='menuContainer'>
            <Menu
               defaultSelectedKeys={['1']}
               className='menu'
               mode='horizontal'
             >
             <Menu.Item key='1'>
               <Link to='/'><div className='menuItem'>主页</div></Link>
             </Menu.Item>
             <Menu.Item key='2'>
               <Link to='/book'><div className='menuItem'>图书管理</div></Link>
             </Menu.Item>
             <Menu.Item key='3'>
               <Link to='/demo'><div className='menuItem'>React16 Demo</div></Link>
             </Menu.Item>
            </Menu>
          </div>
          <div className='routerContainer'>
            <Switch className='content'>
              <Route exact path='/' component={Home} />
              <Route path='/book' component={Book} />
              <Route path='/demo' component={Demo} />
            </Switch>
          </div>
        </div>
     </Router>
    )
  }
}
