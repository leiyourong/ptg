import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './xxx.css';

export default class home extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    fetch('/books').then(response => {
      if (response.status === 200) {
        console.log(response);
        return response;
      }
    })
  }

  render() {
    return <div className="homepage">
      HomePage
      <Route path='/book/sub' render={() => { return (<div>ReactRouter4-subRoute</div>) }} />
      <Link to='/book/sub'><div className='menuItem'>subRouter</div></Link>
    </div>
  }
}
