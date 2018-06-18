import React from 'react'
import {Form, Input as BaseInput} from 'antd'

type Props = {
  helperText?: string
  label?: string
  name?: string
  onChange: any
  placeholder?: string
  type?: string
  value: string
}

export const TextArea = (props: Props) => (
  <Form.Item label={props.label}>
    <BaseInput.TextArea
      rows={5}
      value={props.value || ''}
      placeholder={props.placeholder}
      onChange={event => props.onChange && props.onChange({
        [props.name]: event.target.value
      })}
    />
    {props.helperText && (
      <p>{props.helperText}</p>
    )}
  </Form.Item>
)
