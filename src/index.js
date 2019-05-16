import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './router/index'
import { Provider } from 'react-redux'
import {getClientStore} from './store/index'
// import Demo from './views/home'
// const divvv = (<div id='div1'>
//   <div xxx='123' id='div2'>我是一个divdivdiv</div>
// </div>)
// console.log(divvv)
// console.log(Demo)
// console.log(<Demo />)
setTimeout(() => {
  hydrate(
    <Provider store={getClientStore()}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('react')
  )  
}, 5000)
