import { Field } from 'formik'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { media } from '../../../theme'
import { Button } from '../../atoms/Button/Button'
// import FacebookLogin from 'react-facebook-login'
import { Input } from '../../atoms/Input/Input'

const LoginWrapper = styled.div`
  ${media.nonMobile} {
    width: 500px;
    margin: auto;
  }
`

type Props = {
  onFacebookLogin: any
}

export const Login = ({ onFacebookLogin }: Props) => (
  <LoginWrapper>
    <h2 style={{textAlign: 'center'}}>Sign In</h2>
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
    <Button center type="submit">Sign in</Button>
    <p style={{textAlign: 'center', marginTop: '20px'}}>
      Don't have an account? <Link to={'/register'}>Create an account</Link>
    </p>

    {/*<h3>Or login with Facebook</h3>*/}
    {/*<FacebookLogin*/}
    {/*appId={process.env.REACT_APP_FACEBOOK_APP_ID}*/}
    {/*autoLoad*/}
    {/*fields="name,email,picture"*/}
    {/*callback={onFacebookLogin}*/}
    {/*/>*/}
  </LoginWrapper>
)
