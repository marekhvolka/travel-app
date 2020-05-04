import { Dropdown, Icon, Menu } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { AUTH_TOKEN } from '../../../constants'
import { LogoutUserAction, State } from '../../../store'

export const UserAuthentication = () => {
  const history = useHistory()
  const userData = useSelector((state: State) => state.userData)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch({ ...new LogoutUserAction() })
    localStorage.removeItem(AUTH_TOKEN)
    history.push('/')
  }

  const menu = (
    <Menu>
      <Menu.Item key="2">Details</Menu.Item>
      <Menu.Divider/>
      <Menu.Item onClick={onLogout}>Log out</Menu.Item>
    </Menu>
  )

  return (
    <span>
      {userData ? (
        <Dropdown.Button overlay={menu} placement="bottomLeft" icon={<Icon type="user"/>}>
          <span>{userData.email}</span>
        </Dropdown.Button>
      ) : (
        <>
          <Link className="link" to={'/register'}>
            Register
          </Link>
          <Link className="link" to={'/login'}>
            Login
          </Link>
        </>
      )}
    </span>
  )
}
