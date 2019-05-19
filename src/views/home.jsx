import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import styled from 'styled-components';

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
    const HomePage = styled.div`
      font: 30px;
      color: red;
    `;
    return <HomePage>
      HomePage
      <Route path='/book/sub' render={() => { return (<div>ReactRouter4-subRoute</div>) }} />
      <Link to='/book/sub'><div className='menuItem'>subRouter</div></Link>
    </HomePage>
  }
}
