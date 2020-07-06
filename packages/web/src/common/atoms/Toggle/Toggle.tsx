import { FieldProps } from 'formik'
import React from 'react'
import { Form, Switch } from 'antd'

type Props = FieldProps & {
  helperText?: string
  label: string
  name: string
}

export const Toggle = React.memo(({ field, form: { setFieldValue, touched, errors }, ...props }: Props) => (
  <Form.Item label={props.label}>
    <Switch
      {...field}
      {...props}
      checkedChildren="On"
      unCheckedChildren="Off"
      checked={field.value}
      onChange={value => setFieldValue(field.name, value)}
    />
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </Form.Item>
))
