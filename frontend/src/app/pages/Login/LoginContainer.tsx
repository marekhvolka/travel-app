import React from 'react'
import axios from 'axios'
import withRouter from 'react-router-dom/withRouter'
import { connect, ConnectedProps } from 'react-redux'
import { FormWithState } from '../../../common/organism/Form/FormWithState'
import { Login } from '../../../common/organism/LoginForm/Login'
import { RouteComponentProps } from 'react-router'
import { AUTH_TOKEN } from '../../../constants'
import { LoadUserAction, State } from '../../../store'
import config from '../../../config'

const mapState = (state: State) => ({})
const mapDispatch = {
  loadUser: userData => ({ ...new LoadUserAction(userData) }),
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = RouteComponentProps &
  PropsFromRedux & {
    login: any
  }

class LoginContainer extends FormWithState<Props> {
  state = {
    model: {
      email: '',
      password: '',
    },
  }

  onLogin = () => {
    axios
      .post(config.backendUrl + '/login', {
        email: this.state.model.email,
        password: this.state.model.password,
      })
      .then(
        result => {
          this.props.loadUser({
            ...result.data.user,
            token: result.data.token,
          })
          localStorage.setItem(AUTH_TOKEN, result.data.token)
          this.props.history.push('/')
        },
        error => {
          console.log(error)
        }
      )
  }

  onFacebookLogin = () => {
    // console.log(response);
  }

  render() {
    return (
      <Login
        model={this.state.model}
        onChange={this.onChange}
        onLogin={this.onLogin}
        onFacebookLogin={this.onFacebookLogin}
      />
    )
  }
}

export default connector(withRouter(LoginContainer))
