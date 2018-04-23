export const DELETE_ITEM = 'DELETE_ITEM'
export const DELETE_ITEM_SUC = 'DELETE_ITEM_SUC'
export const DELETE_ITEM_FAIL = 'DELETE_ITEM_FAIL'
import { createAction } from 'redux-actions'

export const deleteItem = createAction(DELETE_ITEM, payload => {
  // return (dispatch, getState) => {
  //   dispatch({
  //     type: DELETE_ITEM_PEDDING,
  //     payload
  //   })
  //
  //   dispatch(getAsync().then(() => ({
  //     type: DELETE_ITEM_SUC,
  //     payload
  //   })).catch(() => ({
  //     type: DELETE_ITEM_FAIL,
  //     payload
  //   })))
  // }
  return getAsync().then(res => ({
    type: DELETE_ITEM_SUC,
    res: payload
  })).catch(res => ({
    type: DELETE_ITEM_FAIL,
    res: payload
  }))
})

// redux-thunk 注入 dispatch/getstate 对象
function getAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(1)
      } else {
        reject(2)
      }
    }, 500)
  })
}
