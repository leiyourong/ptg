const getNum = (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 100)
    }, 5000)
  })
}

export const addNum = num => async dispatch => {
  const result = await getNum(num)
  dispatch({
    type: 'addNum',
    payload: result
  })
}
