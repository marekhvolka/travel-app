import { Form, Input as BaseInput } from 'antd'
import { FieldProps } from 'formik'
import React from 'react'

type Props = FieldProps & {
  label?: string
  placeholder?: string
}

export const TextArea = React.memo(({ field, form: { touched, errors }, ...props }: Props) => (
    <Form.Item
      label={props.label}
      validateStatus={touched[field.name] && errors[field.name] ? 'error' : ''}
    >
      <BaseInput.TextArea
        rows={5}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && <p style={{color: 'red', lineHeight: '20px'}}>{errors[field.name]}</p>}
    </Form.Item>
  )
)
