import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import doubi from '../middlewares/doubi'
import items from  '../reducers/index'

const middlewares = [createLogger(), doubi]
const store = createStore(items,
  applyMiddleware(...middlewares)
)
export default store
