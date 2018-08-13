import React, { Component } from 'react'
import { render } from 'react-dom'
import Router from './router/index'
import { Provider } from 'react-redux'
import store from './store/index'
import Home from './views/home'
render(<Home />,
 document.getElementById('react')
)
// render(<Provider store={store}>
//       <Router />
//    </Provider>,
//  document.getElementById('react')
// )
