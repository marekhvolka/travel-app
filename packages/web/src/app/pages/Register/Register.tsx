import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '../../../common/atoms/Button/Button'
import { Input } from '../../../common/atoms/Input/Input'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import { Spinner } from '../../../common/atoms/Spinner/Spinner'
import { config } from '../../../config'
import { LoadUserAction } from '../../../store'

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

  const onSubmit = (values) => {
    setIsLoading(true)
    delete values.passwordCheck

    axios
      .post(config.backendUrl + '/register', {
        email: values.email,
        password: values.password,
      })
      .then((result) => {
        setIsLoading(false)
        dispatch({
          ...new LoadUserAction({
            ...result.data.user,
            token: result.data.token,
          })
        })

        history.push('/')
      }, (error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  return (
    <>
      {isLoading && <Spinner/>}
      <MainHeading>Register form</MainHeading>
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
              label="Password again"
              component={Input}
            />
            <Button type="submit">Register</Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
