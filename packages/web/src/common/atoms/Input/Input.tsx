import { Form, Input as BaseInput } from 'antd'
import React from 'react'

type Props = {
  helperText?: string
  label?: string
  name?: string
  onChange?: any
  placeholder?: string
  type?: string
  value: string | number
}

export const Input = React.memo((props: Props) => (
    <Form.Item label={props.label}>
      <BaseInput
        type={props.type || 'text'}
        value={props.value || ''}
        placeholder={props.placeholder}
        onChange={event =>
          props.onChange &&
          props.onChange({
            [props.name]: event.target.value,
          })
        }
      />
      {props.helperText && <p>{props.helperText}</p>}
    </Form.Item>
  )
)
