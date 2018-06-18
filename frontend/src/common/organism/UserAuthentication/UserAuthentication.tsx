import React, { Fragment } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import withRouter from 'react-router-dom/withRouter'
import Link from 'react-router-dom/Link'
import {Dropdown, Icon, Menu} from 'antd'
import {LogoutUserAction, State} from "../../../store";
import {RouteComponentProps} from "react-router";

const mapState = (state: State) => ({
  userData: state.userData
})
const mapDispatch = {
  logout: () => ({...new LogoutUserAction()})
}

const connector = connect(
  mapState,
  mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = RouteComponentProps & PropsFromRedux & {

}

const UserAuthentication = ({ history, logout, userData }: Props) => {
  const onLogout = () => {
    logout()
    history.push('/')
  }

  const menu = (
    <Menu>
      <Menu.Item key="2">Details</Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={onLogout}>Log out</Menu.Item>
    </Menu>
  )

  return (
    <span>
      {userData ? (
        <Dropdown.Button overlay={menu} placement="bottomLeft" icon={<Icon type="user" />}>
            <span>{userData.email}</span>
        </Dropdown.Button>
      ) : (
        <Fragment>
          <Link className="link" to={'/register'}>
            Register
          </Link>
          <Link className="link" to={'/login'}>
            Login
          </Link>
        </Fragment>
      )}
    </span>
  )
}

export default withRouter(connector(UserAuthentication))
