import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { State } from '../../../store'
import { Redirect } from 'react-router'

type Props = {
  component: any
  path: string
  exact?: any
}

export const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
  const userData = useSelector((state: State) => state.userData)

  return (
    <Route
      {...rest}
      render={props => {
        if (userData) {
          return <Component {...props} />
        }

        return <Redirect to={'/login'}/>
      }}
    />
  )
}
