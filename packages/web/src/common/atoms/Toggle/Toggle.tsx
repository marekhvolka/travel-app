import React from 'react'
import { Form, Switch } from 'antd'

type Props = {
  helperText?: string
  label: string
  name: string
  onChange: any
  value: boolean
}

export const Toggle = React.memo((props: Props) => (
  <Form.Item label={props.label}>
    <Switch
      checkedChildren="On"
      unCheckedChildren="Off"
      checked={props.value}
      onChange={value =>
        props.onChange({
          [props.name]: value,
        })
      }
    />
    {props.helperText && <p>{props.helperText}</p>}
  </Form.Item>
))
