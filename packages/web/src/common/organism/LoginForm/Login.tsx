import { Field } from 'formik'
import React from 'react'
import { Button } from '../../atoms/Button/Button'
// import FacebookLogin from 'react-facebook-login'
import { Input } from '../../atoms/Input/Input'

type Props = {
  onFacebookLogin: any
}

export const Login = ({ onFacebookLogin }: Props) => (
  <div>
    <h2>Login</h2>
    <Field
      label="Email"
      name="email"
      type="email"
      component={Input}
    />
    <Field
      type="password"
      label="Password"
      name="password"
      component={Input}
    />
    <Button type="submit">Login</Button>

    {/*<h3>Or login with Facebook</h3>*/}
    {/*<FacebookLogin*/}
    {/*appId={process.env.REACT_APP_FACEBOOK_APP_ID}*/}
    {/*autoLoad*/}
    {/*fields="name,email,picture"*/}
    {/*callback={onFacebookLogin}*/}
    {/*/>*/}
  </div>
)
