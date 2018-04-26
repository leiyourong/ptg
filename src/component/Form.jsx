import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'
import ModalForm from './ModalForm'
const FormItem = Form.Item

@ModalForm
class simpleForm extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const button = !this.props.disabledBtn && (
      <FormItem className='form-action'>
        <Button type="primary" htmlType="submit">提交</Button>
      </FormItem>
    )
    return (
      <Form className='r-form'>
        {
          this.props.items && this.props.items.map((item, index) => (
            <FormItem key={ index } label={ item.label } required={ !!item.required }>
              { getFieldDecorator( item.name, {
                  rules: [{ required: !!item.required, message: item.required }],
                })(
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

form.propTypes = {
  items: PropTypes.array.isRequired
}

module.exports = form
