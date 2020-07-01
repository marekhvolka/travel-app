import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Admin } from './admin/Admin'
import { App } from './app/App'
import { AppWrapper } from './AppWrapper'
import { registerServiceWorker } from './serviceWorker'

ReactDOM.render(
  <AppWrapper>
    <BrowserRouter>
      <Switch>
        <Route path={'/admin'} component={Admin}/>
        <Route path={'/'} component={App}/>
      </Switch>
    </BrowserRouter>
  </AppWrapper>,
  document.getElementById('root')
)

registerServiceWorker()
