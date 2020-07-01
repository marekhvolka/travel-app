import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './app/App'
import { AppWrapper } from './AppWrapper'

ReactDOM.render(
  <AppWrapper>
    <App/>
  </AppWrapper>,
  document.getElementById('root')
)
// registerServiceWorker();
