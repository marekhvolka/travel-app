import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Login } from '../../../common/organism/LoginForm/Login'
import config from '../../../config'
import { AUTH_TOKEN } from '../../../constants'
import { LoadUserAction } from '../../../store'

export const LoginContainer = () => {
  const history = useHistory()
  const [model, setModel] = useState({ email: '', password: '' })
  const dispatch = useDispatch()

  const onLogin = () => {
    axios
      .post(config.backendUrl + '/login', {
        email: model.email,
        password: model.password,
      })
      .then(
        result => {
          dispatch({
            ... new LoadUserAction({
              ...result.data.user,
              token: result.data.token,
            })
          })
          localStorage.setItem(AUTH_TOKEN, result.data.token)
          history.push('/')
        },
        error => {
          console.log(error)
        }
      )
  }

  const onFacebookLogin = () => {
    // console.log(response);
  }

  return (
    <Login
      model={model}
      onChange={(changed) => setModel({
        ...model,
        ...changed
      })}
      onLogin={onLogin}
      onFacebookLogin={onFacebookLogin}
    />
  )
}
