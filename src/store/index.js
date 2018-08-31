import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
// import promiseMiddleware from 'redux-promise'
// import thunk from 'redux-thunk'
import reducers from '../reducers/index'
import rootSaga from '../saga/index'
import createSagaMiddleware from 'redux-saga'

// const middlewares = [createLogger(), thunk, promiseMiddleware]
const sagaMiddleware = createSagaMiddleware()
const middlewares = [createLogger(), sagaMiddleware]
// compose
const store = createStore(reducers,
  applyMiddleware(...middlewares)
)
sagaMiddleware.run(rootSaga)
export default store
