import { combineReducers } from 'redux'

const initState = {
  num: 0
}

const nums = (state = initState, action) => {
  switch (action.type) {
    case 'addNum':
      return Object.assign({}, state, { num: state.num + action.payload })
    case 'delNum':
      return Object.assign({}, state, { num: state.num - 1 })
  }
  return state
}

export default combineReducers({
  nums
})
