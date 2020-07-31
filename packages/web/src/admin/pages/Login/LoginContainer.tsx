import axios from 'axios'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container } from '../../../common/atoms/Container/Container'
import { Spinner } from '../../../common/atoms/Spinner/Spinner'
import { Login } from '../../../common/organism/LoginForm/Login'
import { config } from '../../../config'
import { AUTH_TOKEN } from '../../../constants'
import { LoadUserAction } from '../../../store'

export const LoginContainer = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const onLogin = (values, { setErrors }) => {
    setIsLoading(true)
    axios
      .post(config.backendUrl + '/login', {
        email: values.email,
        password: values.password,
      })
      .then(({ data }) => {
        setIsLoading(false)

        if (data.error) {
          setErrors({
            password: data.error.message
          })
        } else {
          dispatch({
            ...new LoadUserAction({
              ...data.user,
              token: data.token,
            })
          })
          localStorage.setItem(AUTH_TOKEN, data.token)
          history.push('/')
        }
      }, (error) => {
        setIsLoading(false)
        console.log(error)
      })
  }

  const onFacebookLogin = () => {
    // console.log(response);
  }

  return (
    <Container>
      {isLoading && <Spinner/>}
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={onLogin}
      >
        <Form>
          <Login onFacebookLogin={onFacebookLogin} />
        </Form>
      </Formik>
    </Container>
  )
}
