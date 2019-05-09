import React, { Component } from 'react'
// import './xxx.css';

export default class home extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    fetch('http://localhost:9000/books').then(response => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(books => {
      this.setState({
        books,
      })
    })
    fetch('http://localhost:9000').then(response => {
      if (response.status === 200) {
        console.log(response);
        return response;
      }
    })
  }

  render() {
    return <div>
      {
        this.state.books && this.state.books.map(book => {
          return <div key={book.id} className={`class${book.id}`}>
            {book.name} '----' {book.price}
          </div>
        })
      }
    </div>
  }
}
