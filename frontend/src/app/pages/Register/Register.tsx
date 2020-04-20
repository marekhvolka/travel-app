import React, { Fragment } from 'react'
import { Button } from '../../../common/atoms/Button/Button'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { Input } from '../../../common/atoms/Input/Input'

type Props = {
  model: any
  onChange: any
  onRegister: any
}

export const Register = ({ model, onChange, onRegister }: Props) => (
  <Fragment>
    <MainHeading>Register form</MainHeading>
    <Input onChange={onChange} name="email" label="Email" type="email" value={model.email} />
    <Input type="password" onChange={onChange} name="password" label="Password" value={model.password} />
    <Input
      type="password"
      onChange={onChange}
      name="passwordCheck"
      label="Password again"
      value={model.passwordCheck}
    />
    <Button onClick={onRegister}>Register</Button>
  </Fragment>
)
