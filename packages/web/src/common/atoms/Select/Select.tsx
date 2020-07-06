import { FieldProps } from 'formik'
import React from 'react'
import { Form, Select as BaseSelect } from 'antd'

type SelectOptionData = {
  id: string | any
  name: string
}

type Props = FieldProps & {
  label?: string
  options: SelectOptionData[]
  placeholder?: string
}

export const Select = React.memo(({ field, form: { setFieldValue, touched, errors }, ...props }: Props) => (
    <Form.Item label={props.label}>
      <BaseSelect
        style={{minWidth: '120px'}}
        {...field}
        {...props}
        onChange={(value) => setFieldValue(field.name, value)}
      >
        <BaseSelect.Option value={null}>{props.placeholder || "Not selected"}</BaseSelect.Option>
        {props.options.map(option => (
          <BaseSelect.Option key={option.id} value={option.id}>
            {option.name ? option.name : option.id}
          </BaseSelect.Option>
        ))}
      </BaseSelect>
      {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </Form.Item>
  )
)
