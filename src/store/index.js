import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
import reducers from '../reducers/index'

const middlewares = [createLogger(), thunk, promiseMiddleware]
// compose
const store = createStore(reducers,
  applyMiddleware(...middlewares)
)
export default store
