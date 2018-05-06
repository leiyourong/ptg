import React, { Component } from 'react'
import { Modal, Button } from 'antd'

export default function ModalForm (WrappedComponent) {
  return class RComponent extends Component {
    handleOk () {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.handleSubmit && this.props.handleSubmit({
            method: this.props.data && this.props.data.id !== undefined ? 'edit' : 'add'  ,
            ...this.props.form.getFieldsValue()
          })
          this.props.form.resetFields()
        }
      })
    }

    handleCancel () {
      this.props.form.resetFields()
      this.props.handleCancel()
    }

    render () {
      return (
        this.props.isModal ? (<Modal
          className='r-modal'
          visible={ this.props.visible }
          title={ this.props.title }
          onCancel={ this.props.handleCancel }
          footer={[
            <Button key="back" onClick={ this.handleCancel.bind(this) }>取消</Button>,
            <Button key="submit" type="primary" onClick={ this.handleOk.bind(this) }>提交</Button>
          ]}>
            <WrappedComponent { ...this.props }
              disabledBtn={ true } >
              inModal={ true }
             </WrappedComponent>
        </Modal>) : (
          <WrappedComponent { ...this.props }
          disabledBtn={ false } >
          inModal={ false }
         </WrappedComponent>
        )
      )
    }
  }
}
