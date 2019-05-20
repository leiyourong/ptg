export const getItem = key => {
  let value = localStorage.getItem(key)
  value = value && JSON.parse(value)
  return value
}

export const setItem = (key, value) => {
  value = value && JSON.stringify(value)
  localStorage.setItem(key, value)
}
