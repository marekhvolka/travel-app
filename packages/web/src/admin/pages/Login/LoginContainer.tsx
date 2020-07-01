import axios from 'axios'
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
  const [model, setModel] = useState({ email: '', password: '' })
  const dispatch = useDispatch()

  const onLogin = () => {
    setIsLoading(true)
    axios
      .post(config.backendUrl + '/login', {
        email: model.email,
        password: model.password,
      })
      .then((result) => {
        setIsLoading(false)
        dispatch({
          ...new LoadUserAction({
            ...result.data.user,
            token: result.data.token,
          })
        })
        localStorage.setItem(AUTH_TOKEN, result.data.token)
        history.push('/')
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
      <Login
        model={model}
        onChange={(changed) => setModel({
          ...model,
          ...changed
        })}
        onLogin={onLogin}
        onFacebookLogin={onFacebookLogin}
      />
    </Container>
  )
}
