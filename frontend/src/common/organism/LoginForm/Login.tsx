import React from 'react'
// import FacebookLogin from 'react-facebook-login'
import { Input } from '../../atoms/Input/Input'
import { Button } from '../../atoms/Button/Button'

type Props = {
  model: any
  onChange: any
  onFacebookLogin: any
  onLogin: any
}

export const Login = ({ model, onChange, onLogin, onFacebookLogin }: Props) => (
  <div>
    <h2>Login</h2>
    <Input
      onChange={onChange}
      label="Email"
      name="email"
      type="email"
      value={model.email}
    />
    <Input
      onChange={onChange}
      type="password"
      label="Password"
      name="password"
      value={model.password}
    />
    <Button onClick={onLogin}>Login</Button>

    {/*<h3>Or login with Facebook</h3>*/}
    {/*<FacebookLogin*/}
      {/*appId={process.env.REACT_APP_FACEBOOK_APP_ID}*/}
      {/*autoLoad*/}
      {/*fields="name,email,picture"*/}
      {/*callback={onFacebookLogin}*/}
    {/*/>*/}
  </div>
)
