import React, { Component } from 'react'
import { Form, Button, Input } from 'antd'
import ModalForm from './ModalForm'
const FormItem = Form.Item

@ModalForm
class simpleForm extends Component {
  constructor (props) {
    super(props)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit && this.props.handleSubmit(this.props.form.getFieldsValue())
      }
      console.log(err)
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const button = !this.props.Btn && (
      <FormItem>
        <Button type="primary" htmlType="submit">提交</Button>
      </FormItem>
    )
    return (
      <Form onSubmit={ this.handleSubmit.bind(this) } className='r-form'>
        {
          this.props.items && this.props.items.map((item, index) => (
            <FormItem key={ index } label={ item.label } required={ !!item.required }>
              { getFieldDecorator( item.name )(
                <Input placeholder={ item.placeholder || '' } />
              )}
            </FormItem>
          ))
        }
        { button }
      </Form>
    )
  }
}

const form = Form.create()(simpleForm)
module.exports = form
