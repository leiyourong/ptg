import React, {Component, Fragment} from 'react';

export default class errorCatcher extends Component {
    state = {
        hasError: false,
    }

    componentDidCatch(err, info) {
        console.log(err);
        console.log(info);
        this.setState({
            hasError: err,
        });
        console.log(this.state.hasError)
    }

    // static getDerivedStateFromError(err) {
    //     return {
    //         hasError: err,
    //     }
    // }

    render() {
        if (this.state.hasError) {
            return <Fragment>Something Error</Fragment>;
        }
        return this.props.children;
    }
}