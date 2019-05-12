import React, {Component, Fragment, Suspense, memo} from 'react';
import {Button} from 'antd';

const DemoContext = React.createContext({
    result: 100,
    meta: {
        time: Date.now(),
    }
});
const {Provider, Consumer} = DemoContext;

export default class ReactContext extends Component {
    state = {
        result: 0,
        memoState: 0,
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');
    }

    addNum = (num) => {
        this.setState({
            result: typeof num === 'number' ? (this.state.result + num) : ++this.state.result,
        })
    }

    render() {
        return <Fragment>
            <span>I'm Parent</span>
            <Button onClick={this.addNum}>Add</Button> Result:{this.state.result}
            <Provider value={this.state}>
                {/* 为了测试 getDerivedStateFromProps 才加上 num 的 */}
                <Child num={this.state.result} />
            </Provider>
            <div>Consumer out of Provider：<SubChild /></div>
            <Memo memoState={this.state.memoState} />
        </Fragment>
    }
}

class Child extends Component {
    // 为了测试 getDerivedStateFromProps 才加上 num 的
    state = {
        num: -1,
    }

    static getDerivedStateFromProps(props, state) {
        if (props.num > 5) {
            return null
        }
        return {
            num: props.num
        }
    }

    render() {
        return <Fragment>
            <div>I'm Child</div>
            <div>测试 getDerivedStateFromProps，大于 5 就不同步了。Result: {this.state.num}</div>
            <div><SubChild /></div>
            <div><SubChild2 /></div>
        </Fragment>
    }
}

class SubChild extends Component {
    render() {
        return <Fragment>
            <span>I'm SubChild</span>
            <Consumer>
                {value => JSON.stringify(value)}
            </Consumer>
        </Fragment>
        
    }
}

class SubChild2 extends Component {
    static contextType = DemoContext;
    render() {
        return <Fragment>
            <span>I'm SubChild2</span>
            {JSON.stringify(this.context)}
        </Fragment>
        
    }
}

const Memo = memo((props) => {
    console.log('rerender');
    return <Fragment>
        memoState: {props.memoState}
    </Fragment>
})