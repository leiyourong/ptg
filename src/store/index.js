import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
import reducers from '../reducers/index'

const middlewares = [createLogger(), thunk, promiseMiddleware]

export const getStore = () => {
  return createStore(reducers,
    applyMiddleware(...middlewares)
  );
}

export const getClientStore = () => {
  const defaultState = window.context.state
  return createStore(reducer, defaultState, applyMiddleware(...middlewares))
}
