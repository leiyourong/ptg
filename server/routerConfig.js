import React, { Component } from 'react'
import { Menu, Button, Affix } from 'antd'
import { StaticRouter as Router, Route, Redirect, Switch, Link, Prompt, NavLink } from 'react-router-dom'
import Home from '../src/views/home'

export default class router extends Component {
  render () {
    const context = {}
    return (
      <Router className='defRouter' context={context}>
        <div>
          <div className='menuContainer'>
            <Menu
               defaultSelectedKeys={['0']}
               className='menu'
               mode='horizontal'
             >
             <Menu.Item key='1'>
               <Link to='/worker'><div className='menuItem'>Worker</div></Link>
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
              <Route exact path='/' getComponent={Home} />
            </Switch>
          </div>
        </div>
     </Router>
    )
  }
}
