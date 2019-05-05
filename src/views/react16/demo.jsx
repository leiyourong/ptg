import React, { Component, Suspense, lazy } from 'react';
import ErrorCatcher from './errorCatcher';
import Hooks from './hooks';
import Protal from './portalContainer';
import ReactContext from './reactContext';
import {Button} from 'antd';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.contextRef = React.createRef();
    this.hookRef = React.createRef();
  }

  setResult = () => {
    this.contextRef.current.addNum(100);
    const hookRef = this.hookRef.current
    hookRef.innerHTML = 'Update -> ' + hookRef.innerHTML
  }

  render() {
    const LazyComponent = lazy(() => import('./lazy'))
    return (
      [
        <ErrorCatcher key='ErrorCatcher'>
          <Hooks ref={this.hookRef} />
        </ErrorCatcher>,
        <Protal key='portal'>
          <div custom-attr='custom-attr' style={{margin: '20px 0'}}>
            wrapped by portal container
            <Button onClick={this.setResult}>将 parent 值设置成 100，同时修改 hooks 的 result </Button>
          </div>
        </Protal>,
        <ReactContext ref={this.contextRef} key='context' xxx='xxx' />,
        <Suspense key='lazy' fallback={<div>loading...</div>}>
            <LazyComponent />
        </Suspense>
      ]
    )
  }
}
