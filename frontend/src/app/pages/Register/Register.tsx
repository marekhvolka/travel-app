import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '../../../common/atoms/Button/Button'
import { Input } from '../../../common/atoms/Input/Input'
import { MainHeading } from '../../../common/atoms/MainHeading/MainHeading'
import config from '../../../config'
import { LoadUserAction } from '../../../store'

export const Register = () => {
  const history = useHistory()
  const [model, setModel] = useState({ email: '', password: '', passwordCheck: '' })
  const dispatch = useDispatch()

  const onSubmit = () => {
    if (model.password !== model.passwordCheck) {
      return alert('Password don\'t match')
    }

    delete model.passwordCheck

    axios
      .post(config.backendUrl + '/register', {
        email: model.email,
        password: model.password,
      })
      .then(
        result => {
          dispatch({
            ...new LoadUserAction({
              ...result.data.user,
              token: result.data.token,
            })
          })

          history.push('/')
        },
        error => {
          console.log(error)
        }
      )
  }

  const onChange = (changed) => {
    setModel({ ...model, ...changed })
  }

  return (
    <>
      <MainHeading>Register form</MainHeading>
      <Input
        onChange={onChange}
        name="email"
        label="Email"
        type="email"
        value={model.email}
      />
      <Input
        type="password"
        onChange={onChange}
        name="password"
        label="Password"
        value={model.password}
      />
      <Input
        type="password"
        onChange={onChange}
        name="passwordCheck"
        label="Password again"
        value={model.passwordCheck}
      />
      <Button onClick={onSubmit}>Register</Button>
    </>
  )
}
