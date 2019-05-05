import React, {Component} from 'react';
import {createPortal} from 'react-dom';

export default class PortalContainer extends Component {

    constructor (props) {
        super(props);
        this.portal = document.createElement('div');
        document.body.append(this.portal);
    }
    
    componentWillUnmount() {
        document.body.removeChild(this.portal);
    }

    render() {
        return createPortal(this.props.children, this.portal);
    }
}