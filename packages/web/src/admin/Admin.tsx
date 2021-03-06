import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ProtectedRoute } from '../common/atoms/ProtectedRoute/ProtectedRoute'
import theme from '../theme'
import Wrapper from './organism/Wrapper/Wrapper'
import { LoginContainer } from './pages/Login/LoginContainer'

export const Admin = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter basename={'/admin'}>
      <Switch>
        <Route path={'/login'} exact component={LoginContainer}/>
        <ProtectedRoute path={'/'} component={Wrapper}/>
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
)
