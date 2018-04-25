import React, { Component } from 'react'
import { Modal } from 'antd'

export default function ModalForm (WrappedComponent) {
  return class RComponent extends Component {
    render () {
      return (
        <Modal
          className='r-modal'
          visible={ this.props.visible }
          title={ this.props.title }
          onCancel={ this.props.handleCancel }>
            <WrappedComponent { ...this.props }></WrappedComponent>
        </Modal>
      )
    }
  }
}
