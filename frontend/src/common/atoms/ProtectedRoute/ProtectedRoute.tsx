import React from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {Route} from 'react-router-dom'
import {State} from "../../../store";
import {Redirect} from "react-router";

const mapState = (state: State) => ({
  userData: state.userData
})

const connector = connect(
  mapState
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  component: any
}

const ProtectedRoute = ({userData, component: Component, ...rest}: Props) => (
  <Route
    {...rest}
    render={props => {
      if (userData && userData) {
        return <Component {...props} />
      }

      return <Redirect to={'/login'}/>
    }}
  />
)

export default connector(ProtectedRoute)
