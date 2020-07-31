import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../../common/atoms/Button/Button'
import { Input } from '../../../common/atoms/Input/Input'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { Spinner } from '../../../common/atoms/Spinner/Spinner'
import { config } from '../../../config'
import { LoadUserAction } from '../../../store'
import { media } from '../../../theme'

const RegisterWrapper = styled.div`
  ${media.nonMobile} {
    width: 500px;
    margin: auto;
  }
`

type RegisterModel = {
  email: string
  password: string
  passwordCheck: string
}

const initialValues: RegisterModel = {
  email: '',
  password: '',
  passwordCheck: ''
}

const validate = (values: RegisterModel) => {
  const errors: any = {}
  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  if (!values.passwordCheck) {
    errors.passwordCheck = 'Please type password again'
  }

  if (values.password !== values.passwordCheck) {
    errors.passwordCheck = 'Passwords should match'
  }

  return errors
}

export const Register = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = (values, { setErrors }) => {
    setIsLoading(true)
    delete values.passwordCheck

    axios
      .post(config.backendUrl + '/register', {
        email: values.email,
        password: values.password,
      })
      .then(({ data }) => {
        setIsLoading(false)

        if (data.error) {
          setErrors({
            passwordCheck: data.error.message
          })
        } else {
          dispatch({
            ...new LoadUserAction({
              ...data.user,
              token: data.token,
            })
          })

          history.push('/')
        }
      }, (error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  return (
    <RegisterWrapper>
      {isLoading && <Spinner/>}
      <MainHeading center>Create Account</MainHeading>
      <Formik
        validate={validate}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <Field
              name="email"
              label="Email"
              type="email"
              component={Input}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              component={Input}
            />
            <Field
              type="password"
              name="passwordCheck"
              label="Confirm password"
              component={Input}
            />
            <Button center type="submit">Register</Button>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              Already registered? Let's <Link to={'/login'}>Sign In</Link>
            </p>
          </Form>
        )}
      </Formik>
    </RegisterWrapper>
  )
}
