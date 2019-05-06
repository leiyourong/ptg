// store = { getState, dispatch }
export default store => next => action => {
  console.log('action请求之前---from doubi')
  next(action)
  console.log('action请求之后---from doubi')
}
