import { setItem, getItem } from '../utils/storage'

export const getBooks = payload => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const books = getItem('books') || []
      resolve({
        items: books
      })
    }, 100)
  })
}

export const deleteBooks = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let books = getItem('books') || []
      let targetIndex = -1
      books.forEach((book, index) => {
        if (book.id == id) {
          targetIndex = index
        }
      })
      if (targetIndex === -1) {
        reject('id不存在')
        return
      }
      const spliceBook = books.splice(targetIndex, 1)
      setItem('books', books)
      resolve(spliceBook[0])
    }, 100)
  })
}

export const addBook = ({ name, price }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let books = getItem('books') || []
      let maxId = 0
      books.forEach((book, index) => {
        if (book.id > maxId) {
          maxId = book.id
        }
      })
      const addBookObject = {
        id: maxId + 1,
        name,
        price
      }
      books.push(addBookObject)
      setItem('books', books)
      resolve(addBookObject)
    }, 100)
  })
}

export const editBook = ({ id, name, price }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let books = getItem('books') || []
      let targetIndex = -1
      books = books.map(book => {
        if (book.id == id) {
          Object.assign(book, { name, price })
        }
        return book
      })
      setItem('books', books)
      resolve({ id, name, price })
    }, 100)
  })
}
