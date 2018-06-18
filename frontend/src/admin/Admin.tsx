import React from 'react'
import { ThemeProvider } from 'styled-components'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import ProtectedRoute from '../common/atoms/ProtectedRoute/ProtectedRoute'
import theme from '../theme'
import Wrapper from './organism/Wrapper/Wrapper'
import LoginContainer from './pages/Login/LoginContainer'
import './Admin.css'
import 'antd/dist/antd.css';

export const Admin = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter basename={'/admin'}>
      <Switch>
        <Route path={'/login'} exact component={LoginContainer} />
        <ProtectedRoute path={'/'} component={Wrapper} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
)
