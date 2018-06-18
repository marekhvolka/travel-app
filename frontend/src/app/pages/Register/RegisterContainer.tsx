import React from 'react'
import {connect, ConnectedProps} from 'react-redux'
import { FormWithState } from '../../../common/organism/Form/FormWithState'
import { Register } from './Register'
import config from "../../../config";
import axios from "axios";
import {LoadUserAction, State} from "../../../store";

const mapState = (state: State) => ({})
const mapDispatch = {
  loadUser: (userData) => ({...new LoadUserAction(userData)})
}

const connector = connect(
  mapState,
  mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  mutate: any
}

class RegisterContainer extends FormWithState<Props> {
  state = {
    model: {
      email: '',
      password: '',
      passwordCheck: '',
    },
  }

  onSubmit = () => {
    const { model } = { ...this.state }

    if (model.password !== model.passwordCheck) {
      return alert("Password don't match")
    }

    delete model.passwordCheck

    axios.post(config.backendUrl + '/register', {
      email: this.state.model.email,
      password: this.state.model.password,
    }).then((result) => {
      this.props.loadUser({
        ...result.data.user,
        token: result.data.token
      })
      this.props.history.push('/')
    }, (error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <Register
        model={this.state.model}
        onChange={this.onChange}
        onRegister={this.onSubmit}
      />
    )
  }
}

export default connector(RegisterContainer)
