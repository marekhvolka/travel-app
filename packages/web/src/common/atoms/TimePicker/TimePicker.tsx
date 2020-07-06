import React from 'react'
import { TimePicker as BaseTimePicker, Form } from 'antd'
import { FieldProps } from 'formik'

type Props = FieldProps & {
  label?: string
  placeholder?: string
}

export const TimePicker = React.memo(({ field, form: { setFieldValue, touched, errors }, ...props }: Props) => (
    <Form.Item
      label={props.label}
      validateStatus={touched[field.name] && errors[field.name] ? 'error' : ''}
    >
      <BaseTimePicker
        {...field}
        {...props}
        format={'HH:mm'}
        onChange={data => setFieldValue(field.name, data.toString())}
      />
      {touched[field.name] && errors[field.name] && <p style={{color: 'red', lineHeight: '20px'}}>{errors[field.name]}</p>}
    </Form.Item>
  )
)

