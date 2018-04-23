import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './container/index'
import store from './store/index'

render(<Provider store={store}>
    <App />
 </Provider>,
 document.getElementById('react')
)
