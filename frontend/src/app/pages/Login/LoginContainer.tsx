import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Login } from '../../../common/organism/LoginForm/Login'
import { useHistory } from 'react-router-dom'
import { AUTH_TOKEN } from '../../../constants'
import { LoadUserAction } from '../../../store'
import config from '../../../config'

export const LoginContainer = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [model, setModel] = useState({email: '', password: ''})

  const onLogin = () => {
    axios
      .post(config.backendUrl + '/login', model)
      .then(
        result => {
          dispatch({...new LoadUserAction({
            ...result.data.user,
            token: result.data.token,
            })})
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
