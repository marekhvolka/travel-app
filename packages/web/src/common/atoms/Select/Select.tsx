import React from 'react'
import { Form, Select as BaseSelect } from 'antd'

type SelectOptionData = {
  id: string | any
  name: string
}

type Props = {
  helperText?: string
  label: string
  name: string
  onChange: any
  options: SelectOptionData[]
  value: string
}

export const Select = React.memo((props: Props) => {
  const { label, name, value, onChange, helperText } = props

  return (
    <Form.Item label={label}>
      <BaseSelect
        placeholder="Not selected"
        value={value}
        onChange={value =>
          onChange({
            [name]: value,
          })
        }
        style={{minWidth: '120px'}}
      >
        <BaseSelect.Option value={null}>Not selected</BaseSelect.Option>
        {props.options.map(option => (
          <BaseSelect.Option key={option.id} value={option.id}>
            {option.name ? option.name : option.id}
          </BaseSelect.Option>
        ))}
      </BaseSelect>
      <p>{helperText}</p>
    </Form.Item>
  )
})
