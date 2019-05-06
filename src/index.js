import React from 'react'
import { render } from 'react-dom'
import Router from './router/index'
import { Provider } from 'react-redux'
import store from './store/index'
import Demo from './views/home'
const divvv = (<div id='div1'>
  <div xxx='123' id='div2'>我是一个divdivdiv</div>
</div>)
console.log(divvv)
console.log(Demo)
console.log(<Demo />)
render(<Provider store={store}>
  <Router />
</Provider>,
document.getElementById('react')
)
